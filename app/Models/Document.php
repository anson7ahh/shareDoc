<?php

namespace App\Models;

use App\Enums\DocumentStatusEnum;
use App\Enums\DocumentFavoriteEnum;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;
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

    public function comments()
    {
        return $this->hasMany(Comment::class)->whereNull('parent_id');
    }

    protected static function boot()
    {
        parent::boot();
        static::deleting(function ($content) {
            // Xóa file từ storage trước khi xóa bản ghi khỏi database
            $filePath = 'public/file/' . $content;
            if (Storage::disk('local')->exists($filePath)) {
                Storage::disk('local')->delete($filePath);
                return true;
            }
            return false;
        });
    }
}
