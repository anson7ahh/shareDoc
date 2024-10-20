<?php

namespace App\Services\Download;

use Exception;
use App\Data\CreateDownloadData;
use App\DTOs\Download\DownloadDTO;
use App\Events\DownloadSuccessful;
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
        // Trả về false hoặc có thể quăng ngoại lệ với mã lỗi 422
        throw new \Exception('Not enough points to create download.', 422);
      }
      // Tạo bản ghi download
      $downloadCreated = $this->mainRepository->createDownload($downloadDTO);

      // Kiểm tra nếu tạo bản ghi thành công
      if ($downloadCreated) {
        // Nếu tạo thành công, phát sự kiện
        event(new DownloadSuccessful($downloadCreated));

        // Trả về true nếu thành công
        return true;
      }

      // Nếu không tạo được download, quăng ngoại lệ
      throw new \Exception('Failed to create download.', 500);
    } catch (\Exception $e) {
      // Quăng lại ngoại lệ để controller xử lý
      throw $e;
    }
  }
}
