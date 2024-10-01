<?php

namespace App\Builders;

use App\Models\DocCate;


class DocCateBuilder
{
    protected $query;

    public function __construct()
    {
        $this->query = DocCate::leftJoin('categories', 'categories.id', '=', 'doc_cates.category_id')
            ->rightJoin('documents', 'documents.id', '=', 'doc_cates.document_id');
    }

    public function selectFields()
    {
        $this->query->select('categories.name', 'documents.title', 'documents.id');
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
}
