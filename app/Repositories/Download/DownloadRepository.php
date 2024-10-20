<?php

namespace App\Repositories\Download;


use App\Data\CreateDownloadData;
use LaravelEasyRepository\Repository;



interface DownloadRepository extends Repository
{

    public function CreateDownload(CreateDownloadData $downloadDTO);
}
