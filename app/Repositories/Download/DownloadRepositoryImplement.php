<?php

namespace App\Repositories\Download;

use App\Models\Download;
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
            'users_id' => $downloadDTO->user_id,
            'documents_id' => $downloadDTO->document_id,
        ]);
        return $download;
    }
    public function findByDocumentAndUser(CreateDownloadData $downloadDTO)
    {
        return Download::where('documents_id', $downloadDTO->document_id)
            ->where('users_id', $downloadDTO->user_id,)
            ->first();
    }
}
