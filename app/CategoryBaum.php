<?php

namespace App;

use Baum\Node;

class CategoryBaum extends Node
{
    protected $table = 'Categories';
    protected $fillable = [
        'name',
        'slug',
        'lft',
        'rgt',
    ];


    public function DocCate()
    {
        return $this->hasmany('DocCate::class');
    }
}
