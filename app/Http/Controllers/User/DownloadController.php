<?php

namespace App\Http\Controllers\User;

use Exception;
use Illuminate\Http\Request;

use App\Data\CreateDownloadData;
use Illuminate\Support\Facades\Log;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
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
    public function store(DownloadRequest $DownloadRequest)
    {
        try {

            $CreateDownloadDTO = CreateDownloadData::from([
                'document_point' => $DownloadRequest->input('document_point'),
                'document_id' => $DownloadRequest->input('document_id'),
                'user_id' => Auth::user()->id,
                'user_total_point' => Auth::user()->total_points,
            ]);


            Log::debug('CreateDownloadDTO:', $CreateDownloadDTO->toArray());
            // $this->downloadService->createDownload($CreateDownloadDTO);
            return response()->json([
                'message' => 'Download created successfully.',
            ], 201);
        } catch (Exception $e) {
            // Xử lý lỗi từ service
            return response()->json([
                'error' => $e->getMessage(),
            ], $e->getCode() ?: 500);
        }
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
