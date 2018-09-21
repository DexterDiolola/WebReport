<style type="text/css">
	/*RESPONSIVE*/
/***********************************/
	@media screen and (max-width: 1200px){
		.db-p-frame{
			width: 48%;
			margin-top: 10;
		}
		.db-stats-frame{
			height: auto;
		}
	}
	@media screen and (max-width: 1070px){
		.sideBar{
			width: 18%;
		}
		.workingArea{
			width: 82%;
		}
		.db-tdtv-graph-frame{
			width: 65%;
		}
	}
	@media screen and (max-width: 990px){	
		.db-s-frame{
			width: 95%;
			margin-top: 10;
		}
		.db-graph-frame{
			margin-top: 10
		}
	}
	@media screen and (max-width: 800px){
		.sideBar{
			width: 22%;
		}
		.workingArea{
			width: 78%;
		}
		.tb-inner-frame{
			width: 100%;
			margin-bottom: 20;
		}
		.db-table-frame2{
			margin-top: 0
		}
	}
	@media screen and (max-width: 650px){
		.sidebar{
			width: 100%;
			height: auto;
		}
		.spacer{
			margin-top: 60;
		}
		.workingArea{
			width: 100%;
		}
		.db-header-frame{
			margin-top: 20;
		}
		.db-p-frame{
			width: 95%;
		}
		.alert-frame{
			width: 100%;
		}
		.maps-frame{
			width: 100%;
		}
	}

	

</style>


