<?php

namespace App\Repositories\Comment;

use LaravelEasyRepository\Repository;

interface CommentRepository extends Repository
{

    public function CreateComment($users_id, $document_id, $body);
    public function getComment($document_id);
    public function newComment($id);
    public function replyComment($CommentId, $user_id, $documents_id, $body);
    public function newReplyComment($id);
}
