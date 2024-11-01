<?php

namespace App\Repositories\Document;

use App\Models\Document;
use LaravelEasyRepository\Repository;

interface DocumentRepository extends Repository
{
    public function checkFileExists(string $slug, int $user_id);
    // public function createDocument(array $data): Document;
    public function updateDocument(array $data,  int $document_id): Document;
    public function createDocument(array $data);
    public function DocumentItems($id);
    public function findDocument($id);
}
