<div class="db-header-frame">
	<div class="aa row">
		<div class="db-label">
			<h3>Administration</h3>
		</div>
		
	</div>
	
	<div class="db-trend-tab-frame">
		<ul class="nav nav-tabs db-trend-tab" >
			<li class="nav-item">
				<a class="nav-link add-label-option" data-toggle="tab" href="#"><b>Add Label</b></a>
			</li>
			<li class="nav-item">
				<a class="nav-link alert-settings-option" data-toggle="tab" href="#"><b>Alert Settings</b></a>
			</li>
		</ul>	
	</div>

</div>

<div class="aml-frame">
	<div class="aml-tb1-frame">
		<div class="aml-label">
			<h5>List of Macs</h5>	
		</div>
		
		<div class="col-sm-12 aml-macs-table">
			<table class="table table-hover table-sm aml-table3">
				<tr ng-repeat="mac in macs">
					<th>{{$index + 1}}.</th>
					<th><a href="admin/reports/permac/macs?mac={{mac.mac}}">{{mac.mac}}</a></th>
					<th>{{mac.dateCreated}}</th>
					<th>{{mac.label == "" ? "----------" : mac.label}}</th>
					<th><button class="btn btn-primary" ng-click="inputMac(mac.mac)">Edit Location</button></th>
				</tr>

			</table>
		</div>
	</div>

	<div class="aml-tb23-frame row">
		<div class="aml-tb2-frame">
			<div class="aml-label">
				<h5>Add Label</h5>	
			</div>

			<div class="col-sm-10 aml-form-container">
				
					<table class="table aml-table1">
						<tr>
							<th><label>Mac</label></th>
							<th><input type="text" class="aml-input-mac" disabled="disabled" placeholder="Mac" value="{{macInput}}"></th>
						</tr>
						<tr>
							<th><label>Label</label></th>
							<th><input type="text" class="aml-input-label" placeholder="Location"></th>
						</tr>
					</table>
					<button class="col-sm-12 btn btn-primary" type="submit" ng-click="addLabel()">Add</button>
				
			</div>		
		</div>
		<div class='aml-tb3-frame'>
			<div class="aml-label">
				<h5>Recently Updated Macs</h5>	
			</div>
			<div class="col-sm-12 aml-registered-table">
				<table class="table table-hover aml-table2">
					<tr ng-repeat="recent_mac in recent_macs">
						<th>{{$index + 1}}.</th>
						<th><a href="admin/reports/permac/macs?mac={{recent_mac.mac}}">{{recent_mac.mac}}</a></th>
						<th>{{recent_mac.label == "" ? "----------" : recent_mac.label}}</th>
						<th>{{recent_mac.dateUpdated}}</th>
					</tr>
				</table>	
			</div>
		</div>
	</div>
</div>


<div class="aml-alert-frame">
	<div class="alert-settings-frame">
		<div class="set-alert-label">
			<h5>Set Values</h5>
		</div>
		<div class="set-values-frame">
			<table class="table set-values">
				<tr>
					<th><label>CCQ</label></th>
					<th><input type="text" class="aml-input-ccq" placeholder="CCQ"></th>
				</tr>
				<tr>
					<th><label>CPU Load</label></th>
					<th><input type="text" class="aml-input-cpuLoad" placeholder="CPU Load"></th>
				</tr>
				<tr>
					<th><label>FreeMem</label></th>
					<th><input type="text" class="aml-input-freeMem" placeholder="in MB"></th>
				</tr>
			</table>
			<button class="col-sm-12 btn btn-primary" type="submit" ng-click="setAlertValues()">Submit</button>
		</div>
	</div>	
</div>

