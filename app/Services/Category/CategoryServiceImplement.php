<?php

namespace App\Services\Category;

use LaravelEasyRepository\ServiceApi;
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

    if ($categoryChildren === null) {
      return response()->json(['error' => 'Danh mục cha không tồn tại hoặc không có danh mục con'], 404);
    }

    return response()->json(['categoryChildren' => $categoryChildren], 200);
  }
}
