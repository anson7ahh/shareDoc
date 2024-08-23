<?php

namespace App\Models;

use App\Enums\DownloadHistoryStatusEnum;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class DownloadHistory extends Model
{
    use HasFactory;
    protected $casts = [
        'status' => DownloadHistoryStatusEnum::class,

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
