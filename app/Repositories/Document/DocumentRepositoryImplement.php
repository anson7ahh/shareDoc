<?php

namespace App\Repositories\Document;

use LaravelEasyRepository\Implementations\Eloquent;
use App\Models\Document;

class DocumentRepositoryImplement extends Eloquent implements DocumentRepository
{

    /**
     * Model class to be used in this repository for the common methods inside Eloquent
     * Don't remove or change $this->model variable name
     * @property Model|mixed $model;
     */
    protected $model;

    public function __construct(Document $model)
    {
        $this->model = $model;
    }


    public function checkFileExists($title, $user_id)
    {
        return
            $this->model->where('title', $title)
            ->where('users_id', $user_id)
            ->where('status', 'notreviewed')
            ->first();
    }


    public function createDocument(array $data): Document
    {
        return $this->model->create($data);
    }
}
