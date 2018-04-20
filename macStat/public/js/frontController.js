macStats.factory('myService',['$http', function($http){
	function packageSummary(trend, mac, nthDay){
		return $http({
			method: 'GET',
			url: '/api/package-summary?trend=' + trend + '&mac=' + mac + '&nthDay=' + nthDay 
		});
	}

	function maxOfPackages(cond){
		return $http({
			method: 'GET',
			url: '/api/max-of-packages?cond=' + cond
		});
	}

	//customFunction1 computes the packages dispensed by a mac address
	function packageDispense(object){
		//Declare objects storage
		var first = new Object(), last = new Object();
		//Get the 1st element of object parameter
		first = object[0];
		
		//Get the last element of object parameter
		var reverse = object.reverse();
		last = reverse[0];
		
		//Split the "packages" property of each object to become an array
		var fst = first.packages.split(",");
		var	lst = last.packages.split(",");
		
		//Apply Subtractions for each array element with integers
		//Note: When subtracting a numbered string to an integer, no need to use parseInt()
		fst[2] = fst[2] - lst[2];
		fst[4] = fst[4] - lst[4];
		fst[6] = fst[6] - lst[6];
		fst[8] = fst[8] - lst[8];
		fst[10] = fst[10] - lst[10];
		fst[12] = fst[12] - lst[12];
		fst[14] = fst[14] - lst[14];
		fst[16] = fst[16] - lst[16];
		//Error Trapping
		//Note: If the result of string subtraction is NaN then the result must be 0.
		!parseInt(fst[2],10) ? fst[2] = 0 : true;
		!parseInt(fst[4],10) ? fst[4] = 0 : true;
		!parseInt(fst[6],10) ? fst[6] = 0 : true;
		!parseInt(fst[8],10) ? fst[8] = 0 : true;
		!parseInt(fst[10],10) ? fst[10] = 0 : true;
		!parseInt(fst[12],10) ? fst[12] = 0 : true;
		!parseInt(fst[14],10) ? fst[14] = 0 : true;
		!parseInt(fst[16],10) ? fst[16] = 0 : true;
		
		//Store the final result of fst into new object. Store it to "packages" property and add "mac" propery.
		var obj = new Object();
		obj.mac = first.mac;
		obj.label = first.label;
		obj.packages = fst.splice(1).join(", ");
		obj.dateCreated = first.dateCreated;
			
		return obj;
	}

	//This function modifies the 'coords' property of json object parameter
	function modCoords(object){
		//Declare objects and array containers
		var getGps = new Object(), obj = new Object(), latlng=[];
		//If 'coords' property of object is equal to '' or 0 then satisfy the given statements below
		object.coords == '' || object.coords == 0 ? latlng = [0,0] : latlng = object.coords.split(",");

		//assign the array elements into child property of new object 'obj'
		
		object.mac == '6C3B6BEA2F54' || object.mac == '64D1542A38C0' || object.mac == 'D4CA6D95B636Dau'
		? (getGps.lat = parseFloat(latlng[1]),
		   getGps.lng = parseFloat(latlng[0]))
		: (getGps.lat = parseFloat(latlng[0]),
		   getGps.lng = parseFloat(latlng[1]));
			
		//assign the properties of object parameter into new object 'obj' including the child property
		obj.mac = object.mac;
		obj.site = object.label;
		obj.owner = object.owner;
		obj.coords = getGps;
		obj.coords2 = object.coords;
		return obj;
	}

	//customFunction2 initializes map setting
	function mapInit(obj, center){
		var options = {
			zoom: 11,
			center: center,
			gestureHandling: 'cooperative'
		}
		var map = new google.maps.Map(document.getElementById('map'), options);
		
		for(var x=0; x<obj.length; x++){
			addMarker(obj[x]);
					
		}
		
		function addMarker(obj){
			var marker = new google.maps.Marker({
				position: obj.coords,
					map: map
			});
			var infoWindow = new google.maps.InfoWindow({
				content: '<h6>' + obj.site + '</h6> </br>' +
						 '<b>' + obj.coords2 + '</b>'
			});

			marker.addListener('click', function(){
				infoWindow.open(map, marker);
			});
		}
	}

	return{
		getActiveMacs: function(trend, get, created){
			return $http({
				method: 'GET',
				url: '/api/get-active-macs?trend=' + trend + '&get=' + get + '&created=' + created
			});
		},
		macsPerTrend: function(trend){
			return $http({
				method: 'GET',
				url: '/api/macs-per-trend?trend=' + trend 
			});
		},
		maxPerTrend: function(trend, get, created){
			return $http({
				method: 'GET',
				url: '/api/max-per-trend?trend=' + trend + '&get=' + get + '&created=' + created
			});
		},
		permacActivity: function(trend, mac){
			return $http({
				method: 'GET',
				url: '/api/permac-activity?trend=' + trend + '&mac=' + mac
			});
		},
		searchMac: function(mac){
			return $http({
				method: 'GET',
				url: '/api/search/' + mac
			})
		},
		addMacLabel: function(cond, mac, label){
			return $http({
				method: 'GET',
				url: '/api/add-mac-label?cond=' + cond + '&mac=' + mac + '&label=' + label
			})
		},
		macAdministration: function(cond, owner, mac){
			return $http({
				method: 'GET',
				url: '/api/mac-administration?cond=' + cond + '&owner=' + owner + '&mac=' + mac
			})
		},

		

		//USERS FUNCTIONS
		getActiveMacsUser: function(trend, get, created, owner){
			return $http({
				method: 'GET',
				url: '/api/get-active-macs-user?trend=' + trend + '&get=' + get + '&created=' + created + '&owner=' + owner
			});
		},
		macsPerTrendUser: function(trend, owner){
			return $http({
				method: 'GET',
				url: '/api/macs-per-trend-user?trend=' + trend + '&owner=' + owner 
			});
		},
		maxPerTrendUser: function(trend, get, created, owner){
			return $http({
				method: 'GET',
				url: '/api/max-per-trend-user?trend=' + trend + '&get=' + get + '&created=' + created + '&owner=' + owner
			});
		},

		//CUSTOM FUNCTIONS
		packageSummary: packageSummary,
		packageDispense: packageDispense,
		maxOfPackages: maxOfPackages,
		modCoords: modCoords,
		mapInit: mapInit
		

	};
}]);

