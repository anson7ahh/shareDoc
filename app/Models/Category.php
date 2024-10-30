<?php

namespace App\Models;

use Baum\Node;
use App\Models\DocCate;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Category extends Node
{
    use HasFactory;
    protected $fillable = [
        'name',
        'slug',
        'lft',
        'rgt',
        'depth'
    ];


    public function docCates()
    {
        return $this->hasMany(DocCate::class, 'category_id');
    }
    public function documents(): BelongsToMany
    {
        return $this->belongsToMany(Document::class, 'doc_cates', 'category_id', 'document_id');
    }
}
