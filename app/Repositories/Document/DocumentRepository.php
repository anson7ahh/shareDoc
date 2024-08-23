<?php

namespace App\Repositories\Document;

use App\Models\Document;
use LaravelEasyRepository\Repository;

interface DocumentRepository extends Repository
{
    public function checkFileExists($title, $userId);
    public function createDocument(array $data): Document;
}
