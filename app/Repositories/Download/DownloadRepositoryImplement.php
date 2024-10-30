<?php

namespace App\Repositories\Download;

use App\Models\Download;
use App\Data\DownloadedData;

use App\Data\CreateDownloadData;
use LaravelEasyRepository\Implementations\Eloquent;

class DownloadRepositoryImplement extends Eloquent implements DownloadRepository
{

    /**
     * Model class to be used in this repository for the common methods inside Eloquent
     * Don't remove or change $this->model variable name
     * @property Model|mixed $model;
     */
    protected $model;

    public function __construct(Download $model)
    {
        $this->model = $model;
    }

    public function CreateDownload(CreateDownloadData $downloadDTO)
    {
        $download = $this->model->create([
            'user_id' => $downloadDTO->user_id,
            'document_id' => $downloadDTO->document_id,
        ]);
        return $download;
    }
    public function findByDocumentAndUser(CreateDownloadData $downloadDTO)
    {
        return Download::where('document_id', $downloadDTO->document_id)
            ->where('user_id', $downloadDTO->user_id,)
            ->first();
    }
    public function getDownloaded(DownloadedData $data)
    {
        return Download::where('user_id', $data->user_id);
    }
}
