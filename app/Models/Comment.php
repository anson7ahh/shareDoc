<?php

namespace App\Models;

use App\Models\User;

use App\Models\Category;
use App\Models\Document;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Comment extends Model
{
    use HasFactory;
    protected $fillable = ['user_id', 'document_id', 'parent_id', 'body'];
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
    public function replies()
    {
        return $this->hasMany(Comment::class, 'parent_id');
    }
    public function document()
    {
        return $this->belongsTo(Document::class, 'document_id');
    }
}
