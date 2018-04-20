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
	Route::get('/dashboard-perDay', 'Admin\AdminController@reports');
	Route::get('/dashboard-perWeek', 'Admin\AdminController@reports');
	Route::get('/dashboard-perMonth', 'Admin\AdminController@reports');

	Route::get('/reports/Summary-perDay', 'Admin\AdminController@reports');
	Route::get('/reports/Summary-perWeek', 'Admin\AdminController@reports');
	Route::get('/reports/Summary-perMonth', 'Admin\AdminController@reports');

	Route::get('/reports/Charts-perDay', 'Admin\AdminController@reports');
	Route::get('/reports/Charts-perWeek', 'Admin\AdminController@reports');
	Route::get('/reports/Charts-perMonth', 'Admin\AdminController@reports');

	Route::get('/reports/PerMac-perDay', 'Admin\AdminController@reports');
	Route::get('/reports/PerMac-perWeek', 'Admin\AdminController@reports');
	Route::get('/reports/PerMac-perMonth', 'Admin\AdminController@reports');

	Route::get('/reports/PerMac-perDay/macs{mac?}', 'Admin\AdminController@reports');
	Route::get('/reports/PerMac-perWeek/macs{mac?}', 'Admin\AdminController@reports');
	Route::get('/reports/PerMac-perMonth/macs{mac?}', 'Admin\AdminController@reports');

	Route::get('/reports/Charts-perDay/macs{mac?}', 'Admin\AdminController@reports');
	Route::get('/reports/Charts-perWeek/macs{mac?}', 'Admin\AdminController@reports');
	Route::get('/reports/Charts-perMonth/macs{mac?}', 'Admin\AdminController@reports');

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
	Route::get('/dashboard-perDay', 'User\UserController@reports');
	Route::get('/dashboard-perWeek', 'User\UserController@reports');
	Route::get('/dashboard-perMonth', 'User\UserController@reports');

	Route::get('/reports/Summary-perDay', 'User\UserController@reports');
	Route::get('/reports/Summary-perWeek', 'User\UserController@reports');
	Route::get('/reports/Summary-perMonth', 'User\UserController@reports');

	Route::get('/reports/Charts-perDay', 'User\UserController@reports');
	Route::get('/reports/Charts-perWeek', 'User\UserController@reports');
	Route::get('/reports/Charts-perMonth', 'User\UserController@reports');

	Route::get('/reports/PerMac-perDay', 'User\UserController@reports');
	Route::get('/reports/PerMac-perWeek', 'User\UserController@reports');
	Route::get('/reports/PerMac-perMonth', 'User\UserController@reports');

	Route::get('/reports/PerMac-perDay/macs{mac?}', 'User\UserController@reports');
	Route::get('/reports/PerMac-perWeek/macs{mac?}', 'User\UserController@reports');
	Route::get('/reports/PerMac-perMonth/macs{mac?}', 'User\UserController@reports');

	Route::get('/reports/Charts-perDay/macs{mac?}', 'User\UserController@reports');
	Route::get('/reports/Charts-perWeek/macs{mac?}', 'User\UserController@reports');
	Route::get('/reports/Charts-perMonth/macs{mac?}', 'User\UserController@reports');
});


//API ROUTES
Route::get('/addStat', 'apiController@addStat');
Route::get('/addStat2', 'apiController@addStat');
Route::get('/addTrackInfo', 'apiController@addTrackInfo');
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

	Route::get('/get-active-macs-user', 'apiController@getActiveMacsUser');
	Route::get('/macs-per-trend-user', 'apiController@macsPerTrendUser');
	Route::get('/max-per-trend-user', 'apiController@maxPerTrendUser');
});


Route::any('{path?}', function()
{
    return view("error");
})->where("path", ".+");
