<?php

namespace App\Services\Category;

use LaravelEasyRepository\BaseService;

interface CategoryService extends BaseService
{

    public function getAllRootCategory();
    public function getAllCategoryChildren($id);
    public function getRoot($id);
    public function getDocWithCate($id);
}