/*DASHBOARD SECTION*/
macStats.controller('dashboardControllerPD',
['$scope', '$http', 'myService', '$filter', function($scope, $http, myService, $filter){
	//Trend Url Array	
	$scope.trendUrl = ["admin/dashboard-perDay", "admin/dashboard-perWeek", "admin/dashboard-perMonth"];
	//Inserted in beginnin of url to indicate user & admin
	$scope.userTypeIndicator = "admin";
	//RETURNS dashboard total active value
	myService.getActiveMacs('countActivePD', 'getCount', '').then(function(response){
		$scope.dashTotalActive = response.data[0].activeDevice;
	})
	//RETURNS dropdown values in total active value
	myService.getActiveMacs('countActivePD', 'getMac', '').then(function(response){
		$scope.activeDevices = response.data;
	})
	//RETURNS max connected, util-tx-rx, usage-tx-rx values
	myService.maxPerTrend('perDay', 'getSum', '').then(function(response){
		$scope.dashTotalConnected = response.data[0].active;
		$scope.dashMaxUtiltx = Math.round(response.data[0].utiltx);
		$scope.dashMaxUtilrx = Math.round(response.data[0].utilrx);
		$scope.dashMaxUsagetx = response.data[0].usagetx;
		$scope.dashMaxUsagerx = response.data[0].usagerx;
	})
	//RETURNS dateCreated as parameter to get the dropdown values in max connected
	myService.maxPerTrend('perDay', 'getSumDate', '').then(function(response){
		myService.maxPerTrend('perDay', 'getEach', response.data[0].dateCreated).then(function(response){
			$scope.eachMax = response.data;
		})
	})
	
	//Calls the Graph Functions Section
	graphActiveDevices("get-active-macs?trend=perDay&get=getCount&created=", "Day");
	
	$scope.activeDevicesGraph = function(){
		graphActiveDevices("get-active-macs?trend=perDay&get=getCount&created=", "Day");
	}
	$scope.maxConnectedGraph = function(){
		graphLayout("max-per-trend?trend=perDay&get=&created=", "Day", "totalActive");
	}
	$scope.maxUtilGraph = function(){
		graphLayout("max-per-trend?trend=perDay&get=&created=", "Day", "totalUtil");
	}
	$scope.maxUsageGraph = function(){
		graphLayout("max-per-trend?trend=perDay&get=&created=", "Day", "totalUsage");
	}

	$scope.xxxMinutesGraph = function(){
		graphPackages('sum-perday', '30Minutes');
	}
	$scope.iHourGraph = function(){
		graphPackages('sum-perday', '1Hour');
	}
	$scope.iiHoursGraph = function(){
		graphPackages('sum-perday', '2Hours');
	}
	$scope.vHoursGraph = function(){
		graphPackages('sum-perday', '5Hours');
	}
	$scope.iDayGraph = function(){
		graphPackages('sum-perday', '1Day');
	}
	$scope.iiDaysGraph = function(){
		graphPackages('sum-perday', '2Days');
	}
	$scope.ivDaysGraph = function(){
		graphPackages('sum-perday', '4Days');
	}
	$scope.iWeekGraph = function(){
		graphPackages('sum-perday', '1Week');
	}

	//RETURNS the list of active devices
	$scope.trend = "Per Day";
	myService.getActiveMacs('perDay', 'getCount', '').then(function(response){	  /*Table Data Section*/
		$scope.devices = response.data;
	})
	//RETURNS the list of active macs as dropdown
	$scope.getDropdown1 = function(dateParam){
		myService.getActiveMacs('perDay', 'getMac', dateParam).then(function(response){
			$scope.actives = response.data;
		})
	}
	//RETURNS the list of max values
	myService.maxPerTrend('perDay', '', '').then(function(response){
		$scope.max = response.data;
	})

	//Function that initializes the stats and graph of packages
	$scope.packagesCharts = function(){
		//Initializes the preloader
		setTimeout(function () {
			$('.preloader').fadeIn();
		}, 200);
		
		var arr = [];
		myService.getActiveMacs("countActivePD", 'getMac', '').then(function(response){
			var activemacs = response.data;
			var raw;
			for(var x=0; x<activemacs.length; x++){
				for(var y=0; y<30; y++){
					myService.packageSummary('perDay', activemacs[x]['activeDevice'], y).then(function(response){
						response.data.length != 0 ? raw = myService.packageDispense(response.data) : arr.pop();
						var spliter = raw['packages'].split(",");
						raw['30mins'] = parseInt(spliter[1],10);
						raw['1hr'] = parseInt(spliter[3],10);
						raw['2hrs'] = parseInt(spliter[5],10);
						raw['5hrs'] = parseInt(spliter[7],10);
						raw['1day'] = parseInt(spliter[9],10);
						raw['2days'] = parseInt(spliter[11],10);
						raw['4days'] = parseInt(spliter[13],10);
						raw['1week'] = parseInt(spliter[15],10);
						arr.push(raw);
					})
				}
			}
			myService.getActiveMacs("macs", '', '').then(function(response){
				arr = $filter('orderBy')(arr, '-dateCreated' );
				arr = arr.filter(Boolean);

				$http({
					method: 'POST',
					url: '/api/package-summary',
					data:   arr//{ data: JSON.stringify(arr)} //{mac: 'bbb', label: 'bbb', coords:'bbb', packages: 'bbb'}
				}).then(function successCallback(response){
					console.log("Success");
					$(".preloader").fadeOut();
					$('.db-p-frame').fadeIn();	
					$('.db-s-frame').hide();
					$(".db-graph-frame").attr("style", "margin-top: 70;");
					
					graphPackages('sum-perday', '30Minutes');
					myService.maxOfPackages('max-perday').then(function(response){
						$scope.xxxmins = response.data[0]['xxxmins'];
						$scope.ihr = response.data[0]['ihr'];
						$scope.iihrs = response.data[0]['iihrs'];
						$scope.vhrs = response.data[0]['vhrs'];
						$scope.iday = response.data[0]['iday'];
						$scope.iidays = response.data[0]['iidays'];
						$scope.ivdays = response.data[0]['ivdays'];
						$scope.iweek = response.data[0]['iweek'];
					})
				}, function errorCallback(response){
					console.log("fAILED");
				});		
			})
		})
	}
	
	//DEBUGGING SECTION


}]);
macStats.controller('dashboardControllerPW',
['$scope', '$http', 'myService', '$filter', function($scope, $http, myService, $filter){
	$scope.trendUrl = ["admin/dashboard-perDay", "admin/dashboard-perWeek", "admin/dashboard-perMonth"];
	$scope.userTypeIndicator = "admin";	
	myService.getActiveMacs('countActivePW', 'getCount', '').then(function(response){
		$scope.dashTotalActive = response.data[0].activeDevice;
	})
	myService.getActiveMacs('countActivePW', 'getMac', '').then(function(response){
		$scope.activeDevices = response.data;
	})
	myService.maxPerTrend('perWeek', 'getSum', '').then(function(response){
		$scope.dashTotalConnected = response.data[0].active;
		$scope.dashMaxUtiltx = Math.round(response.data[0].utiltx);
		$scope.dashMaxUtilrx = Math.round(response.data[0].utilrx);
		$scope.dashMaxUsagetx = response.data[0].usagetx;
		$scope.dashMaxUsagerx = response.data[0].usagerx;
	})
	myService.maxPerTrend('perWeek', 'getSumDate', '').then(function(response){
		myService.maxPerTrend('perWeek', 'getEach', response.data[0].dateCreated).then(function(response){
			$scope.eachMax = response.data;
		})
	})
	
	graphActiveDevices("get-active-macs?trend=perWeek&get=getCount&created=", "Week");
	$scope.activeDevicesGraph = function(){
		graphActiveDevices("get-active-macs?trend=perWeek&get=getCount&created=", "Week");
	}
	$scope.maxConnectedGraph = function(){
		graphLayout("max-per-trend?trend=perWeek&get=&created=", "Week", "totalActive");
	}
	$scope.maxUtilGraph = function(){
		graphLayout("max-per-trend?trend=perWeek&get=&created=", "Week", "totalUtil");
	}
	$scope.maxUsageGraph = function(){
		graphLayout("max-per-trend?trend=perWeek&get=&created=", "Week", "totalUsage");
	}

	$scope.xxxMinutesGraph = function(){
		graphPackages('sum-perweek', '30Minutes');
	}
	$scope.iHourGraph = function(){
		graphPackages('sum-perweek', '1Hour');
	}
	$scope.iiHoursGraph = function(){
		graphPackages('sum-perweek', '2Hours');
	}
	$scope.vHoursGraph = function(){
		graphPackages('sum-perweek', '5Hours');
	}
	$scope.iDayGraph = function(){
		graphPackages('sum-perweek', '1Day');
	}
	$scope.iiDaysGraph = function(){
		graphPackages('sum-perweek', '2Days');
	}
	$scope.ivDaysGraph = function(){
		graphPackages('sum-perweek', '4Days');
	}
	$scope.iWeekGraph = function(){
		graphPackages('sum-perweek', '1Week');
	}


	$scope.trend = "Per Week";
	myService.getActiveMacs('perWeek', 'getCount', '').then(function(response){
		$scope.devices = response.data;
	})
	$scope.getDropdown1 = function(dateParam){
		myService.getActiveMacs('perWeek', 'getMac', dateParam).then(function(response){
			$scope.actives = response.data;
		})
	}
	myService.maxPerTrend('perWeek', '', '').then(function(response){
		$scope.max = response.data;
	})

	$scope.packagesCharts = function(){
		//Initializes the preloader
		setTimeout(function () {
			$('.preloader').fadeIn();
		}, 200);
		
		var arr = [];
		myService.getActiveMacs("countActivePD", 'getMac', '').then(function(response){
			var activemacs = response.data;
			var raw;
			for(var x=0; x<activemacs.length; x++){
				for(var y=0; y<30; y++){
					myService.packageSummary('perWeek', activemacs[x]['activeDevice'], y).then(function(response){
						response.data.length != 0 ? raw = myService.packageDispense(response.data) : arr.pop();
						var spliter = raw['packages'].split(",");
						raw['30mins'] = parseInt(spliter[1],10);
						raw['1hr'] = parseInt(spliter[3],10);
						raw['2hrs'] = parseInt(spliter[5],10);
						raw['5hrs'] = parseInt(spliter[7],10);
						raw['1day'] = parseInt(spliter[9],10);
						raw['2days'] = parseInt(spliter[11],10);
						raw['4days'] = parseInt(spliter[13],10);
						raw['1week'] = parseInt(spliter[15],10);
						arr.push(raw);
					})
				}
			}
			myService.getActiveMacs("macs", '', '').then(function(response){
				arr = $filter('orderBy')(arr, '-dateCreated' );
				arr = arr.filter(Boolean);
				$http({
					method: 'POST',
					url: '/api/package-summary',
					data:   arr//{ data: JSON.stringify(arr)} //{mac: 'bbb', label: 'bbb', coords:'bbb', packages: 'bbb'}
				}).then(function successCallback(response){
					console.log("Success");
					$(".preloader").fadeOut();
					$('.db-p-frame').fadeIn();	
					$('.db-s-frame').hide();
					$(".db-graph-frame").attr("style", "margin-top: 70;");
					
					graphPackages('sum-perweek', '30Minutes');
					myService.maxOfPackages('max-perweek').then(function(response){
						$scope.xxxmins = response.data[0]['xxxmins'];
						$scope.ihr = response.data[0]['ihr'];
						$scope.iihrs = response.data[0]['iihrs'];
						$scope.vhrs = response.data[0]['vhrs'];
						$scope.iday = response.data[0]['iday'];
						$scope.iidays = response.data[0]['iidays'];
						$scope.ivdays = response.data[0]['ivdays'];
						$scope.iweek = response.data[0]['iweek'];
					})

				}, function errorCallback(response){
					console.log("fAILED");
				});		
			})
		})
	}

}]);
macStats.controller('dashboardControllerPM',
['$scope', '$http', 'myService', '$filter', function($scope, $http, myService, $filter){
	$scope.trendUrl = ["admin/dashboard-perDay", "admin/dashboard-perWeek", "admin/dashboard-perMonth"];
	$scope.userTypeIndicator = "admin";	
	myService.getActiveMacs('countActivePM', 'getCount', '').then(function(response){
		$scope.dashTotalActive = response.data[0].activeDevice;
	})
	myService.getActiveMacs('countActivePM', 'getMac', '').then(function(response){
		$scope.activeDevices = response.data;
	})
	myService.maxPerTrend('perMonth', 'getSum', '').then(function(response){
		$scope.dashTotalConnected = response.data[0].active;
		$scope.dashMaxUtiltx = Math.round(response.data[0].utiltx);
		$scope.dashMaxUtilrx = Math.round(response.data[0].utilrx);
		$scope.dashMaxUsagetx = response.data[0].usagetx;
		$scope.dashMaxUsagerx = response.data[0].usagerx;
	})
	myService.maxPerTrend('perMonth', 'getSumDate', '').then(function(response){
		myService.maxPerTrend('perMonth', 'getEach', response.data[0].dateCreated).then(function(response){
			$scope.eachMax = response.data;
		})
	})
	
	graphActiveDevices("get-active-macs?trend=perMonth&get=getCount&created=", "Month");
	$scope.activeDevicesGraph = function(){
		graphActiveDevices("get-active-macs?trend=perMonth&get=getCount&created=", "Month");
	}
	$scope.maxConnectedGraph = function(){
		graphLayout("max-per-trend?trend=perMonth&get=&created=", "Month", "totalActive");
	}
	$scope.maxUtilGraph = function(){
		graphLayout("max-per-trend?trend=perMonth&get=&created=", "Month", "totalUtil");
	}
	$scope.maxUsageGraph = function(){
		graphLayout("max-per-trend?trend=perMonth&get=&created=", "Month", "totalUsage");
	}

	$scope.xxxMinutesGraph = function(){
		graphPackages('sum-perday', '30Minutes');
	}
	$scope.iHourGraph = function(){
		graphPackages('sum-perday', '1Hour');
	}
	$scope.iiHoursGraph = function(){
		graphPackages('sum-perday', '2Hours');
	}
	$scope.vHoursGraph = function(){
		graphPackages('sum-perday', '5Hours');
	}
	$scope.iDayGraph = function(){
		graphPackages('sum-perday', '1Day');
	}
	$scope.iiDaysGraph = function(){
		graphPackages('sum-perday', '2Days');
	}
	$scope.ivDaysGraph = function(){
		graphPackages('sum-perday', '4Days');
	}
	$scope.iWeekGraph = function(){
		graphPackages('sum-perday', '1Week');
	}


	$scope.trend = "Per Month";
	myService.getActiveMacs('perMonth', 'getCount', '').then(function(response){
		$scope.devices = response.data;
	})
	$scope.getDropdown1 = function(dateParam){
		myService.getActiveMacs('perMonth', 'getMac', dateParam).then(function(response){
			$scope.actives = response.data;
		})
	}
	myService.maxPerTrend('perMonth', '', '').then(function(response){
		$scope.max = response.data;
	})

	$scope.packagesCharts = function(){
		//Initializes the preloader
		setTimeout(function () {
			$('.preloader').fadeIn();
		}, 200);
		
		var arr = [];
		myService.getActiveMacs("countActivePD", 'getMac', '').then(function(response){
			var activemacs = response.data;
			var raw;
			for(var x=0; x<activemacs.length; x++){
				for(var y=0; y<30; y++){
					myService.packageSummary('perDay', activemacs[x]['activeDevice'], y).then(function(response){
						response.data.length != 0 ? raw = myService.packageDispense(response.data) : arr.pop();
						var spliter = raw['packages'].split(",");
						raw['30mins'] = parseInt(spliter[1],10);
						raw['1hr'] = parseInt(spliter[3],10);
						raw['2hrs'] = parseInt(spliter[5],10);
						raw['5hrs'] = parseInt(spliter[7],10);
						raw['1day'] = parseInt(spliter[9],10);
						raw['2days'] = parseInt(spliter[11],10);
						raw['4days'] = parseInt(spliter[13],10);
						raw['1week'] = parseInt(spliter[15],10);
						arr.push(raw);
					})
				}
			}
			myService.getActiveMacs("macs", '', '').then(function(response){
				arr = $filter('orderBy')(arr, '-dateCreated' );
				arr = arr.filter(Boolean);
				$http({
					method: 'POST',
					url: '/api/package-summary',
					data:   arr//{ data: JSON.stringify(arr)} //{mac: 'bbb', label: 'bbb', coords:'bbb', packages: 'bbb'}
				}).then(function successCallback(response){
					console.log("Success");
					$(".preloader").fadeOut();
					$('.db-p-frame').fadeIn();	
					$('.db-s-frame').hide();
					$(".db-graph-frame").attr("style", "margin-top: 70;");
					
					graphPackages('sum-perday', '30Minutes');
					myService.maxOfPackages('max-perday').then(function(response){
						$scope.xxxmins = response.data[0]['xxxmins'];
						$scope.ihr = response.data[0]['ihr'];
						$scope.iihrs = response.data[0]['iihrs'];
						$scope.vhrs = response.data[0]['vhrs'];
						$scope.iday = response.data[0]['iday'];
						$scope.iidays = response.data[0]['iidays'];
						$scope.ivdays = response.data[0]['ivdays'];
						$scope.iweek = response.data[0]['iweek'];
					})

				}, function errorCallback(response){
					console.log("fAILED");
				});		
			})
		})
	}
}]);

/*REPORTS SECTION*/
macStats.controller('reportsControllerPD',
['$scope', '$http', 'myService', function($scope, $http, myService){
	//Trend Indicator Variable
	$scope.trend = "Per Day";
	//Trend Url Array
	$scope.trendUrl = ["admin/reports/Summary-perDay",
					  "admin/reports/Summary-perWeek", 
					  "admin/reports/Summary-perMonth"];
	//Inserted in beginning of url to indicate user & admin
	$scope.userTypeIndicator = "admin";
	
	//RETURNS list of max values
	myService.maxPerTrend('perDay', '', '').then(function(response){
		$scope.max = response.data;
	})
	//RETURNS the list of macs with connected values as dropdown
	$scope.maxEachMacs = function(dateParam){
		myService.maxPerTrend('perDay', 'getEach', dateParam).then(function(response){
			$scope.eachMax = response.data;
		})
	}
	//RETURNS the list of number of active devices
	myService.getActiveMacs('perDay', 'getCount', '').then(function(response){
		$scope.devices = response.data;
	})
	//RETURNS the list of active devices as dropdown
	$scope.activeDevices = function(dateParam){
		myService.getActiveMacs('perDay', 'getMac', dateParam).then(function(response){
			$scope.actives = response.data;
		})
	}
}]);
macStats.controller('reportsControllerPW',
['$scope', '$http', 'myService', function($scope, $http, myService){
	$scope.trend = "Per Week";
	$scope.trendUrl = ["admin/reports/Summary-perDay",
					  "admin/reports/Summary-perWeek", 
					  "admin/reports/Summary-perMonth"];
	$scope.userTypeIndicator = "admin";

	myService.maxPerTrend('perWeek', '', '').then(function(response){
		$scope.max = response.data;
	})
	$scope.maxEachMacs = function(dateParam){
		myService.maxPerTrend('perWeek', 'getEach', dateParam).then(function(response){
			$scope.eachMax = response.data;
		})
	}
	myService.getActiveMacs('perWeek', 'getCount', '').then(function(response){
		$scope.devices = response.data;
	})
	$scope.activeDevices = function(dateParam){
		myService.getActiveMacs('perWeek', 'getMac', dateParam).then(function(response){
			$scope.actives = response.data;
		})
	}
}]);
macStats.controller('reportsControllerPM',
['$scope', '$http', 'myService', function($scope, $http, myService){
	$scope.trend = "Per Month";
	$scope.trendUrl = ["admin/reports/Summary-perDay",
					  "admin/reports/Summary-perWeek", 
					  "admin/reports/Summary-perMonth"];
	$scope.userTypeIndicator = "admin";

	myService.maxPerTrend('perMonth', '', '').then(function(response){
		$scope.max = response.data;
	})
	$scope.maxEachMacs = function(dateParam){
		myService.maxPerTrend('perMonth', 'getEach', dateParam).then(function(response){
			$scope.eachMax = response.data;
		})
	}
	myService.getActiveMacs('perMonth', 'getCount', '').then(function(response){
		$scope.devices = response.data;
	})
	$scope.activeDevices = function(dateParam){
		myService.getActiveMacs('perMonth', 'getMac', dateParam).then(function(response){
			$scope.actives = response.data;
		})
	}
}]);

