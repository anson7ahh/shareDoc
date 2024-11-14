<?php

namespace App\Repositories\Category;

use App\Models\Category;
use App\Builders\DocCateBuilder;
use Illuminate\Support\Facades\Redis;
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
        $cacheKey = 'all_root_categories';

        // Kiểm tra xem dữ liệu có tồn tại trong Redis hay không
        if (Redis::exists($cacheKey)) {
            // Lấy dữ liệu từ Redis
            return json_decode(Redis::get($cacheKey), true);
        }

        // Nếu không có trong cache, lấy dữ liệu từ database
        $categories = $this->model::roots()->select('id', 'name', 'parent_id')->get();

        // Lưu dữ liệu vào Redis với thời gian hết hạn là 1 giờ (3600 giây)
        Redis::set($cacheKey, $categories->toJson());
        Redis::expire($cacheKey, 3600);

        return $categories;
    }
    public function allCategoryChildren($id)
    {
        $cacheKey = "category_children_{$id}";

        // Kiểm tra xem dữ liệu đã có trong Redis chưa
        if (Redis::exists($cacheKey)) {
            // Lấy dữ liệu từ Redis
            return json_decode(Redis::get($cacheKey), true);
        }

        // Nếu chưa có trong cache, lấy từ database
        $categoryParent = $this->find($id);
        $children = $categoryParent ? $categoryParent->children()->get() : null;

        // Lưu dữ liệu vào Redis nếu có danh mục con
        if ($children) {
            Redis::set($cacheKey, $children->toJson());
            Redis::expire($cacheKey, 3600); // Thiết lập thời gian tồn tại là 1 giờ (3600 giây)
        }

        return $children;
    }

    //paginate with category leaf
    public function paginateLeaf($id)
    {
        $cacheKey = "doc_categories_{$id}_page_1"; // Key cho trang đầu tiên (có thể thay đổi trang khi cần)

        // Kiểm tra xem cache đã có dữ liệu chưa
        if (Redis::exists($cacheKey)) {
            // Lấy dữ liệu từ Redis nếu có
            $results = json_decode(Redis::get($cacheKey), true);
        } else {
            // Nếu chưa có trong cache, thực hiện truy vấn
            $queryBuilder = new DocCateBuilder();
            $results = $queryBuilder
                ->selectFields()
                ->where('categories.id', '=', $id)
                ->groupBy()
                ->paginate(10);

            // Lưu kết quả vào Redis
            Redis::set($cacheKey, $results->toJson());
            Redis::expire($cacheKey, 3600);
        }

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
                ->where('documents.deleted_at', '=', null)
                ->GroupBy()
                ->get();
            $docCate[] = $collection;
        }
        // Làm phẳng mảng
        $flattenedArray = collect($docCate)->flatten();
        return $flattenedArray;
    }
}
