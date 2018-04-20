<div class="sidebarHeader"><h3>Administration</h3></div>

<div class="row1">
	<div class="aml-tb3-container" style="border-top: 4px solid #404040;">
		<h5>List of Macs</h5>
		<div class="col-sm-12 aml-macs-table">
			<table class="table table-hover table-sm aml-table3">
				<tr ng-repeat="mac in macs">
					<th>{{$index + 1}}.</th>
					<th><a href="admin/reports/PerMac-perDay/macs?mac={{mac.mac}}">{{mac.mac}}</a></th>
					<th>{{mac.dateCreated}}</th>
					<th>{{mac.label == "" ? "----------" : mac.label}}</th>
					<th><button class="btn btn-primary" ng-click="inputMac(mac.mac)">Edit Location</button></th>
				</tr>

			</table>
		</div>
	</div>
</div>
<div class="row row1">
	<div class="aml-tb1-container" style="border-top: 4px solid #404040;">
		<h5>Add Label</h5>
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
	<div class='aml-tb2-container' style="border-top: 4px solid #404040;">
		<h5>Recently Updated Macs</h5>
		<div class="col-sm-12 aml-registered-table">
			<table class="table table-hover aml-table2">
				<tr ng-repeat="recent_mac in recent_macs">
					<th>{{$index + 1}}.</th>
					<th><a href="admin/reports/PerMac-perDay/macs?mac={{recent_mac.mac}}">{{recent_mac.mac}}</a></th>
					<th>{{recent_mac.label == "" ? "----------" : recent_mac.label}}</th>
					<th>{{recent_mac.dateUpdated}}</th>
				</tr>
			</table>	
		</div>
	</div>
</div>