/*CHARTS SECTION*/
macStats.controller('chartsControllerPD',
['$scope', '$http', 'myService', function($scope, $http, myService){
	//Trend Indicator Variable
	$scope.trend = "Per Day";
	//Trend Url Array
	$scope.trendUrl = ["admin/reports/Charts-perDay", 
					   "admin/reports/Charts-perWeek", 
					   "admin/reports/Charts-perMonth"];
	
	$(".chart-option-tab").hide();

	//GRAPH FUNCTIONS
	graphActiveDevices("get-active-macs?trend=perDay&get=getCount&created=", "Day");
	graphMaxConnected("max-per-trend?trend=perDay&get=&created=", "Day");	/*...*/
	graphMaxCcq("max-per-trend?trend=perDay&get=&created=", "Day");
	graphMaxUtil("max-per-trend?trend=perDay&get=&created=", "Day");
	graphMaxUsage("max-per-trend?trend=perDay&get=&created=", "Day");
	graphMaxLease("max-per-trend?trend=perDay&get=&created=", "Day");
	graphMaxFreeMem("max-per-trend?trend=perDay&get=&created=", "Day");
	graphMaxCpuFreq("max-per-trend?trend=perDay&get=&created=", "Day");
	graphMaxCpuLoad("max-per-trend?trend=perDay&get=&created=", "Day");
	graphMaxFreeHdd("max-per-trend?trend=perDay&get=&created=", "Day");
	
}]);
macStats.controller('chartsControllerPW',
['$scope', '$http', 'myService', function($scope, $http, myService){
	$scope.trend = "Per Week";
	$scope.trendUrl = ["admin/reports/Charts-perDay", 
					   "admin/reports/Charts-perWeek", 
					   "admin/reports/Charts-perMonth"];

	$(".chart-option-tab").hide();

	graphActiveDevices("get-active-macs?trend=perWeek&get=getCount&created=", "Week");
	graphMaxConnected("max-per-trend?trend=perWeek&get=&created=", "Week");
	graphMaxCcq("max-per-trend?trend=perWeek&get=&created=", "Week");
	graphMaxUtil("max-per-trend?trend=perWeek&get=&created=", "Week");
	graphMaxUsage("max-per-trend?trend=perWeek&get=&created=", "Week");
	graphMaxLease("max-per-trend?trend=perWeek&get=&created=", "Week");
	graphMaxFreeMem("max-per-trend?trend=perWeek&get=&created=", "Week");
	graphMaxCpuFreq("max-per-trend?trend=perWeek&get=&created=", "Week");
	graphMaxCpuLoad("max-per-trend?trend=perWeek&get=&created=", "Week");
	graphMaxFreeHdd("max-per-trend?trend=perWeek&get=&created=", "Week");

}]);
macStats.controller('chartsControllerPM',
['$scope', '$http', 'myService', function($scope, $http, myService){
	$scope.trend = "Per Month";
	$scope.trendUrl = ["admin/reports/Charts-perDay", 
					   "admin/reports/Charts-perWeek", 
					   "admin/reports/Charts-perMonth"];

	$(".chart-option-tab").hide();

	graphActiveDevices("get-active-macs?trend=perMonth&get=getCount&created=", "Month");
	graphMaxConnected("max-per-trend?trend=perMonth&get=&created=", "Month");
	graphMaxCcq("max-per-trend?trend=perMonth&get=&created=", "Month");
	graphMaxUtil("max-per-trend?trend=perMonth&get=&created=", "Month");
	graphMaxUsage("max-per-trend?trend=perMonth&get=&created=", "Month");
	graphMaxLease("max-per-trend?trend=perMonth&get=&created=", "Month");
	graphMaxFreeMem("max-per-trend?trend=perMonth&get=&created=", "Month");
	graphMaxCpuFreq("max-per-trend?trend=perMonth&get=&created=", "Month");
	graphMaxCpuLoad("max-per-trend?trend=perMonth&get=&created=", "Month");
	graphMaxFreeHdd("max-per-trend?trend=perMonth&get=&created=", "Month");
	
}]);


/*PERMAC SECTION*/
macStats.controller('perMacControllerPD',
['$scope', '$http', 'myService', '$timeout', function($scope, $http, myService, $timeout){	
	//Inserted in beginnin of url to indicate user & admin
	$scope.userTypeIndicator = "admin";
	//Trend Url Array
	$scope.trendUrl = ["admin/reports/PerMac-perDay", 
					   "admin/reports/PerMac-perWeek", 
					   "admin/reports/PerMac-perMonth"];
	//Hides the 'Packages' tab in pemac template
	$(".permac-packages").hide();

	//RETURNS list of macs utilizations			
	myService.macsPerTrend('perDay').then(function(response){
		$scope.utilizations = response.data;
	})
	//Function that searches macs
	$scope.searchMac = function(mac){
		myService.searchMac(mac).then(function(response){
			$scope.results = response.data;
		})
	}

}]);
macStats.controller('perMacControllerPW',
['$scope', '$http', 'myService', function($scope, $http, myService){
	$scope.userTypeIndicator = "admin";	
	$scope.trendUrl = ["admin/reports/PerMac-perDay", 
					   "admin/reports/PerMac-perWeek", 
					   "admin/reports/PerMac-perMonth"];

	$(".permac-packages").hide();
	
	myService.macsPerTrend('perWeek').then(function(response){
		$scope.utilizations = response.data;
	})
	$scope.searchMac = function(mac){
		myService.searchMac(mac).then(function(response){
			$scope.results = response.data;
		})
	}

}]);
macStats.controller('perMacControllerPM',
['$scope', '$http', 'myService', function($scope, $http, myService){
	$scope.userTypeIndicator = "admin";	
	$scope.trendUrl = ["admin/reports/PerMac-perDay", 
					   "admin/reports/PerMac-perWeek", 
					   "admin/reports/PerMac-perMonth"];

	$(".permac-packages").hide();
	
	myService.macsPerTrend('perMonth').then(function(response){
		$scope.utilizations = response.data;
	})
	$scope.searchMac = function(mac){
		myService.searchMac(mac).then(function(response){
			$scope.results = response.data;
		})
	}

}]);

/*PERMAC-ACTIVITY SECTION*/
macStats.controller('permacActivityPD',
['$scope', '$http', '$location', 'myService', '$filter', function($scope, $http, $location, myService, $filter){
// use $location.path() or url() or absUrl() to get current url path
// use $location.search() to get current url search hash eg.(/macs?mac=1011200107) returns mac=1011200107 as object
// use $location.hash() to get current url hash eg.(/macs?mac=1011200107&foo=bar) returns foo=bar as object
	$(".permac-graph").attr("style", "display:block");
	
	//Gets the query parameter of current url as object
	var urlParam = $location.search();
	//Store the query parameter value in variable
	$scope.macParam = urlParam.mac;
	//Inserted in beginnin of url to indicate user & admin
	$scope.userTypeIndicator = "admin";
	//Trend Url Array
	$scope.trendUrl = ["admin/reports/PerMac-perDay/macs?mac=" + $scope.macParam, 
					   "admin/reports/PerMac-perWeek/macs?mac=" + $scope.macParam, 
					   "admin/reports/PerMac-perMonth/macs?mac=" + $scope.macParam];
	
	//RETURNS THE LIST of each specific mac utilizations
	myService.permacActivity('perDay', $scope.macParam).then(function(response){
		$scope.utilizations = response.data;
	})
	//Function that searches macs
	$scope.searchMac = function(mac){
		myService.searchMac(mac).then(function(response){
			$scope.results = response.data;
		})
	}

	//Declare a storage array
	var arr = [];
	
	//Loop through a specified number
	//Note: every number in the loop corresponds to the nthDay returned by packageSummary function
	for(var y=0; y<30; y++){
		myService.packageSummary('perDay', $scope.macParam, y).then(function(response){
			//If the array is undefined its length is '0' so, if array length is 0 then
			//that array will not inserted instead it will remove by pop() method.
			response.data.length != 0 ? $scope.b = myService.packageDispense(response.data) : arr.pop();
			arr.push($scope.b);
		})
	}		
	//Store the resulted array 'arr' into angular variable.
	$scope.packageSummary = arr;
	
}]);
macStats.controller('permacActivityPW',
['$scope', '$http', '$location', 'myService', function($scope, $http, $location, myService){
	$(".permac-graph").attr("style", "display:block");
	var urlParam = $location.search();
	$scope.macParam = urlParam.mac;
	
	$scope.userTypeIndicator = "admin";
	$scope.trendUrl = ["admin/reports/PerMac-perDay/macs?mac=" + $scope.macParam, 
					   "admin/reports/PerMac-perWeek/macs?mac=" + $scope.macParam, 
					   "admin/reports/PerMac-perMonth/macs?mac=" + $scope.macParam];

	myService.permacActivity('perWeek', $scope.macParam).then(function(response){
		$scope.utilizations = response.data;
	})
	$scope.searchMac = function(mac){
		myService.searchMac(mac).then(function(response){
			$scope.results = response.data;
		})
	}

	var arr = [];
	for(var y=0; y<4; y++){
		myService.packageSummary('perWeek', $scope.macParam, y).then(function(response){
			response.data.length != 0 ? $scope.b = myService.packageDispense(response.data) : arr.pop();
			arr.push($scope.b);
		})
	}
	$scope.packageSummary = arr;

}]);
macStats.controller('permacActivityPM',
['$scope', '$http', '$location', 'myService', function($scope, $http, $location, myService){
	$(".permac-graph").attr("style", "display:block");
	var urlParam = $location.search();
	$scope.macParam = urlParam.mac;
	
	$scope.userTypeIndicator = "admin";
	$scope.trendUrl = ["admin/reports/PerMac-perDay/macs?mac=" + $scope.macParam, 
					   "admin/reports/PerMac-perWeek/macs?mac=" + $scope.macParam, 
					   "admin/reports/PerMac-perMonth/macs?mac=" + $scope.macParam];

	myService.permacActivity('perMonth', $scope.macParam).then(function(response){
		$scope.utilizations = response.data;
	})
	$scope.searchMac = function(mac){
		myService.searchMac(mac).then(function(response){
			$scope.results = response.data;
		})
	}

	var arr = [];
	for(var y=0; y<30; y++){
		myService.packageSummary('perDay', $scope.macParam, y).then(function(response){
			response.data.length != 0 ? $scope.b = myService.packageDispense(response.data) : arr.pop();
			arr.push($scope.b);
		})
	}
	$scope.packageSummary = arr;

}]);

