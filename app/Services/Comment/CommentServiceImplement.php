<?php

namespace App\Services\Comment;

use LaravelEasyRepository\ServiceApi;
use App\Repositories\Comment\CommentRepository;

class CommentServiceImplement extends ServiceApi implements CommentService
{

  /**
   * set title message api for CRUD
   * @param string $title
   */
  protected $title = "";
  /**
   * uncomment this to override the default message
   * protected $create_message = "";
   * protected $update_message = "";
   * protected $delete_message = "";
   */

  /**
   * don't change $this->mainRepository variable name
   * because used in extends service class
   */
  protected $CommentRepository;

  public function __construct(CommentRepository $CommentRepository)
  {
    $this->CommentRepository = $CommentRepository;
  }

  public function createComment($users_id, $document_id, $body)
  {
    $newComment = $this->CommentRepository->CreateComment($users_id, $document_id, $body);
    if ($newComment != null) {
      return response()->json(['message' => 'success', 'newComment' => $newComment], 206);
    }
    return response()->json(['error' => 'Failed to create comment'], 400);
  }
  public function getComment($id)

  {
    return $this->CommentRepository->getComment($id);
  }
}
