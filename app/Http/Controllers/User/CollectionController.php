<?php

namespace App\Http\Controllers\User;

use Inertia\Inertia;
use App\Data\DownloadedData;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Services\Download\DownloadService;

class CollectionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    protected $downloadService;

    public function __construct(DownloadService $downloadService)
    {
        $this->downloadService = $downloadService;
    }
    public function index()
    {
        $userId = Auth::user()?->id;
        $DownloadDTO = DownloadedData::from([
            'user_id' => $userId,
        ]);
        $downloaded = $this->downloadService->getDocDownloaded($DownloadDTO);
        return Inertia::render('User/Collections', [
            'downloaded' => $downloaded
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
