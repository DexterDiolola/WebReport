macStats.factory('myService',['$http', '$route', function($http, $route){
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
	function mapInit(obj, center, userType){
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
						 "<a href=' " +userType+ "/reports/permac/macs?mac=" +obj.mac+ " '><b style='font-weight: 500;'>" + obj.mac + "</b></a> </br>" +
						 '<b>' + obj.coords2 + '</b>'
			});

			marker.addListener('click', function(){
				infoWindow.open(map, marker);
			});
		}
	}

	function sendAlert(user){
		//If mac = ' the user is admin'
		var url;
		user=='admin' ? url = '/api/macs-per-trend?trend=alert' : url = '/api/macs-per-trend-user?trend=alert&owner=' + user;
		$http.get(url).then(function(response){
			var arr = [];
			var data = response.data;
			$http.get('/api/alerts?cond=getMax').then(function(response){
				var alertValues = response.data;
				for(var x=0; x<data.length; x++){
					data[x]['cpuLoad']>alertValues[0]['cpuLoad'] ?
					arr.push({mac: data[x]['mac'],
							  label: data[x]['label'],
							  owner: data[x]['owner'],
							  alertType: 'CPU Load',
							  alertMsg: 'got a value of CPU Load = ' +data[x]['cpuLoad']+ ' which exceeds the max value of ' + Math.round(alertValues[0]['cpuLoad']),
							  dateCreated: data[x]['dateCreated']}) : true;

					data[x]['ccq']<alertValues[0]['ccq'] ? 
					arr.push({mac: data[x]['mac'],
							  label: data[x]['label'],
							  owner: data[x]['owner'], 
							  alertType: 'Ccq',
							  alertMsg: 'got a value of Ccq = ' +data[x]['ccq']+  ' which is less than ' + Math.round(alertValues[0]['ccq']), 
							  dateCreated: data[x]['dateCreated']}) : true;

					data[x]['freeMem']<Math.round(alertValues[0]['freeMem']) ? 
					arr.push({mac: data[x]['mac'],
							  label: data[x]['label'],
							  owner: data[x]['owner'], 
							  alertType: 'Free Memory',
							  alertMsg: 'got a value of Free Memory = ' +data[x]['freeMem']+  ' which is less than ' + Math.round(alertValues[0]['freeMem']), 
							  dateCreated: data[x]['dateCreated']}) : true;
				}

				$http({
					method: 'POST',
					url: '/api/send-alerts',
					data: arr
				}).then(function successCallback(response){
					console.log(arr);
				}, function errorCallback(response){
					console.log('failed');
				})
			})
			
			
			setTimeout(function(){
				sendAlert(user);
			},500000);
		})
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
		getAlerts: function(){
			return $http({
				method: 'GET',
				url: '/api/alerts?cond=getAlert'
			})
		},
		getViews: function(cond, routerMac, userMac){
			return $http({
				method: 'GET',
				url: '/api/get-views?cond=' + cond + '&routerMac=' + routerMac + '&userMac=' + userMac
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
		mapInit: mapInit,
		sendAlert: sendAlert
		

	};
}]);

/*--------------------------------DASHBOARD SECTION-------------------------------------*/

