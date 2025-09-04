<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PollController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

// Route::get('/dashboard', function () {
//     return Inertia::render('Dashboard');
// })->middleware(['auth', 'verified'])->name('dashboard');

Route::post('/voter/login', [PollController::class, 'voterLogin'])->name('voter.login');

Route::middleware(['auth:participant'])->group(function () {
    Route::get('/poll', [PollController::class, 'indexPoll'])->name('poll.index');
    Route::post('/poll/submit', [PollController::class, 'submitVote'])->name('poll.submit');
});

Route::get('/poll/finish', [PollController::class, 'finishVote'])->name('poll.finish');


Route::middleware('auth')->group(function () {
    Route::get('/dashboard', [PollController::class, 'dashboard'])->name('dashboard');
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