/*CHARTS PERMAC-ACTIVITY SECTION*/
macStats.controller('chartsPermacActPD',
['$scope', '$http', '$location', 'myService', '$filter', function($scope, $http, $location, myService, $filter){
	//Hides the active devices chart container
	$(".chart-active-container").hide();
	$(".chart-connected-container").attr("style", "display: block; margin: auto; border-top: 4px solid rgba(0, 204, 47, 0.76); width: 80%; height:400px");
	$(".canvas-connected-container").attr("style", "height: 300px");
	
	//Gets the query parameter of current url in object form
	var urlParam = $location.search();
	//Gets the value of query parameter from object and stored in variable
	$scope.macParam = urlParam.mac;
	
	$scope.trend = "Per Day";

	//Inserted in beginnin of url to indicate user & admin
	$scope.userTypeIndicator = "admin";	
	//Trend Url Array
	$scope.trendUrl = ["admin/reports/Charts-perDay/macs?mac=" + $scope.macParam, 
					   "admin/reports/Charts-perWeek/macs?mac=" + $scope.macParam, 
					   "admin/reports/Charts-perMonth/macs?mac=" + $scope.macParam];

	//Calling of Graph Functions
	graphMaxConnected("permac-activity?trend=perDay-graph&mac=" + $scope.macParam, "Day");
	graphMaxCcq("permac-activity?trend=perDay-graph&mac=" + $scope.macParam, "Day");
	graphMaxUtil("permac-activity?trend=perDay-graph&mac=" + $scope.macParam, "Day");
	graphMaxUsage("permac-activity?trend=perDay-graph&mac=" + $scope.macParam, "Day");
	graphMaxLease("permac-activity?trend=perDay-graph&mac=" + $scope.macParam, "Day");
	graphMaxFreeMem("permac-activity?trend=perDay-graph&mac=" + $scope.macParam, "Day");
	graphMaxCpuFreq("permac-activity?trend=perDay-graph&mac=" + $scope.macParam, "Day");
	graphMaxCpuLoad("permac-activity?trend=perDay-graph&mac=" + $scope.macParam, "Day");
	graphMaxFreeHdd("permac-activity?trend=perDay-graph&mac=" + $scope.macParam, "Day");

	var arr = [];	
	for(var y=0; y<30; y++){
		myService.packageSummary('perDay', $scope.macParam, y).then(function(response){
			response.data.length != 0 ? $scope.b = myService.packageDispense(response.data) : arr.pop();
			arr.push($scope.b);
		})
	}
	
	//Any ajax call will do the same.	
	myService.permacActivity('perDay', $scope.macParam).then(function(response){
		//Sort the resulted array
		arr = $filter('orderBy')(arr, '-dateCreated' );
		//Remove the undefined index of resulted array
		arr = arr.filter(Boolean);

		xxxMinutesGraph(arr, 'perDay');
		iHourGraph(arr, 'perDay');
		iiHoursGraph(arr, 'perDay');
		vHoursGraph(arr, 'perDay');
		iDayGraph(arr, 'perDay');
		iiDaysGraph(arr, 'perDay');
		ivDaysGraph(arr, 'perDay');
		iWeekGraph(arr, 'perDay');
		packagesGraph(arr, 'perDay');
		console.log(arr);
	})

}])
macStats.controller('chartsPermacActPW',
['$scope', '$http', '$location', 'myService', '$filter', function($scope, $http, $location, myService, $filter){
	$(".chart-active-container").hide();
	$(".chart-connected-container").attr("style", "display: block; margin: auto; border-top: 4px solid rgba(0, 204, 47, 0.76); width: 80%; height:400px");
	$(".canvas-connected-container").attr("style", "height: 300px");

	var urlParam = $location.search();
	$scope.macParam = urlParam.mac;
	
	$scope.trend = "Per Week";
	$scope.userTypeIndicator = "admin";
	$scope.trendUrl = ["admin/reports/Charts-perDay/macs?mac=" + $scope.macParam, 
					   "admin/reports/Charts-perWeek/macs?mac=" + $scope.macParam, 
					   "admin/reports/Charts-perMonth/macs?mac=" + $scope.macParam];

	graphMaxConnected("permac-activity?trend=perWeek&mac=" + $scope.macParam, "Week");
	graphMaxCcq("permac-activity?trend=perWeek&mac=" + $scope.macParam, "Week");
	graphMaxUtil("permac-activity?trend=perWeek&mac=" + $scope.macParam, "Week");
	graphMaxUsage("permac-activity?trend=perWeek&mac=" + $scope.macParam, "Week");
	graphMaxLease("permac-activity?trend=perWeek&mac=" + $scope.macParam, "Week");
	graphMaxFreeMem("permac-activity?trend=perWeek&mac=" + $scope.macParam, "Week");
	graphMaxCpuFreq("permac-activity?trend=perWeek&mac=" + $scope.macParam, "Week");
	graphMaxCpuLoad("permac-activity?trend=perWeek&mac=" + $scope.macParam, "Week");
	graphMaxFreeHdd("permac-activity?trend=perWeek&mac=" + $scope.macParam, "Week");

	var arr = [];	
	for(var y=0; y<30; y++){
		myService.packageSummary('perWeek', $scope.macParam, y).then(function(response){
			response.data.length != 0 ? $scope.b = myService.packageDispense(response.data) : arr.pop();
			arr.push($scope.b);
		})
	}
		
	myService.permacActivity('perDay', $scope.macParam).then(function(response){
		//Sort the resulted array
		arr = $filter('orderBy')(arr, '-dateCreated' );
		//Remove the undefined index of resulted array
		arr = arr.filter(Boolean);

		xxxMinutesGraph(arr, 'perWeek');
		iHourGraph(arr, 'perWeek');
		iiHoursGraph(arr, 'perWeek');
		vHoursGraph(arr, 'perWeek');
		iDayGraph(arr, 'perWeek');
		iiDaysGraph(arr, 'perWeek');
		ivDaysGraph(arr, 'perWeek');
		iWeekGraph(arr, 'perWeek');
		packagesGraph(arr, 'perWeek');
		//console.log(arr);
	})

}])
macStats.controller('chartsPermacActPM',
['$scope', '$http', '$location', 'myService', '$filter', function($scope, $http, $location, myService, $filter){
	$(".chart-active-container").hide();
	$(".chart-connected-container").attr("style", "display: block; margin: auto; border-top: 4px solid rgba(0, 204, 47, 0.76); width: 80%; height:400px");
	$(".canvas-connected-container").attr("style", "height: 300px");

	var urlParam = $location.search();
	$scope.macParam = urlParam.mac;
	
	$scope.trend = "Per Month";
	$scope.userTypeIndicator = "admin";
	$scope.trendUrl = ["admin/reports/Charts-perDay/macs?mac=" + $scope.macParam, 
					   "admin/reports/Charts-perWeek/macs?mac=" + $scope.macParam, 
					   "admin/reports/Charts-perMonth/macs?mac=" + $scope.macParam];

	graphMaxConnected("permac-activity?trend=perMonth&mac=" + $scope.macParam, "Month");
	graphMaxCcq("permac-activity?trend=perMonth&mac=" + $scope.macParam, "Month");
	graphMaxUtil("permac-activity?trend=perMonth&mac=" + $scope.macParam, "Month");
	graphMaxUsage("permac-activity?trend=perMonth&mac=" + $scope.macParam, "Month");
	graphMaxLease("permac-activity?trend=perMonth&mac=" + $scope.macParam, "Month");
	graphMaxFreeMem("permac-activity?trend=perMonth&mac=" + $scope.macParam, "Month");
	graphMaxCpuFreq("permac-activity?trend=perMonth&mac=" + $scope.macParam, "Month");
	graphMaxCpuLoad("permac-activity?trend=perMonth&mac=" + $scope.macParam, "Month");
	graphMaxFreeHdd("permac-activity?trend=perMonth&mac=" + $scope.macParam, "Month");

	var arr = [];	
	for(var y=0; y<30; y++){
		myService.packageSummary('perDay', $scope.macParam, y).then(function(response){
			response.data.length != 0 ? $scope.b = myService.packageDispense(response.data) : arr.pop();
			arr.push($scope.b);
		})
	}
		
	myService.permacActivity('perDay', $scope.macParam).then(function(response){
		//Sort the resulted array
		arr = $filter('orderBy')(arr, '-dateCreated' );
		//Remove the undefined index of resulted array
		arr = arr.filter(Boolean);

		xxxMinutesGraph(arr, 'perMonth');
		iHourGraph(arr, 'perMonth');
		iiHoursGraph(arr, 'perMonth');
		vHoursGraph(arr, 'perMonth');
		iDayGraph(arr, 'perMonth');
		iiDaysGraph(arr, 'perMonth');
		ivDaysGraph(arr, 'perMonth');
		iWeekGraph(arr, 'perMonth');
		packagesGraph(arr, 'perMonth');
		//console.log(arr);
	})

}])

/*ADMINISTRATION->ADD MAC LABEL SECTION*/
macStats.controller('addMacLabel',
['$scope', '$http', 'myService', '$route', function($scope, $http, myService, $route){
	//RETURNS List of Macs
	myService.getActiveMacs('macs', '', '').then(function(response){
		$scope.macs = response.data;
	})
	//RETURNS Recently Updated Macs
	myService.addMacLabel('recently-updated', '', '').then(function(response){
		$scope.recent_macs = response.data;
	})
	//Function that gets the mac value and inputs it into a form
	$scope.inputMac = function(val){
		$scope.macInput = val; 
	}
	//Function that adds/edit the label/location of macs
	$scope.addLabel = function(){
		if($(".aml-input-mac").val()=="" || $(".aml-input-label").val()==""){
			alert("Complete Fields");
		}
		else{
			var mac = $(".aml-input-mac").val();
			var label = $(".aml-input-label").val();
			myService.addMacLabel('edit-label', mac, label);
			$route.reload();	/*In case of need of reloading the whole page, use 
										$window.location.reload() dont forget to inject $window in controller*/
		}
	}	
}])

/*ADMINISTRATION->ASSIGN MAC SECTION*/
macStats.controller('assignMac',
['$scope', '$http', 'myService', '$route', function($scope, $http, myService, $route){
	//RETURNS the unassigned macs
	myService.macAdministration('show-unassigned', '', '').then(function(response){
		$scope.unassigned_macs = response.data;
	})
	//RETURNS the assigned macs
	myService.macAdministration('show-assigned', '', '').then(function(response){
		$scope.assigned_macs = response.data;
	})
	//RETURNS list of users as selection
	myService.macAdministration('show-users', '', '').then(function(response){
		$scope.users = response.data;
	})
	//RETURNS the list of users and the number of their owned macs
	myService.macAdministration('count-macs-of-user', '', '').then(function(response){
		$scope.cmof = response.data;	//cmof = count macs of user
	})
	
	//FUNCTION that assigns mac to users
	$scope.assign = function(selected_user, mac){
		if(selected_user == undefined)
			alert('Please Select a User');
		else{
			/*Removes The Selected Mac In Unassigned Macs*/
			var remove = $scope.unassigned_macs.findIndex(u => u.mac == mac);	//Get the index of selected mac
			$scope.unassigned_macs.splice(remove, 1);	//Removes it in unassigned macs
			
			/*Adds The Removed Mac Into Assigned Macs*/
			var new_obj = {mac: mac, owner: selected_user}	//Initialize new object with values derived from assign functon's parameter
			$scope.assigned_macs.unshift(new_obj);	//Adds it in assigned macs

			/*Updates The Users List Table*/
			var index = $scope.cmof.findIndex(c => c.owner == selected_user);	//Gets the index of array corresponds to selected_user parameter  
			if(index == -1){													//like Mysql SELECT,WHERE clause.
				var new_obj2 = {owner: selected_user, owned: 1};
				$scope.cmof.unshift(new_obj2);
			}
			else
				$scope.cmof[index].owned = $scope.cmof[index].owned+1;	//Increment by 1

			myService.macAdministration('assign', selected_user, mac);	//Initialized ajax request		
		}
	}
	
	//FUNCTION that unassigns mac to users
	$scope.unassign = function(selected_user, mac){
		/*Removes The Selected Mac Into Aassigned Macs*/
		var remove = $scope.assigned_macs.findIndex(u => u.mac == mac);	//Get the index of selected mac
		$scope.assigned_macs.splice(remove, 1);	//Removes it in assigned macs

		/*Adds The Removed Mac Into Unassigned Macs*/
		var new_obj = {mac: mac, owner: ''}		//Initialize new object with values derived from functon parameter
		$scope.unassigned_macs.unshift(new_obj);	//Adds it in unassigned macs

		var index = $scope.cmof.findIndex(c => c.owner == selected_user);	//Gets the index of array corresponds to selected_user parameter
		$scope.cmof[index].owned = $scope.cmof[index].owned-1;				//like Mysql SELECT, WHERE clause
		if($scope.cmof[index].owned == 0){
			$scope.cmof.splice(index, 1);
		}
		myService.macAdministration('unassign', '', mac);
	}
	
	//FUNCTION that returns selected user and his/her owned macs
	$scope.showMacsOfOwner = function(owner){
		myService.macAdministration('show-macs-of-user', owner, '').then(function(response){
			$scope.macsOwned = response.data;
		})
	}

	$scope.viewAll = function(){
		$route.reload();
	}

	//FUNCTION that unassigns mac to users (for showMacsOfOwner purpose)
	$scope.unassign2 = function(selected_user, mac){
		var remove = $scope.macsOwned.findIndex(u => u.mac == mac);	
		$scope.macsOwned.splice(remove, 1);	

		var new_obj = {mac: mac, owner: ''}
		$scope.unassigned_macs.unshift(new_obj);

		var index = $scope.cmof.findIndex(c => c.owner == selected_user);
		$scope.cmof[index].owned = $scope.cmof[index].owned-1;
		if($scope.cmof[index].owned == 0){
			$scope.cmof.splice(index, 1);
		}
		myService.macAdministration('unassign', '', mac);
	}
}])

macStats.controller('mapsController',
['$scope', '$http', 'myService', '$route', function($scope, $http, myService, $route){
	
	//RETURNS the list of mac addreses
	var arr = [];
	//Call the factory function that returns the list of mac addresses
	myService.getActiveMacs('macs', '', '').then(function(response){
		$scope.fetch = response.data;
		for(var x=0; x<$scope.fetch.length; x++){
			arr.push(myService.modCoords($scope.fetch[x]));
		}
		$scope.lists = arr;
	})
	
	//Function that initializes the map
	$scope.initMap = function(){
		//Declare array container
		var arr = [];
		//Call the factory function that returns the list of mac addresses
		myService.getActiveMacs('macs', '', '').then(function(response){
			$scope.fetch = response.data;
			for(var x=0; x<$scope.fetch.length; x++){
				arr.push(myService.modCoords($scope.fetch[x]));
			}
			myService.mapInit(arr, {lat: 14.5577445, lng:121.0230858});
		})	
	}
	
	$scope.centerMap = function(coords){
		var arr = [];
		//Call the factory function that returns the list of mac addresses
		myService.getActiveMacs('macs', '', '').then(function(response){
			$scope.fetch = response.data;
			for(var x=0; x<$scope.fetch.length; x++){
				arr.push(myService.modCoords($scope.fetch[x]));
			}
			myService.mapInit(arr, coords);
		})
	}



}])



