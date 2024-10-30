<?php

namespace App\Repositories\Category;

use App\Models\Category;
use App\Builders\DocCateBuilder;
use Illuminate\Pagination\LengthAwarePaginator;
use LaravelEasyRepository\Implementations\Eloquent;

class CategoryRepositoryImplement extends Eloquent  implements CategoryRepository
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

    //paginate with category leaf
    public function paginateLeaf($id)
    {
        $queryBuilder = new DocCateBuilder();
        $results =  $queryBuilder
            ->selectFields()
            ->where('categories.id', '=', $id)
            ->GroupBy()
            ->paginate(10);
        return $results;
    }
    public function findCategory($id)
    {
        return $this->model->find($id);
    }

    public function paginate($ImmediateDescendants)
    {
        $docCate = [];
        foreach ($ImmediateDescendants as $ImmediateDescendant) {
            $queryBuilder = new DocCateBuilder();
            $collection = $queryBuilder
                ->selectFields()
                ->where('categories.id', '=', $ImmediateDescendant->id)
                ->GroupBy()
                ->get();
            $docCate[] = $collection;
        }
        // Làm phẳng mảng
        $flattenedArray = collect($docCate)->flatten();
        return $flattenedArray;
    }
}
