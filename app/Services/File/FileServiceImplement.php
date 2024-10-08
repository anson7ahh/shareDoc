<?php

namespace App\Services\File;

use Illuminate\Support\Str;
use Illuminate\Http\Request;
use PhpOffice\PhpWord\Settings;
use PhpOffice\PhpWord\IOFactory;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use LaravelEasyRepository\ServiceApi;
use Illuminate\Support\Facades\Storage;
use PhpOffice\PhpWord\Writer\PDF\DomPDF;
use App\Repositories\File\FileRepository;
use App\Repositories\DocCate\DocCateRepository;
use App\Repositories\Category\CategoryRepository;
use App\Repositories\Document\DocumentRepository;



class FileServiceImplement extends ServiceApi implements FileService
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

        // Lưu tệp Word nếu định dạng không phải là PDF
        if ($format !== 'pdf') {
          // Lưu file Word
          $file->storeAs('public/fileWord', $content . '.' . $format, 'local');
          $filePath = storage_path('app/public/fileWord/' . $content . '.' . $format);

          try {
            // Cấu hình DomPDF
            $domPdfPath = base_path('vendor/dompdf/dompdf');

            \PhpOffice\PhpWord\Settings::setPdfRendererPath($domPdfPath);
            \PhpOffice\PhpWord\Settings::setPdfRendererName('DomPDF');
            $Content = \PhpOffice\PhpWord\IOFactory::load($filePath);
            $PDFWriter = \PhpOffice\PhpWord\IOFactory::createWriter($Content, 'PDF');




            // Chuyển đổi sang PDF
            $pdfFileName = $content . '.pdf';

            $PDFWriter->save(storage_path('app/public/file/' . $pdfFileName));
          } catch (\Exception $e) {
            Log::error('Lỗi khi chuyển Word sang PDF: ' . $e->getMessage());
            return response()->json([
              'status' => 'error',
              'message' => 'Không thể chuyển file Word sang PDF.',
              'error' => $e->getMessage()
            ], 500);
          }

          return response()->json([
            'status' => 'success',
            'message' => 'File được tải lên thành công.',
            'documentId' => $newDocument->id,
            'pdf_path' => Storage::url('file/' . $pdfFileName) // Đường dẫn đến PDF đã tạo
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
  public function getDocumentWithId($id)
  {
    try {
      $results = $this->documentRepository->DocumentItems($id);
      if ($results !== null) {
        $pageItemsId = $results->category_id;
        $categoryID = $this->categoryRepository->findCategory($pageItemsId);
        $category = $categoryID->getAncestorsAndSelf(['name', 'id']);
        return response()->json(['status' => 'success', 'parentCategory' => $category, 'pageItems' => $results], 200);
      }
      return response()->json(['status' => 'error', 'message' => 'ko thay id.'], 404);
    } catch (\Exception $e) {
      Log::error('Lỗi nội bộ server: ' . $e->getMessage());
      return response()->json(['status' => 'error', 'message' => 'Lỗi  server.'], 500);
    }
  }
}
