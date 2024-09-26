<?php

namespace App\Http\Controllers\User;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Services\Category\CategoryService;

class HomeController extends Controller
{
    protected $CategoryService;
    public function __construct(CategoryService $CategoryService)
    {

        $this->CategoryService = $CategoryService;
    }
    public function index()
    {
        $categoriesParent = $this->CategoryService->getAllRootCategory();

        return Inertia::render('Home', [
            'categoriesParent' => $categoriesParent,

        ]);
    }
    public function show($id)
    {
        $AncestorsAndSelf = $this->CategoryService->getRoot($id);
        $getDocWithCate = $this->CategoryService->getDocWithCate($id);
        return Inertia::render('User/DocCate', [
            'AncestorsAndSelf' => $AncestorsAndSelf,
            'getDocWithCate' => $getDocWithCate,
        ]);
    }
}