/*--------------------------------------------------------------------*/





//USER REPORTS SECTION

//DASHBOARD
macStats.controller('userDashboardPD',
['$scope', '$http', 'myService', '$filter', function($scope, $http, myService, $filter){	
	//Get the authenticated user that logged in
	var auth_user = $(".auth-user").text();
	/*Trend Url Array*/
	$scope.trendUrl = ["user/dashboard-perDay", "user/dashboard-perWeek", "user/dashboard-perMonth"];
	//Inserted in beginnin of url to indicate user & admin
	$scope.userTypeIndicator = "user";
	
	//RETURNS dashboard total active value
	myService.getActiveMacsUser('countActivePD', 'getCount-user', '', auth_user).then(function(response){
		$scope.dashTotalActive = response.data[0].activeDevice;
	})
	//RETURNS dropdown values in total active value
	myService.getActiveMacsUser('countActivePD', 'getMac-user', '', auth_user).then(function(response){
		$scope.activeDevices = response.data;
	})
	//RETURNS max connected, util-tx-rx, usage-tx-rx values
	myService.maxPerTrendUser('perDay', 'getSum-user', '', auth_user).then(function(response){
		$scope.dashTotalConnected = response.data[0].active;
		$scope.dashMaxUtiltx = Math.round(response.data[0].utiltx);
		$scope.dashMaxUtilrx = Math.round(response.data[0].utilrx);
		$scope.dashMaxUsagetx = response.data[0].usagetx;
		$scope.dashMaxUsagerx = response.data[0].usagerx;
	})
	//RETURNS dateCreated as parameter to get the dropdown values in max connected
	myService.maxPerTrendUser('perDay', 'getSumDate-user', '', auth_user).then(function(response){
		myService.maxPerTrendUser('perDay', 'getEach-user', response.data[0].dateCreated, auth_user).then(function(response){
			$scope.eachMax = response.data;
		})
	})

	//Calls the Graph Functions Section
	graphActiveDevices("get-active-macs-user?trend=perDay&get=getCount-user&created=&owner=" + auth_user, "Day");
	$scope.activeDevicesGraph = function(){
		graphActiveDevices("get-active-macs-user?trend=perDay&get=getCount-user&created=&owner=" + auth_user, "Day");
	}
	$scope.maxConnectedGraph = function(){
		graphLayout("max-per-trend-user?trend=perDay&get=user&created=&owner=" + auth_user, "Day", "totalActive");
	}
	$scope.maxUtilGraph = function(){
		graphLayout("max-per-trend-user?trend=perDay&get=user&created=&owner=" + auth_user, "Day", "totalUtil");
	}
	$scope.maxUsageGraph = function(){
		graphLayout("max-per-trend-user?trend=perDay&get=user&created=&owner=" + auth_user, "Day", "totalUsage");
	}

	$scope.xxxMinutesGraph = function(){
		graphPackages('sum-perday', '30Minutes');
	}
	$scope.iHourGraph = function(){
		graphPackages('sum-perday', '1Hour');
	}
	$scope.iiHoursGraph = function(){
		graphPackages('sum-perday', '2Hours');
	}
	$scope.vHoursGraph = function(){
		graphPackages('sum-perday', '5Hours');
	}
	$scope.iDayGraph = function(){
		graphPackages('sum-perday', '1Day');
	}
	$scope.iiDaysGraph = function(){
		graphPackages('sum-perday', '2Days');
	}
	$scope.ivDaysGraph = function(){
		graphPackages('sum-perday', '4Days');
	}
	$scope.iWeekGraph = function(){
		graphPackages('sum-perday', '1Week');
	}

	
	//Inserted in tables section to indicate the trends
	$scope.trend = "Per Day";
	
	//RETURNS the list of active devices
	myService.getActiveMacsUser('perDay', 'getCount-user', '', auth_user).then(function(response){	  //Table Data Section
		$scope.devices = response.data;
	})
	//RETURNS the list of active macs as dropdown
	$scope.getDropdown1 = function(dateParam){
		myService.getActiveMacsUser('perDay', 'getMac-user', dateParam, auth_user).then(function(response){
			$scope.actives = response.data;
		})
	}
	//RETURNS the list of max values
	myService.maxPerTrendUser('perDay', 'user', '', auth_user).then(function(response){
		$scope.max = response.data;
	})

	$scope.packagesCharts = function(){
		//Initializes the preloader
		setTimeout(function () {
			$('.preloader').fadeIn();
		}, 200);
		
		var arr = [];
		myService.getActiveMacsUser("countActivePD", 'getMac-user', '', auth_user).then(function(response){
			var activemacs = response.data;
			var raw;
			for(var x=0; x<activemacs.length; x++){
				for(var y=0; y<30; y++){
					myService.packageSummary('perDay', activemacs[x]['activeDevice'], y).then(function(response){
						response.data.length != 0 ? raw = myService.packageDispense(response.data) : arr.pop();
						var spliter = raw['packages'].split(",");
						raw['30mins'] = parseInt(spliter[1],10);
						raw['1hr'] = parseInt(spliter[3],10);
						raw['2hrs'] = parseInt(spliter[5],10);
						raw['5hrs'] = parseInt(spliter[7],10);
						raw['1day'] = parseInt(spliter[9],10);
						raw['2days'] = parseInt(spliter[11],10);
						raw['4days'] = parseInt(spliter[13],10);
						raw['1week'] = parseInt(spliter[15],10);
						arr.push(raw);
					})
				}
			}
			myService.getActiveMacs("macs", '', '').then(function(response){
				arr = $filter('orderBy')(arr, '-dateCreated' );
				arr = arr.filter(Boolean);
				$http({
					method: 'POST',
					url: '/api/package-summary',
					data:   arr//{ data: JSON.stringify(arr)} //{mac: 'bbb', label: 'bbb', coords:'bbb', packages: 'bbb'}
				}).then(function successCallback(response){
					console.log("Success");
					$(".preloader").fadeOut();
					$('.db-p-frame').fadeIn();	
					$('.db-s-frame').hide();
					$(".db-graph-frame").attr("style", "margin-top: 70;");
					
					graphPackages('sum-perday', '30Minutes');
					myService.maxOfPackages('max-perday').then(function(response){
						$scope.xxxmins = response.data[0]['xxxmins'];
						$scope.ihr = response.data[0]['ihr'];
						$scope.iihrs = response.data[0]['iihrs'];
						$scope.vhrs = response.data[0]['vhrs'];
						$scope.iday = response.data[0]['iday'];
						$scope.iidays = response.data[0]['iidays'];
						$scope.ivdays = response.data[0]['ivdays'];
						$scope.iweek = response.data[0]['iweek'];
					})

				}, function errorCallback(response){
					console.log("fAILED");
				});		
			})
		})
	}
	
}]);
macStats.controller('userDashboardPW',
['$scope', '$http', 'myService', '$filter', function($scope, $http, myService, $filter){	
	var auth_user = $(".auth-user").text();
	$scope.trendUrl = ["user/dashboard-perDay", "user/dashboard-perWeek", "user/dashboard-perMonth"];
	$scope.userTypeIndicator = "user";
	myService.getActiveMacsUser('countActivePW', 'getCount-user', '', auth_user).then(function(response){
		$scope.dashTotalActive = response.data[0].activeDevice;
	})
	myService.getActiveMacsUser('countActivePW', 'getMac-user', '', auth_user).then(function(response){
		$scope.activeDevices = response.data;
	})
	myService.maxPerTrendUser('perWeek', 'getSum-user', '', auth_user).then(function(response){
		$scope.dashTotalConnected = response.data[0].active;
		$scope.dashMaxUtiltx = Math.round(response.data[0].utiltx);
		$scope.dashMaxUtilrx = Math.round(response.data[0].utilrx);
		$scope.dashMaxUsagetx = response.data[0].usagetx;
		$scope.dashMaxUsagerx = response.data[0].usagerx;
	})
	myService.maxPerTrendUser('perWeek', 'getSumDate-user', '', auth_user).then(function(response){
		myService.maxPerTrendUser('perWeek', 'getEach-user', response.data[0].dateCreated, auth_user).then(function(response){
			$scope.eachMax = response.data;
		})
	})
	graphActiveDevices("get-active-macs-user?trend=perWeek&get=getCount-user&created=&owner=" + auth_user, "Week");
	$scope.activeDevicesGraph = function(){
		graphActiveDevices("get-active-macs-user?trend=perWeek&get=getCount-user&created=&owner=" + auth_user, "Week");
	}
	$scope.maxConnectedGraph = function(){
		graphLayout("max-per-trend-user?trend=perWeek&get=user&created=&owner=" + auth_user, "Week", "totalActive");
	}
	$scope.maxUtilGraph = function(){
		graphLayout("max-per-trend-user?trend=perWeek&get=user&created=&owner=" + auth_user, "Week", "totalUtil");
	}
	$scope.maxUsageGraph = function(){
		graphLayout("max-per-trend-user?trend=perWeek&get=user&created=&owner=" + auth_user, "Week", "totalUsage");
	}

	$scope.xxxMinutesGraph = function(){
		graphPackages('sum-perweek', '30Minutes');
	}
	$scope.iHourGraph = function(){
		graphPackages('sum-perweek', '1Hour');
	}
	$scope.iiHoursGraph = function(){
		graphPackages('sum-perweek', '2Hours');
	}
	$scope.vHoursGraph = function(){
		graphPackages('sum-perweek', '5Hours');
	}
	$scope.iDayGraph = function(){
		graphPackages('sum-perweek', '1Day');
	}
	$scope.iiDaysGraph = function(){
		graphPackages('sum-perweek', '2Days');
	}
	$scope.ivDaysGraph = function(){
		graphPackages('sum-perweek', '4Days');
	}
	$scope.iWeekGraph = function(){
		graphPackages('sum-perweek', '1Week');
	}


	$scope.trend = "Per Week";
	myService.getActiveMacsUser('perWeek', 'getCount-user', '', auth_user).then(function(response){	
		$scope.devices = response.data;
	})
	$scope.getDropdown1 = function(dateParam){
		myService.getActiveMacsUser('perWeek', 'getMac-user', dateParam, auth_user).then(function(response){
			$scope.actives = response.data;
		})
	}
	myService.maxPerTrendUser('perWeek', 'user', '', auth_user).then(function(response){
		$scope.max = response.data;
	})

	$scope.packagesCharts = function(){
		//Initializes the preloader
		setTimeout(function () {
			$('.preloader').fadeIn();
		}, 200);
		
		var arr = [];
		myService.getActiveMacsUser("countActivePD", 'getMac-user', '', auth_user).then(function(response){
			var activemacs = response.data;
			var raw;
			for(var x=0; x<activemacs.length; x++){
				for(var y=0; y<30; y++){
					myService.packageSummary('perWeek', activemacs[x]['activeDevice'], y).then(function(response){
						response.data.length != 0 ? raw = myService.packageDispense(response.data) : arr.pop();
						var spliter = raw['packages'].split(",");
						raw['30mins'] = parseInt(spliter[1],10);
						raw['1hr'] = parseInt(spliter[3],10);
						raw['2hrs'] = parseInt(spliter[5],10);
						raw['5hrs'] = parseInt(spliter[7],10);
						raw['1day'] = parseInt(spliter[9],10);
						raw['2days'] = parseInt(spliter[11],10);
						raw['4days'] = parseInt(spliter[13],10);
						raw['1week'] = parseInt(spliter[15],10);
						arr.push(raw);
					})
				}
			}
			myService.getActiveMacs("macs", '', '').then(function(response){
				arr = $filter('orderBy')(arr, '-dateCreated' );
				arr = arr.filter(Boolean);
				$http({
					method: 'POST',
					url: '/api/package-summary',
					data:   arr//{ data: JSON.stringify(arr)} //{mac: 'bbb', label: 'bbb', coords:'bbb', packages: 'bbb'}
				}).then(function successCallback(response){
					console.log("Success");
					$(".preloader").fadeOut();
					$('.db-p-frame').fadeIn();	
					$('.db-s-frame').hide();
					$(".db-graph-frame").attr("style", "margin-top: 70;");
					
					graphPackages('sum-perweek', '30Minutes');
					myService.maxOfPackages('max-perweek').then(function(response){
						$scope.xxxmins = response.data[0]['xxxmins'];
						$scope.ihr = response.data[0]['ihr'];
						$scope.iihrs = response.data[0]['iihrs'];
						$scope.vhrs = response.data[0]['vhrs'];
						$scope.iday = response.data[0]['iday'];
						$scope.iidays = response.data[0]['iidays'];
						$scope.ivdays = response.data[0]['ivdays'];
						$scope.iweek = response.data[0]['iweek'];
					})

				}, function errorCallback(response){
					console.log("fAILED");
				});		
			})
		})
	}
	
}]);
macStats.controller('userDashboardPM',
['$scope', '$http', 'myService', '$filter', function($scope, $http, myService, $filter){	
	var auth_user = $(".auth-user").text();
	$scope.trendUrl = ["user/dashboard-perDay", "user/dashboard-perWeek", "user/dashboard-perMonth"];
	$scope.userTypeIndicator = "user";
	myService.getActiveMacsUser('countActivePM', 'getCount-user', '', auth_user).then(function(response){
		$scope.dashTotalActive = response.data[0].activeDevice;
	})
	myService.getActiveMacsUser('countActivePM', 'getMac-user', '', auth_user).then(function(response){
		$scope.activeDevices = response.data;
	})
	myService.maxPerTrendUser('perMonth', 'getSum-user', '', auth_user).then(function(response){
		$scope.dashTotalConnected = response.data[0].active;
		$scope.dashMaxUtiltx = Math.round(response.data[0].utiltx);
		$scope.dashMaxUtilrx = Math.round(response.data[0].utilrx);
		$scope.dashMaxUsagetx = response.data[0].usagetx;
		$scope.dashMaxUsagerx = response.data[0].usagerx;
	})
	myService.maxPerTrendUser('perMonth', 'getSumDate-user', '', auth_user).then(function(response){
		myService.maxPerTrendUser('perMonth', 'getEach-user', response.data[0].dateCreated, auth_user).then(function(response){
			$scope.eachMax = response.data;
		})
	})
	graphActiveDevices("get-active-macs-user?trend=perMonth&get=getCount-user&created=&owner=" + auth_user, "Month");
	$scope.activeDevicesGraph = function(){
		graphActiveDevices("get-active-macs-user?trend=perMonth&get=getCount-user&created=&owner=" + auth_user, "Month");
	}
	$scope.maxConnectedGraph = function(){
		graphLayout("max-per-trend-user?trend=perMonth&get=user&created=&owner=" + auth_user, "Month", "totalActive");
	}
	$scope.maxUtilGraph = function(){
		graphLayout("max-per-trend-user?trend=perMonth&get=user&created=&owner=" + auth_user, "Month", "totalUtil");
	}
	$scope.maxUsageGraph = function(){
		graphLayout("max-per-trend-user?trend=perMonth&get=user&created=&owner=" + auth_user, "Month", "totalUsage");
	}
	$scope.xxxMinutesGraph = function(){
		graphPackages('sum-perday', '30Minutes');
	}
	$scope.iHourGraph = function(){
		graphPackages('sum-perday', '1Hour');
	}
	$scope.iiHoursGraph = function(){
		graphPackages('sum-perday', '2Hours');
	}
	$scope.vHoursGraph = function(){
		graphPackages('sum-perday', '5Hours');
	}
	$scope.iDayGraph = function(){
		graphPackages('sum-perday', '1Day');
	}
	$scope.iiDaysGraph = function(){
		graphPackages('sum-perday', '2Days');
	}
	$scope.ivDaysGraph = function(){
		graphPackages('sum-perday', '4Days');
	}
	$scope.iWeekGraph = function(){
		graphPackages('sum-perday', '1Week');
	}

	
	$scope.trend = "Per Week";
	myService.getActiveMacsUser('perMonth', 'getCount-user', '', auth_user).then(function(response){	
		$scope.devices = response.data;
	})
	$scope.getDropdown1 = function(dateParam){
		myService.getActiveMacsUser('perMonth', 'getMac-user', dateParam, auth_user).then(function(response){
			$scope.actives = response.data;
		})
	}
	myService.maxPerTrendUser('perMonth', 'user', '', auth_user).then(function(response){
		$scope.max = response.data;
	})

	$scope.packagesCharts = function(){
		//Initializes the preloader
		setTimeout(function () {
			$('.preloader').fadeIn();
		}, 200);
		
		var arr = [];
		myService.getActiveMacsUser("countActivePD", 'getMac-user', '', auth_user).then(function(response){
			var activemacs = response.data;
			var raw;
			for(var x=0; x<activemacs.length; x++){
				for(var y=0; y<30; y++){
					myService.packageSummary('perDay', activemacs[x]['activeDevice'], y).then(function(response){
						response.data.length != 0 ? raw = myService.packageDispense(response.data) : arr.pop();
						var spliter = raw['packages'].split(",");
						raw['30mins'] = parseInt(spliter[1],10);
						raw['1hr'] = parseInt(spliter[3],10);
						raw['2hrs'] = parseInt(spliter[5],10);
						raw['5hrs'] = parseInt(spliter[7],10);
						raw['1day'] = parseInt(spliter[9],10);
						raw['2days'] = parseInt(spliter[11],10);
						raw['4days'] = parseInt(spliter[13],10);
						raw['1week'] = parseInt(spliter[15],10);
						arr.push(raw);
					})
				}
			}
			myService.getActiveMacs("macs", '', '').then(function(response){
				arr = $filter('orderBy')(arr, '-dateCreated' );
				arr = arr.filter(Boolean);
				$http({
					method: 'POST',
					url: '/api/package-summary',
					data:   arr//{ data: JSON.stringify(arr)} //{mac: 'bbb', label: 'bbb', coords:'bbb', packages: 'bbb'}
				}).then(function successCallback(response){
					console.log("Success");
					$(".preloader").fadeOut();
					$('.db-p-frame').fadeIn();	
					$('.db-s-frame').hide();
					$(".db-graph-frame").attr("style", "margin-top: 70;");
					
					graphPackages('sum-perday', '30Minutes');
					myService.maxOfPackages('max-perday').then(function(response){
						$scope.xxxmins = response.data[0]['xxxmins'];
						$scope.ihr = response.data[0]['ihr'];
						$scope.iihrs = response.data[0]['iihrs'];
						$scope.vhrs = response.data[0]['vhrs'];
						$scope.iday = response.data[0]['iday'];
						$scope.iidays = response.data[0]['iidays'];
						$scope.ivdays = response.data[0]['ivdays'];
						$scope.iweek = response.data[0]['iweek'];
					})

				}, function errorCallback(response){
					console.log("fAILED");
				});		
			})
		})
	}
	
}]);

