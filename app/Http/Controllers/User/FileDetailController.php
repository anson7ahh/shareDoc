<?php

namespace App\Http\Controllers\User;

use Inertia\Inertia;
use Illuminate\Http\Request;

use App\Http\Controllers\Controller;
use App\Services\Comment\CommentService;
use App\Services\Document\DocumentService;

class FileDetailController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    protected $documentService;
    protected $CommentService;
    public function __construct(DocumentService $documentService, CommentService $CommentService)

    {
        $this->documentService = $documentService;
        $this->CommentService = $CommentService;
    }
    public function index($id)
    {
        $this->documentService->incrementViewDocument($id);

        $data = $this->documentService->getDocumentWithId($id);
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
