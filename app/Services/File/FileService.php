<?php

namespace App\Services\File;

use LaravelEasyRepository\BaseService;
use Illuminate\Http\Request;

interface FileService extends BaseService
{

    public function checkFile(Request $request);
    public function updateDocument(Request $request, int $document_id);
    public function getDocumentWithId($id);
    // public function getDocWord($id, $format, $content);
}
