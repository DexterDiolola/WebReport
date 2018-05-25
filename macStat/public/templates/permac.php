<div class="permac-init" ng-init="init('perDay')">
	<div class="db-header-frame">
		<div class="aa row">
			<div class="db-label">
				<h3>Per Mac</h3>
			</div>
			
		</div>
		
		<div class="db-trend-tab-frame">
			<ul class="nav nav-tabs db-trend-tab" >
				<li class="nav-item">
					<a class="nav-link add-label-option" data-toggle="tab" ng-click="init('perDay')"><b>Per Day</b></a>
				</li>
				<li class="nav-item">
					<a class="nav-link alert-settings-option" data-toggle="tab" ng-click="init('perWeek')"><b>Per Week</b></a>
				</li>
				<li class="nav-item">
					<a class="nav-link alert-settings-option" data-toggle="tab" ng-click="init('perMonth')"><b>Per Month</b></a>
				</li>
			</ul>	
		</div>

	</div>
	<div class=" row permac-container">
		<div class="permac-tb1-container">
			<div class="row ">
				<form class="permac-search-form">
					<input type="text" placeholder="Search" ng-model="search">
					<button class="show-results" type="submit" ng-click="searchMac(search)">Search</button>
				</form>
				<ul class="nav nav-tabs permac-tb1-tab">
				  <li class="nav-item">
				    <a class="nav-link permac-pri" data-toggle="tab" href="#">Pri Util</a>
				  </li>
				  <li class="nav-item">
				    <a class="nav-link permac-sec" data-toggle="tab" href="#">Sec Util</a>
				  </li>
				  <li class="nav-item">
				    <a class="nav-link permac-tri" data-toggle="tab" href="#">3rd Util</a>
				  </li>
				  <li class="nav-item">
				    <a class="nav-link permac-4th" data-toggle="tab" href="#">4th Util</a>
				  </li>
				  <li class="nav-item">
				    <a class="nav-link permac-6th" data-toggle="tab" href="#">Views</a>
				  </li>
				  <li class="nav-item">
				    <a class="nav-link permac-packages" data-toggle="tab" href="#">Package</a>
				  </li>
				  <li class="nav-item">
				    <a class="nav-link permac-graph" data-toggle="tab" href="{{userTypeIndicator}}/reports/charts/macs?mac={{macParam}}">Graphs</a>
				  </li>
				</ul>
			</div>
			<div class="permac-table">
				<table class="table table-hover table-sm permac-tb1">
					<tr style="background-color: #404040;">
					    <th class="th-macs">Macs</th>
					    <th class="th-location">Owner</th>
					    <th class="th-location">Site</th>
					    <th>Connected</th>
					    <th>Utiltx</th>
					    <th>Utilrx</th>
					    <th>Usagetx</th>
					    <th>Usagerx</th>
					    <th>Ccq</th>
					    <th class="dropdown">
				    		<a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false"
				    			style="color: white;">
								Date
							</a>
							<ul class="dropdown-menu permac-date-dropdown" role="menu">
								<li><a href="#" class="dropdown-item">January</a></li>
								<li><a href="#" class="dropdown-item">February</a></li>
								<li><a href="#" class="dropdown-item">March</a></li>
								<li><a href="#" class="dropdown-item">April</a></li>
								<li><a href="#" class="dropdown-item">May</a></li>
								<li><a href="#" class="dropdown-item">June</a></li>
								<li><a href="#" class="dropdown-item">July</a></li>
								<li><a href="#" class="dropdown-item">August</a></li>
								<li><a href="#" class="dropdown-item">September</a></li>
								<li><a href="#" class="dropdown-item">October</a></li>
								<li><a href="#" class="dropdown-item">November</a></li>
								<li><a href="#" class="dropdown-item">December</a></li>
							</ul>
				    	</th>
					    
				    </tr>
				    <tr ng-repeat="utilization in utilizations">
				    	<td class="td-macs"><a href="{{userTypeIndicator}}/reports/permac/macs?mac={{utilization.mac}}">{{utilization.mac}}</a></td>
				    	<td class="td-location">{{utilization.owner == "" ? "----------" : utilization.owner}}</td>
				    	<td class="td-location">{{utilization.label == "" ? "----------" : utilization.label}}</td>
				    	<td>{{utilization.active}}</td>
				    	<td>{{utilization.utiltx>1000 ? (utilization.utiltx/1000 | number: 2)+ " MB" : utilization.utiltx+ " KB"}}</td>
						<td>{{utilization.utilrx>1000 ? (utilization.utilrx/1000 | number: 2)+ " MB" : utilization.utilrx+ " KB"}}</td>
				    	<td>{{utilization.usagetx}} GB</td>
				    	<td>{{utilization.usagerx}} GB</td>
				    	<td>{{utilization.ccq}}</td>
				    	<td>{{utilization.dateCreated}}</td>
				    </tr>
				</table>
				<table class="table table-hover table-sm permac-tb2">
					<tr style="background-color: #404040;">
						<th class="th-macs">Macs</th>
						<th class="th-location">Owner</th>
						<th class="th-location">Site</th>
				     	<th>Lease</th>
						<th>Free Memory</th>
						<th>CPU Frequency</th>
						<th>CPU Load</th>
						<th>Free HDD</th>
						<th>Bad Block</th>
						<th>Uptime</th>
				      	<th>DateTime</th>
				    </tr>
				    <tr ng-repeat="utilization in utilizations">
				    	<td class="td-macs"><a href="{{userTypeIndicator}}/reports/permac/macs?mac={{utilization.mac}}">{{utilization.mac}}</a></td>
				    	<td class="td-location">{{utilization.owner == "" ? "----------" : utilization.owner}}</td>
				    	<td class="td-location">{{utilization.label == "" ? "----------" : utilization.label}}</td>
				    	<td>{{utilization.lease}}</td>
						<td>{{utilization.freeMem}} MB</td>
						<td>{{utilization.cpuFreq}}</td>
						<td>{{utilization.cpuLoad}}</td>
						<td>{{utilization.freeHdd>1000 ? (utilization.freeHdd/1000000 | number : 2)+ " MB" : utilization.freeHdd+ " Bytes"}}</td>
						<td>{{utilization.badBlock}}</td>
						<td>{{utilization.uptime}}</td>
						<td>{{utilization.dateCreated}}</td>
				    </tr>
				</table>

				<table class="table table-hover table-sm permac-tb3">
					<tr style="background-color: #404040;">
						<th class="th-macs">Macs</th>
						<th class="th-location">Owner</th>
				     	<th>Version</th>
						<th>App Version</th>
						<th>GPS</th>
						<th>Dispense</th>
						<th>Packages</th>
						<th>DateTime</th>
				    </tr>
				    <tr ng-repeat="utilization in utilizations">
				    	<td class="td-macs"><a href="{{userTypeIndicator}}/reports/permac/macs?mac={{utilization.mac}}">{{utilization.mac}}</a></td>
				    	<td class="td-location">{{utilization.owner == "" ? "----------" : utilization.owner}}</td>
				    	<td>{{utilization.version == "" ? "----------" : utilization.version}}</td>
				    	<td>{{utilization.appVersion == "" ? "----------" : utilization.appVersion}}</td>
				    	<td class="td-location td-gps" style="font-size: 8pt !important;">{{utilization.gps == "" ? "----------" : utilization.gps}}</td>
				    	<td>{{utilization.dispense == "" ? "----------" : utilization.dispense}}</td>
				    	<td class="td-location">{{utilization.packages == "" ? "----------" : utilization.packages}}</td>
				    	<td>{{utilization.dateCreated}}</td>
				    </tr>
				</table>

				<table class="table table-hover table-sm permac-tb4">
					<tr style="background-color: #404040;">
						<th class="th-macs">Macs</th>
						<th class="th-macs">Vpn Address</th>
						<th>DateTime</th>
				    </tr>
				    <tr ng-repeat="utilization in utilizations">
				    	<td class="td-macs"><a href="{{userTypeIndicator}}/reports/permac/macs?mac={{utilization.mac}}">{{utilization.mac}}</a></td>
				    	<td class="td-macs">{{utilization.vpnaddr == "" ? "----------" : utilization.vpnaddr}}</td>
				    	<td>{{utilization.dateCreated}}</td>
				    </tr>
				</table>

				<table class="table table-hover table-sm permac-tb6">
					<tr style="background-color: #404040;">
						<th class="th-macs">Macs</th>
						<th class="th-macs">Site</th>
						<th class="th-macs">Number of Views</th>
						<th>DateTime</th>
				    </tr>
				    <tr ng-repeat="c in countList">
				    	<td class="td-macs"><a href="{{userTypeIndicator}}/reports/permac/macs?mac={{c.routerMac}}">{{c.routerMac}}</a></td>
				    	<td class="td-macs">{{c.label == "" ? "----------" : c.label}}</td>
				    	<td class="td-macs">{{c.viewCount == "" || c.viewCount == undefined ? "----------" : c.viewCount}}</td>
				    	<td>{{c.dateCreated}}</td>
				    </tr>
				</table>

				<table class="table table-hover  permac-tb5">
					<h5 class="permac-tb5" style="background-color: #404040; color: white; padding:5">Package Summary</h5>
					<tr ng-repeat="p in packageSummary | orderBy: '-dateCreated' | filter:{isRight:'!'} ">
						<td class="td-macs">{{p.dateCreated}}</td>
						<td class="td-macs"><a href="{{userTypeIndicator}}/reports/permac/macs?mac={{p.mac}}">{{p.mac}}</a></td>
						<td class="td-macs">{{p.label == "" ? "----------" : p.label}}</td>
						<td class="td-macs">{{p.packages}}</td>
					</tr>
				</table>

				<table class="table table-hover table-sm permac-search-results">
					<tr style="background-color: #404040;">
				     	<th>Mac</th>
						<th>Site</th>
						<th>Date Added</th>
				    </tr>
				    <tr ng-repeat="result in results">
				    	<td><a href="{{userTypeIndicator}}/reports/permac/macs?mac={{result.mac}}">{{result.mac}}</a></td>
				    	<td>{{result.label == "" ? "Not Available" : result.label}}</td>
				    	<td>{{result.dateCreated}}</td>
				    </tr>
				</table>		
			</div>
			
		</div>
	</div>
</div>




