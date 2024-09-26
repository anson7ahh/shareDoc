<?php

namespace App\Builders;

use App\Models\Category;

class CateBuilder
{
    protected $query;

    public function __construct()
    {
        $this->query = Category::query();
    }


    public function joinDocCates()
    {
        $this->query->join('doc_cates', 'categories.id', '=', 'doc_cates.category_id');
        return $this;
    }


    public function joinDocuments()
    {
        $this->query->join('documents', 'documents.id', '=', 'doc_cates.document_id');
        return $this;
    }


    public function selectFields()
    {
        $this->query->select('categories.name', 'documents.title');
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
}
