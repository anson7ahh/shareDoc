<?php

namespace App\Repositories\Document;

use App\Models\Document;
use App\Data\CollectionData;
use LaravelEasyRepository\Repository;
use App\Data\CollectionUploadDeleteData;

interface DocumentRepository extends Repository
{
    public function checkFileExists(string $slug, int $user_id);
    // public function createDocument(array $data): Document;
    public function updateDocument(array $data,  int $document_id): Document;
    public function createDocument(array $data);
    public function DocumentItems($id);
    public function findDocument($id);
    public function getUploaded(CollectionData $data);
    public function softDeleteDocUploaded(Document $data);
    public function findDocUpload(CollectionUploadDeleteData $data);
    public function forceDeleteDocUploaded(Document $data);
    public function FeaturedDocument();
}
