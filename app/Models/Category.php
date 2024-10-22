<?php

namespace App\Models;

use Baum\Node;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Category extends Node
{
    use HasFactory;
    protected $fillable = [
        'name',
        'slug',
        'lft',
        'rgt',
        'depth'
    ];


    public function DocCate()
    {
        return $this->hasMany('DocCate::class', 'category_id');
    }
}
