<html ng-app="macStats" ng-cloak>
<head>
	<link rel="shortcut icon"  href="{{asset('/images/wizherLogo.png')}}" >
	<title>Mac Stats</title>
	<!--<meta name="viewport" content="width=device-width, initial-scale=1">-->
	<link rel="stylesheet" type="text/css" href="{{asset('/css/bootstrap.min.css')}}">
	<link rel="stylesheet" type="text/css" href="{{asset('/css/styles.css')}}">
	<link rel="stylesheet" type="text/css" href="{{asset('/css/responsive.css')}}">
	<link rel="stylesheet" type="text/css" href="{{asset('/css/ng-animate.css')}}">
	<base href="/">
</head>
<body>
	<div class="upperBorder">
		<img src="{{asset('/images/wizher.png')}}" style="height:40; width:130; margin:5 0 0 5;">
		<li class="dropdown btnUser">
        	<a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">
            	{{ Auth::user()->username }} <span class="caret"></span>
            </a>

           	<ul class="dropdown-menu dropdown-menu-right" role="menu">
            	<li>
                	<a href="#" class="dropdown-item"
                    	onclick="event.preventDefault();
                        document.getElementById('logout-form').submit();">
                        Logout
                    </a>

                    <form id="logout-form" action="admin/logout" method="POST" style="display: none;">
                    	{{ csrf_field() }}
                    </form>
                </li>
            </ul>
        </li>
	</div>
	<div class="row contentArea">
		<div class="sideBar">
			<div class="spacer">
				<li>
					<a href="admin/dashboard"><i class="fa fa-tachometer" aria-hidden="true"></i>&emsp;Dashboard</a>
				</li>
				<li>
					<a href="#" data-toggle="collapse" data-target="#submenu-1"><i class="fa fa-database" aria-hidden="true"></i>&emsp;Reports</a>
					<ul id="submenu-1" class="collapse reportsSubMenu">
                        <li><a href="admin/reports/Summary-perDay"><i class="fa fa-angle-right"></i>&emsp;Summaries</a></li>
                        <li><a href="admin/reports/Charts-perDay"><i class="fa fa-angle-right"></i>&emsp;Charts</a></li>
                     	<li><a href="admin/reports/PerMac-perDay"><i class="fa fa-angle-right"></i>&emsp;PerMac</a></li>
                    </ul>
				</li>
				<li class="admin">
					<a href="#" data-toggle="collapse" data-target="#submenu-2"><i class="fa fa-cog" aria-hidden="true"></i>&emsp;Administration</a>
					<ul id="submenu-2" class="collapse adminSubMenu">
                        <li><a href="admin/administration/add-mac-label"><i class="fa fa-angle-right"></i>&emsp;Add Label</a></li>
                        <li><a href="admin/administration/assign-mac"><i class="fa fa-angle-right"></i>&emsp;Assign Mac</a></li>
                        <li><a href="admin/administration/maps"><i class="fa fa-angle-right"></i>&emsp;Maps</a></li>
                    </ul>
				</li>
			</div>
			
			
		</div>

		<div class="workingArea">
			
			<main ng-view></main>
		</div>
	</div>

	<!--LIBRARIES -->
	<script type="text/javascript" src="{{asset('/js//lib/angular.min.js')}}"></script>
	<script type="text/javascript" src="{{asset('/js//lib/angular-route.min.js')}}"></script>
	<script type="text/javascript" src="{{asset('/js//lib/angular-animate.min.js')}}"></script>
	<script type="text/javascript" src="{{asset('/js/lib/jquery.js')}}"></script>
	<script src="https://npmcdn.com/tether@1.2.4/dist/js/tether.min.js"></script> <!--to remove "Bootstrap Needs Tether" error-->
	<script type="text/javascript" src="{{asset('/js/lib/bootstrap.js')}}"></script>
	<script type="text/javascript" src="{{asset('/js/lib/Chart.js')}}"></script>

	<!--SCRIPTS-->
	<script type="text/javascript" src="{{asset('/js/charts-section.js')}}"></script>
	<script type="text/javascript" src="{{asset('/js/charts-section2.js')}}"></script>
	<script type="text/javascript" src="{{asset('/js/charts-dashboard.js')}}"></script>
	<script type="text/javascript" src="{{asset('/js/charts-dashboard2.js')}}"></script>
	<script type="text/javascript" src="{{asset('/js/module.js')}}"></script>
	<script type="text/javascript" src="{{asset('/js/frontController.js')}}"></script>
	<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBLfHXn_LdUNhkInHALrTvucJLOX4l00T4" async defer></script>
</body>
</html>
