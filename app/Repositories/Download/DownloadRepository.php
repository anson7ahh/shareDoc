<?php

namespace App\Repositories\Download;


use App\Data\DownloadedData;
use App\Data\CreateDownloadData;
use LaravelEasyRepository\Repository;



interface DownloadRepository extends Repository
{

    public function CreateDownload(CreateDownloadData $downloadDTO);
    public function findByDocumentAndUser(CreateDownloadData $downloadDTO);
    public function getDownloaded(DownloadedData $data);
}
