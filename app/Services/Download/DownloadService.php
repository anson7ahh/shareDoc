<?php

namespace App\Services\Download;


use LaravelEasyRepository\BaseService;
use App\DTOs\Download\CreateDownloadDTO;

interface DownloadService extends BaseService
{

    public function CreateDownload(CreateDownloadDTO $downloadDTO);
}
