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
        return response()->json(['error' => 'ban ko du tien'], 422);
      }
      // Tạo bản ghi download
      $downloadCreated = $this->mainRepository->CreateDownload($downloadDTO);


      if ($downloadCreated) {
        event(new DownloadSuccessful($downloadDTO));
        return true;
      }

      return response()->json(['error' => 'An error occurred while creating the comment'], 400);
    } catch (\Exception $e) {
      return response()->json(['error' => 'An error occurred while creating the comment', 'details' => $e->getMessage()], 500);
      throw $e;
    }
  }
}