<div class="db-init" ng-init="init('perDay', 'countActivePD', 'sum-perday', 'max-perday')">
	<div class="preloader">
		<div class="spinner"></div>
	</div>
	<div class="db-header-frame">
		<div class="aa row">
			<div class="db-label">
				<h3>Dashboard</h3>
			</div>
			<div class="db-option-tab-frame">
				<ul class="nav nav-tabs db-option-tab" >
					<li class="nav-item">
						<a class="nav-link stats-tab" data-toggle="tab" ng-click="activeDevicesGraph()"><b>Stats</b></a>
					</li>
					<li class="nav-item">
						<a class="nav-link packages-tab" data-toggle="tab" ng-click=""><b>Packages</b></a>
					</li>
					<li class="nav-item">
						<a class="nav-link dispense-tab" data-toggle="tab" ng-click=""><b>Dispense</b></a>
					</li>
				</ul>	
			</div>	
		</div>
		
		<div class="db-trend-tab-frame">
			<ul class="nav nav-tabs db-trend-tab" >
				<li class="nav-item">
					<a class="nav-link" data-toggle="tab" ng-click="init('perDay', 'countActivePD', 'sum-perday', 'max-perday')"><b>Per Day</b></a>
				</li>
				<li class="nav-item">
					<a class="nav-link" data-toggle="tab" ng-click="init('perWeek', 'countActivePW', 'sum-perweek', 'max-perweek')"><b>Per Week</b></a>
				</li>
				<li class="nav-item">
					<a class="nav-link" data-toggle="tab" ng-click="init('perMonth', 'countActivePM', 'sum-perday', 'max-perday')"><b>Per Month</b></a>
				</li>
			</ul>	
		</div>

	</div>

	<div class="db-stats-frame">
		<div class="db-fadeIn">
			<div class="aa row">
				<div class="db-s-frame" style="background-color: rgba(255, 40, 169, 0.3); border: 1px solid rgba(204, 0, 122, 0.76);">
					<div class="db-s-label">
						<font ng-click="activeDevicesGraph()">Total Active </font>
					</div>
					<div class="db-s-value">
						<label class="dropdown">
							<font data-toggle="dropdown" role="button" aria-expanded="false">{{dashTotalActive}}</font>
							<ul class="dropdown-menu taDropdown" role="menu">
					    	<li>
					        	<a href="{{userTypeIndicator}}/reports/permac/macs?mac={{ad.activeDevice}}" class="dropdown-item" ng-repeat="ad in activeDevices" >
					        		<b>{{$index +1}}.</b> &nbsp; {{ad.activeDevice}}
					            </a>
					        </li>
					    </ul>	
						</label>
						
					</div>
					
				</div>
				<div class="db-s-frame" style="background-color: rgba(93, 0, 193, 0.5); border: 1px solid rgba(76, 0, 158, 0.9);">
					<div class="db-s-label">
						<font ng-click="maxConnectedGraph()">Max Connected </font>
					</div>
					<div class="db-s-value">
						<label class="dropdown">
							<font data-toggle="dropdown" role="button" aria-expanded="false">{{dashTotalConnected}}</font>	
							<ul class="dropdown-menu mcDropdown" role="menu">
						    	<li>
						        	<a href="{{userTypeIndicator}}/reports/permac/macs?mac={{e.mac}}" class="dropdown-item" ng-repeat="e in eachMax" >
						        		<b>{{$index +1}}.</b> &nbsp; {{e.mac}} - {{e.active}} - {{e.label == '' ? "????" : e.label}}
						            </a>
						        </li>
						    </ul>
						</label>
						
					</div>
				</div>
				<div class="db-s-frame" style="background-color: rgba(44, 116, 251, 0.3); border: 1px solid rgba(0, 71, 204, 0.76);">
					<div class="db-s-label">
						<font ng-click="maxUtilGraph()">Max Util </font>
					</div>
					<div class="db-s-value1">
						<font>tx = {{dashMaxUtiltx>1000 ? (dashMaxUtiltx/1000 | number: 2)+ " MB" : dashMaxUtiltx+ " KB"}}</font> </br>
						<font>rx = {{dashMaxUtilrx>1000 ? (dashMaxUtilrx/1000 | number: 2)+ " MB" : dashMaxUtilrx+ " KB"}}</font>
					</div>
				</div>
				<div class="db-s-frame" style="background-color: rgba(170, 35, 255, 0.3); border: 1px solid rgba(100, 0, 163, 0.76);">
					<div class="db-s-label">
						<font ng-click="graphViewCount()">Total Views </font>
					</div>
					<div class="db-s-value1">
						<font>{{trend}} = {{totalViews== undefined ? 'No Count' : totalViews}}</font> <br>
						<font>Overall = {{overallViews== undefined ? 'No Count' : overallViews}}</font>
					</div>
				</div>
			</div>

			<div class="aa row">
				<div class="db-p-frame" style="background-color: rgba(14, 16, 15, 0.4); border: 1px solid rgba(14, 16, 15, 0.9);">
					<div class="db-p-label">
						<font ng-click="xxxMinutesGraph()">30Mins</font>
					</div>
					<div class="db-p-value">
						<font>{{xxxMinutes}}</font>
					</div>
				</div>
				<div class="db-p-frame" style="background-color: rgba(35, 255, 86, 0.3); border: 1px solid rgba(0, 204, 47, 0.76);">
					<div class="db-p-label">
						<font ng-click="iHourGraph()">1Hr</font>
					</div>
					<div class="db-p-value">
						<font>{{iHour}}</font>
					</div>
				</div>
				<div class="db-p-frame" style="background-color: rgba(103, 245, 253, 0.3); border: 1px solid rgba(0, 198, 179, 0.76);">
					<div class="db-p-label">
						<font ng-click="iiHoursGraph()">2Hrs</font>
					</div>
					<div class="db-p-value">
						<font>{{iiHours}}</font>
					</div>
				</div>
				<div class="db-p-frame" style="background-color: rgba(255, 174, 35, 0.3); border: 1px solid rgba(204, 129, 0, 0.76);">
					<div class="db-p-label">
						<font ng-click="vHoursGraph()">5Hrs</font>
					</div>
					<div class="db-p-value">
						<font>{{vHours}}</font>
					</div>
				</div>
			</div>
			<div class="aa row">
				<div class="db-p-frame" style="background-color: rgba(255, 40, 169, 0.3); border: 1px solid rgba(204, 0, 122, 0.76);">
					<div class="db-p-label">
						<font ng-click="iDayGraph()">1Day</font>
					</div>
					<div class="db-p-value">
						<font>{{iDay}}</font>
					</div>
				</div>
				<div class="db-p-frame" style="background-color: rgba(93, 0, 193, 0.5); border: 1px solid rgba(76, 0, 158, 0.9); ">
					<div class="db-p-label">
						<font ng-click="iiDaysGraph()">2Days</font>
					</div>
					<div class="db-p-value">
						<font>{{iiDays}}</font>
					</div>
				</div>
				<div class="db-p-frame" style="background-color: rgba(44, 116, 251, 0.3); border: 1px solid rgba(0, 71, 204, 0.76);">
					<div class="db-p-label">
						<font ng-click="ivDaysGraph()">4Days</font>
					</div>
					<div class="db-p-value">
						<font>{{ivDays}}</font>
					</div>
				</div>
				<div class="db-p-frame" style="background-color: rgba(170, 35, 255, 0.3); border: 1px solid rgba(100, 0, 163, 0.76);">
					<div class="db-p-label">
						<font ng-click="iWeekGraph()">1Week</font>
					</div>
					<div class="db-p-value">
						<font>{{iWeek}}</font>
					</div>
				</div>
			</div>





			<div class="aa row" style="margin: auto;">
				<div class="db-tdtv-frame">
					<div class="db-td-frame" style="background-color: rgba(14, 16, 15, 0.4); border: 1px solid rgba(14, 16, 15, 0.9);">
						<div class="db-td-label">
							<font ng-click="totalDispenseGraph()">Total Package</font>
						</div>
						<div class="db-td-value">
							<font>{{totalDispense}}</font>
						</div>
					</div>
					<div class="db-tv-frame" style="background-color: rgba(170, 35, 255, 0.3); border: 1px solid rgba(100, 0, 163, 0.76);">
						<div class="db-tv-label">
							<font ng-click="totalValueGraph()">Total Dispense</font>
						</div>
						<div class="db-tv-value">
							<font>{{totalValue}}</font>
						</div>
					</div>
				</div>

				<div class="db-tdtv-graph-frame db-tdtv-frame">
					<div class="db-option-tab-frame">
						<ul class="nav nav-tabs db-option-tab" >
							<li class="nav-item">
								<a class="nav-link db-tdtv-line" data-toggle="tab"><b>Line</b></a>
							</li>
							<li class="nav-item">
								<a class="nav-link db-tdtv-bar" data-toggle="tab""><b>Bar</b></a>
							</li>
						</ul>	
					</div>

					<div class="db-tdtv-canvas-frame">
						<canvas id="canvas3"></canvas>
						<canvas id="canvas4"></canvas>
					</div>
				</div>

			</div>

			<div class="db-d-table-cont row">
				<div class="tb-inner-frame db-d-table-frame">
					<div class="tb-label">
						<font>Top Total Package</font>	
					</div>
					
					<div class="db-table">
						<table class="table table-hover">
							<tr style="background-color: rgba(14, 16, 15, 0.4);">
							   	<th>Mac</th>
							   	<th>Location</th>
						    	<th>Total Package</th>
						    </tr>
						    <tr ng-repeat="t in top_total_dispense">
								<td><a href="{{userTypeIndicator}}/reports/permac/macs?mac={{t.mac}}">{{t.mac}}</a></td>
								<td>{{t.label == '' ? '----------' : t.label}}</td>
								<td>{{t.totalDispense}}</td>			    	
						    </tr>
						</table>	
					</div>
				</div>
				<div class="tb-inner-frame db-d-table-frame">
					<div class="tb-label">
						<font>Top Total Dispense</font>	
					</div>
					<div class="db-table">
						<table class="table table-hover">
							<tr style="background-color: rgba(170, 35, 255, 0.3);">
							   	<th>Mac</th>
						      	<th>Location</th>
						      	<th>Total Dispensed</th>
						    </tr>
						    <tr ng-repeat="t in top_total_dispense">
								<td><a href="{{userTypeIndicator}}/reports/permac/macs?mac={{t.mac}}">{{t.mac}}</a></td>
								<td>{{t.label == '' ? '----------' : t.label}}</td>
								<td>{{t.totalValue}}</td>
						    </tr>
						</table>
					</div>
					
				</div>
			</div>

			<div class="aa row">
				<div class="db-d-frame" style="background-color: rgba(14, 16, 15, 0.4); border: 1px solid rgba(14, 16, 15, 0.9);">
					<div class="db-d-label">
						<font ng-click="d_xxxMinutesGraph()">30Minutes</font>
					</div>
					<div class="db-d-value">
						<font>{{d_xxxMinutes}}</font>
					</div>
				</div>
				<div class="db-d-frame" style="background-color: rgba(35, 255, 86, 0.3); border: 1px solid rgba(0, 204, 47, 0.76); ">
					<div class="db-d-label">
						<font ng-click="d_iHourGraph()">1Hour</font>
					</div>
					<div class="db-d-value">
						<font>{{d_iHour}}</font>
					</div>
				</div>
				<div class="db-d-frame" style="background-color: rgba(103, 245, 253, 0.3); border: 1px solid rgba(0, 198, 179, 0.76);">
					<div class="db-d-label">
						<font ng-click="d_iiHoursGraph()">2Hours</font>
					</div>
					<div class="db-d-value">
						<font>{{d_iiHours}}</font>
					</div>
				</div>
				<div class="db-d-frame" style="background-color: rgba(255, 174, 35, 0.3); border: 1px solid rgba(204, 129, 0, 0.76);">
					<div class="db-d-label">
						<font ng-click="d_vHoursGraph()">5Hours</font>
					</div>
					<div class="db-d-value">
						<font>{{d_vHours}}</font>
					</div>
				</div>
			</div>

			<div class="aa row">
				<div class="db-d-frame" style="background-color: rgba(255, 40, 169, 0.3); border: 1px solid rgba(204, 0, 122, 0.76);">
					<div class="db-d-label">
						<font ng-click="d_iDayGraph()">1Day</font>
					</div>
					<div class="db-d-value">
						<font>{{d_iDay}}</font>
					</div>
				</div>
				<div class="db-d-frame" style="background-color: rgba(93, 0, 193, 0.5); border: 1px solid rgba(76, 0, 158, 0.9); ">
					<div class="db-d-label">
						<font ng-click="d_iiDaysGraph()">2Days</font>
					</div>
					<div class="db-d-value">
						<font>{{d_iiDays}}</font>
					</div>
				</div>
				<div class="db-d-frame" style="background-color: rgba(44, 116, 251, 0.3); border: 1px solid rgba(0, 71, 204, 0.76);">
					<div class="db-d-label">
						<font ng-click="d_ivDaysGraph()">4Days</font>
					</div>
					<div class="db-d-value">
						<font>{{d_ivDays}}</font>
					</div>
				</div>
				<div class="db-d-frame" style="background-color: rgba(170, 35, 255, 0.3); border: 1px solid rgba(100, 0, 163, 0.76);">
					<div class="db-d-label">
						<font ng-click="d_iWeekGraph()">1Week</font>
					</div>
					<div class="db-d-value">
						<font>{{d_iWeek}}</font>
					</div>
				</div>
			</div>

			

			

		</div>
		
	</div>

	<div class="db-graph-frame">
		<div class="aa row">
			<div class="db-graph-header">
				<font>Stats Graph</font>
			</div>
			<div class="db-option-tab-frame">
				<ul class="nav nav-tabs db-option-tab" >
					<li class="nav-item">
						<a class="nav-link db-line" data-toggle="tab"><b>Line</b></a>
					</li>
					<li class="nav-item">
						<a class="nav-link db-bar" data-toggle="tab""><b>Bar</b></a>
					</li>
				</ul>	
			</div>
		</div>

		<div class="db-canvas-frame">
			<canvas id="canvas1"></canvas>
			<canvas id="canvas2"></canvas>
		</div>
	</div>



	<div class="db-table-frame row">
		<div class="tb-inner-frame">
			<div class="tb-label">
				<font>Active Devices List</font>	
			</div>
			
			<div class="db-table">
				<table class="table table-hover">
					<tr style="background-color: rgba(255, 40, 169, 0.3);">
					   	<th scope="row">Mac</th>
				    	<th>DateTime</th>
				    </tr>
				    <tr ng-repeat="device in devices">
						<td class="dropdown">
							<a href="#" data-toggle="dropdown" role="button" aria-expanded="false" 
								ng-click="getDropdown1(device.dateCreated2)">
								{{device.totalActive}}
							</a>
							<ul class="dropdown-menu tdDropdown" role="menu">
						    	<li>
						        	<a href="{{userTypeIndicator}}/reports/permac/macs?mac={{active.activeDevice}}" class="dropdown-item" ng-repeat="active in actives" >
						        		<b>{{$index +1}}.</b> &nbsp; {{active.activeDevice}}
						            </a>
						        </li>
						    </ul>
						</td>
						<td>{{device.dateCreated}}</td>				    	
				    </tr>
				</table>	
			</div>
		</div>
		<div class="tb-inner-frame">
			<div class="tb-label">
				<font>Connected List</font>	
			</div>
			<div class="db-table">
				<table class="table table-hover">
					<tr style="background-color: rgba(93, 0, 193, 0.5);">
					   	<th>Max Connected</th>
				      	<th>DateTime</th>
				    </tr>
				    <tr ng-repeat="m in max">
						<td>{{m.active}}</td>
						<td>{{m.dateCreated}}</td>
				    </tr>
				</table>
			</div>
			
		</div>
	</div>

	<div class="db-table-frame2 row">
		<div class="tb-inner-frame">
			<div class="tb-label">
				<font>Util List</font>	
			</div>
			<div class="db-table">
				<table class="table table-hover">
					<tr style="background-color: rgba(44, 116, 251, 0.3);">
						<td>Max Utiltx</td>
						<td>Max Utilrx</td>
						<td>DateTime</td>
					</tr>
					<tr ng-repeat="m in max">
						<td>{{m.utiltx>1000 ? (m.utiltx/1000 | number: 2)+ " MB" : m.utiltx+ " KB"}}</td>
						<td>{{m.utilrx>1000 ? (m.utilrx/1000 | number: 2)+ " MB" : m.utilrx+ " KB"}}</td>
						<td>{{m.dateCreated}}</td>
					</tr>
				</table>
			</div>
			
		</div>
		<div class="tb-inner-frame">
			<div class="tb-label">
				<font>Views Count List</font>	
			</div>	
			<div class="db-table">
				<table class="table table-hover">
					<tr style="background-color: rgba(170, 35, 255, 0.3);">
						<td>Mac</td>
						<td>Site</td>
						<td>Owner</td>
						<td>ViewCount</td>
						<td>DateTime</td>
					</tr>
					<tr ng-repeat="c in countList">
						<td>{{c.routerMac}}</td>
						<td>{{c.label == '' ? '----------' : c.label}}</td>
						<td>{{c.owner == '' ? '----------' : c.owner}}</td>
						<td>{{c.viewCount}}</td>
						<td>{{c.dateCreated}}</td>
					</tr>
				</table>
			</div>
		</div>
	</div>


	<div class="alert-map-frame row">
		<div class="alert-frame">
			<div class="alert-label">
				<font>Alerts</font>	
			</div>

			<div class="alerts">
				<p ng-repeat="a in alerts"><i class="fa fa-exclamation-circle" aria-hidden="true"></i> 
					<b>{{a.dateCreated}} -</b> mac <b><a href="{{userTypeIndicator}}/reports/permac/macs?mac={{a.mac}}">{{a.mac}}</a></b> of <b>{{a.label == '' ? 'not defined yet' : a.label}}</b> {{a.alertMsg}}
				</p>
				
			</div>
		</div>

		<div class="maps-frame">
			<div class="maps-label">
				<font>Macs Location</font>
			</div>
			<div class="maps-frame2 row">
				<div class="map-details-frame">
					<div class="map-details">
						<p ng-repeat="l in locations">
							<font><b>Mac</b> : {{l.mac}}</font><br>
							<font><b>Site</b> : {{l.site == "" ? "----------" : l.site}}</font><br>
							<font><b>Coords</b> : {{l.coords2 == "" || l.coords2 == '0' || l.coords2 == "0.0,0.0" ? "----------" : l.coords2}}</font>
						</p>	
					</div>
					
				</div>
				<div class="maps" id="map"></div>	
			</div>
		</div>
	</div>
</div>