//SUMMARIES
macStats.controller('userReportsPD',
['$scope', '$http', 'myService', function($scope, $http, myService){
	//Get the authenticated user that logged in
	var auth_user = $(".auth-user").text();
	
	//Trend Indicator Variable
	$scope.trend = "Per Day";
	
	//Trend Url Array
	$scope.trendUrl = ["user/reports/Summary-perDay",
					  "user/reports/Summary-perWeek", 
					  "user/reports/Summary-perMonth"];
	
	//Inserted in beginning of url to indicate user & admin
	$scope.userTypeIndicator = "user";
	
	//RETURNS list of max values
	myService.maxPerTrendUser('perDay', 'user', '', auth_user).then(function(response){
		$scope.max = response.data;
	})
	//RETURNS the list of macs with connected values as dropdown
	$scope.maxEachMacs = function(dateParam){
		myService.maxPerTrendUser('perDay', 'getEach-user', dateParam, auth_user).then(function(response){
			$scope.eachMax = response.data;
		})
	}
	//RETURNS the list of number of active devices
	myService.getActiveMacsUser('perDay', 'getCount-user', '', auth_user).then(function(response){
		$scope.devices = response.data;
	})
	//RETURNS the list of active devices as dropdown
	$scope.activeDevices = function(dateParam){
		myService.getActiveMacsUser('perDay', 'getMac-user', dateParam, auth_user).then(function(response){
			$scope.actives = response.data;
		})
	}
}]);
macStats.controller('userReportsPW',
['$scope', '$http', 'myService', function($scope, $http, myService){
	var auth_user = $(".auth-user").text();
	$scope.trend = "Per Week";
	$scope.trendUrl = ["user/reports/Summary-perDay",
					  "user/reports/Summary-perWeek", 
					  "user/reports/Summary-perMonth"];
	$scope.userTypeIndicator = "user";
	
	myService.maxPerTrendUser('perWeek', 'user', '', auth_user).then(function(response){
		$scope.max = response.data;
	})
	$scope.maxEachMacs = function(dateParam){
		myService.maxPerTrendUser('perWeek', 'getEach-user', dateParam, auth_user).then(function(response){
			$scope.eachMax = response.data;
		})
	}
	myService.getActiveMacsUser('perWeek', 'getCount-user', '', auth_user).then(function(response){
		$scope.devices = response.data;
	})
	$scope.activeDevices = function(dateParam){
		myService.getActiveMacsUser('perWeek', 'getMac-user', dateParam, auth_user).then(function(response){
			$scope.actives = response.data;
		})
	}
}]);
macStats.controller('userReportsPM',
['$scope', '$http', 'myService', function($scope, $http, myService){
	var auth_user = $(".auth-user").text();
	$scope.trend = "Per Month";
	$scope.trendUrl = ["user/reports/Summary-perDay",
					  "user/reports/Summary-perWeek", 
					  "user/reports/Summary-perMonth"];
	$scope.userTypeIndicator = "user";
	
	myService.maxPerTrendUser('perMonth', 'user', '', auth_user).then(function(response){
		$scope.max = response.data;
	})
	$scope.maxEachMacs = function(dateParam){
		myService.maxPerTrendUser('perMonth', 'getEach-user', dateParam, auth_user).then(function(response){
			$scope.eachMax = response.data;
		})
	}
	myService.getActiveMacsUser('perMonth', 'getCount-user', '', auth_user).then(function(response){
		$scope.devices = response.data;
	})
	$scope.activeDevices = function(dateParam){
		myService.getActiveMacsUser('perMonth', 'getMac-user', dateParam, auth_user).then(function(response){
			$scope.actives = response.data;
		})
	}
}]);

//CHARTS
macStats.controller('userChartsPD',
['$scope', '$http', 'myService', function($scope, $http, myService){
	//Get the authenticated user that logged in
	var auth_user = $(".auth-user").text();
	
	$scope.trend = "Per Day";
	
	//Trend Url Array
	$scope.trendUrl = ["user/reports/Charts-perDay",
					  "user/reports/Charts-perWeek", 
					  "user/reports/Charts-perMonth"];
	
	//GRAPH FUNCTIONS
	graphActiveDevices("get-active-macs-user?trend=perDay&get=getCount-user&created=&owner=" + auth_user, "Day");
	graphMaxConnected("max-per-trend-user?trend=perDay&get=user&created=&owner=" + auth_user, "Day");	/*...*/
	graphMaxCcq("max-per-trend-user?trend=perDay&get=user&created=&owner=" + auth_user, "Day");
	graphMaxUtil("max-per-trend-user?trend=perDay&get=user&created=&owner=" + auth_user, "Day");
	graphMaxUsage("max-per-trend-user?trend=perDay&get=user&created=&owner=" + auth_user, "Day");
	graphMaxLease("max-per-trend-user?trend=perDay&get=user&created=&owner=" + auth_user, "Day");
	graphMaxFreeMem("max-per-trend-user?trend=perDay&get=user&created=&owner=" + auth_user, "Day");
	graphMaxCpuFreq("max-per-trend-user?trend=perDay&get=user&created=&owner=" + auth_user, "Day");
	graphMaxCpuLoad("max-per-trend-user?trend=perDay&get=user&created=&owner=" + auth_user, "Day");
	graphMaxFreeHdd("max-per-trend-user?trend=perDay&get=user&created=&owner=" + auth_user, "Day");
	
}]);
macStats.controller('userChartsPW',
['$scope', '$http', 'myService', function($scope, $http, myService){
	var auth_user = $(".auth-user").text();
	$scope.trend = "Per Week";
	$scope.trendUrl = ["user/reports/Charts-perDay",
					  "user/reports/Charts-perWeek", 
					  "user/reports/Charts-perMonth"];
	
	graphActiveDevices("get-active-macs-user?trend=perWeek&get=getCount-user&created=&owner=" + auth_user, "Week");
	graphMaxConnected("max-per-trend-user?trend=perWeek&get=user&created=&owner=" + auth_user, "Week");
	graphMaxCcq("max-per-trend-user?trend=perWeek&get=user&created=&owner=" + auth_user, "Week");
	graphMaxUtil("max-per-trend-user?trend=perWeek&get=user&created=&owner=" + auth_user, "Week");
	graphMaxUsage("max-per-trend-user?trend=perWeek&get=user&created=&owner=" + auth_user, "Week");
	graphMaxLease("max-per-trend-user?trend=perWeek&get=user&created=&owner=" + auth_user, "Week");
	graphMaxFreeMem("max-per-trend-user?trend=perWeek&get=user&created=&owner=" + auth_user, "Week");
	graphMaxCpuFreq("max-per-trend-user?trend=perWeek&get=user&created=&owner=" + auth_user, "Week");
	graphMaxCpuLoad("max-per-trend-user?trend=perWeek&get=user&created=&owner=" + auth_user, "Week");
	graphMaxFreeHdd("max-per-trend-user?trend=perWeek&get=user&created=&owner=" + auth_user, "Week");
	
}]);
macStats.controller('userChartsPM',
['$scope', '$http', 'myService', function($scope, $http, myService){
	var auth_user = $(".auth-user").text();
	$scope.trend = "Per Month";
	$scope.trendUrl = ["user/reports/Charts-perDay",
					  "user/reports/Charts-perWeek", 
					  "user/reports/Charts-perMonth"];
	
	graphActiveDevices("get-active-macs-user?trend=perMonth&get=getCount-user&created=&owner=" + auth_user, "Month");
	graphMaxConnected("max-per-trend-user?trend=perMonth&get=user&created=&owner=" + auth_user, "Month");
	graphMaxCcq("max-per-trend-user?trend=perMonth&get=user&created=&owner=" + auth_user, "Month");
	graphMaxUtil("max-per-trend-user?trend=perMonth&get=user&created=&owner=" + auth_user, "Month");
	graphMaxUsage("max-per-trend-user?trend=perMonth&get=user&created=&owner=" + auth_user, "Month");
	graphMaxLease("max-per-trend-user?trend=perMonth&get=user&created=&owner=" + auth_user, "Month");
	graphMaxFreeMem("max-per-trend-user?trend=perMonth&get=user&created=&owner=" + auth_user, "Month");
	graphMaxCpuFreq("max-per-trend-user?trend=perMonth&get=user&created=&owner=" + auth_user, "Month");
	graphMaxCpuLoad("max-per-trend-user?trend=perMonth&get=user&created=&owner=" + auth_user, "Month");
	graphMaxFreeHdd("max-per-trend-user?trend=perMonth&get=user&created=&owner=" + auth_user, "Month");
	
}]);

