<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DownloadHistory extends Model
{
    use HasFactory;
    public function User()
    {
        return $this->belongsTo('User::class');
    }
    public function Document()
    {
        return $this->belongsTo('Document::class');
    }
}
