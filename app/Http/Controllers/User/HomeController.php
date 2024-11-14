<?php

namespace App\Http\Controllers\User;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Redis;
use App\Services\Category\CategoryService;
use App\Services\Document\DocumentService;

class HomeController extends Controller
{
    protected $CategoryService;
    protected $documentService;
    public function __construct(CategoryService $CategoryService, DocumentService $documentService)
    {

        $this->CategoryService = $CategoryService;
        $this->documentService = $documentService;
    }
    public function index()
    {
        $categoriesParent = $this->CategoryService->getAllRootCategory();
        $featuredDocument = $this->documentService->getFeaturedDocument();
        return Inertia::render('User/Home', [
            'categoriesParent' => $categoriesParent,
            'featuredDocument' => $featuredDocument,
        ]);
    }
    public function show($id)
    {
        $AncestorsAndSelf = $this->CategoryService->getRoot($id);
        $paginatedItems = $this->CategoryService->getDocWithCate($id);

        return Inertia::render('User/DocCate', [
            'AncestorsAndSelf' => $AncestorsAndSelf,
            'paginatedItems' => $paginatedItems,
        ]);
    }
}
