<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Favorite extends Model
{
    use HasFactory;
    protected $fillable = [
        'document_id',
        'users_id',
    ];
    public function Documnet()
    {
        return $this->belongsTo('Document::class');
    }
    public function User()
    {
        return $this->belongsTo('User::class');
    }
}
