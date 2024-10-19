<?php

namespace App\Repositories\Download;


use LaravelEasyRepository\Repository;
use App\DTOs\Download\CreateDownloadDTO;


interface DownloadRepository extends Repository
{

    public function CreateDownload(CreateDownloadDTO $downloadDTO);
}
