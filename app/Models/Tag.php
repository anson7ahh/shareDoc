<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tag extends Model
{
    use HasFactory;
    protected $fillable = ['name', 'slug'];

    public function Document_tag()
    {
        return $this->hasmany('Document_tag::class');
    }
}
