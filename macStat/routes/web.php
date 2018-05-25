<?php

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

Route::group(['prefix' => 'admin'], function(){
	/*Route::get('/register', 'Admin\LoginController@showRegisterForm');
	Route::post('/register', 'Admin\LoginController@register')->name('admin-register');*/
	Route::get('/login', 'Admin\AdminLoginController@showLoginForm')->name('admin.login');
	Route::post('/login', 'Admin\AdminLoginController@login')->name('admin.login.submit');
	Route::post('logout', 'Admin\AdminLoginController@logout')->name('admin.logout');
	Route::get('/reports', 'Admin\AdminController@reports')->name('admin.reports');

	Route::get('/dashboard', 'Admin\AdminController@reports')->name('admin.dashboard');
	Route::get('/reports/summaries', 'Admin\AdminController@reports');
	Route::get('/reports/charts', 'Admin\AdminController@reports');	
	Route::get('/reports/permac', 'Admin\AdminController@reports');
	Route::get('/reports/permac/macs{mac?}', 'Admin\AdminController@reports');
	Route::get('/reports/charts/macs{mac?}', 'Admin\AdminController@reports');


	Route::get('/administration/add-mac-label', 'Admin\AdminController@reports');
	Route::get('/administration/assign-mac', 'Admin\AdminController@reports');
	Route::get('/administration/maps', 'Admin\AdminController@reports');

});

Route::group(['prefix' => 'user'], function(){
	Route::get('/register', 'User\UserLoginController@showRegisterForm');
	Route::post('/register', 'User\UserLoginController@register')->name('user.register.submit');
	Route::get('/login', 'User\UserLoginController@showLoginForm')->name('user.login');
	Route::post('/login', 'User\UserLoginController@login')->name('user.login.submit');
	Route::post('/logout', 'User\UserLoginController@logout')->name('user.logout');
	Route::get('/reports', 'User\UserController@reports')->name('user.reports');

	Route::get('/dashboard', 'User\UserController@reports')->name('user.dashboard');
	Route::get('/reports/summaries', 'User\UserController@reports');
	Route::get('/reports/charts', 'User\UserController@reports');
	Route::get('/reports/permac', 'User\UserController@reports');
	Route::get('/reports/permac/macs{mac?}', 'User\UserController@reports');
	Route::get('/reports/charts/macs{mac?}', 'User\UserController@reports');

});


//API ROUTES
Route::get('/addStat', 'apiController@addStat');
Route::get('/addStat2', 'apiController@addStat');
Route::get('/addViews', 'apiController@addViews');
Route::group(['prefix' => 'api'], function(){
	Route::get('/get-active-macs', 'apiController@getActiveMacs');
	Route::get('/macs-per-trend', 'apiController@macsPerTrend');
	Route::get('/max-per-trend', 'apiController@maxPerTrend');
	Route::get('/permac-activity', 'apiController@permacActivity');
	Route::get('/search/{mac}', 'apiController@searchMac');
	Route::get('/add-mac-label', 'apiController@addMacLabel');
	Route::get('/mac-administration', 'apiController@macAdministration');
	
	Route::get('/package-summary', 'apiController@packageSummary');
	Route::post('/package-summary', 'apiController@modPackages');
	Route::get('/max-of-packages', 'apiController@maxOfPackages');
	Route::get('/package-chart', 'apiController@packageChart');
	
	Route::get('/alerts', 'apiController@alerts');
	Route::post('/send-alerts', 'apiController@sendAlerts');
	Route::post('/set-alert-values', 'apiController@setAlertValues');
	Route::get('/get-views', 'apiController@getViews');

	Route::get('/get-active-macs-user', 'apiController@getActiveMacsUser');
	Route::get('/macs-per-trend-user', 'apiController@macsPerTrendUser');
	Route::get('/max-per-trend-user', 'apiController@maxPerTrendUser');
});


Route::any('{path?}', function()
{
    return view("error");
})->where("path", ".+");
