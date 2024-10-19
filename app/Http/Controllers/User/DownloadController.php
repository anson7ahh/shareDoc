<?php

namespace App\Http\Controllers\User;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\DTOs\Download\CreateDownloadDTO;
use App\Services\Download\DownloadService;
use App\Http\Requests\User\DownloadRequest;

class DownloadController extends Controller
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
    public function store(DownloadRequest $request)
    {
        Log::debug('Request data:', [
            'point' => $request->input('point'),
            'document_id' => $request->input('document_id'),
            'user_id' => Auth::user()->id,
            'user_total_points' => Auth::user()->total_points,
        ]);

        $downloadDTO = new CreateDownloadDTO(
            $request->input('point'),
            $request->input('document_id'),
            Auth::user()->id,
            Auth::user()->total_points,
        );

        $newDownload = $this->downloadService->CreateDownload($downloadDTO);
        return response()->json($newDownload);
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
