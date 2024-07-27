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
        'point',
        'description',
        'format',
        'content'
    ];

    protected $casts = [
        'status' => DocumentStatusEnum::class,
        'favorite' => DocumentFavoriteEnum::class,
    ];
    public function User()
    {
        return $this->belongsTo('User::class');
    }
    public function Download()
    {
        return $this->hasMany('Download::class');
    }
    public function HistoryDownload()
    {
        return $this->hasMany('HistoryDownload::class');
    }
    public function DocCate()
    {
        return $this->hasmany('DocCate::class');
    }
    public function DocTag()
    {
        return $this->hasmany('DocTag::class');
    }
}
