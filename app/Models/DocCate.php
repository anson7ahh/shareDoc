<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DocCate extends Model
{
    use HasFactory;
    public function Document()
    {
        return $this->belongsTo('Document::class');
    }
    public function Category()
    {
        return $this->belongsTo('Category::class');
    }
}
