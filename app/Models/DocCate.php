<?php

namespace App\Models;

use App\Models\Category;
use App\Models\Document;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class DocCate extends Model
{
    use HasFactory;
    protected $fillable = [
        'category_id',
        'document_id',
    ];

    public function document()
    {
        return $this->belongsTo(Document::class, 'document_id');
    }
    public function category()
    {
        return $this->belongsTo(Category::class, 'category_id');
    }
}
