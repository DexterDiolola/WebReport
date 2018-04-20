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
		controller: "dashboardControllerPD"			/*PD -> perDay, PW -> perWeek, PM -> perMonth*/
	})
	.when('/admin/dashboard-perDay',{
		templateUrl: "templates/dashboard.php",
		controller: "dashboardControllerPD"
	})
	.when('/admin/dashboard-perWeek',{
		templateUrl: "templates/dashboard.php",
		controller: "dashboardControllerPW"
	})
	.when('/admin/dashboard-perMonth',{
		templateUrl: "templates/dashboard.php",
		controller: "dashboardControllerPM"
	})

	//SUMMARIES (REPORTS) SECTION	
	.when('/admin/reports/Summary-perDay',{
		templateUrl: "templates/reports.php",
		controller: "reportsControllerPD"
	})
	.when('/admin/reports/Summary-perWeek',{
		templateUrl: "templates/reports.php",
		controller: "reportsControllerPW"
	})
	.when('/admin/reports/Summary-perMonth',{
		templateUrl: "templates/reports.php",
		controller: "reportsControllerPM"
	})
	
	//CHARTS SECTION
	.when('/admin/reports/Charts-perDay',{
		templateUrl: "templates/graphs.php",
		controller: "chartsControllerPD"
	})
	.when('/admin/reports/Charts-perWeek',{
		templateUrl: "templates/graphs.php",
		controller: "chartsControllerPW"
	})
	.when('/admin/reports/Charts-perMonth',{
		templateUrl: "templates/graphs.php",
		controller: "chartsControllerPM"
	})

	//PERMAC SECTION
	.when('/admin/reports/PerMac-perDay',{
		templateUrl: "templates/permac.php",
		controller: "perMacControllerPD"
	})
	.when('/admin/reports/PerMac-perWeek',{
		templateUrl: "templates/permac.php",
		controller: "perMacControllerPW"
	})
	.when('/admin/reports/PerMac-perMonth',{
		templateUrl: "templates/permac.php",
		controller: "perMacControllerPM"
	})

	//PERMAC-ACTIVITY SECTION
	.when('/admin/reports/PerMac-perDay/macs?:mac',{
		templateUrl: "templates/permac.php",
		controller: "permacActivityPD"
	})
	.when('/admin/reports/PerMac-perWeek/macs?:mac',{
		templateUrl: "templates/permac.php",
		controller: "permacActivityPW"
	})
	.when('/admin/reports/PerMac-perMonth/macs?:mac',{
		templateUrl: "templates/permac.php",
		controller: "permacActivityPM"
	})

	//CHARTS PERMAC ACTIVITY SECTION
	.when('/admin/reports/Charts-perDay/macs?:mac',{
		templateUrl: "templates/graphs.php",
		controller: "chartsPermacActPD"
	})
	.when('/admin/reports/Charts-perWeek/macs?:mac',{
		templateUrl: "templates/graphs.php",
		controller: "chartsPermacActPW"
	})
	.when('/admin/reports/Charts-perMonth/macs?:mac',{
		templateUrl: "templates/graphs.php",
		controller: "chartsPermacActPM"
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
		controller: "userDashboardPD"			/*PD -> perDay, PW -> perWeek, PM -> perMonth*/
	})
	.when('/user/dashboard-perDay',{
		templateUrl: "templates/dashboard.php",
		controller: "userDashboardPD"
	})
	.when('/user/dashboard-perWeek',{
		templateUrl: "templates/dashboard.php",
		controller: "userDashboardPW"
	})
	.when('/user/dashboard-perMonth',{
		templateUrl: "templates/dashboard.php",
		controller: "userDashboardPM"
	})

	//SUMMARIES (REPORTS) SECTION	
	.when('/user/reports/Summary-perDay',{
		templateUrl: "templates/reports.php",
		controller: "userReportsPD"
	})
	.when('/user/reports/Summary-perWeek',{
		templateUrl: "templates/reports.php",
		controller: "userReportsPW"
	})
	.when('/user/reports/Summary-perMonth',{
		templateUrl: "templates/reports.php",
		controller: "userReportsPM"
	})

	//CHARTS SECTION
	.when('/user/reports/Charts-perDay',{
		templateUrl: "templates/graphs.php",
		controller: "userChartsPD"
	})
	.when('/user/reports/Charts-perWeek',{
		templateUrl: "templates/graphs.php",
		controller: "userChartsPW"
	})
	.when('/user/reports/Charts-perMonth',{
		templateUrl: "templates/graphs.php",
		controller: "userChartsPM"
	})

	//PERMAC SECTION
	.when('/user/reports/PerMac-perDay',{
		templateUrl: "templates/permac.php",
		controller: "userPermacPD"
	})
	.when('/user/reports/PerMac-perWeek',{
		templateUrl: "templates/permac.php",
		controller: "userPermacPW"
	})
	.when('/user/reports/PerMac-perMonth',{
		templateUrl: "templates/permac.php",
		controller: "userPermacPM"
	})

	//PERMAC-ACTIVITY SECTION
	.when('/user/reports/PerMac-perDay/macs?:mac',{
		templateUrl: "templates/permac.php",
		controller: "userPermacActivityPD"
	})
	.when('/user/reports/PerMac-perWeek/macs?:mac',{
		templateUrl: "templates/permac.php",
		controller: "userPermacActivityPW"
	})
	.when('/user/reports/PerMac-perMonth/macs?:mac',{
		templateUrl: "templates/permac.php",
		controller: "userPermacActivityPM"
	})

	//CHARTS PERMAC ACTIVITY SECTION
	.when('/user/reports/Charts-perDay/macs?:mac',{
		templateUrl: "templates/graphs.php",
		controller: "userChartsPermacActPD"
	})
	.when('/user/reports/Charts-perWeek/macs?:mac',{
		templateUrl: "templates/graphs.php",
		controller: "userChartsPermacActPW"
	})
	.when('/user/reports/Charts-perMonth/macs?:mac',{
		templateUrl: "templates/graphs.php",
		controller: "userChartsPermacActPM"
	})

	
}]);

	


/*	USING ROUTE PARAMETER
.when('/graphs/:id',{
		templateUrl: "templates/graphs.php",
		controller: "totalActive"
	})
*/
