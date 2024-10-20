<?php

namespace App\Services\Download;


use App\Data\CreateDownloadData;
use LaravelEasyRepository\BaseService;


interface DownloadService extends BaseService
{
    public function createDownload(CreateDownloadData $downloadDTO);
}
