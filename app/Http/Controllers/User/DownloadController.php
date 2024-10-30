<?php

namespace App\Http\Controllers\User;

use Exception;
use Inertia\Inertia;

use App\Data\DownloadedData;
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
    public function store(Request $DownloadRequest)
    {
        try {
            $CreateDownloadDTO = CreateDownloadData::from([
                'document_point' => $DownloadRequest->input('document_point'),
                'document_id' => $DownloadRequest->input('document_id'),
                'user_id' => Auth::user()->id,
                'user_total_point' => Auth::user()->total_points,
            ]);

            $result = $this->downloadService->createDownload($CreateDownloadDTO);

            // Kiểm tra kết quả và trả về phản hồi
            if ($result === true) {
                return response()->json(['message' => $result['message']], 201);
            }

            return response()->json(['error' => $result['message']], 400);
        } catch (Exception $e) {
            // Xử lý lỗi từ service
            return response()->json([
                'message' => 'Error creating download.',
                'error' => $e->getMessage(), // Gửi thông tin lỗi về client
            ], 500); // Trả về mã lỗi 500
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
