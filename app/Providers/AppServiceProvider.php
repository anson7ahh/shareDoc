<?php

namespace App\Providers;

use App\Services\File\FileService;
use Illuminate\Support\ServiceProvider;
use App\Services\Category\CategoryService;
use App\Services\File\FileServiceImplement;
use App\Repositories\Category\CategoryRepository;
use App\Repositories\Document\DocumentRepository;
use App\Services\Category\CategoryServiceImplement;
use App\Repositories\Category\CategoryRepositoryImplement;
use App\Repositories\Document\DocumentRepositoryImplement;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->bind(DocumentRepository::class, DocumentRepositoryImplement::class);
        $this->app->bind(FileService::class, FileServiceImplement::class);

        $this->app->bind(CategoryRepository::class, CategoryRepositoryImplement::class);
        $this->app->bind(CategoryService::class, CategoryServiceImplement::class);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
