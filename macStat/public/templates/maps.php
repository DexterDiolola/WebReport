<style type="text/css">
	.maps-container{
		height: 500px;
		width: 95%;
		margin: 20 auto auto auto;
		border-radius: 8px;
	}
	.map{
		height: 350px;
		width: 100%;
		margin: auto;
		border: 1px solid #C2C2C2;

	}
	.table-container{
		width: 100%;
		height: 135px;
		overflow-y: auto;
		margin-top: 30;
	}

</style>


<div class="sidebarHeader"><h3>Maps</h3></div>

<div class="maps-container row">
	<div class="map" id='map' ng-init="initMap()"></div>
	<div class="table-container">
		<table class="table table-hover">
			<tr style="background-color: #404040; color: white">
					<th>Macs</th>
					<th>Site</th>
			     	<th>Owner</th>
					<th>Coords</th>
			    </tr>
			<tr ng-repeat="list in lists" ng-click="centerMap(list.coords)">
				<td>{{list.mac}}</td>
				<td>{{list.site == "" ? "----------" : list.site}}</td>
				<td>{{list.owner == "" ? "----------" : list.owner}}</td>
				<td>{{list.coords2 == "" || list.coords2 == '0' || list.coords2 == "0.0,0.0" ? "----------" : list.coords2}}</td>
			</tr>
			
		</table>
	</div>	
</div>
