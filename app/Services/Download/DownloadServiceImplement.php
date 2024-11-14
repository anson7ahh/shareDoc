<?php

namespace App\Services\Download;

use Exception;
use App\Data\CollectionData;
use App\Data\DownloadedData;
use App\Data\CreateDownloadData;
use App\DTOs\Download\DownloadDTO;
use App\Events\DownloadSuccessful;
use Illuminate\Support\Facades\Log;
use LaravelEasyRepository\ServiceApi;
use App\DTOs\Download\CreateDownloadDTO;
use App\Repositories\Download\DownloadRepository;

class DownloadServiceImplement extends ServiceApi implements DownloadService
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
  protected $mainRepository;

  public function __construct(DownloadRepository $mainRepository)
  {
    $this->mainRepository = $mainRepository;
  }


  public function createDownload(CreateDownloadData $downloadDTO)
  {
    try {
      // Kiểm tra nếu điểm của người dùng không đủ
      if ($downloadDTO->user_total_point < $downloadDTO->document_point) {
        return [
          'success' => false,
          'message' => 'Bạn không đủ tiền. Vui lòng nạp thêm.',
          'status' => 422
        ];
      }

      // Kiểm tra nếu người dùng đã tải tài liệu này trước đó
      $existingDownload = $this->mainRepository->findByDocumentAndUser($downloadDTO);

      if ($existingDownload) {
        return [
          'success' => false,
          'message' => 'Bạn đã tải tài liệu này trước đó.',
          'status' => 400
        ];
      }
      $downloadCreated = $this->mainRepository->createDownload($downloadDTO);
      if ($downloadCreated) {
        event(new DownloadSuccessful($downloadDTO));
        return [
          'success' => true,
          'message' => 'Tải xuống thành công.',
          'status' => 201
        ];
      }
      return [
        'success' => false,
        'message' => 'Đã xảy ra lỗi khi tạo tải xuống.',
        'status' => 400
      ];
    } catch (\Exception $e) {
      return [
        'success' => false,
        'message' => 'Đã xảy ra lỗi: ' . $e->getMessage(),
        'status' => $e->getCode() ?: 500
      ];
    }
  }
  // lay tai lieu user da tai theo id
  public function getDocDownloaded(CollectionData $data)
  {

    return $this->mainRepository->getDownloaded($data);
  }
}
