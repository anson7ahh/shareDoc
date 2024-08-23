<?php

namespace App\Repositories\Download;

use LaravelEasyRepository\Implementations\Eloquent;
use App\Models\Download;

class DownloadRepositoryImplement extends Eloquent implements DownloadRepository{

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

    // Write something awesome :)
}
