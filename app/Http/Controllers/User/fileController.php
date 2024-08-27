<?php

namespace App\Http\Controllers\User;

use Inertia\Inertia;
use App\Models\DocCate;
use App\Models\Category;
use App\Models\Document;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Services\File\FileService;
use Illuminate\Database\Eloquent\Builder;
use App\Services\Category\CategoryService;

class FileController extends Controller
{
    protected $FileService;
    protected $CategoryService;

    public function __construct(FileService $FileService, CategoryService $CategoryService)
    {
        $this->FileService = $FileService;
        $this->CategoryService = $CategoryService;
    }
    public function index()
    {
        $categoriesParent = $this->CategoryService->getAllRootCategory();
        return Inertia::render('User/Upload', [
            'categoriesParent' => $categoriesParent
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        return  $this->FileService->checkFile($request);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        return $this->CategoryService->getAllCategoryChildren($id);
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
    public function update(Request $request, $document_id)
    {

        return $this->FileService->updateDocument($request, $document_id);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
