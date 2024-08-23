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
      $user = Auth::user();
      if ($request->hasFile('file')) {
        $file = $request->file('file');
        $title = $file->getClientOriginalName();
        $checkFiles = $this->documentRepository->checkFileExists($title, $user->id);
        if (!$checkFiles) {
          return response()->json(['status' => 'success', 'message' => 'File được tải lên thành công.'], 200);
        } else {
          return response()->json(['status' => 'error', 'message' => 'File của bạn có tên trùng với file đang chờ xét duyệt.'], 400);
        }
        // return response()->json(['status' => 'success', 'message' => 'File được tải lên thành công.'], 200);
      } else {
        return response()->json(['status' => 'error', 'message' => 'File không được tìm thấy.'], 404);
      }
    } catch (\Exception $e) {
      Log::error('Lỗi trong quá trình upload file: ' . $e->getMessage());
      return response()->json(['status' => 'error', 'message' => 'Đã xảy ra lỗi. Vui lòng thử lại sau.']);
    }
  }

  public function CreateDocument(Request $request)
  {
    try {
      $userId = Auth::id();
      $description = $request->input('description');
      $source = $request->input('source');
      $point = $request->input('point');
      $categoryChildentId = $request->input('category_id');
      if ($request->hasFile('file')) {
        $file = $request->file('file');
        $format = $file->getClientOriginalExtension();
        $title = $file->getClientOriginalName();

        $slug = Str::slug($title);
        Storage::disk('local')->put('public/file/' . $slug, $file);
        // $file->storeAs('upload', $slug);
        // Lưu document
        $newDocument = $this->documentRepository->createDocument([
          'title' => $title,
          'slug' => $slug,
          'description' => $description,
          'format' => $format,
          'source' => $source,
          'point' => $point,
          'users_id' => $userId
        ]);
        // Lưu danh mục tài liệu
        $this->docCateRepository->createDocCate([
          'category_id' => $categoryChildentId,
          'document_id' => $newDocument->id,

        ]);
        return back()->with([
          'success' => 'Tải lên file thành công. Chờ Admin duyệt!'
        ]);
      }
      return back()->with([
        'error' => 'Tải lên không thành công. Vui lòng kiểm tra file và thử lại.'
      ]);
    } catch (\Exception $e) {
      Log::error('Lỗi khi tải lên file: ' . $e->getMessage());
      return back()->with([
        'error' => 'Đã xảy ra lỗi trong quá trình tải lên. Vui lòng thử lại sau.'
      ]);
    }
  }
}
