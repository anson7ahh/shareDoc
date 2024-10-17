<?php

namespace App\Services\Comment;

use LaravelEasyRepository\BaseService;

interface CommentService extends BaseService
{

    public function createComment($users_id, $document_id, $body);
    public function getComment($id);
    public function CreateReplyComment($request, $CommentId);
}
