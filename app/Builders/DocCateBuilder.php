<?php

namespace App\Builders;

use App\Models\DocCate;
use Illuminate\Support\Facades\DB;


class DocCateBuilder
{
    protected $query;
    protected $data;

    public function __construct()
    {
        $this->query = DocCate::leftJoin('categories', 'categories.id', '=', 'doc_cates.category_id')

            ->leftJoin('documents', 'documents.id', '=', 'doc_cates.document_id')
            ->leftJoin('users', 'users.id', '=', 'documents.users_id')
            ->leftJoin('downloads', 'downloads.document_id', '=', 'documents.id');
    }

    public function selectFields()
    {
        $this->query->select(
            'documents.format',
            'documents.title',
            'documents.view',
            'users.name',
            'documents.slug',
            'documents.id',
            DB::raw('COUNT(downloads.document_id) AS total_download')
        );
        return $this;
    }
    public function GroupBy()
    {
        $this->query->groupBy('documents.view', 'documents.title', 'documents.format', 'users.name', 'documents.slug', 'documents.id');

        return $this;
    }
    public function where($field, $operator, $value)
    {
        $this->query->where($field, $operator, $value);
        return $this;
    }

    public function get()
    {
        return $this->query->get();
    }
    public function paginate($page)
    {
        return $this->query->paginate($page);
    }
    public function selectItems()
    {
        $this->query->select(

            'documents.title',
            'documents.format',
            'documents.content',
            'documents.view',
            'documents.source',
            'documents.point',
            'documents.description',
            'users.name',
            'categories.id as category_id',
            DB::raw('COUNT(downloads.document_id) AS total_download')

        );
        return $this;
    }
    public function GroupByItems()
    {
        $this->query->groupBy(

            'documents.title',
            'documents.format',
            'documents.content',
            'documents.view',
            'documents.source',
            'documents.point',
            'documents.description',
            'users.name',
            'categories.id',
        );

        return $this;
    }
    public function first()
    {
        return $this->query->first();
    }
}
