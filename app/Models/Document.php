<?php

namespace App\Models;

use App\Models\User;
use App\Models\DocTag;
use App\Models\Comment;
use App\Models\DocCate;
use App\Models\Download;
use App\Models\Favorite;
use App\Enums\DocumentStatusEnum;
use App\Enums\DocumentFavoriteEnum;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

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
        return $this->belongsTo(User::class, 'users_id');
    }
    public function downloads()
    {
        return $this->hasMany(Download::class, 'document_id');
    }

    public function docCate()
    {
        return $this->hasMany(DocCate::class, 'document_id');
    }
    public function docTag()
    {
        return $this->hasMany(DocTag::class, 'document_id');
    }
    public function favorite()
    {
        return $this->hasMany(Favorite::class, 'document_id');
    }

    public function comments()
    {
        return $this->hasMany(Comment::class)->whereNull('parent_id');
    }
    public function categories(): BelongsToMany
    {
        return $this->belongsToMany(Category::class, 'doc_cates', 'document_id', 'category_id');
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
