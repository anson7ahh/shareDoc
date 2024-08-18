<?php


use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Auth\AuthenticateProviderController;
use App\Http\Controllers\User\UploadController;
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

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,

    ]);
})->name('home');

Route::prefix('/upload')->group(function () {
    Route::get('/', [UploadController::class, 'index']);
    Route::post('/{name}', [UploadController::class, 'store'])->name('upload.store');
    Route::get('/{id}', [UploadController::class, 'show'])->name('upload.show');
    Route::post('/{id}', [UploadController::class, 'create'])->name('upload.create');
});



Route::prefix('/auth/{provider}')->middleware('cors')->group(function () {
    Route::get('/redirect', [AuthenticateProviderController::class, 'redirect']);
    Route::get('/callback', [AuthenticateProviderController::class, 'callback']);
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
