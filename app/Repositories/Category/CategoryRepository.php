<?php

namespace App\Repositories\Category;

use LaravelEasyRepository\Repository;

interface CategoryRepository extends Repository
{

    public function allRootCategory();
    public function allCategoryChildren($id);
    public function DocCate($id);
    public function findCategory($id);
}
