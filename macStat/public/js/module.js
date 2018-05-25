var macStats = angular.module('macStats',['ngRoute', 'ngAnimate']);

macStats.config(['$routeProvider', 
				 '$locationProvider', 
				 function($routeProvider,$locationProvider){

	$locationProvider.hashPrefix('');
    $locationProvider.html5Mode(true);
	$routeProvider
		
	//DASHBOARD SECTION
	.when('/admin/dashboard',{
		templateUrl: "templates/dashboard.php",
		controller: "dashboardController"			/*PD -> perDay, PW -> perWeek, PM -> perMonth*/
	})
	//SUMMARIES (REPORTS) SECTION
	.when('/admin/reports/summaries',{
		templateUrl: "templates/reports.php",
		controller: "reportsController"
	})	
	//CHARTS SECTION
	.when('/admin/reports/charts',{
		templateUrl: "templates/graphs.php",
		controller: "chartsController"
	})
	//PERMAC SECTION
	.when('/admin/reports/permac',{
		templateUrl: "templates/permac.php",
		controller: "permacController"
	})
	//PERMAC-ACTIVITY SECTION
	.when('/admin/reports/permac/macs?:mac',{
		templateUrl: "templates/permac.php",
		controller: "permacActivityController"
	})
	//CHARTS PERMAC ACTIVITY SECTION
	.when('/admin/reports/charts/macs?:mac',{
		templateUrl: "templates/graphs.php",
		controller: "chartsPermacActController"
	})
	
	//ADMINISTRATION SECTION
	.when('/admin/administration/add-mac-label',{
		templateUrl: "templates/add-mac-label.php",
		controller: "addMacLabel"
	})
	.when('/admin/administration/assign-mac',{
		templateUrl: "templates/assign-mac.php",
		controller: "assignMac"
	})
	.when('/admin/administration/maps',{
		templateUrl: "templates/maps.php",
		controller: "mapsController"
	})



	//USERS REPORTS SECTION

	//DASHBOARD SECTION
	.when('/user/dashboard',{
		templateUrl: "templates/dashboard.php",
		controller: "dashboardControllerUser"			/*PD -> perDay, PW -> perWeek, PM -> perMonth*/
	})
	//SUMMARIES (REPORTS) SECTION	
	.when('/user/reports/summaries',{
		templateUrl: "templates/reports.php",
		controller: "reportsControllerUser"
	})
	//CHARTS SECTION
	.when('/user/reports/charts',{
		templateUrl: "templates/graphs.php",
		controller: "chartsControllerUser"
	})
	//PERMAC SECTION
	.when('/user/reports/permac',{
		templateUrl: "templates/permac.php",
		controller: "permacControllerUser"
	})
	//PERMAC-ACTIVITY SECTION
	.when('/user/reports/permac/macs?:mac',{
		templateUrl: "templates/permac.php",
		controller: "permacActivityControllerUser"
	})
	//CHARTS PERMAC ACTIVITY SECTION
	.when('/user/reports/charts/macs?:mac',{
		templateUrl: "templates/graphs.php",
		controller: "chartsPermacActControllerUser"
	})

	
}]);

	


/*	USING ROUTE PARAMETER
.when('/graphs/:id',{
		templateUrl: "templates/graphs.php",
		controller: "totalActive"
	})
*/
