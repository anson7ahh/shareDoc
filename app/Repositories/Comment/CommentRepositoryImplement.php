<?php

namespace App\Repositories\Comment;

use App\Models\Comment;
use Illuminate\Support\Facades\DB;
use LaravelEasyRepository\Implementations\Eloquent;

class CommentRepositoryImplement extends Eloquent implements CommentRepository
{

    /**
     * Model class to be used in this repository for the common methods inside Eloquent
     * Don't remove or change $this->model variable name
     * @property Model|mixed $model;
     */
    protected $model;

    public function __construct(Comment $model)
    {
        $this->model = $model;
    }


    public function CreateComment($users_id, $document_id, $body)
    {
        $comment = $this->model->create([
            'users_id' => $users_id,
            'documents_id' => $document_id,
            'body' => $body,
        ]);
        return $comment ?  $comment : false;
    }
    public function getComment($id)
    {
        $results = $this->model
            ->leftJoin('documents', 'comments.documents_id', '=', 'documents.id')
            ->leftJoin('users', 'comments.users_id', '=', 'users.id')
            ->select(

                'comments.id',
                'comments.body',
                'comments.parent_id',
                'name',
                'img',
                'comments.created_at',
            )
            ->where('documents.id', '=', $id)
            ->orderBy('comments.created_at', 'desc')
            ->get();

        return $results;
    }
    public function newComment($id)
    {
        $results = $this->model
            ->leftJoin('documents', 'comments.documents_id', '=', 'documents.id')
            ->leftJoin('users', 'comments.users_id', '=', 'users.id')
            ->select(

                'comments.id',
                'comments.body',
                'comments.parent_id',
                'name',
                'img',
                'comments.created_at',
            )
            ->where('documents.id', '=', $id)
            ->orderBy('comments.created_at', 'desc')
            ->first();

        return $results;
    }
    public function replyComment($CommentId, $user_id, $documents_id, $body)
    {
        $replyComment = $this->model->create([
            'parent_id' => $CommentId,
            'users_id' => $user_id,
            'documents_id' => $documents_id,
            'body' => $body,
        ]);
        return $replyComment ?  $replyComment : false;
    }
    public function newReplyComment($id)
    {
        $results = $this->model
            ->leftJoin('documents', 'comments.documents_id', '=', 'documents.id')
            ->leftJoin('users', 'comments.users_id', '=', 'users.id')
            ->select(

                'comments.id',
                'comments.body',
                'comments.parent_id',
                'name',
                'img',
                'comments.created_at',
            )
            ->where('comments.id', '=', $id)
            ->orderBy('comments.created_at', 'desc')
            ->first();

        return $results ?  $results : null;
    }
}