/*PERMAC*/
macStats.controller('userPermacPD',
['$scope', '$http', 'myService', '$timeout', function($scope, $http, myService, $timeout){	
	//Get the authenticated user that logged in
	var auth_user = $(".auth-user").text();
	
	//Inserted in beginnin of url to indicate user & admin
	$scope.userTypeIndicator = "user";

	//Trend Url Array
	$scope.trendUrl = ["user/reports/PerMac-perDay", 
					   "user/reports/PerMac-perWeek", 
					   "user/reports/PerMac-perMonth"];
	
	$(".permac-packages").hide();

	//RETURNS list of macs utilizations
	myService.macsPerTrendUser('perDay', auth_user).then(function(response){
		$scope.utilizations = response.data;
	})
	//Function that searches macs
	$scope.searchMac = function(mac){
		myService.searchMac(mac).then(function(response){
			$scope.results = response.data;
		})
	}

}]);
macStats.controller('userPermacPW',
['$scope', '$http', 'myService', '$timeout', function($scope, $http, myService, $timeout){	
	var auth_user = $(".auth-user").text();
	$scope.userTypeIndicator = "user";
	$scope.trendUrl = ["user/reports/PerMac-perDay", 
					   "user/reports/PerMac-perWeek", 
					   "user/reports/PerMac-perMonth"];	
	
	$(".permac-packages").hide();

	myService.macsPerTrendUser('perWeek', auth_user).then(function(response){
		$scope.utilizations = response.data;
	})
	$scope.searchMac = function(mac){
		myService.searchMac(mac).then(function(response){
			$scope.results = response.data;
		})
	}

}]);
macStats.controller('userPermacPM',
['$scope', '$http', 'myService', '$timeout', function($scope, $http, myService, $timeout){	
	var auth_user = $(".auth-user").text();
	$scope.userTypeIndicator = "user";
	$scope.trendUrl = ["user/reports/PerMac-perDay", 
					   "user/reports/PerMac-perWeek", 
					   "user/reports/PerMac-perMonth"];
	
	$(".permac-packages").hide();
	
	myService.macsPerTrendUser('perMonth', auth_user).then(function(response){
		$scope.utilizations = response.data;
	})
	$scope.searchMac = function(mac){
		myService.searchMac(mac).then(function(response){
			$scope.results = response.data;
		})
	}

}]);

/*PERMAC-ACTIVITY*/
macStats.controller('userPermacActivityPD',
['$scope', '$http', '$location', 'myService', function($scope, $http, $location, myService){
// use $location.path() or url() or absUrl() to get current url path
// use $location.search() to get current url search hash eg.(/macs?mac=1011200107) returns mac=1011200107 as object
// use $location.hash() to get current url hash eg.(/macs?mac=1011200107&foo=bar) returns foo=bar as object
	$(".permac-graph").attr("style", "display:block");
	
	//Gets the query parameter of current url as object
	var urlParam = $location.search();
	
	//Store the query parameter value in variable
	$scope.macParam = urlParam.mac;
	
	//Inserted in beginnin of url to indicate user & admin
	$scope.userTypeIndicator = "user";
	
	//Trend Url Array
	$scope.trendUrl = ["user/reports/PerMac-perDay/macs?mac=" + $scope.macParam, 
					   "user/reports/PerMac-perWeek/macs?mac=" + $scope.macParam, 
					   "user/reports/PerMac-perMonth/macs?mac=" + $scope.macParam];

	//RETURNS THE LIST of each specific mac utilizations
	myService.permacActivity('perDay', $scope.macParam).then(function(response){
		$scope.utilizations = response.data;
	})
	//Function that searches macs
	$scope.searchMac = function(mac){
		myService.searchMac(mac).then(function(response){
			$scope.results = response.data;
		})
	}

	//Same as ADMIN PERMAC ACTIVITY section
	var arr = [];
	for(var y=0; y<30; y++){
		myService.packageSummary('perDay', $scope.macParam, y).then(function(response){
			response.data.length != 0 ? $scope.b = myService.packageDispense(response.data) : arr.pop();
			arr.push($scope.b);
		})
	}
	$scope.packageSummary = arr;

}]);
macStats.controller('userPermacActivityPW',
['$scope', '$http', '$location', 'myService', function($scope, $http, $location, myService){
	$(".permac-graph").attr("style", "display:block");
	var urlParam = $location.search();
	$scope.macParam = urlParam.mac;
	
	$scope.userTypeIndicator = "user";
	$scope.trendUrl = ["user/reports/PerMac-perDay/macs?mac=" + $scope.macParam, 
					   "user/reports/PerMac-perWeek/macs?mac=" + $scope.macParam, 
					   "user/reports/PerMac-perMonth/macs?mac=" + $scope.macParam];

	myService.permacActivity('perWeek', $scope.macParam).then(function(response){
		$scope.utilizations = response.data;
	})
	$scope.searchMac = function(mac){
		myService.searchMac(mac).then(function(response){
			$scope.results = response.data;
		})
	}

	var arr = [];
	for(var y=0; y<30; y++){
		myService.packageSummary('perWeek', $scope.macParam, y).then(function(response){
			response.data.length != 0 ? $scope.b = myService.packageDispense(response.data) : arr.pop();
			arr.push($scope.b);
		})
	}
	$scope.packageSummary = arr;

}]);
macStats.controller('userPermacActivityPM',
['$scope', '$http', '$location', 'myService', function($scope, $http, $location, myService){
	$(".permac-graph").attr("style", "display:block");
	var urlParam = $location.search();
	$scope.macParam = urlParam.mac;
	
	$scope.userTypeIndicator = "user";
	$scope.trendUrl = ["user/reports/PerMac-perDay/macs?mac=" + $scope.macParam, 
					   "user/reports/PerMac-perWeek/macs?mac=" + $scope.macParam, 
					   "user/reports/PerMac-perMonth/macs?mac=" + $scope.macParam];

	myService.permacActivity('perMonth', $scope.macParam).then(function(response){
		$scope.utilizations = response.data;
	})
	$scope.searchMac = function(mac){
		myService.searchMac(mac).then(function(response){
			$scope.results = response.data;
		})
	}

	var arr = [];
	for(var y=0; y<30; y++){
		myService.packageSummary('perDay', $scope.macParam, y).then(function(response){
			response.data.length != 0 ? $scope.b = myService.packageDispense(response.data) : arr.pop();
			arr.push($scope.b);
		})
	}
	$scope.packageSummary = arr;

}]);

/*CHARTS PERMAC-ACTIVITY*/
macStats.controller('userChartsPermacActPD',
['$scope', '$http', '$location', 'myService', '$filter', function($scope, $http, $location, myService, $filter){
	//Hides the connected chart container
	$(".chart-active-container").hide();
	$(".chart-connected-container").attr("style", "display: block; margin: auto; border-top: 4px solid rgba(0, 204, 47, 0.76); width: 80%; height:400px");
	$(".canvas-connected-container").attr("style", "height: 300px");

	//Gets the query parameter of current url in object form
	var urlParam = $location.search();
	//Gets the value of query parameter from object and stored in variable
	$scope.macParam = urlParam.mac;
	
	$scope.trend = "Per Day";
	
	//Inserted in beginnin of url to indicate user & admin
	$scope.userTypeIndicator = "user";

	//Trend Url Array
	$scope.trendUrl = ["user/reports/Charts-perDay/macs?mac=" + $scope.macParam, 
					   "user/reports/Charts-perWeek/macs?mac=" + $scope.macParam, 
					   "user/reports/Charts-perMonth/macs?mac=" + $scope.macParam];	

	//Calling of Graph Functions
	graphMaxConnected("permac-activity?trend=perDay-graph&mac=" + $scope.macParam, "Day");
	graphMaxCcq("permac-activity?trend=perDay-graph&mac=" + $scope.macParam, "Day");
	graphMaxUtil("permac-activity?trend=perDay-graph&mac=" + $scope.macParam, "Day");
	graphMaxUsage("permac-activity?trend=perDay-graph&mac=" + $scope.macParam, "Day");
	graphMaxLease("permac-activity?trend=perDay-graph&mac=" + $scope.macParam, "Day");
	graphMaxFreeMem("permac-activity?trend=perDay-graph&mac=" + $scope.macParam, "Day");
	graphMaxCpuFreq("permac-activity?trend=perDay-graph&mac=" + $scope.macParam, "Day");
	graphMaxCpuLoad("permac-activity?trend=perDay-graph&mac=" + $scope.macParam, "Day");
	graphMaxFreeHdd("permac-activity?trend=perDay-graph&mac=" + $scope.macParam, "Day");

	var arr = [];	
	for(var y=0; y<30; y++){
		myService.packageSummary('perDay', $scope.macParam, y).then(function(response){
			response.data.length != 0 ? $scope.b = myService.packageDispense(response.data) : arr.pop();
			arr.push($scope.b);
		})
	}
		
	myService.permacActivity('perDay', $scope.macParam).then(function(response){
		//Sort the resulted array
		arr = $filter('orderBy')(arr, '-dateCreated' );
		//Remove the undefined index of resulted array
		arr = arr.filter(Boolean);

		xxxMinutesGraph(arr, 'perDay');
		iHourGraph(arr, 'perDay');
		iiHoursGraph(arr, 'perDay');
		vHoursGraph(arr, 'perDay');
		iDayGraph(arr, 'perDay');
		iiDaysGraph(arr, 'perDay');
		ivDaysGraph(arr, 'perDay');
		iWeekGraph(arr, 'perDay');
		packagesGraph(arr, 'perDay');
		//console.log(arr);
	})
	
}])
macStats.controller('userChartsPermacActPW',
['$scope', '$http', '$location', 'myService', '$filter', function($scope, $http, $location, myService, $filter){
	$(".chart-active-container").hide();
	$(".chart-connected-container").attr("style", "display: block; margin: auto; border-top: 4px solid rgba(0, 204, 47, 0.76); width: 80%; height:400px");
	$(".canvas-connected-container").attr("style", "height: 300px");

	var urlParam = $location.search();
	$scope.macParam = urlParam.mac;
	
	$scope.trend = "Per Week";
	$scope.userTypeIndicator = "user";
	$scope.trendUrl = ["user/reports/Charts-perDay/macs?mac=" + $scope.macParam, 
					   "user/reports/Charts-perWeek/macs?mac=" + $scope.macParam, 
					   "user/reports/Charts-perMonth/macs?mac=" + $scope.macParam];

	graphMaxConnected("permac-activity?trend=perWeek&mac=" + $scope.macParam, "Week");
	graphMaxCcq("permac-activity?trend=perWeek&mac=" + $scope.macParam, "Week");
	graphMaxUtil("permac-activity?trend=perWeek&mac=" + $scope.macParam, "Week");
	graphMaxUsage("permac-activity?trend=perWeek&mac=" + $scope.macParam, "Week");
	graphMaxLease("permac-activity?trend=perWeek&mac=" + $scope.macParam, "Week");
	graphMaxFreeMem("permac-activity?trend=perWeek&mac=" + $scope.macParam, "Week");
	graphMaxCpuFreq("permac-activity?trend=perWeek&mac=" + $scope.macParam, "Week");
	graphMaxCpuLoad("permac-activity?trend=perWeek&mac=" + $scope.macParam, "Week");
	graphMaxFreeHdd("permac-activity?trend=perWeek&mac=" + $scope.macParam, "Week");

	var arr = [];	
	for(var y=0; y<30; y++){
		myService.packageSummary('perWeek', $scope.macParam, y).then(function(response){
			response.data.length != 0 ? $scope.b = myService.packageDispense(response.data) : arr.pop();
			arr.push($scope.b);
		})
	}
		
	myService.permacActivity('perDay', $scope.macParam).then(function(response){
		//Sort the resulted array
		arr = $filter('orderBy')(arr, '-dateCreated' );
		//Remove the undefined index of resulted array
		arr = arr.filter(Boolean);

		xxxMinutesGraph(arr, 'perWeek');
		iHourGraph(arr, 'perWeek');
		iiHoursGraph(arr, 'perWeek');
		vHoursGraph(arr, 'perWeek');
		iDayGraph(arr, 'perWeek');
		iiDaysGraph(arr, 'perWeek');
		ivDaysGraph(arr, 'perWeek');
		iWeekGraph(arr, 'perWeek');
		packagesGraph(arr, 'perWeek');
		//console.log(arr);
	})
}])
macStats.controller('userChartsPermacActPM',
['$scope', '$http', '$location', 'myService', '$filter', function($scope, $http, $location, myService, $filter){
	$(".chart-active-container").hide();
	$(".chart-connected-container").attr("style", "display: block; margin: auto; border-top: 4px solid rgba(0, 204, 47, 0.76); width: 80%; height:400px");
	$(".canvas-connected-container").attr("style", "height: 300px");

	var urlParam = $location.search();
	$scope.macParam = urlParam.mac;
	
	$scope.trend = "Per Month";
	$scope.userTypeIndicator = "user";
	$scope.trendUrl = ["user/reports/Charts-perDay/macs?mac=" + $scope.macParam, 
					   "user/reports/Charts-perWeek/macs?mac=" + $scope.macParam, 
					   "user/reports/Charts-perMonth/macs?mac=" + $scope.macParam];

	graphMaxConnected("permac-activity?trend=perMonth&mac=" + $scope.macParam, "Month");
	graphMaxCcq("permac-activity?trend=perMonth&mac=" + $scope.macParam, "Month");
	graphMaxUtil("permac-activity?trend=perMonth&mac=" + $scope.macParam, "Month");
	graphMaxUsage("permac-activity?trend=perMonth&mac=" + $scope.macParam, "Month");
	graphMaxLease("permac-activity?trend=perMonth&mac=" + $scope.macParam, "Month");
	graphMaxFreeMem("permac-activity?trend=perMonth&mac=" + $scope.macParam, "Month");
	graphMaxCpuFreq("permac-activity?trend=perMonth&mac=" + $scope.macParam, "Month");
	graphMaxCpuLoad("permac-activity?trend=perMonth&mac=" + $scope.macParam, "Month");
	graphMaxFreeHdd("permac-activity?trend=perMonth&mac=" + $scope.macParam, "Month");

	var arr = [];	
	for(var y=0; y<30; y++){
		myService.packageSummary('perDay', $scope.macParam, y).then(function(response){
			response.data.length != 0 ? $scope.b = myService.packageDispense(response.data) : arr.pop();
			arr.push($scope.b);
		})
	}
		
	myService.permacActivity('perDay', $scope.macParam).then(function(response){
		//Sort the resulted array
		arr = $filter('orderBy')(arr, '-dateCreated' );
		//Remove the undefined index of resulted array
		arr = arr.filter(Boolean);

		xxxMinutesGraph(arr, 'perMonth');
		iHourGraph(arr, 'perMonth');
		iiHoursGraph(arr, 'perMonth');
		vHoursGraph(arr, 'perMonth');
		iDayGraph(arr, 'perMonth');
		iiDaysGraph(arr, 'perMonth');
		ivDaysGraph(arr, 'perMonth');
		iWeekGraph(arr, 'perMonth');
		packagesGraph(arr, 'perMonth');
		//console.log(arr);
	})
}])

