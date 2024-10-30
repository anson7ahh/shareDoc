<?php

namespace App\Models;

use App\Models\Tag;
use App\Models\Document;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class DocTag extends Model
{
    use HasFactory;
    public function Document()
    {
        return $this->belongsTo(Document::class, 'documents_id');
    }
    public function Tag()
    {
        return $this->belongsTo(Tag::class, 'tag_id');
    }
}
