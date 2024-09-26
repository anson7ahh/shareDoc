<?php

namespace App\Repositories\Document;

use Carbon\Carbon;

use App\Models\Document;
use Illuminate\Support\Arr;
use App\Builders\FileBuilder;
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


    public function checkFileExists($content, $user_id)
    {
        $fileQueryBuilder = new FileBuilder(new Document());
        $findFile = $fileQueryBuilder
            ->whereContent($content)
            ->whereUserId($user_id)
            ->whereStatus('notreviewed')
            ->first();

        return $findFile ? $findFile : null;
    }
    public function createDocument(array $data)
    {
        $fileBuilder = new FileBuilder(new Document());
        $document = $fileBuilder
            ->filterData($data)
            ->create(Document::class);
        return $document;
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
    public function featuredDocument()
    {
        $oneWeekAgo = Carbon::now()->subWeek();
        $documents = $this->model->where('created_at', '>=', $oneWeekAgo)->orderBy('view', 'asc')->get();
        return $documents;
    }
}
