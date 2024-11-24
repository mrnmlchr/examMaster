<?php

use App\http\Controllers\PostController;
use App\http\Controllers\ModuleController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ShareController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DashboardController;
use Inertia\Inertia;
use App\Http\Controllers\Profile;
use App\Models\Module;

Route::get('data', [Profile::class,
     'fetchData'
     
]);


Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware('auth')->group(function () {
    Route::get('/module', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/module', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/module', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('/module', function () {
    return Inertia::render('Module/Index'); // This is where you render the index.jsx page
})->name('module.index');

Route::get('/module/show',[ModuleController::class,'index']);

Route::get('/modules',[ModuleController::class,'modules']);

Route::post('/uploadModule',[ModuleController::class,'store']);
Route::delete('/module/delete/{id}', [ModuleController::class, 'delete']);
Route::get('/searchModules', [ModuleController::class, 'search']);


// Dashboard stats route
Route::get('/dashboard/modules', [DashboardController::class, 'getDashboardStats']);





Route::get('/show',[ModuleController::class,'showmodules']);

Route::get('/download/{file}',[ModuleController::class,'download']);

Route::get('/view/{is}',[ModuleController::class,'view']);



// Add this to your API routes
Route::post('/modules', [ModuleController::class, 'store'])->name('modules.store');




Route::resource('share', ShareController::class)
    ->only(['index', 'store', 'update', 'destroy'])
    ->middleware(['auth', 'verified']);

require __DIR__.'/auth.php';

// Route::get('/', function(){

//     return view('app');
  
//   });
  
  //with address
  Route::get('/welcome', function(){
  
  return view('app');
  
  });
  
  
 //Return a header
  
  Route::get('/header', function(){
  
  return response('<h1></h1>');
  
  });
  
 //Return content type, route with Response
  
  Route::get('/header', function(){
  
  return response('<h1></h1>')
  -> header ('Content-Type','text/plain')
  ->header ('foo','bar');
  });
 
 //Route with parameter

  Route::resource('/poste', PostController::class)
  ->only(['index', 'store'])
  ->middleware(['auth', 'verified']);