/*JQUERY EVENTS*/
//Dashboard Events
$("body").on("click", ".stats-tab", function(){
	$(".db-s-frame").fadeIn();
	$(".db-p-frame").hide();
	$(".db-graph-frame").attr("style", "margin-top: 20;")
});

$("body").on("click", ".db-line", function(){
	$("#canvas1").show();
	$("#canvas2").hide();
});
$("body").on("click", ".db-bar", function(){
	$("#canvas2").attr("style", "display:block !important; width:100%; height:100%;");
	$("#canvas1").hide();
});
//Summaries and PerMac Events
$("body").on("click", ".reports-pri", function(){
	$(".reports-tb1").show();
	$(".reports-tb2").hide();
});
$("body").on("click", ".reports-sec", function(){
	$(".reports-tb2").show();
	$(".reports-tb1").hide();
});
$("body").on("click", ".permac-pri", function(){
	$(".permac-tb1").show();
	$(".permac-tb2").hide();
	$(".permac-tb3").hide();
	$(".permac-tb4").hide();
	$(".permac-tb5").hide();
	$(".permac-search-results").hide();
});
$("body").on("click", ".permac-sec", function(){
	$(".permac-tb2").show();
	$(".permac-tb1").hide();
	$(".permac-tb3").hide();
	$(".permac-tb4").hide();
	$(".permac-tb5").hide();
	$(".permac-search-results").hide();
});
$("body").on("click", ".permac-tri", function(){
	$(".permac-tb3").show();
	$(".permac-tb1").hide();
	$(".permac-tb2").hide();
	$(".permac-tb4").hide();
	$(".permac-tb5").hide();
	$(".permac-search-results").hide();
});
$("body").on("click", ".permac-4th", function(){
	$(".permac-tb4").show();
	$(".permac-tb1").hide();
	$(".permac-tb2").hide();
	$(".permac-tb3").hide();
	$(".permac-tb5").hide();
	$(".permac-search-results").hide();
});
$("body").on("click", ".permac-packages", function(){
	$(".permac-tb5").show();
	$(".permac-tb1").hide();
	$(".permac-tb2").hide();
	$(".permac-tb3").hide();
	$(".permac-tb4").hide();
	$(".permac-search-results").hide();
});
$("body").on("click", ".show-results", function(){
	$(".permac-search-results").show();
	$(".permac-tb1").hide();
	$(".permac-tb2").hide();
	$(".permac-tb3").hide();
	$(".permac-tb4").hide();
	$(".permac-tb5").hide();	
});
//Charts Events
$("body").on("click", ".active-line", function(){
	$("#canvas1").show();
	$("#canvas2").hide();
});
$("body").on("click", ".active-bar", function(){
	$("#canvas2").attr("style", "display:block !important; width:100%; height:100%;");
	$("#canvas1").hide();
});
$("body").on("click", ".connected-line", function(){
	$("#canvas3").show();
	$("#canvas4").hide();
});
$("body").on("click", ".connected-bar", function(){
	$("#canvas4").attr("style", "display:block !important; width:100%; height:100%;");
	$("#canvas3").hide();
});
$("body").on("click", ".ccq-line", function(){
	$("#canvas5").show();
	$("#canvas6").hide();
});
$("body").on("click", ".ccq-bar", function(){
	$("#canvas6").attr("style", "display:block !important; width:100%; height:100%;");
	$("#canvas5").hide();
});
$("body").on("click", ".util-line", function(){
	$("#canvas7").show();
	$("#canvas8").hide();
});
$("body").on("click", ".util-bar", function(){
	$("#canvas8").attr("style", "display:block !important; width:100%; height:100%;");
	$("#canvas7").hide();
});
$("body").on("click", ".usage-line", function(){
	$("#canvas9").show();
	$("#canvas10").hide();
});
$("body").on("click", ".usage-bar", function(){
	$("#canvas10").attr("style", "display:block !important; width:100%; height:100%;");
	$("#canvas9").hide();
});
$("body").on("click", ".lease-line", function(){
	$("#canvas11").show();
	$("#canvas12").hide();
});
$("body").on("click", ".lease-bar", function(){
	$("#canvas12").attr("style", "display:block !important; width:100%; height:100%;");
	$("#canvas11").hide();
});
$("body").on("click", ".freeMem-line", function(){
	$("#canvas13").show();
	$("#canvas14").hide();
});
$("body").on("click", ".freeMem-bar", function(){
	$("#canvas14").attr("style", "display:block !important; width:100%; height:100%;");
	$("#canvas13").hide();
});
$("body").on("click", ".cpuFreq-line", function(){
	$("#canvas15").show();
	$("#canvas16").hide();
});
$("body").on("click", ".cpuFreq-bar", function(){
	$("#canvas16").attr("style", "display:block !important; width:100%; height:100%;");
	$("#canvas15").hide();
});
$("body").on("click", ".cpuLoad-line", function(){
	$("#canvas17").show();
	$("#canvas18").hide();
});
$("body").on("click", ".cpuLoad-bar", function(){
	$("#canvas18").attr("style", "display:block !important; width:100%; height:100%;");
	$("#canvas17").hide();
});
$("body").on("click", ".freeHdd-line", function(){
	$("#canvas19").show();
	$("#canvas20").hide();
});
$("body").on("click", ".freeHdd-bar", function(){
	$("#canvas20").attr("style", "display:block !important; width:100%; height:100%;");
	$("#canvas19").hide();
});
$("body").on("click", ".30mins-line", function(){
	$("#canvas21").show();
	$("#canvas22").hide();
});
$("body").on("click", ".30mins-bar", function(){
	$("#canvas22").attr("style", "display:block !important; width:100%; height:100%;");
	$("#canvas21").hide();
});
$("body").on("click", ".1hour-line", function(){
	$("#canvas23").show();
	$("#canvas24").hide();
});
$("body").on("click", ".1hour-bar", function(){
	$("#canvas24").attr("style", "display:block !important; width:100%; height:100%;");
	$("#canvas23").hide();
});
$("body").on("click", ".2hours-line", function(){
	$("#canvas25").show();
	$("#canvas26").hide();
});
$("body").on("click", ".2hours-bar", function(){
	$("#canvas26").attr("style", "display:block !important; width:100%; height:100%;");
	$("#canvas25").hide();
});
$("body").on("click", ".5hours-line", function(){
	$("#canvas27").show();
	$("#canvas28").hide();
});
$("body").on("click", ".5hours-bar", function(){
	$("#canvas28").attr("style", "display:block !important; width:100%; height:100%;");
	$("#canvas27").hide();
});
$("body").on("click", ".1day-line", function(){
	$("#canvas29").show();
	$("#canvas30").hide();
});
$("body").on("click", ".1day-bar", function(){
	$("#canvas30").attr("style", "display:block !important; width:100%; height:100%;");
	$("#canvas29").hide();
});
$("body").on("click", ".2days-line", function(){
	$("#canvas31").show();
	$("#canvas32").hide();
});
$("body").on("click", ".2days-bar", function(){
	$("#canvas32").attr("style", "display:block !important; width:100%; height:100%;");
	$("#canvas31").hide();
});
$("body").on("click", ".4days-line", function(){
	$("#canvas33").show();
	$("#canvas34").hide();
});
$("body").on("click", ".4days-bar", function(){
	$("#canvas34").attr("style", "display:block !important; width:100%; height:100%;");
	$("#canvas33").hide();
});
$("body").on("click", ".1week-line", function(){
	$("#canvas35").show();
	$("#canvas36").hide();
});
$("body").on("click", ".1week-bar", function(){
	$("#canvas36").attr("style", "display:block !important; width:100%; height:100%;");
	$("#canvas35").hide();
});
$("body").on("click", ".packages-line", function(){
	$("#canvas37").show();
	$("#canvas38").hide();
});
$("body").on("click", ".packages-bar", function(){
	$("#canvas38").attr("style", "display:block !important; width:100%; height:100%;");
	$("#canvas37").hide();
});


$("body").on("click", ".stats-tab", function(){
	$(".stats-graph").show();
	$(".packages-graph").hide();
});
$("body").on("click", ".packages-tab", function(){
	$(".packages-graph").show();
	$(".stats-graph").hide();
});


/*MAC ADMNISTRATION SECTION*/
$("body").on("click", ".user", function(){
	$(".am-table4").show();
	$(".am-table3").hide();
});
$("body").on("click", ".btn-view-all", function(){
	$(".am-table3").show();
	$(".am-table4").hide();
});

/*	TIMER FUNCTION THAT COUNTS ON DISPLAY
	$scope.time = 0;
	$scope.num = 5000
    var timer = function() {
    	if( $scope.time < $scope.num ) {
        	$scope.time += 2;
            $timeout(timer, 0.01);
        }
    }
    $timeout(timer, 1);*/

	/*myService.perMac('perDay').then(function(response){
		$scope.utilizations = [];
		$scope.loadMore = function(){
			var last = response.data[response.data.length-1];
			for(var x=1; x<=response.data.length; x++){
				$scope.utilizations.push(last + x);
			}
		}
	})*/
