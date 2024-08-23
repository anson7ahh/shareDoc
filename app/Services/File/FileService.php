<?php

namespace App\Services\File;

use LaravelEasyRepository\BaseService;
use Illuminate\Http\Request;

interface FileService extends BaseService
{

    public function checkFile(Request $request);
    public function CreateDocument(Request $request);
}
