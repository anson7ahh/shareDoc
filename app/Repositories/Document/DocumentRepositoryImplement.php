<?php

namespace App\Repositories\Document;

use App\Models\Document;
use Illuminate\Support\Arr;
use LaravelEasyRepository\Implementations\Eloquent;

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


    public function checkFileExists(string $content, int $user_id)
    {
        $findFile = $this->model->where('content', $content)
            ->where('users_id', $user_id)
            ->where('status', 'notreviewed')
            ->first();
        return $findFile ? $findFile : null;
    }

    public function createDocument(array $data): Document
    {
        $filteredData = Arr::only($data, ['content', 'format', 'users_id']);
        return $this->model->create($filteredData);
    }

    public function updateDocument(array $data, int $document_id): Document
    {
        $document = $this->model->find($document_id);
        if ($document) {
            $document->update($data);
            return $document;
        }
        return null;
    }
}
