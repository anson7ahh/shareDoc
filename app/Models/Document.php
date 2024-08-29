<?php

namespace App\Models;

use App\Enums\DocumentStatusEnum;
use App\Enums\DocumentFavoriteEnum;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Document extends Model
{
    use HasFactory;
    protected $fillable = [
        'title',
        'slug',
        'source',
        'content',
        'point',
        'description',
        'format',
        'view',
        'status',
        'users_id',

    ];
    protected $casts = [
        'status' => DocumentStatusEnum::class,
    ];
    public function user()
    {
        return $this->belongsTo('User::class');
    }
    public function download()
    {
        return $this->hasMany('Download::class');
    }
    public function historyDownload()
    {
        return $this->hasMany('HistoryDownload::class');
    }
    public function docCate()
    {
        return $this->hasMany('DocCate::class');
    }
    public function docTag()
    {
        return $this->hasMany('DocTag::class');
    }
    public function favorite()
    {
        return $this->hasMany('favorite::class');
    }
}
