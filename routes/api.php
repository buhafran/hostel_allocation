<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
Route::group([
    'prefix' => 'auth'
], function () {

    Route::group([
      'middleware' => 'auth:api'
    ], function() {
    //	Route::post('create', 'AuthController@create');

        Route::get('user', 'AuthController@user');
Route::put('user/changepassword', 'UsersController@changepassword')->name('users.updatepassword');

    });
});





Route::group([
  'prefix' => 'v1/admin', 
  'as' => 'api.', 
  'namespace' => 'api\v1\admin', 

], function () {
    Route::post('/auth/login', 'AuthController@login')->name('api2.login');
  



Route::group(['middleware' => ['auth:api','is_admin']],function(){

Route::get('auth/user', function (Request $request) {
    return $request->user();
});
Route::post('/auth/logout', 'AuthController@logout')->name('api.logout');
Route::get('/allocations', 'AllocationController@index')->name('allocation.all');
Route::get('/transactions', 'RegRegistrationController@index')->name('transactions.all');
Route::get('/bulding_summary', 'AllocationController@bulding_summary')->name('allocation.bsummary');
Route::put('/changepassword', 'UsersController@changepassword')->name('users.updatepassword');






Route::get('/files{id}', 'PictureController@show')->name('picture.one');
Route::post('/files', 'PictureController@store')->name('picture.create');
Route::post('/product_pictures', 'PictureController@store')->name('picture.create');
Route::put('/files/{id}', 'PictureController@update')->name('picture.update');
Route::delete('/files/{id}', 'PictureController@destroy')->name('picture.delete');
Route::delete('/product_pictures/{id}', 'PictureController@destroy')->name('picture.delete');

Route::put('/product_pictures', 'PictureController@makeProductDefaultPicture')->name('picture.update1');


Route::get('/products', 'ProductController@index')->name('product.all');
Route::get('/products/{id}', 'ProductController@show')->name('product.one');
Route::post('/products', 'ProductController@store')->name('product.create');
Route::put('/products/{id}', 'ProductController@update')->name('product.update');
Route::delete('/products/{id}', 'ProductController@destroy')->name('product.delete');



Route::get('/payments', 'PaymentController@index')->name('payment.all');
Route::get('/payments/{id}', 'PaymentController@show')->name('payment.one');
//Route::post('/payments', 'PaymentController@store')->name('payment.create');
//Route::put('/payments/{id}', 'PaymentController@update')->name('payment.update');
Route::delete('/payments/{id}', 'PaymentController@destroy')->name('payment.delete');


Route::get('/payment/refund', 'RefundController@index')->name('refund.all');
Route::get('/payment/refund/{id}', 'RefundController@show')->name('refund.one');
Route::post('/payment/refund', 'RefundController@store')->name('refund.create');
Route::put('/payment/refund/{id}', 'RefundController@update')->name('refund.update');
Route::delete('/payment/refund/{id}', 'RefundController@destroy')->name('refund.delete');



Route::get('/user/myactivity', 'LogController@myactivity')->name('logs.all');
Route::get('/user/activities', 'LogController@index')->name('logs.all');
Route::get('/user/activities/{id}', 'LogController@show')->name('logs.one');


Route::get('/product_models', 'ProductModelController@index')->name('product_model.all');
Route::get('/product_models/{id}', 'ProductModelController@show')->name('product_model.one');
Route::post('/product_models', 'ProductModelController@store')->name('product_model.create');
Route::put('/product_models/{id}', 'ProductModelController@update')->name('product_model.update');
Route::delete('/product_models/{id}', 'ProductModelController@destroy')->name('product_model.delete');

Route::get('/users', 'UsersController@index')->name('users.all');
Route::get('/users/{id}', 'UsersController@show')->name('users.one');
Route::post('/users', 'UsersController@store')->name('users.create');
Route::put('/users/{id}', 'UsersController@update')->name('users.update');
Route::delete('/users/{id}', 'UsersController@destroy')->name('users.delete');

Route::put('/users/{id}/changepassword', 'UsersController@changepasswordAdmin')->name('users.changepassword');

Route::get('/stats/dashboard_summary', 'DashboardController@dashboard_summary')->name('dashboard.dashboard_summary');



//Driver Views



});

});





Route::group([
  'prefix' => 'v1/student', 
  'as' => 'api.students', 
  'namespace' => 'api\v1\student', 
 // 'middleware'=>'cors'
], function () {
    Route::post('/auth/register', 'StudentController@register')->name('api.registers');
    Route::post('/auth/login', 'UserStudentController@login')->name('api.userlogin');
    Route::post('/registration/spill', 'SpillRegistration@RegisterStudent')->name('api.reg');
    Route::get('/registration/spill/getstatus', 'SpillRegistration@getStudentDetailsGet')->name('api.regpay');
    Route::get('/registration/services', 'ServiceTypeController@index')->name('api.services');
  


    Route::get('/products', 'ProductGetterController@getProducts')->name('prod.alll');

   


    Route::get('/products/{id}', 'ProductGetterController@getProduct')->name('prod.alll');

    Route::post('/auth/reset_password', 'UserCustomerController@resetPassword')->name('api.rpass');




    //secured routes
   Route::group(['middleware' => ['auth:student']],function(){

 Route::get('/get_reservation', 'ReservationController@getReservations')->name('prod.cat');
 Route::post('/reserve_room', 'ReservationController@reserve_room')->name('room.reserve');
 Route::get('/get_rooms_available', 'ReservationController@stats')->name('room.reserve');
 Route::get('/assign_bed', 'ReservationController@assign_bed')->name('room.assign');
  Route::put('/auth/user', 'UserStudentController@update')->name('api.user');
    Route::post('/auth/logout', 'UserStudentController@logout')->name('api.logout');
       Route::put('/auth/user/changepassword', 'UserStudentController@changepassword')->name('use.updatepassword');

  Route::get('/auth/user', 'UserStudentController@user')->name('api.user');

     Route::post('/user/order', 'OrderController@store')->name('api.orders');
    Route::get('/user/order', 'OrderController@index')->name('api.orders.all');
    Route::get('/user/order/{id}', 'OrderController@show')->name('api.orders.one');
    Route::put('/user/order/{id}', 'OrderController@update')->name('api.orders.update');



    Route::post('/user/address', 'CustomerAddressController@store')->name('api.useraddress');
    Route::get('/user/address', 'CustomerAddressController@index')->name('api.useraddress.all');
    Route::get('/user/address/{id}', 'CustomerAddressController@show')->name('api.useraddress.one');
    Route::put('/user/address/{id}', 'CustomerAddressController@update')->name('api.useraddress.update');

    Route::post('/user/favourite_product', 'FavouriteProductController@store')->name('api.fav');
    Route::get('/user/favourite_product', 'FavouriteProductController@index')->name('api.fav.all');
    Route::get('/user/favourite_product/{id}', 'FavouriteProductController@show')->name('api.fav.one');
    Route::put('/user/favourite_product/{id}', 'FavouriteProductController@update')->name('api.fav.update');
    Route::delete('/user/favourite_product/{id}', 'FavouriteProductController@destroy')->name('api.fav.delete');



    Route::post('/auth/token', 'UserCustomerController@verifySMSToken')->name('api.tokenv');

    
    Route::post('/auth/resend_token', 'UserCustomerController@resendToken')->name('api.token');


    //products
  });
});