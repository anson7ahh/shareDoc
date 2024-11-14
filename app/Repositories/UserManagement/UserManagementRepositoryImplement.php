<?php

namespace App\Repositories\UserManagement;

use App\Models\User;
use App\Models\UserManagement;
use Illuminate\Support\Facades\Cache;
use LaravelEasyRepository\Implementations\Eloquent;

class UserManagementRepositoryImplement extends Eloquent implements UserManagementRepository
{

    /**
     * Model class to be used in this repository for the common methods inside Eloquent
     * Don't remove or change $this->model variable name
     * @property Model|mixed $model;
     */
    protected $model;

    public function __construct(User $model)
    {
        $this->model = $model;
    }

    public function getAllUsers($data)
    {
        $page = $data->page; // Sử dụng request để lấy số trang
        $perPage = $data->perPage;
        // Tạo khóa cache dựa trên số trang để đảm bảo phân trang đúng
        $cacheKey = "users_page_{$page}_perPage_{$perPage}";

        // Thời gian cache (ví dụ: 60 phút)
        $cacheExpiration = 60;

        // Sử dụng cache để lưu dữ liệu phân trang
        return Cache::remember($cacheKey, $cacheExpiration, function () use ($perPage) {
            return $this->model->paginate($perPage);
        });;
    }
}