macStats.controller('dashboardController',
['$scope', '$http', 'myService', '$filter', function($scope, $http, myService, $filter){
	
	$scope.init = function(trend, ctrend, strend, mtrend){
		//DEBUGGING SECTION
		

		$('.db-fadeIn').hide();
		setTimeout(function () {
			$('.db-fadeIn').fadeIn();
		}, 400);

		//Inserted in beginnin of url to indicate user & admin
		$scope.userTypeIndicator = "admin";
		//RETURNS dashboard total active value
		myService.getActiveMacs(ctrend, 'getCount', '').then(function(response){
			$scope.dashTotalActive = response.data[0].activeDevice;
		})
		//RETURNS dropdown values in total active value
		myService.getActiveMacs(ctrend, 'getMac', '').then(function(response){
			$scope.activeDevices = response.data;
		})
		//RETURNS max connected, util-tx-rx, usage-tx-rx values
		myService.maxPerTrend(trend, 'getSum', '').then(function(response){
			$scope.dashTotalConnected = response.data[0].active;
			$scope.dashMaxUtiltx = Math.round(response.data[0].utiltx);
			$scope.dashMaxUtilrx = Math.round(response.data[0].utilrx);
			$scope.dashMaxUsagetx = response.data[0].usagetx;
			$scope.dashMaxUsagerx = response.data[0].usagerx;
		})
		myService.getViews('max-'+trend, '', '').then(function(response){
			$scope.totalViews = response.data[0].totalViews;
		})
		myService.getViews('max-overall', '', '').then(function(response){
			$scope.trend = trend;
			$scope.overallViews = response.data[0].totalViews;
		})
		//RETURNS dateCreated as parameter to get the dropdown values in max connected
		myService.maxPerTrend(trend, 'getSumDate', '').then(function(response){
			myService.maxPerTrend(trend, 'getEach', response.data[0].dateCreated).then(function(response){
				$scope.eachMax = response.data;
			})
		})

		//Calls the Graph Functions Section
		graphActiveDevices('get-active-macs?trend=' +trend+ '&get=getCount&created=', trend);
		
		$scope.activeDevicesGraph = function(){
			graphActiveDevices('get-active-macs?trend=' +trend+ '&get=getCount&created=', trend);
		}
		$scope.maxConnectedGraph = function(){
			graphLayout('max-per-trend?trend=' +trend+ '&get=&created=', trend, 'totalActive');
		}
		$scope.maxUtilGraph = function(){
			graphLayout('max-per-trend?trend=' +trend + '&get=&created=', trend, 'totalUtil');
		}
		$scope.graphViewCount = function(){
			graphViewCount('get-views?cond=graph-' +trend+ '&routerMac=&userMac=', trend);
		}

		$scope.xxxMinutesGraph = function(){
			graphPackages(strend, '30Minutes');
		}
		$scope.iHourGraph = function(){
			graphPackages(strend, '1Hour');
		}
		$scope.iiHoursGraph = function(){
			graphPackages(strend, '2Hours');
		}
		$scope.vHoursGraph = function(){
			graphPackages(strend, '5Hours');
		}
		$scope.iDayGraph = function(){
			graphPackages(strend, '1Day');
		}
		$scope.iiDaysGraph = function(){
			graphPackages(strend, '2Days');
		}
		$scope.ivDaysGraph = function(){
			graphPackages(strend, '4Days');
		}
		$scope.iWeekGraph = function(){
			graphPackages(strend, '1Week');
		}


		//RETURNS the list of active devices
		$scope.trend = "Per Day";
		myService.getActiveMacs(trend, 'getCount', '').then(function(response){	  /*Table Data Section*/
			$scope.devices = response.data;
		})
		//RETURNS the list of active macs as dropdown
		$scope.getDropdown1 = function(dateParam){
			myService.getActiveMacs(trend, 'getMac', dateParam).then(function(response){
				$scope.actives = response.data;
			})
		}
		//RETURNS the list of max values
		myService.maxPerTrend(trend, '', '').then(function(response){
			$scope.max = response.data;
		})
		//RETURNS the list of views count
		myService.getViews(trend, '', '').then(function(response){
			$scope.countList = response.data;
		})


		$scope.packagesCharts = function(){
			//Initializes the preloader
			setTimeout(function () {
				$('.preloader').fadeIn();
			}, 200);
			
			var arr = [];
			myService.getActiveMacs('countActivePD', 'getMac', '').then(function(response){
				var activemacs = response.data;
				var raw;
				for(var x=0; x<activemacs.length; x++){
					for(var y=0; y<30; y++){
						myService.packageSummary(trend, activemacs[x]['activeDevice'], y).then(function(response){
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
						
						graphPackages(strend, '30Minutes');
						myService.maxOfPackages(mtrend).then(function(response){
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


		myService.sendAlert('admin');
		setTimeout(function(){
			myService.getAlerts().then(function(response){
				$scope.alerts = response.data;
			})	
		},2000);
		


		//Declare array container
		var arr = [];
		//Call the factory function that returns the list of mac addresses
		myService.getActiveMacs('macs', '', '').then(function(response){
			$scope.fetch = response.data;
			for(var x=0; x<$scope.fetch.length; x++){
				arr.push(myService.modCoords($scope.fetch[x]));
			}
			myService.mapInit(arr, {lat: 14.5577445, lng:121.0230858}, 'admin');
			$scope.locations = arr;
		})	

	}
}]);

/*--------------------------------DASHBOARD USER SECTION-------------------------------------*/
macStats.controller('dashboardControllerUser',
['$scope', '$http', 'myService', '$filter', function($scope, $http, myService, $filter){
	$scope.init = function(trend, ctrend, strend, mtrend){

		$('.db-fadeIn').hide();
		setTimeout(function () {
			$('.db-fadeIn').fadeIn();
		}, 400);

		//Get the authenticated user that logged in
		var auth_user = $(".auth-user").text();
		//Inserted in beginnin of url to indicate user & admin
		$scope.userTypeIndicator = "user";
		

		//RETURNS dashboard total active value
		myService.getActiveMacsUser(ctrend, 'getCount-user', '', auth_user).then(function(response){
			$scope.dashTotalActive = response.data[0].activeDevice;
		})
		//RETURNS dropdown values in total active value
		myService.getActiveMacsUser(ctrend, 'getMac-user', '', auth_user).then(function(response){
			$scope.activeDevices = response.data;
		})
		//RETURNS max connected, util-tx-rx, usage-tx-rx values
		myService.maxPerTrendUser(trend, 'getSum-user', '', auth_user).then(function(response){
			$scope.dashTotalConnected = response.data[0].active;
			$scope.dashMaxUtiltx = Math.round(response.data[0].utiltx);
			$scope.dashMaxUtilrx = Math.round(response.data[0].utilrx);
			$scope.dashMaxUsagetx = response.data[0].usagetx;
			$scope.dashMaxUsagerx = response.data[0].usagerx;
		})
		myService.getViews('max-'+trend+'-user', '', auth_user).then(function(response){
			$scope.totalViews = response.data[0].totalViews;
		})
		myService.getViews('max-overall-user', '', auth_user).then(function(response){
			$scope.trend = trend;
			$scope.overallViews = response.data[0].totalViews;
		})
		//RETURNS dateCreated as parameter to get the dropdown values in max connected
		myService.maxPerTrendUser(trend, 'getSumDate-user', '', auth_user).then(function(response){
			myService.maxPerTrendUser(trend, 'getEach-user', response.data[0].dateCreated, auth_user).then(function(response){
				$scope.eachMax = response.data;
			})
		})
		

		//Calls the Graph Functions Section
		graphActiveDevices('get-active-macs-user?trend=' +trend+ '&get=getCount-user&created=&owner=' + auth_user, 'Day');
		$scope.activeDevicesGraph = function(){
			graphActiveDevices('get-active-macs-user?trend=' +trend+ '&get=getCount-user&created=&owner=' + auth_user, 'Day');
		}
		$scope.maxConnectedGraph = function(){
			graphLayout('max-per-trend-user?trend=' +trend+ '&get=user&created=&owner=' + auth_user, 'Day', 'totalActive');
		}
		$scope.maxUtilGraph = function(){
			graphLayout('max-per-trend-user?trend=' +trend+ '&get=user&created=&owner=' + auth_user, 'Day', 'totalUtil');
		}
		$scope.graphViewCount = function(){
			graphViewCount('get-views?cond=graph-' +trend+ '-user&routerMac=&userMac=' +auth_user, trend);
		}

		$scope.xxxMinutesGraph = function(){
			graphPackages(strend, '30Minutes');
		}
		$scope.iHourGraph = function(){
			graphPackages(strend, '1Hour');
		}
		$scope.iiHoursGraph = function(){
			graphPackages(strend, '2Hours');
		}
		$scope.vHoursGraph = function(){
			graphPackages(strend, '5Hours');
		}
		$scope.iDayGraph = function(){
			graphPackages(strend, '1Day');
		}
		$scope.iiDaysGraph = function(){
			graphPackages(strend, '2Days');
		}
		$scope.ivDaysGraph = function(){
			graphPackages(strend, '4Days');
		}
		$scope.iWeekGraph = function(){
			graphPackages(strend, '1Week');
		}


		//Inserted in tables section to indicate the trends
		$scope.trend = "Per Day";
		
		//RETURNS the list of active devices
		myService.getActiveMacsUser(trend, 'getCount-user', '', auth_user).then(function(response){	  //Table Data Section
			$scope.devices = response.data;
		})
		//RETURNS the list of active macs as dropdown
		$scope.getDropdown1 = function(dateParam){
			myService.getActiveMacsUser(trend, 'getMac-user', dateParam, auth_user).then(function(response){
				$scope.actives = response.data;
			})
		}
		//RETURNS the list of max values
		myService.maxPerTrendUser(trend, 'user', '', auth_user).then(function(response){
			$scope.max = response.data;
		})
		//RETURNS the list of views count
		myService.getViews(trend+'-user', '', auth_user).then(function(response){
			$scope.countList = response.data;
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
						myService.packageSummary(trend, activemacs[x]['activeDevice'], y).then(function(response){
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
						
						graphPackages(strend, '30Minutes');
						myService.maxOfPackages(mtrend).then(function(response){
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


		myService.sendAlert(auth_user);
		setTimeout(function(){
			myService.getAlerts().then(function(response){
				$scope.alerts = response.data;
			})
		}, 2000)
		

		//Declare array container
		var arr = [];
		//Call the factory function that returns the list of mac addresses
		myService.getActiveMacsUser('macs', '', '', auth_user).then(function(response){
			$scope.fetch = response.data;
			for(var x=0; x<$scope.fetch.length; x++){
				arr.push(myService.modCoords($scope.fetch[x]));
			}
			myService.mapInit(arr, {lat: 14.5577445, lng:121.0230858}, 'user');
			$scope.locations = arr;
		})


	}

}]);



/*--------------------------------REPORTS SECTION-------------------------------------*/
macStats.controller('reportsController',
['$scope', '$http', 'myService', function($scope, $http, myService){
	$scope.init = function(trend){

		$('.reports-table').hide();
		setTimeout(function () {
			$('.reports-table').fadeIn();
		}, 200);

		//Trend Indicator Variable
		$scope.trend = trend;

		//Inserted in beginning of url to indicate user & admin
		$scope.userTypeIndicator = "admin";

		//RETURNS list of max values
		myService.maxPerTrend(trend, '', '').then(function(response){
			$scope.max = response.data;
		})
		//RETURNS the list of macs with connected values as dropdown
		$scope.maxEachMacs = function(dateParam){
			myService.maxPerTrend(trend, 'getEach', dateParam).then(function(response){
				$scope.eachMax = response.data;
			})
		}
		//RETURNS the list of number of active devices
		myService.getActiveMacs(trend, 'getCount', '').then(function(response){
			$scope.devices = response.data;
		})
		//RETURNS the list of active devices as dropdown
		$scope.activeDevices = function(dateParam){
			myService.getActiveMacs(trend, 'getMac', dateParam).then(function(response){
				$scope.actives = response.data;
			})
		}


	}

}]);

/*--------------------------------REPORTS USER SECTION-------------------------------------*/
macStats.controller('reportsControllerUser',
['$scope', '$http', 'myService', function($scope, $http, myService){
	$scope.init = function(trend){

		$('.reports-table').hide();
		setTimeout(function () {
			$('.reports-table').fadeIn();
		}, 200);

		//Get the authenticated user that logged in
		var auth_user = $(".auth-user").text();	
		//Trend Indicator Variable
		$scope.trend = trend;

		//Inserted in beginning of url to indicate user & admin
		$scope.userTypeIndicator = "user";
		
		//RETURNS list of max values
		myService.maxPerTrendUser(trend, 'user', '', auth_user).then(function(response){
			$scope.max = response.data;
		})
		//RETURNS the list of macs with connected values as dropdown
		$scope.maxEachMacs = function(dateParam){
			myService.maxPerTrendUser(trend, 'getEach-user', dateParam, auth_user).then(function(response){
				$scope.eachMax = response.data;
			})
		}
		//RETURNS the list of number of active devices
		myService.getActiveMacsUser(trend, 'getCount-user', '', auth_user).then(function(response){
			$scope.devices = response.data;
		})
		//RETURNS the list of active devices as dropdown
		$scope.activeDevices = function(dateParam){
			myService.getActiveMacsUser(trend, 'getMac-user', dateParam, auth_user).then(function(response){
				$scope.actives = response.data;
			})
		}
	}
}])



/*--------------------------------CHARTS SECTION-------------------------------------*/
macStats.controller('chartsController',
['$scope', '$http', 'myService', function($scope, $http, myService){
	$scope.init = function(trend){

		$('.stats-graph').hide();
		setTimeout(function () {
			$('.stats-graph').fadeIn();
		}, 200);

		//Trend Indicator Variable
		$scope.trend = trend;

		$(".db-option-tab").hide();

		//CALLING GRAPH FUNCTIONS
		graphActiveDevices('get-active-macs?trend=' +trend+ '&get=getCount&created=', trend);
		graphMaxConnected('max-per-trend?trend=' +trend+ '&get=&created=', trend);
		graphMaxCcq('max-per-trend?trend=' +trend+ '&get=&created=', trend);
		graphMaxUtil('max-per-trend?trend=' +trend+ '&get=&created=', trend);
		graphMaxUsage('max-per-trend?trend=' +trend+ '&get=&created=', trend);
		graphMaxLease('max-per-trend?trend=' +trend+ '&get=&created=', trend);
		graphMaxFreeMem('max-per-trend?trend=' +trend+ '&get=&created=', trend);
		graphMaxCpuFreq('max-per-trend?trend=' +trend+ '&get=&created=', trend);
		graphMaxCpuLoad('max-per-trend?trend=' +trend+ '&get=&created=', trend);
		graphMaxFreeHdd('max-per-trend?trend=' +trend+ '&get=&created=', trend);

	}
}])

/*--------------------------------CHARTS USER SECTION-------------------------------------*/
macStats.controller('chartsControllerUser',
['$scope', '$http', 'myService', function($scope, $http, myService){
	$scope.init = function(trend){

		$('.stats-graph').hide();
		setTimeout(function () {
			$('.stats-graph').fadeIn();
		}, 200);

		//Get the authenticated user that logged in
		var auth_user = $(".auth-user").text();

		$(".db-option-tab").hide();
		
		$scope.trend = "Per Day";

		//CALLING GRAPH FUNCTIONS
		graphActiveDevices('get-active-macs-user?trend=' +trend+ '&get=getCount-user&created=&owner=' + auth_user, trend);
		graphMaxConnected('max-per-trend-user?trend=' +trend+ '&get=user&created=&owner=' + auth_user, trend);
		graphMaxCcq('max-per-trend-user?trend=' +trend+ '&get=user&created=&owner=' + auth_user, trend);
		graphMaxUtil('max-per-trend-user?trend=' +trend+ '&get=user&created=&owner=' + auth_user, trend);
		graphMaxUsage('max-per-trend-user?trend=' +trend+ '&get=user&created=&owner=' + auth_user, trend);
		graphMaxLease('max-per-trend-user?trend=' +trend+ '&get=user&created=&owner=' + auth_user, trend);
		graphMaxFreeMem('max-per-trend-user?trend=' +trend+ '&get=user&created=&owner=' + auth_user, trend);
		graphMaxCpuFreq('max-per-trend-user?trend=' +trend+ '&get=user&created=&owner=' + auth_user, trend);
		graphMaxCpuLoad('max-per-trend-user?trend=' +trend+ '&get=user&created=&owner=' + auth_user, trend);
		graphMaxFreeHdd('max-per-trend-user?trend=' +trend+ '&get=user&created=&owner=' + auth_user, trend);
	}
}]);



/*--------------------------------PERMAC SECTION-------------------------------------*/
macStats.controller('permacController',
['$scope', '$http', 'myService', function($scope, $http, myService){
	$scope.init = function(trend){

		$('.permac-table').hide();
		setTimeout(function () {
			$('.permac-table').fadeIn();
		}, 700);

		//Inserted in beginnin of url to indicate user & admin
		$scope.userTypeIndicator = "admin";
		//Hides the 'Packages' tab in pemac template
		$(".permac-packages").hide();

		//RETURNS list of macs utilizations			
		myService.macsPerTrend(trend).then(function(response){
			$scope.utilizations = response.data;
		})
		//REYURNS list of count of views
		myService.getViews(trend, '', '').then(function(response){
			$scope.countList = response.data;
		})
		//Function that searches macs
		$scope.searchMac = function(mac){
			myService.searchMac(mac).then(function(response){
				$scope.results = response.data;
			})
		}	
	}
}])

/*--------------------------------PERMAC USER SECTION-------------------------------------*/
macStats.controller('permacControllerUser',
['$scope', '$http', 'myService', function($scope, $http, myService){
	$scope.init = function(trend){

		$('.permac-table').hide();
		setTimeout(function () {
			$('.permac-table').fadeIn();
		}, 700);

		//Get the authenticated user that logged in
		var auth_user = $(".auth-user").text();
		//Inserted in beginnin of url to indicate user & admin
		$scope.userTypeIndicator = "user";

		$(".permac-packages").hide();

		//RETURNS list of macs utilizations
		myService.macsPerTrendUser(trend, auth_user).then(function(response){
			$scope.utilizations = response.data;
		})
		//REYURNS list of count of views
		myService.getViews(trend+'-user', '', auth_user).then(function(response){
			$scope.countList = response.data;
		})
		//Function that searches macs
		$scope.searchMac = function(mac){
			myService.searchMac(mac).then(function(response){
				$scope.results = response.data;
			})
		}


	}
}])



/*--------------------------------PERMAC ACTIVITY SECTION-------------------------------------*/
macStats.controller('permacActivityController',
['$scope', '$http', '$location', 'myService', '$filter', function($scope, $http, $location, myService, $filter){
	$scope.init = function(trend){

		$('.permac-table').hide();
		setTimeout(function () {
			$('.permac-table').fadeIn();
		}, 700);

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


		//RETURNS THE LIST of each specific mac utilizations
		myService.permacActivity(trend, $scope.macParam).then(function(response){
			$scope.utilizations = response.data;
		})
		//REYURNS list of count of views
		myService.getViews('permac-'+trend, $scope.macParam, '').then(function(response){
			$scope.countList = response.data;
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
			myService.packageSummary(trend, $scope.macParam, y).then(function(response){
				//If the array is undefined its length is '0' so, if array length is 0 then
				//that array will not inserted instead it will remove by pop() method.
				response.data.length != 0 ? $scope.b = myService.packageDispense(response.data) : arr.pop();
				arr.push($scope.b);
			})
		}		
		//Store the resulted array 'arr' into angular variable.
		$scope.packageSummary = arr;
		
	}
}])

/*--------------------------------PERMAC ACTIVITY USER SECTION-------------------------------------*/
macStats.controller('permacActivityControllerUser',
['$scope', '$http', '$location', 'myService', function($scope, $http, $location, myService){
	$scope.init = function(trend){

		$('.permac-table').hide();
		setTimeout(function () {
			$('.permac-table').fadeIn();
		}, 700);

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

		//RETURNS THE LIST of each specific mac utilizations
		myService.permacActivity(trend, $scope.macParam).then(function(response){
			$scope.utilizations = response.data;
		})
		//REYURNS list of count of views
		myService.getViews('permac-'+trend, $scope.macParam, '').then(function(response){
			$scope.countList = response.data;
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
			myService.packageSummary(trend, $scope.macParam, y).then(function(response){
				response.data.length != 0 ? $scope.b = myService.packageDispense(response.data) : arr.pop();
				arr.push($scope.b);
			})
		}
		$scope.packageSummary = arr;

	}
}])



/*--------------------------------CHARTS PERMAC ACTIVITY SECTION-------------------------------------*/
macStats.controller('chartsPermacActController',
['$scope', '$http', '$location', 'myService', '$filter', function($scope, $http, $location, myService, $filter){
	$scope.init = function(trend){

		$('.stats-graph').hide();
		$('.packages-graph').hide();
		setTimeout(function () {
			$('.stats-graph').fadeIn();
		}, 200);

		//Hides the active devices chart container
		$(".chart-active-container").hide();
		$(".chart-connected-container").attr("style", "display: block; margin: auto; border-top: 2px solid rgba(76, 0, 158, 0.9); width: 80%; height:400px");
		$(".canvas-connected-container").attr("style", "height: 300px");

		//Gets the query parameter of current url in object form
		var urlParam = $location.search();
		//Gets the value of query parameter from object and stored in variable
		$scope.macParam = urlParam.mac;
		
		$scope.trend = "Per Day";

		//Inserted in beginnin of url to indicate user & admin
		$scope.userTypeIndicator = "admin";

		//Calling of Graph Functions
		trend=='perDay'
		?(graphMaxConnected('permac-activity?trend=' +trend+ '-graph&mac=' + $scope.macParam, trend),
		  graphMaxCcq('permac-activity?trend=' +trend+ '-graph&mac=' + $scope.macParam, trend),
		  graphMaxUtil('permac-activity?trend=' +trend+ '-graph&mac=' + $scope.macParam, trend),
		  graphMaxUsage('permac-activity?trend=' +trend+ '-graph&mac=' + $scope.macParam, trend),
		  graphMaxLease('permac-activity?trend=' +trend+ '-graph&mac=' + $scope.macParam, trend),
		  graphMaxFreeMem('permac-activity?trend=' +trend+ '-graph&mac=' + $scope.macParam, trend),
		  graphMaxCpuFreq('permac-activity?trend=' +trend+ '-graph&mac=' + $scope.macParam, trend),
		  graphMaxCpuLoad('permac-activity?trend=' +trend+ '-graph&mac=' + $scope.macParam, trend),
		  graphMaxFreeHdd('permac-activity?trend=' +trend+ '-graph&mac=' + $scope.macParam, trend))
		
		:(graphMaxConnected('permac-activity?trend=' +trend+ '&mac=' + $scope.macParam, trend),
		  graphMaxCcq('permac-activity?trend=' +trend+ '&mac=' + $scope.macParam, trend),
		  graphMaxUtil('permac-activity?trend=' +trend+ '&mac=' + $scope.macParam, trend),
		  graphMaxUsage('permac-activity?trend=' +trend+ '&mac=' + $scope.macParam, trend),
		  graphMaxLease('permac-activity?trend=' +trend+ '&mac=' + $scope.macParam, trend),
		  graphMaxFreeMem('permac-activity?trend=' +trend+ '&mac=' + $scope.macParam, trend),
		  graphMaxCpuFreq('permac-activity?trend=' +trend+ '&mac=' + $scope.macParam, trend),
		  graphMaxCpuLoad('permac-activity?trend=' +trend+ '&mac=' + $scope.macParam, trend),
		  graphMaxFreeHdd('permac-activity?trend=' +trend+ '&mac=' + $scope.macParam, trend));



		var arr = [];	
		for(var y=0; y<30; y++){
			myService.packageSummary(trend, $scope.macParam, y).then(function(response){
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

			xxxMinutesGraph(arr, trend);
			iHourGraph(arr, trend);
			iiHoursGraph(arr, trend);
			vHoursGraph(arr, trend);
			iDayGraph(arr, trend);
			iiDaysGraph(arr, trend);
			ivDaysGraph(arr, trend);
			iWeekGraph(arr, trend);
			packagesGraph(arr, trend);
			console.log(arr);
		})


	}
}])

/*--------------------------------CHARTS PERMAC ACTIVITY USER SECTION-------------------------------------*/
macStats.controller('chartsPermacActControllerUser',
['$scope', '$http', '$location', 'myService', '$filter', function($scope, $http, $location, myService, $filter){
	$scope.init = function(trend){

		$('.stats-graph').hide();
		$('.packages-graph').hide();
		setTimeout(function () {
			$('.stats-graph').fadeIn();
		}, 200);
		
		//Hides the connected chart container
		$(".chart-active-container").hide();
		$(".chart-connected-container").attr("style", "display: block; margin: auto; border-top: 2px solid rgba(76, 0, 158, 0.9); width: 80%; height:400px");
		$(".canvas-connected-container").attr("style", "height: 300px");

		//Gets the query parameter of current url in object form
		var urlParam = $location.search();
		//Gets the value of query parameter from object and stored in variable
		$scope.macParam = urlParam.mac;
		
		$scope.trend = "Per Day";
		
		//Inserted in beginnin of url to indicate user & admin
		$scope.userTypeIndicator = "user";

		trend=='perDay'
		?(graphMaxConnected('permac-activity?trend=' +trend+ '-graph&mac=' + $scope.macParam, trend),
		  graphMaxCcq('permac-activity?trend=' +trend+ '-graph&mac=' + $scope.macParam, trend),
		  graphMaxUtil('permac-activity?trend=' +trend+ '-graph&mac=' + $scope.macParam, trend),
		  graphMaxUsage('permac-activity?trend=' +trend+ '-graph&mac=' + $scope.macParam, trend),
		  graphMaxLease('permac-activity?trend=' +trend+ '-graph&mac=' + $scope.macParam, trend),
		  graphMaxFreeMem('permac-activity?trend=' +trend+ '-graph&mac=' + $scope.macParam, trend),
		  graphMaxCpuFreq('permac-activity?trend=' +trend+ '-graph&mac=' + $scope.macParam, trend),
		  graphMaxCpuLoad('permac-activity?trend=' +trend+ '-graph&mac=' + $scope.macParam, trend),
		  graphMaxFreeHdd('permac-activity?trend=' +trend+ '-graph&mac=' + $scope.macParam, trend))
		
		:(graphMaxConnected('permac-activity?trend=' +trend+ '&mac=' + $scope.macParam, trend),
		  graphMaxCcq('permac-activity?trend=' +trend+ '&mac=' + $scope.macParam, trend),
		  graphMaxUtil('permac-activity?trend=' +trend+ '&mac=' + $scope.macParam, trend),
		  graphMaxUsage('permac-activity?trend=' +trend+ '&mac=' + $scope.macParam, trend),
		  graphMaxLease('permac-activity?trend=' +trend+ '&mac=' + $scope.macParam, trend),
		  graphMaxFreeMem('permac-activity?trend=' +trend+ '&mac=' + $scope.macParam, trend),
		  graphMaxCpuFreq('permac-activity?trend=' +trend+ '&mac=' + $scope.macParam, trend),
		  graphMaxCpuLoad('permac-activity?trend=' +trend+ '&mac=' + $scope.macParam, trend),
		  graphMaxFreeHdd('permac-activity?trend=' +trend+ '&mac=' + $scope.macParam, trend));

		var arr = [];	
		for(var y=0; y<30; y++){
			myService.packageSummary(trend, $scope.macParam, y).then(function(response){
				response.data.length != 0 ? $scope.b = myService.packageDispense(response.data) : arr.pop();
				arr.push($scope.b);
			})
		}
			
		myService.permacActivity('perDay', $scope.macParam).then(function(response){
			//Sort the resulted array
			arr = $filter('orderBy')(arr, '-dateCreated' );
			//Remove the undefined index of resulted array
			arr = arr.filter(Boolean);

			xxxMinutesGraph(arr, trend);
			iHourGraph(arr, trend);
			iiHoursGraph(arr, trend);
			vHoursGraph(arr, trend);
			iDayGraph(arr, trend);
			iiDaysGraph(arr, trend);
			ivDaysGraph(arr, trend);
			iWeekGraph(arr, trend);
			packagesGraph(arr, trend);
			//console.log(arr);
		})



	}
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

	$scope.setAlertValues = function(){
		var arr = [];
		if($('.aml-input-ccq').val() == '' || $('.aml-input-cpuLoad').val() == '' || $('.aml-input-freeMem').val() == '') 
			alert('Complete Fields')
		else{
			arr.push({
				ccq : $('.aml-input-ccq').val(),
				cpuLoad : $('.aml-input-cpuLoad').val(),
				freeMem : $('.aml-input-freeMem').val()
			});
			$http({
				method: 'POST',
				url: '/api/set-alert-values',
				data: arr
			}).then(function successCallback(response){
				$('.aml-input-ccq').val(''); 
				$('.aml-input-cpuLoad').val(''); 
				$('.aml-input-freeMem').val('');
			}, function errorCallback(response){
				console.log('failed');
			})
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
			myService.mapInit(arr, {lat: 14.5577445, lng:121.0230858}, 'admin');
			$scope.lists = arr;
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
	$(".permac-tb6").hide();
	$(".permac-search-results").hide();
});
$("body").on("click", ".permac-sec", function(){
	$(".permac-tb2").show();
	$(".permac-tb1").hide();
	$(".permac-tb3").hide();
	$(".permac-tb4").hide();
	$(".permac-tb5").hide();
	$(".permac-tb6").hide();
	$(".permac-search-results").hide();
});
$("body").on("click", ".permac-tri", function(){
	$(".permac-tb3").show();
	$(".permac-tb1").hide();
	$(".permac-tb2").hide();
	$(".permac-tb4").hide();
	$(".permac-tb5").hide();
	$(".permac-tb6").hide();
	$(".permac-search-results").hide();
});
$("body").on("click", ".permac-4th", function(){
	$(".permac-tb4").show();
	$(".permac-tb1").hide();
	$(".permac-tb2").hide();
	$(".permac-tb3").hide();
	$(".permac-tb5").hide();
	$(".permac-tb6").hide();
	$(".permac-search-results").hide();
});
$("body").on("click", ".permac-packages", function(){
	$(".permac-tb5").show();
	$(".permac-tb1").hide();
	$(".permac-tb2").hide();
	$(".permac-tb3").hide();
	$(".permac-tb4").hide();
	$(".permac-tb6").hide();
	$(".permac-search-results").hide();
});
$("body").on("click", ".permac-6th", function(){
	$(".permac-tb6").show();
	$(".permac-tb5").hide();
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
$("body").on("click", ".alert-settings-option", function(){
	$(".alert-settings-frame").fadeIn();
	$(".aml-frame").hide();
});
$("body").on("click", ".add-label-option", function(){
	$(".aml-frame").fadeIn();
	$(".alert-settings-frame").hide();
});


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
