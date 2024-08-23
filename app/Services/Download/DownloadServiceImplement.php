<?php

namespace App\Services\Download;

use LaravelEasyRepository\ServiceApi;
use App\Repositories\Download\DownloadRepository;

class DownloadServiceImplement extends ServiceApi implements DownloadService{

    /**
     * set title message api for CRUD
     * @param string $title
     */
     protected $title = "";
     /**
     * uncomment this to override the default message
     * protected $create_message = "";
     * protected $update_message = "";
     * protected $delete_message = "";
     */

     /**
     * don't change $this->mainRepository variable name
     * because used in extends service class
     */
     protected $mainRepository;

    public function __construct(DownloadRepository $mainRepository)
    {
      $this->mainRepository = $mainRepository;
    }

    // Define your custom methods :)
}
