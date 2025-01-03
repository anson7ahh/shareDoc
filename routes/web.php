<?php


use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\User\FileController;
use App\Http\Controllers\User\HomeController;
use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\User\CommentController;
use App\Http\Controllers\User\ProfileController;
use App\Http\Controllers\User\DownloadController;
use App\Http\Controllers\User\CollectionController;
use App\Http\Controllers\User\FileDetailController;
use App\Http\Controllers\Admin\UserManagementController;
use App\Http\Controllers\USer\CollectionUploadController;
use App\Http\Controllers\Auth\AuthenticateProviderController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Route::get('/', function () {
//     return Inertia::render('Welcome', [
//         // 'canLogin' => Route::has('login'),
//         // 'canRegister' => Route::has('register'),
//         // 'laravelVersion' => Application::VERSION,
//         // 'phpVersion' => PHP_VERSION,

//     ]);
// })->name('home');

Route::prefix('/')->group(function () {
    Route::get('/', [HomeController::class, 'index']);
    Route::get('doc-cat/{id}', [HomeController::class, 'show'])->middleware('filter');
});
Route::prefix('/upload')->group(function () {
    Route::get('/', [FileController::class, 'index']);
    Route::post('/', [FileController::class, 'store'])->name('upload.store');
    Route::get('/{id}', [FileController::class, 'show'])->name('upload.show');
    Route::post('/{document_id}', [FileController::class, 'update']);
});



Route::prefix('/document/{id}/{slug}.{format}')->group(function () {
    Route::get('/', [FileDetailController::class, 'index']);
});
Route::prefix('/comment')->group(function () {
    Route::post('/', [CommentController::class, 'store']);
    Route::post('/{commentId}', [CommentController::class, 'create']);
});
Route::prefix('/download')->group(function () {

    Route::post('/', [DownloadController::class, 'store']);
    Route::get('/uploaded', [DownloadController::class, 'store'])->name('store');
});
Route::prefix('/auth/{provider}')->middleware('cors')->group(function () {
    Route::get('/redirect', [AuthenticateProviderController::class, 'redirect']);
    Route::get('/callback', [AuthenticateProviderController::class, 'callback']);
});
Route::prefix('/collection')->group(function () {
    Route::get('/', [CollectionController::class, 'index'])->name('collection.index');
    Route::get('/{documentId}', [CollectionController::class, 'show']);
    Route::delete('/{id}', [CollectionUploadController::class, 'destroy']);
});
Route::middleware('auth')->group(function () {

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::prefix('admin')->middleware('auth.admin')->group(function () {
    Route::get('/dashboard', [AdminController::class, 'index'])->name('admin.dashboard');
    Route::get('/userManagement', [UserManagementController::class, 'store'])->name('admin.userManagement');
});




require __DIR__ . '/auth.php';
