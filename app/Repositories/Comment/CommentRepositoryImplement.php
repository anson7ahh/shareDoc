<?php

namespace App\Repositories\Comment;

use App\Models\Comment;
use App\Data\CreateCommentData;
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


    public function CreateComment(CreateCommentData $createCommentData)
    {
        $comment = $this->model->create([
            'user_id' => $createCommentData->user_id,
            'document_id' => $createCommentData->document_id,
            'body' => $createCommentData->body,
        ]);
        return $comment ?  $comment : false;
    }
    public function getComment($id)
    {

        $results = Comment::with([
            'document',
            'user' => function ($query) {
                $query->select('id', 'name', 'img');
            }
        ])
            ->select(
                'id',
                'body',
                'parent_id',
                'user_id',
                'document_id',
                'created_at'
            )
            ->where('document_id', '=', $id)
            ->orderBy('created_at', 'desc')
            ->get();

        return $results;
    }
    public function newComment($id)
    {
        $results = $this->model
            ->leftJoin('documents', 'comments.document_id', '=', 'documents.id')
            ->leftJoin('users', 'comments.user_id', '=', 'users.id')
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
            'user_id' => $user_id,
            'document_id' => $documents_id,
            'body' => $body,
        ]);
        return $replyComment ?  $replyComment : false;
    }
    public function newReplyComment($id)
    {
        // $results = $this->model
        //     ->leftJoin('documents', 'comments.document_id', '=', 'document.id')
        //     ->leftJoin('users', 'comments.user_id', '=', 'users.id')
        //     ->select(
        //         'comments.id',
        //         'comments.body',
        //         'comments.parent_id',
        //         'name',
        //         'img',
        //         'comments.created_at',
        //     )
        //     ->where('comments.id', '=', $id)
        //     ->orderBy('comments.created_at', 'desc')
        //     ->first();
        $results = Comment::with([
            'document' => function ($query) {
                $query->select('id as document_id');
            },
            'user' => function ($query) {
                $query->select('id', 'name', 'img');
            }
        ])
            ->select(
                'id',
                'body',
                'parent_id',
                'user_id',
                'document_id',
                'created_at'
            )
            ->where('id', $id)
            ->orderBy('created_at', 'desc')
            ->first();
        return $results ?  $results : null;
    }
}
