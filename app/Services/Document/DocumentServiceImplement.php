<?php

namespace App\Services\Document;

use Illuminate\Support\Str;
use App\Data\CollectionData;
use Illuminate\Http\Request;
use PhpOffice\PhpWord\Settings;
use App\Events\WordFileUploaded;
use PhpOffice\PhpWord\IOFactory;
use App\Events\ViewDocumentEvent;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use LaravelEasyRepository\ServiceApi;
use App\Events\DocumentDeletePathEvent;
use Illuminate\Support\Facades\Storage;
use App\Data\CollectionUploadDeleteData;
use PhpOffice\PhpWord\Writer\PDF\DomPDF;
use App\Repositories\DocCate\DocCateRepository;
use App\Repositories\Category\CategoryRepository;
use App\Repositories\Document\DocumentRepository;
use Illuminate\Database\Eloquent\ModelNotFoundException;



class DocumentServiceImplement extends ServiceApi implements DocumentService
{

  /**
   * set title message api for CRUD
   * @param string $title
   */
  protected $title = "";
  /**
   * uncomment this to override the default message
   * protected $create_message = "";
   * protected $update_message = "";
   * protected $delete_message = "";
   */

  /**
   * don't change $this->mainRepository variable name
   * because used in extends service class
   */


  protected $documentRepository;
  protected $docCateRepository;
  protected $categoryRepository;
  public function __construct(CategoryRepository $categoryRepository, DocumentRepository $documentRepository, DocCateRepository $docCateRepository)
  {
    $this->documentRepository = $documentRepository;
    $this->docCateRepository = $docCateRepository;
    $this->categoryRepository = $categoryRepository;
  }


  // luu document va kiem tra format
  //neu la word chuyen sang pdf
  public function checkFile(Request $request)
  {
    try {
      if ($request->hasFile('file')) {
        $user = Auth::user();
        $file = $request->file('file');
        $title = $file->getClientOriginalName();
        $fileNameWithoutExtension = pathinfo($title, PATHINFO_FILENAME);
        $content = Str::slug($fileNameWithoutExtension);
        $format = $file->getClientOriginalExtension();

        // Kiểm tra file đã tồn tại hay chưa
        $checkFiles = $this->documentRepository->checkFileExists($content, $user->id);
        if ($checkFiles != null) {
          return response()->json([
            'status' => 'error',
            'message' => 'File của bạn có tên trùng với file đang chờ xét duyệt.'
          ], 200);
        }

        // Tạo mới document trong DB
        $newDocument = $this->documentRepository->createDocument([
          'content' => $content,
          'format' => $format,
          'users_id' => $user->id
        ]);
        if ($format !== 'pdf') {
          $file->storeAs('public/fileWord', $content . '.' . $format, 'local');
          $filePath = storage_path('app/public/fileWord/' . $content . '.' . $format);

          // Gọi Event
          event(new WordFileUploaded($filePath, $content));
          return response()->json([
            'status' => 'success',
            'message' => 'File được tải lên thành công.',
            'documentId' => $newDocument->id,

          ], 201);
        } else {
          // Lưu file PDF
          $file->storeAs('public/file', $content . '.' . $format, 'local');
          return response()->json([
            'status' => 'success',
            'message' => 'File được tải lên thành công.',
            'documentId' => $newDocument->id,
          ], 201);
        }
      }

      return response()->json([
        'status' => 'error',
        'message' => 'File không được tìm thấy.'
      ], 404);
    } catch (\Exception $e) {
      Log::error('Lỗi trong quá trình upload file: ' . $e->getMessage());
      return response()->json([
        'status' => 'error',
        'message' => 'Đã xảy ra lỗi. Vui lòng thử lại sau.',
        'error' => $e->getMessage()
      ], 500);
    }
  }








  // them cac truong con thieu 
  public function updateDocument(Request $request, int $document_id)
  {
    try {

      $title = $request->input('title');
      $titleWithoutFormat = pathinfo($title, PATHINFO_FILENAME);
      $description = $request->input('description');
      $source = $request->input('source');
      $point = $request->input('point');
      $slug = Str::slug($titleWithoutFormat);
      $categoryChildentId = $request->input('category_id');


      if (!$title) {
        return response()->json(['status' => 'error', 'message' => 'Dữ liệu đầu vào không hợp lệ.', 'data' =>
        $request->all()], 400);
      }

      $updateDocument = $this->documentRepository->updateDocument([
        'title' => $titleWithoutFormat,
        'slug' => $slug,
        'description' => $description,
        'source' => $source,
        'point' => $point,
        'category_id' => $categoryChildentId,
      ], $document_id);

      if ($updateDocument) {
        $this->docCateRepository->createDocCate([
          'category_id' => $categoryChildentId,
          'document_id' => $updateDocument->id,
        ]);
        return response()->json(['status' => 'success', 'message' => 'Tải lên thành công.', 'document' => $updateDocument], 200);
      }
      return response()->json(['status' => 'error', 'message' => 'Tài liệu không tồn tại.'], 404);
    } catch (\Exception $e) {
      Log::error('Lỗi khi cập nhật tài liệu: ' . $e->getMessage());
      return response()->json(['status' => 'error', 'message' => 'Lỗi nội bộ server.'], 500);
    }
  }
  //tinh view
  public function incrementViewDocument($id)
  {
    $result = $this->documentRepository->findDocument($id);
    if ($result) {
      event(new ViewDocumentEvent($result));
    }
    return false;
  }
  //lay tai lieu theo id
  public function getDocumentWithId($id)
  {
    try {

      $results = $this->documentRepository->DocumentItems($id);

      if ($results !== null) {
        $pageItemsId  = $results->categories->pluck('id');

        $categoryID = $this->categoryRepository->findCategory($pageItemsId);
        $category = $categoryID[0]->getAncestorsAndSelf(['name', 'id']);
        return response()->json(['status' => 'success', 'parentCategory' => $category, 'pageItems' => $results], 200);
      }
      return response()->json(['status' => 'error', 'message' => 'ko thay id.'], 404);
    } catch (\Exception $e) {
      Log::error('Lỗi nội bộ server: ' . $e->getMessage());
      return response()->json(['status' => 'error', 'message' => 'Lỗi  server.'], 500);
    }
  }



  //lay tai lieu user da tai
  public function getDocUploaded(CollectionData $data)
  {

    return $this->documentRepository->getUploaded($data);
  }



  public function deleteDocUploaded(CollectionUploadDeleteData $data)
  {
    try {
      // Tìm tài liệu tải lên dựa trên dữ liệu đầu vào
      $result = $this->documentRepository->findDocUpload($data);

      // Ghi log thông tin về dữ liệu tìm thấy
      Log::info('Attempting to delete document', ['result' => $result]);

      // Kiểm tra trạng thái của tài liệu
      if ($result->status == "notreviewed") {
        $this->documentRepository->forceDeleteDocUploaded($result);
        event(new DocumentDeletePathEvent($result));

        return response()->json(['message' => 'success'], 200);
      }

      // Xóa mềm nếu tài liệu đã được xét duyệt
      $this->documentRepository->softDeleteDocUploaded($result);

      return response()->json(['message' => 'Tài liệu đã được xét duyệt. Cần admin xác nhận'], 200);
    } catch (ModelNotFoundException $e) {
      Log::error('Document not found for ID', ['documentId' => $data->documentId]);
      return response()->json(['message' => 'Không tìm thấy ID.'], 404);
    }
  }
  public function getFeaturedDocument()
  {
    return $this->documentRepository->FeaturedDocument();
  }
}
