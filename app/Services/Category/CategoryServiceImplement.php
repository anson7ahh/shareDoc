<?php

namespace App\Services\Category;

use LaravelEasyRepository\ServiceApi;
use Illuminate\Pagination\LengthAwarePaginator;
use App\Repositories\Category\CategoryRepository;

class CategoryServiceImplement extends ServiceApi implements CategoryService
{

  /**
   * set title message api for CRUD
   * @param string $title
   */
  protected $title = "";
  /**
   * uncomment this to override the default message
   * protected $create_message = "";
   * protected $update_message = "";
   * protected $delete_message = "";
   */

  /**
   * don't change $this->mainRepository variable name
   * because used in extends service class
   */
  protected $categoryRepository;

  public function __construct(CategoryRepository $categoryRepository)
  {
    $this->categoryRepository = $categoryRepository;
  }
  public function getAllRootCategory()
  {
    return $this->categoryRepository->allRootCategory();
  }
  public function getAllCategoryChildren($id)
  {
    $categoryChildren = $this->categoryRepository->allCategoryChildren($id);

    if ($categoryChildren !== null) {
      return response()->json(['categoryChildren' => $categoryChildren], 200);
    }

    return response()->json(['error' => 'Danh mục cha không tồn tại hoặc không có danh mục con'], 404);
  }
  public function getRoot($id)
  {
    $category = $this->categoryRepository->findCategory($id);

    if ($category !== null) {
      // Lấy tất cả tổ tiên và chính danh mục đang truy vấn, bao gồm các trường 'name' và 'id'
      $parentCategory = $category->getAncestorsAndSelf(['name', 'id']);
      return response()->json(['parentCategory' => $parentCategory], 200);
    }
    return response()->json(['error' => 'Danh mục không tồn tại'], 404);
  }

  public function getDocWithCate($id)
  {
    $category = $this->categoryRepository->findCategory($id);
    if ($category === null) {
      return response()->json(['error' => 'Danh mục không tồn tại'], 404);
    }

    // Nếu là leaf node
    if ($category->isLeaf()) {
      $paginatedItems = $this->categoryRepository->paginateLeaf($id);
      return response()->json(['paginatedItems' => $paginatedItems], 200);
    }
    $ImmediateDescendants = $category->getLeaves();
    $flattenedArray = $this->categoryRepository->paginate($ImmediateDescendants);


    $currentPage = LengthAwarePaginator::resolveCurrentPage();
    $perPage = 10;
    $currentPageItems = $flattenedArray->forPage($currentPage, $perPage);

    $paginatedItems = new LengthAwarePaginator(
      $currentPageItems,
      $flattenedArray->count(),
      $perPage,
      $currentPage,
      [
        'path' => LengthAwarePaginator::resolveCurrentPath(),
        'query' => request()->query()
      ]
    );

    return response()->json([
      'paginatedItems' => $paginatedItems,
    ], 200);
  }
}
