<?php

namespace App\Repositories\Category;

use App\Builders\CateBuilder;
use LaravelEasyRepository\Implementations\Eloquent;
use App\Models\Category;

class CategoryRepositoryImplement extends Eloquent implements CategoryRepository
{

    /**
     * Model class to be used in this repository for the common methods inside Eloquent
     * Don't remove or change $this->model variable name
     * @property Model|mixed $model;
     */
    protected $model;

    public function __construct(Category $category)
    {
        $this->model = $category;
    }

    public function allRootCategory()
    {
        return $this->model::roots()->select('id', 'name', 'parent_id')->get();
    }
    public function allCategoryChildren($id)
    {
        $categoryParent = $this->find($id);
        return $categoryParent ? $categoryParent->children()->get() : null;
    }
    public function DocCate($id)
    {
        $queryBuilder = new CateBuilder();
        $results =  $queryBuilder
            ->joinDocCates()
            ->joinDocuments()
            ->selectFields()
            ->where('categories.id', '=', $id)
            ->get();
        return $results;
    }
    public function findCategory($id)
    {
        $category = $this->model->find($id);
        return $category ? $category : null;
    }
}
