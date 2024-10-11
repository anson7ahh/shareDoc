<?php

namespace App\Http\Controllers\User;

use App\Models\Comment;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Services\Comment\CommentService;
use App\Http\Requests\User\CommentRequest;

class CommentController extends Controller
{
    /**
     * Display a listing of the resource.
     */

    protected $CommentService;

    public function __construct(CommentService $commentService)
    {
        $this->CommentService = $commentService;
    }
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CommentRequest $request)
    {

        $user_id = Auth::user()->id;
        $body = $request->input('body');
        $document_id = $request->input('document_id');
        $newComment = $this->CommentService->CreateComment($user_id, $body, $document_id);

        return  $newComment;
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
