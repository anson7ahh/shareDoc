<?php

namespace App\Services\Document;

use App\Data\CollectionData;
use Illuminate\Http\Request;
use LaravelEasyRepository\BaseService;
use App\Data\CollectionUploadDeleteData;

interface DocumentService extends BaseService
{

    public function checkFile(Request $request);
    public function updateDocument(Request $request, int $document_id);
    public function getDocumentWithId($id);
    public function incrementViewDocument($id);
    public function getDocUploaded(CollectionData $data);
    public function deleteDocUploaded(CollectionUploadDeleteData $data);
    public function getFeaturedDocument();
}
