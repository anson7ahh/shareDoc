<?php

namespace App\Services\Comment;

use App\Data\CreateCommentData;
use Illuminate\Support\Facades\Auth;
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

  public function createComment(CreateCommentData $CreateCommentData)
  {
    try {

      $newComment = $this->CommentRepository->CreateComment($CreateCommentData);
      if ($newComment != false) {

        return $this->CommentRepository->newComment($newComment->documents_id);
      }

      return response()->json(['error' => 'Failed to create comment'], 400);
    } catch (\Exception $e) {

      return response()->json(['error' => 'An error occurred while creating the comment', 'details' => $e->getMessage()], 500);
    }
  }
  public function getComment($id)

  {
    return $this->CommentRepository->getComment($id);
  }
  public function CreateReplyComment($request, $CommentId)
  {
    $user_id = Auth::user()->id;
    $body = $request->input('body');
    $documents_id = $request->input('documents_id');
    $replyComment = $this->CommentRepository->replyComment($CommentId, $user_id, $documents_id, $body);
    return $this->CommentRepository->newReplyComment($replyComment->id);
  }
}
