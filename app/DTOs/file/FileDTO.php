<?php

namespace App\DTOs\file;

class FileDTO
{
    public $id;
    public $title;
    public $description;
    public $slug;
    public $content;

    public function __construct($id, $title, $content, $description, $slug)
    {
        $this->id = $id;
        $this->title = $title;
        $this->description = $description;
        $this->content = $content;
        $this->slug = $slug;
    }
}
