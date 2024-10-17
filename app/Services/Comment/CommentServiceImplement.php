<?php

namespace App\Services\Comment;

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

  public function createComment($users_id, $documents_id, $body)
  {
    try {
      // Thực hiện tạo bình luận
      $newComment = $this->CommentRepository->CreateComment($users_id, $body, $documents_id);

      // Kiểm tra nếu bình luận được tạo thành công
      if ($newComment != false) {

        return $this->CommentRepository->newComment($newComment->documents_id);
      }

      // Nếu tạo bình luận thất bại, trả về lỗi
      return response()->json(['error' => 'Failed to create comment'], 400);
    } catch (\Exception $e) {
      // Xử lý ngoại lệ nếu xảy ra lỗi trong quá trình tạo bình luận
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
