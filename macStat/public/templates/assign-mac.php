<div class="sidebarHeader"><h3>Administration</h3></div>
<div class="row1">
	<div class="am-tb1-container" style="border-top: 2px solid #404040;">
		<h5>Assign Macs To Users</h5>
		<div class="col-sm-12 am-assign-table">
			<table class="table table-hover table-sm am-table1">
				<tr ng-repeat="unassigned in unassigned_macs" class="animate-unassigned">
					<th>{{$index + 1}}.</th>
					<th><a href="admin/reports/PerMac-perDay/macs?mac={{unassigned.mac}}" class="am-mac-label">{{unassigned.mac}}</a></th>
					<th>{{unassigned.label == '' ? "----------" : unassigned.label}}</th>
					<th>
						<select class="selectpicker users-selectpicker" data-live-search="true" ng-model="selected_user">
							<option value="selected" selected disabled><b>Select Users:</b></option>
							<option ng-repeat="user in users">{{user.username}}</option>
						</select>
					</th>
					<th>{{}}</th>
					<th><button class="btn btn-primary" ng-click="assign(selected_user, unassigned.mac)">Assign</button></th>
				</tr>
			</table>
		</div>
	</div>
</div>
<div class="row row1">
	<div class="am-tb2-container" style="border-top: 2px solid #404040;">
		<h5>Users List</h5>
		<div class="col-sm-12 am-list-table">
			<table class="table table-hover table-sm am-table2">
				<tr style="background-color: #404040;" class="am-table2-header">
					<th>Users List</th>
					<th>Owned Mac</th>
				</tr>
				<tr ng-repeat = "c in cmof">
					<th><a href="#" class="user" ng-click="showMacsOfOwner(c.owner)">{{c.owner}}</a></th>
					<th>{{c.owned}}</th>
				</tr>
				
			</table>
		</div>		
	</div>
	<div class='am-tb3-container' style="border-top: 2px solid #404040;">
		
		<h5>Assigned Macs</h5>
		<button class="btn btn-info btn-view-all" ng-click="viewAll()">View All</button></td>
		<div class="col-sm-12 am-unassign-table">
			<table class="table table-hover table-sm am-table3">
				
				<tr ng-repeat="assigned in assigned_macs" class="animate-assigned">
					<th>{{$index + 1}}.</th>
					<th><a href="admin/reports/PerMac-perDay/macs?mac={{assigned.mac}}">{{assigned.mac}}</a></th>
					<th>{{assigned.owner}}</th>
					<th><button class="btn btn-info" ng-click="unassign(assigned.owner, assigned.mac)">Unassign</button></th>
				</tr>
			</table>
			<table class="table table-hover table-sm am-table4">
				
				<tr ng-repeat="m in macsOwned" class="animate-assigned">
					<th><a href="admin/reports/PerMac-perDay/macs?mac={{m.mac}}">{{m.mac}}</a></th>
					<th>{{m.owner}}</th>
					<th><button class="btn btn-info" ng-click="unassign2(m.owner, m.mac)">Unassign</button></th>
				</tr>
			</table>	
		</div>
	</div>
</div>
