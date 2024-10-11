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
            'user_id'     => $users_id,
            'document_id' => $document_id,
            'body'        => $body,
        ]);
        return $comment ?  $comment : null;
    }
    public function getComment($id)
    {

        $results = $this->model
            ->leftJoin('documents', 'comments.documents_id', '=', 'documents.id')
            ->leftJoin('users', 'comments.users_id', '=', 'users.id')
            ->select(

                'comments.id as comment_id',
                'comments.body',
                'comments.parent_id',
                'name',
                'img',
                'comments.created_at',

            )
            ->where('documents.id', '=', $id)
            ->get();

        return $results;
    }
}
