<?php

namespace App\Services\Download;


use App\Data\CollectionData;

use App\Data\CreateDownloadData;
use LaravelEasyRepository\BaseService;


interface DownloadService extends BaseService
{
    public function createDownload(CreateDownloadData $downloadDTO);

    public function getDocDownloaded(CollectionData $data);
}
