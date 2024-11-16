<?php

namespace App\Providers;


use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\ServiceProvider;
use App\Services\Category\CategoryService;
use App\Services\Document\DocumentService;

use App\Repositories\Category\CategoryRepository;
use App\Repositories\Document\DocumentRepository;
use App\Services\Category\CategoryServiceImplement;
use App\Services\Document\DocumentServiceImplement;
use App\Services\UserManagement\UserManagementService;
use App\Repositories\Category\CategoryRepositoryImplement;
use App\Repositories\Document\DocumentRepositoryImplement;
use App\Services\UserManagement\UserManagementServiceImplement;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->bind(DocumentRepository::class, DocumentRepositoryImplement::class);
        $this->app->bind(DocumentService::class, DocumentServiceImplement::class);
        $this->app->bind(CategoryRepository::class, CategoryRepositoryImplement::class);
        $this->app->bind(CategoryService::class, CategoryServiceImplement::class);
        $this->app->bind(UserManagementService::class, UserManagementServiceImplement::class);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
    }
}
