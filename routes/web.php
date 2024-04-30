<?php

use Illuminate\Support\Facades\Route;

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
  return redirect()->route('student');
})->name('home');

//Route::get('/booking', function () {
//    return view('booking1');
//})->name('booking');

//Auth::routes();

Route::get('/register', function () {
    return view('errors.404');
})->name('register');

 Route::view('/about/privacy-policy', 'privacy')->name('privacy');
 Route::view('/about/terms', 'terms')->name('terms');

 //Route::view('/', 'home')->name('dashboard');
 Route::view('/auth/login', 'home')->name('user_login');
 Route::view('/auth/{path2?}', 'home');
 Route::view('/student/{path2?}', 'home')->name('student');
 Route::view('/student/{path2?}/{path3?}', 'home');
 Route::view('/student/{path2?}/{path3?}/{path4?}', 'home');
 Route::view('/student/{path2?}/{path3?}/{path4?}/{path5?}', 'home');

 Route::view('admin/{path2?}', 'home');
 Route::view('/admin/{path2?}/{path3?}', 'home');
 Route::view('/admin/{path2?}/{path3?}/{path4?}', 'home');
 Route::view('/admin/{path2?}/{path3?}/{path4?}/{path5?}', 'home');
//Route::get('/home', 'HomeController@index')->name('home');
