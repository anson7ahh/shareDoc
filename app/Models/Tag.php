<?php

namespace App\Models;

use App\Models\DocTag;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Tag extends Model
{
    use HasFactory;
    protected $fillable = ['name', 'slug'];

    public function docTag()
    {
        return $this->hasMany(DocTag::class, 'tag_id');
    }
}
