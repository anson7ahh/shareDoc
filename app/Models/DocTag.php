<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DocTag extends Model
{
    use HasFactory;
    public function Document()
    {
        return $this->belongsTo('Document::class');
    }
    public function Tag()
    {
        return $this->belongsTo('Tag::class');
    }
}
