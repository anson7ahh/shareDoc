<?php

namespace App\DTOs\Download;

class CreateDownloadDTO
{
    public $document_point;
    public $document_id;
    public $user_id;
    public $user_total_point;


    public function __construct($document_point,  $document_id, $user_id, $user_total_point)
    {
        $this->document_point = $document_point;
        $this->document_id = $document_id;
        $this->user_id = $user_id;
        $this->user_total_point = $user_total_point;
    }
}
