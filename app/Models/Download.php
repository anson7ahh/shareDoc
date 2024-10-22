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
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    // Một download thuộc về một tài liệu
    public function document()
    {
        return $this->belongsTo(Document::class, 'document_id');
    }
}
