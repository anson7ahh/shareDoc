<?php

namespace App\Http\Controllers\User;

use Inertia\Inertia;
use App\Data\CollectionData;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Services\Document\DocumentService;
use App\Services\Download\DownloadService;


class CollectionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    protected $downloadService;
    protected $documentService;
    public function __construct(DownloadService $downloadService, DocumentService $documentService)
    {
        $this->downloadService = $downloadService;
        $this->documentService = $documentService;
    }
    public function index()
    {
        $userId = Auth::user()?->id;
        $CollectionData = CollectionData::from([
            'user_id' => $userId,
        ]);
        $DocumentDownloaded = $this->downloadService->getDocDownloaded($CollectionData);
        $DocumentUploaded = $this->documentService->getDocUploaded($CollectionData);


        return Inertia::render('User/Collections', [
            'DocumentDownloaded' => $DocumentDownloaded,
            'DocumentUploaded' => $DocumentUploaded,
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
    }
}
