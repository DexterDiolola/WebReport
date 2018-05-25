<div class="reports-init" ng-init="init('perDay')">
	<div class="db-header-frame">
		<div class="aa row">
			<div class="db-label">
				<h3>Summaries</h3>
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

	<div class=" row reports-container">
		<div class="reports-tb1-container">
			<div class="row ">
				<div class="reports-tb1-label">
					<h5>Max Connected</h5>	
				</div>
				
				<ul class="nav nav-tabs reports-tb1-tab">
				  <li class="nav-item">
				    <a class="nav-link reports-pri" data-toggle="tab" href="#">Pri Util</a>
				  </li>
				  <li class="nav-item">
				    <a class="nav-link reports-sec" data-toggle="tab" href="#">Sec Util</a>
				  </li>
				</ul>
			</div>
			<div class="reports-table">
				<table class="table table-hover table-sm reports-tb1">
					<tr style="background-color: #404040;">
					    <th>Max Connected</th>
					    <th>Max Ccq</th>
					    <th>Max Utiltx</th>
					    <th>Max Utilrx</th>
					    <th>Max Usagetx</th>
					    <th>Max Usagerx</th>
					    <th>DateTime</th>
				    </tr>
				    <tr ng-repeat="m in max">
				    	<td class="dropdown">
				    		<a href="#" data-toggle="dropdown" role="button" aria-expanded="false" 
								ng-click="maxEachMacs(m.dateCreated2)">
								{{m.active}}
							</a>
							<ul class="dropdown-menu tdDropdown" role="menu">
								<li>
									<a href="{{userTypeIndicator}}/reports/permac/macs?mac={{e.mac}}" class="dropdown-item" ng-repeat="e in eachMax" >
								    	<b>{{$index +1}}.</b> &nbsp; {{e.mac}} - {{e.active}}
								    </a>
								</li>
							</ul>
				    	</td>
						<td>{{m.ccq}}</td>
						<td>{{m.utiltx>1000 ? (m.utiltx/1000 | number: 2)+ " MB" : m.utiltx+ " KB"}}</td>
						<td>{{m.utilrx>1000 ? (m.utilrx/1000 | number: 2)+ " MB" : m.utilrx+ " KB"}}</td>
						<td>{{m.usagetx}} GB</td>
						<td>{{m.usagerx}} GB</td>
						<td>{{m.dateCreated}}</td>			    	
				    </tr>
				</table>
				<table class="table table-hover table-sm reports-tb2">
					<tr style="background-color: #404040;">
				     	<th>Max Lease</th>
						<th>Max Free Memory</th>
						<th>Max CPU Frequency</th>
						<th>Max CPU Load</th>
						<th>Max Free HDD</th>
						<th>Max Bad Block</th>
				      	<th>DateTime</th>
				    </tr>
				    <tr ng-repeat="m in max">
				    	<td>{{m.lease}}</td>
						<td>{{m.freeMem}} MB</td>
						<td>{{m.cpuFreq}}</td>
						<td>{{m.cpuLoad}}</td>
						<td>{{m.freeHdd>1000 ? (m.freeHdd/1000000 | number : 2)+ " MB" : m.freeHdd+ " Bytes"}}</td> </td>
						<td>{{m.badBlock}}</td>
				      	<td>{{m.dateCreated}}</td>
				    </tr>
				</table>		
			</div>
			
		</div>
		<div class="reports-tb2-container">
			<div class="reports-tb2-label">
				<h5>Active Devices</h5>	
			</div>
			<div class="reports-table">
				<table class="table table-hover table-sm">
					<tr style="background-color: #404040;">
				      <th>Actives</th>
				      <th>DateTime</th>
				    </tr>
				    <tr ng-repeat="device in devices">
				    	<td class="dropdown">
				    		<a href="#" data-toggle="dropdown" role="button" aria-expanded="false" 
								ng-click="activeDevices(device.dateCreated2)">
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
	</div>

</div>
