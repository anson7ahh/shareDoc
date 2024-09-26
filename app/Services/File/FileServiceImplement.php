<?php

namespace App\Services\File;

use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use LaravelEasyRepository\ServiceApi;
use Illuminate\Support\Facades\Storage;
use App\Repositories\File\FileRepository;
use App\Repositories\DocCate\DocCateRepository;
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

  public function __construct(DocumentRepository $documentRepository, DocCateRepository $docCateRepository)
  {
    $this->documentRepository = $documentRepository;
    $this->docCateRepository = $docCateRepository;
  }

  public function checkFile(Request $request)
  {
    try {
      if ($request->hasFile('file')) {
        $user = Auth::user();
        $file = $request->file('file');
        $title = $file->getClientOriginalName();
        $content = Str::slug($title);
        $format = $file->getClientOriginalExtension();
        $checkFiles = $this->documentRepository->checkFileExists($content, $user->id);
        if ($checkFiles === null) {
          $newDocument = $this->documentRepository->createDocument([
            'content' => $content,
            'format' => $format,
            'users_id' => $user->id
          ]);
          $documentId  = $newDocument->id;
          return response()->json([
            'status' => 'success', 'message' => 'File được tải lên thành công.',
            'documentId' => $documentId
          ], 206);
        }
        return response()->json(['status' => 'error', 'message' => 'File của bạn có tên trùng với file đang chờ xét duyệt.'], 200);
      } else {
        return response()->json(['status' => 'error', 'message' => 'File không được tìm thấy.'], 404);
      }
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
      $description = $request->input('description');
      $source = $request->input('source');
      $point = $request->input('point');
      $slug = Str::slug($title);
      $categoryChildentId = $request->input('category_id');

      // Kiểm tra dữ liệu đầu vào
      if (!$title) {
        return response()->json(['status' => 'error', 'message' => 'Dữ liệu đầu vào không hợp lệ.', 'data' =>
        $request->all()], 400);
      }

      $updateDocument = $this->documentRepository->updateDocument([
        'title' => $title,
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
  public function getDocumentWithCate(int $id)
  {
  }
}
