<?php

namespace App\Http\Controllers\USer;

use Exception;
use Illuminate\Http\Request;

use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Services\Document\DocumentService;
use App\Data\CollectionUploadDeleteData;
use App\Http\Requests\User\CollectionUploadDeleteRequest;

class CollectionUploadController extends Controller
{
    protected $documentService;
    public function __construct(DocumentService $documentService)
    {
        $this->documentService = $documentService;
    }
    /**
     * Display a listing of the resource.
     */
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
    public function destroy(int $id)
    {
        try {
            $data = CollectionUploadDeleteData::from([
                'documentId' => $id,
                'user_id' => Auth::user()->id,
            ]);

            $result = $this->documentService->deleteDocUploaded($data);
            Log::info('result', ['result' => $result]);
            return response()->json([
                'status' => 'success',
                'result' => $result->getData(), // Dữ liệu JSON từ JsonResponse của service
            ], $result->getStatusCode());
        } catch (Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Có lỗi xảy ra. Vui lòng thử lại.'
            ], 500);
        }
    }
}
