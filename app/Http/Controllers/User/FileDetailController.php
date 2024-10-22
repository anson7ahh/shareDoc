<?php

namespace App\Http\Controllers\User;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Services\File\FileService;
use App\Http\Controllers\Controller;
use App\Services\Comment\CommentService;

class FileDetailController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    protected $FileService;
    protected $CommentService;
    public function __construct(FileService $FileService, CommentService $CommentService)

    {
        $this->FileService = $FileService;
        $this->CommentService = $CommentService;
    }
    public function index($id, $slug)
    {
        $this->FileService->incrementViewDocument($id);

        $data = $this->FileService->getDocumentWithId($id);
        $comment = $this->CommentService->getComment($id);


        return Inertia::render('User/FileDetail', [
            'data' => $data,
            'comment' => $comment,
        ]);
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
    public function store(Request $request)
    {
        //
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
