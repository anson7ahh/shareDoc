<?php

namespace App\Services\Comment;

use App\Data\CreateCommentData;
use LaravelEasyRepository\BaseService;

interface CommentService extends BaseService
{

    public function createComment(CreateCommentData $CreateCommentData);
    public function getComment($id);
    public function CreateReplyComment($request, $CommentId);
}
