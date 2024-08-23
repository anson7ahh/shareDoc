<?php

namespace App\Repositories\DocCate;

use LaravelEasyRepository\Implementations\Eloquent;
use App\Models\DocCate;

class DocCateRepositoryImplement extends Eloquent implements DocCateRepository
{

    /**
     * Model class to be used in this repository for the common methods inside Eloquent
     * Don't remove or change $this->model variable name
     * @property Model|mixed $model;
     */
    protected $model;

    public function __construct(DocCate $model)
    {
        $this->model = $model;
    }

    public function createDocCate(array $data): DocCate
    {
        return $this->model->create($data);
    }
}
