<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('/register', [App\Http\Controllers\RegisterController::class, 'register']);
Route::post('/login',    [App\Http\Controllers\LoginController::class,  'login']);
Route::get('/register/verify/{token}', [App\Http\Controllers\RegisterController::class, 'verify']);


Route::middleware('auth:sanctum')->group(function () {
    Route::prefix('pengajuan')->group(function () {
        Route::get('/', [App\Http\Controllers\PengajuanController::class, 'index']);       // List semua pengajuan
        Route::post('/', [App\Http\Controllers\PengajuanController::class, 'store']);       // Buat pengajuan baru
        Route::get('/{id}', [App\Http\Controllers\PengajuanController::class, 'show']);     // Detail pengajuan
        Route::put('/{id}', [App\Http\Controllers\PengajuanController::class, 'update']);   // Update pengajuan
        Route::delete('/{id}', [App\Http\Controllers\PengajuanController::class, 'destroy']); // Hapus pengajuan
    });
});
