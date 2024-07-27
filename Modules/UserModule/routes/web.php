<?php

use Illuminate\Support\Facades\Route;
use Modules\UserModule\App\Http\Controllers\UploadController;
use Modules\UserModule\App\Http\Controllers\UserModuleController;

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

Route::group([], function () {
    Route::resource('usermodule', UserModuleController::class)->names('usermodule');
});

Route::prefix('/')->middleware('cors')->group(function () {
   Route::get('upload',[UploadController::class,'index'])->name('upload.index');
});
