<?php

namespace App\Models;

use App\Enums\DownloadStatusEnum;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Download extends Model
{
    use HasFactory;
    protected $fillable = [
        'users_id',
        'documents_id',
        'status',
    ];
    protected $casts = [
        'status' => DownloadStatusEnum::class,
    ];
    public function User()
    {
        return $this->belongsTo('User::class');
    }
    public function Document()
    {
        return $this->belongsTo('Document::class');
    }
}
