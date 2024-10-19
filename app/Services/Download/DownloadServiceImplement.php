<?php

namespace App\Services\Download;

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

  public function CreateDownload(CreateDownloadDTO $downloadDTO)
  {
    try {
      // Kiểm tra nếu điểm của người dùng không đủ
      $remainingPoints = $downloadDTO->user_total_point - $downloadDTO->document_point;
      if ($remainingPoints < 0) {
        return response()->json([
          'error' => 'Not enough points to create download.',
        ], 422); // Trả về 422 nếu điểm không đủ
      }

      // Tạo bản ghi download
      $downloadCreated = $this->mainRepository->CreateDownload($downloadDTO);

      if ($downloadCreated) {
        // Nếu tạo thành công, phát sự kiện và trả về phản hồi thành công
        event(new DownloadSuccessful($downloadDTO));
        return response()->json([
          'message' => 'Download created successfully.',
        ], 201);
      }

      // Nếu không tạo được download, trả về lỗi
      return response()->json([
        'error' => 'Failed to create download.'
      ], 500);
    } catch (\Exception $e) {
      // Xử lý ngoại lệ và trả về lỗi hệ thống
      return response()->json([
        'error' => 'An error occurred while creating download.',
        'message' => $e->getMessage(),
      ], 500);
    }
  }
}
