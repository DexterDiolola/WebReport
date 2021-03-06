<style type="text/css">
	.chart-option-tab{
		margin: 0 0 5 20;
		font-size: 10pt;
	}
	.chart-option-tab li:hover{
		background-color: white
	}
	.chart-option-tab li a{
		color: black;
	}
	.packages-graph{
		display: none;
	}

</style>



<div class="charts-init" ng-init="init('perDay')">
	<div class="preloader">
		<div class="spinner"></div>
	</div>
	<!--Uses the header for dashboard-->
	<div class="db-header-frame">
		<div class="aa row">
			<div class="db-label">
				<h3>Charts</h3>
			</div>
			<div class="db-option-tab-frame">
				<ul class="nav nav-tabs db-option-tab" >
					<li class="nav-item">
						<a class="nav-link stats-tab" data-toggle="tab"><b>Stats</b></a>
					</li>
					<li class="nav-item">
						<a class="nav-link packages-tab" data-toggle="tab" ng-click=""><b>Packages</b></a>
					</li>
					<li class="nav-item">
						<a class="nav-link" data-toggle="tab" href="{{userTypeIndicator}}/reports/permac/macs?mac={{macParam}}"><i class="fa fa-arrow-left" aria-hidden="true" style="margin-top: 3"></i></a>
					</li>					
				</ul>	
			</div>	
		</div>
		
		<div class="db-trend-tab-frame">
			<ul class="nav nav-tabs db-trend-tab" >
				<li class="nav-item">
					<a class="nav-link" data-toggle="tab" ng-click="init('perDay')"><b>Per Day</b></a>
				</li>
				<li class="nav-item">
					<a class="nav-link" data-toggle="tab" ng-click="init('perWeek')"><b>Per Week</b></a>
				</li>
				<li class="nav-item">
					<a class="nav-link" data-toggle="tab" ng-click="init('perMonth')"><b>Per Month</b></a>
				</li>
			</ul>	
		</div>

	</div>


				<div class="ch-package-cont">
					<style type="text/css">
						.packages-graph{
							display: none;
						}
						.ch-package-cont{
							height: auto;
							width: 95%;
							margin: 20 auto 0 auto;
							display:  none;
						}
						

						.ch-dispense-frame{
							width: 100%;
							margin: auto;
						}
						.ch-dispense-cont{
							margin: auto auto auto 10;
							width: 60%;
						}
						.ch-tdtv-cont{
							margin: auto;
							width: 38%;
						}

						.ch-d-frame{
							width: 30%;
							height: 90px;
							border: 1px solid black;
							margin: auto auto 20 auto;
						}
						.ch-tdtv-frame{
							width: 70%;
							height: 90px;
							border: 1px solid black;
							margin: auto auto 20 auto;
						}
						.ch-d-label{
							color: white;
							padding-top: 5;
							padding-left: 10;
							font-size: 15pt;
							font-weight: 600;
						}
						.ch-d-value{
							padding-left: 10;
							padding-top: 10;
							font-size: 13pt;
							font-weight: 600;
						}
					</style>
					
					
					

					<div class="row ch-dispense-frame">
						<div class="ch-dispense-cont">
							<div class="row">
								<div class="ch-d-frame" style="background-color: rgba(14, 16, 15, 0.4); border: 1px solid rgba(14, 16, 15, 0.9);">
									<div class="ch-d-label">
										<font>30Mins</font>
									</div>
									<div class="ch-d-value">
										<font>{{xxxMinutes}}</font>
									</div>
								</div>
								<div class="ch-d-frame" style="background-color: rgba(35, 255, 86, 0.3); border: 1px solid rgba(0, 204, 47, 0.76);">
									<div class="ch-d-label">
										<font>1Hr</font>
									</div>
									<div class="ch-d-value">
										<font>{{iHour}}</font>
									</div>
								</div>
								<div class="ch-d-frame" style="background-color: rgba(103, 245, 253, 0.3); border: 1px solid rgba(0, 198, 179, 0.76);">
									<div class="ch-d-label">
										<font>2Hrs</font>
									</div>
									<div class="ch-d-value">
										<font>{{iiHours}}</font>
									</div>
								</div>
							</div>

							<div class="row">
								<div class="ch-d-frame" style="background-color: rgba(255, 35, 35, 0.3); border: 1px solid rgba(198, 0, 0, 0.76);">
									<div class="ch-d-label">
										<font>3Hrs</font>
									</div>
									<div class="ch-d-value">
										<font>{{iiiHours}}</font>
									</div>
								</div>
								<div class="ch-d-frame" style="background-color: rgba(255, 174, 35, 0.3); border: 1px solid rgba(204, 129, 0, 0.76);">
									<div class="ch-d-label">
										<font>5Hrs</font>
									</div>
									<div class="ch-d-value">
										<font>{{vHours}}</font>
									</div>
								</div>
								<div class="ch-d-frame" style="background-color: rgba(255, 40, 169, 0.3); border: 1px solid rgba(204, 0, 122, 0.76);">
									<div class="ch-d-label">
										<font>1Day</font>
									</div>
									<div class="ch-d-value">
										<font>{{iDay}}</font>
									</div>
								</div>
							</div>

							<div class="row">
								<div class="ch-d-frame" style="background-color: rgba(93, 0, 193, 0.5); border: 1px solid rgba(76, 0, 158, 0.9);">
									<div class="ch-d-label">
										<font>2Days</font>
									</div>
									<div class="ch-d-value">
										<font>{{iiDays}}</font>
									</div>
								</div>
								<div class="ch-d-frame" style="background-color: rgba(44, 116, 251, 0.3); border: 1px solid rgba(0, 71, 204, 0.76);">
									<div class="ch-d-label">
										<font>4Days</font>
									</div>
									<div class="ch-d-value">
										<font>{{ivDays}}</font>
									</div>
								</div>
								<div class="ch-d-frame" style="background-color: rgba(170, 35, 255, 0.3); border: 1px solid rgba(100, 0, 163, 0.76);">
									<div class="ch-d-label">
										<font>1Week</font>
									</div>
									<div class="ch-d-value">
										<font>{{iWeek}}</font>
									</div>
								</div>
							</div>
						</div>

						<div class="ch-tdtv-cont">
							<div class="ch-tdtv-frame" style="background-color: rgba(14, 16, 15, 0.4); border: 1px solid rgba(14, 16, 15, 0.9);">
								<div class="ch-d-label">
									<font>Total Package</font>
								</div>
								<div class="ch-d-value">
									<font>{{totalPackage}}</font>
								</div>
							</div>
							<div class="ch-tdtv-frame" style="background-color: rgba(170, 35, 255, 0.3); border: 1px solid rgba(100, 0, 163, 0.76);">
								<div class="ch-d-label">
									<font>Total Dispensed</font>
								</div>
								<div class="ch-d-value">
									<font>{{totalDispense}}</font>
								</div>
							</div>
						</div>

					</div>








					<div class="row row1">

						<div class="chart-container2" style="border-top: 2px solid rgba(14, 16, 15, 0.9);">
							<div class="row">
								<h5>Total Package</h5>
								<ul class="nav nav-tabs chart-tab">
								  <li class="nav-item">
								    <a class="nav-link tp-line" data-toggle="tab" href="#">Line</a>
								  </li>
								  <li class="nav-item">
								    <a class="nav-link tp-bar" data-toggle="tab" href="#">Bar</a>
								  </li>
								</ul>
							</div>
							<div class="canvas-container">
								<canvas id="canvas39"></canvas>
								<canvas id="canvas40"></canvas>
							</div>
						</div>
						
						<div class="chart-container2" style="border-top: 2px solid rgba(100, 0, 163, 0.76);">
							<div class="row">
								<h5>Total Dispense</h5>
								<ul class="nav nav-tabs chart-tab">
								  <li class="nav-item">
								    <a class="nav-link td-line" data-toggle="tab" href="#">Line</a>
								  </li>
								  <li class="nav-item">
								    <a class="nav-link td-bar" data-toggle="tab" href="#">Bar</a>
								  </li>
								</ul>
							</div>
							<div class="canvas-container">
								<canvas id="canvas41"></canvas>
								<canvas id="canvas42"></canvas>
							</div>
						</div>

						

					</div>

				</div>


	<div class="stats-graph">
		<div class="row row1">
			<div class="chart-container chart-active-container" style="border-top: 2px solid rgba(204, 0, 122, 0.76);">
				<div class="row">
					<h5>Active</h5>
					<ul class="nav nav-tabs chart-tab">
					  <li class="nav-item">
					    <a class="nav-link active-line" data-toggle="tab" href="#">Line</a>
					  </li>
					  <li class="nav-item">
					    <a class="nav-link active-bar" data-toggle="tab" href="#">Bar</a>
					  </li>
					</ul>
				</div>
				<div class="canvas-container">
					<canvas id="canvas1"></canvas>
					<canvas id="canvas2"></canvas>
				</div>
			</div>
			
			<div class="chart-container chart-connected-container" style="border-top: 2px solid rgba(76, 0, 158, 0.9);">
				<div class="row">
					<h5>Connected</h5>
					<ul class="nav nav-tabs chart-tab">
					  <li class="nav-item">
					    <a class="nav-link connected-line" data-toggle="tab" href="#">Line</a>
					  </li>
					  <li class="nav-item">
					    <a class="nav-link connected-bar" data-toggle="tab" href="#">Bar</a>
					  </li>
					</ul>
				</div>
				<div class="canvas-container canvas-connected-container">
					<canvas id="canvas3"></canvas>
					<canvas id="canvas4"></canvas>
				</div>
			</div>

			<div class="chart-container" style="border-top: 2px solid rgba(14, 16, 15, 0.9);">
				<div class="row">
					<h5>Ccq</h5>
					<ul class="nav nav-tabs chart-tab">
					  <li class="nav-item">
					    <a class="nav-link ccq-line" data-toggle="tab" href="#">Line</a>
					  </li>
					  <li class="nav-item">
					    <a class="nav-link ccq-bar" data-toggle="tab" href="#">Bar</a>
					  </li>
					</ul>
				</div>
				<div class="canvas-container">
					<canvas id="canvas5"></canvas>
					<canvas id="canvas6"></canvas>
				</div>
			</div>

			<div class="chart-container" style="border-top: 2px solid rgba(100, 0, 163, 0.76)">
				<div class="row">
					<h5>Usage</h5>
					<ul class="nav nav-tabs chart-tab">
					  <li class="nav-item">
					    <a class="nav-link usage-line" data-toggle="tab" href="#">Line</a>
					  </li>
					  <li class="nav-item">
					    <a class="nav-link usage-bar" data-toggle="tab" href="#">Bar</a>
					  </li>
					</ul>
				</div>
				<div class="canvas-container">
					<canvas id="canvas9"></canvas>
					<canvas id="canvas10"></canvas>
				</div>
			</div>

		</div>

		<div class="row row1">

			<div class="chart-container" style="border-top: 2px solid rgba(0, 71, 204, 0.76);">
				<div class="row">
					<h5>Util</h5>
					<ul class="nav nav-tabs chart-tab">
					  <li class="nav-item">
					    <a class="nav-link util-line" data-toggle="tab" href="#">Line</a>
					  </li>
					  <li class="nav-item">
					    <a class="nav-link util-bar" data-toggle="tab" href="#">Bar</a>
					  </li>
					</ul>
				</div>
				<div class="canvas-container">
					<canvas id="canvas7"></canvas>
					<canvas id="canvas8"></canvas>
				</div>
			</div>
			
			<div class="chart-container" style="border-top: 2px solid rgba(0, 204, 47, 0.76);">
				<div class="row">
					<h5>Lease</h5>
					<ul class="nav nav-tabs chart-tab">
					  <li class="nav-item">
					    <a class="nav-link lease-line" data-toggle="tab" href="#">Line</a>
					  </li>
					  <li class="nav-item">
					    <a class="nav-link lease-bar" data-toggle="tab" href="#">Bar</a>
					  </li>
					</ul>
				</div>
				<div class="canvas-container">
					<canvas id="canvas11"></canvas>
					<canvas id="canvas12"></canvas>
				</div>
			</div>

			<div class="chart-container" style="border-top: 2px solid rgba(0, 198, 179, 0.76);">
				<div class="row">
					<h5>Free Mem</h5>
					<ul class="nav nav-tabs chart-tab">
					  <li class="nav-item">
					    <a class="nav-link freeMem-line" data-toggle="tab" href="#">Line</a>
					  </li>
					  <li class="nav-item">
					    <a class="nav-link freeMem-bar" data-toggle="tab" href="#">Bar</a>
					  </li>
					</ul>
				</div>
				<div class="canvas-container">
					<canvas id="canvas13"></canvas>
					<canvas id="canvas14"></canvas>
				</div>
			</div>

		</div>

		<div class="row row1">
			
			<div class="chart-container" style="border-top: 2px solid rgba(204, 129, 0, 0.76);">
				<div class="row">
					<h5>CPU Freq</h5>
					<ul class="nav nav-tabs chart-tab">
					  <li class="nav-item">
					    <a class="nav-link cpuFreq-line" data-toggle="tab" href="#">Line</a>
					  </li>
					  <li class="nav-item">
					    <a class="nav-link cpuFreq-bar" data-toggle="tab" href="#">Bar</a>
					  </li>
					</ul>
				</div>
				<div class="canvas-container">
					<canvas id="canvas15"></canvas>
					<canvas id="canvas16"></canvas>
				</div>
			</div>

			<div class="chart-container" style="border-top: 2px solid rgba(198, 0, 0, 0.76);">
				<div class="row">
					<h5>CPU Load</h5>
					<ul class="nav nav-tabs chart-tab">
					  <li class="nav-item">
					    <a class="nav-link cpuLoad-line" data-toggle="tab" href="#">Line</a>
					  </li>
					  <li class="nav-item">
					    <a class="nav-link cpuLoad-bar" data-toggle="tab" href="#">Bar</a>
					  </li>
					</ul>
				</div>
				<div class="canvas-container">
					<canvas id="canvas17"></canvas>
					<canvas id="canvas18"></canvas>
				</div>
			</div>
			<div class="chart-container" style="border-top: 2px solid rgba(11, 29, 24, 0.76);">
				<div class="row">
					<h5>Free Hdd</h5>
					<ul class="nav nav-tabs chart-tab">
					  <li class="nav-item">
					    <a class="nav-link freeHdd-line" data-toggle="tab" href="#">Line</a>
					  </li>
					  <li class="nav-item">
					    <a class="nav-link freeHdd-bar" data-toggle="tab" href="#">Bar</a>
					  </li>
					</ul>
				</div>
				<div class="canvas-container">
					<canvas id="canvas19"></canvas>
					<canvas id="canvas20"></canvas>
				</div>
			</div>

		</div>

	</div>








	<div class="packages-graph">
		

		<div class="row row1">
			<div class="chart-container" style="border-top: 2px solid rgba(14, 16, 15, 0.9);">
				<div class="row">
					<h5>30Mins</h5>
					<ul class="nav nav-tabs chart-tab">
					  <li class="nav-item">
					    <a class="nav-link 30mins-line" data-toggle="tab" href="#">Line</a>
					  </li>
					  <li class="nav-item">
					    <a class="nav-link 30mins-bar" data-toggle="tab" href="#">Bar</a>
					  </li>
					</ul>
				</div>
				<div class="canvas-container">
					<canvas id="canvas21"></canvas>
					<canvas id="canvas22"></canvas>
				</div>
			</div>
			<div class="chart-container" style="border-top: 2px solid rgba(0, 204, 47, 0.76);">
				<div class="row">
					<h5>1Hour</h5>
					<ul class="nav nav-tabs chart-tab">
					  <li class="nav-item">
					    <a class="nav-link 1hour-line" data-toggle="tab" href="#">Line</a>
					  </li>
					  <li class="nav-item">
					    <a class="nav-link 1hour-bar" data-toggle="tab" href="#">Bar</a>
					  </li>
					</ul>
				</div>
				<div class="canvas-container">
					<canvas id="canvas23"></canvas>
					<canvas id="canvas24"></canvas>
				</div>
			</div>
			<div class="chart-container" style="border-top: 2px solid rgba(0, 198, 179, 0.76);">
				<div class="row">
					<h5>2Hours</h5>
					<ul class="nav nav-tabs chart-tab">
					  <li class="nav-item">
					    <a class="nav-link 2hours-line" data-toggle="tab" href="#">Line</a>
					  </li>
					  <li class="nav-item">
					    <a class="nav-link 2hours-bar" data-toggle="tab" href="#">Bar</a>
					  </li>
					</ul>
				</div>
				<div class="canvas-container">
					<canvas id="canvas25"></canvas>
					<canvas id="canvas26"></canvas>
				</div>
			</div>
		</div>

		<div class="row row1">
			
			<div class="chart-container" style="border-top: 2px solid rgba(198, 0, 0, 0.76);">
				<div class="row">
					<h5>3Hours</h5>
					<ul class="nav nav-tabs chart-tab">
					  <li class="nav-item">
					    <a class="nav-link 3hours-line" data-toggle="tab" href="#">Line</a>
					  </li>
					  <li class="nav-item">
					    <a class="nav-link 3hours-bar" data-toggle="tab" href="#">Bar</a>
					  </li>
					</ul>
				</div>
				<div class="canvas-container">
					<canvas id="canvas37"></canvas>
					<canvas id="canvas38"></canvas>
				</div>
			</div>
			<div class="chart-container" style="border-top: 2px solid rgba(204, 129, 0, 0.76);">
				<div class="row">
					<h5>5Hours</h5>
					<ul class="nav nav-tabs chart-tab">
					  <li class="nav-item">
					    <a class="nav-link 5hours-line" data-toggle="tab" href="#">Line</a>
					  </li>
					  <li class="nav-item">
					    <a class="nav-link 5hours-bar" data-toggle="tab" href="#">Bar</a>
					  </li>
					</ul>
				</div>
				<div class="canvas-container">
					<canvas id="canvas27"></canvas>
					<canvas id="canvas28"></canvas>
				</div>
			</div>
			<div class="chart-container" style="border-top: 2px solid rgba(204, 0, 122, 0.76);">
				<div class="row">
					<h5>1Day</h5>
					<ul class="nav nav-tabs chart-tab">
					  <li class="nav-item">
					    <a class="nav-link 1day-line" data-toggle="tab" href="#">Line</a>
					  </li>
					  <li class="nav-item">
					    <a class="nav-link 1day-bar" data-toggle="tab" href="#">Bar</a>
					  </li>
					</ul>
				</div>
				<div class="canvas-container">
					<canvas id="canvas29"></canvas>
					<canvas id="canvas30"></canvas>
				</div>
			</div>
		</div>

		<div class="row row1">
			
			<div class="chart-container" style="border-top: 2px solid rgba(76, 0, 158, 0.9);">
				<div class="row">
					<h5>2Days</h5>
					<ul class="nav nav-tabs chart-tab">
					  <li class="nav-item">
					    <a class="nav-link 2days-line" data-toggle="tab" href="#">Line</a>
					  </li>
					  <li class="nav-item">
					    <a class="nav-link 2days-bar" data-toggle="tab" href="#">Bar</a>
					  </li>
					</ul>
				</div>
				<div class="canvas-container">
					<canvas id="canvas31"></canvas>
					<canvas id="canvas32"></canvas>
				</div>
			</div>

			<div class="chart-container" style="border-top: 2px solid rgba(0, 71, 204, 0.76);">
				<div class="row">
					<h5>4Days</h5>
					<ul class="nav nav-tabs chart-tab">
					  <li class="nav-item">
					    <a class="nav-link 4days-line" data-toggle="tab" href="#">Line</a>
					  </li>
					  <li class="nav-item">
					    <a class="nav-link 4days-bar" data-toggle="tab" href="#">Bar</a>
					  </li>
					</ul>
				</div>
				<div class="canvas-container">
					<canvas id="canvas33"></canvas>
					<canvas id="canvas34"></canvas>
				</div>
			</div>
			<div class="chart-container" style="border-top: 2px solid rgba(100, 0, 163, 0.76);">
				<div class="row">
					<h5>1Week</h5>
					<ul class="nav nav-tabs chart-tab">
					  <li class="nav-item">
					    <a class="nav-link 1week-line" data-toggle="tab" href="#">Line</a>
					  </li>
					  <li class="nav-item">
					    <a class="nav-link 1week-bar" data-toggle="tab" href="#">Bar</a>
					  </li>
					</ul>
				</div>
				<div class="canvas-container">
					<canvas id="canvas35"></canvas>
					<canvas id="canvas36"></canvas>
				</div>
			</div>
		</div>

		<div class="row row1">
			
		</div>
	</div>
</div>






































<!--
<div class="row dashTab">
	<div class="perDay"><a href="#" ng-click="perDay()">Daily</a></div>
	<div class="perWeek"><a href="#" ng-click="perWeek()">Weekly</a></div>
	<div class="perMonth"><a href="#" ng-click="perMonth()">Monthly</a></div>
</div>
<div class="row secDashTab">
	<div class="col-sm-4 rawData"><a href="reports">Table</a></div>
	<div class="col-sm-4 barGraph"><a href="#">Bar Graph</a></div>
	<div class="col-sm-4 lineGraph"><a href="#">Line Graph</a></div>
</div>
<div class="row graphsContainer">
	<div class="chartContainer">
		<canvas id="canvas1" style="margin-top: 20px; border:1px solid black;"></canvas>
		<canvas id="canvas2" style="margin-top: 20px; border:1px solid black;"></canvas>
	</div>
	
	<div class="graphButtons">
		<div class="dropdown graphDropdown">
  			<button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" 
  				data-toggle="dropdown" >
 			</button>
  			<div class="dropdown-menu graphMenu">
  				<div class="col-sm-5 btn btn-success btnDevices"><a href="graphs/activeDevices"><p class="pDevices">Active</p><p>Devices</p></a></div>
    			<div class="col-sm-5 btn btn-success btnActive"><a href="graphs/totalActive"><p class="pActive">Max</p><p>Connected</p></a></div>
				<div class="col-sm-5 btn btn-success btnCcq"><a href="graphs/totalCcq"><p class="pCcq">Ccq</p></a></div>
				<div class="col-sm-5 btn btn-success btnUtil"><a href="graphs/totalUtil"><p class="pUtil">Utiltx</p><p>Utilrx</p></a></div>
				<div class="col-sm-5 btn btn-success btnUsage"><a href="graphs/totalUsage"><p class="pUsage">Usagetx</p><p>Usagerx</p></a></div>
				<div class="col-sm-5 btn btn-success btnLease"><a href="graphs/totalLease"><p class="pLease">Lease</p></a></div>
				<div class="col-sm-5 btn btn-success btnMem"><a href="graphs/totalFreeMem"><p class="pFreeMem">Free</p><p>Memory</p></a></div>
				<div class="col-sm-5 btn btn-success btnFreq"><a href="graphs/totalCpuFreq"><p class="pCpuFreq">CPU</p><p>Frequency</p></a></div>
				<div class="col-sm-5 btn btn-success btnLoad"><a href="graphs/totalCpuLoad"><p class="pCpuLoad">CPU Load</p></a></div>
  				<div class="col-sm-5 btn btn-success btnLoad"><a href="graphs/totalFreeHdd"><p class="pFreeHdd">Free HDD</p></a></div>
  			</div>
		</div>
		<div class="graphBtns">
			<div class="col-sm-5 btn btn-success btnDevices"><a href="graphs/activeDevices"><p class="pDevices">Active</p><p>Devices</p></a></div>
			<div class="col-sm-5 btn btn-success btnActive"><a href="graphs/totalActive"><p class="pActive">Max</p><p>Connected</p></a></div>
			<div class="col-sm-5 btn btn-success btnCcq"><a href="graphs/totalCcq"><p class="pCcq">Ccq</p></a></div>
			<div class="col-sm-5 btn btn-success btnUtil"><a href="graphs/totalUtil"><p class="pUtil">Utiltx</p><p>Utilrx</p></a></div>
			<div class="col-sm-5 btn btn-success btnUsage"><a href="graphs/totalUsage"><p class="pUsage">Usagetx</p><p>Usagerx</p></a></div>
			<div class="col-sm-5 btn btn-success btnLease"><a href="graphs/totalLease"><p class="pLease">Lease</p></a></div>
			<div class="col-sm-5 btn btn-success btnMem"><a href="graphs/totalFreeMem"><p class="pFreeMem">Free</p><p>Memory</p></a></div>
			<div class="col-sm-5 btn btn-success btnFreq"><a href="graphs/totalCpuFreq"><p class="pCpuFreq">CPU</p><p>Frequency</p></a></div>
			<div class="col-sm-5 btn btn-success btnLoad"><a href="graphs/totalCpuLoad"><p class="pCpuLoad">CPU Load</p></a></div>
			<div class="col-sm-5 btn btn-success btnHdd"><a href="graphs/totalFreeHdd"><p class="pFreeHdd">Free HDD</p></a></div>
		</div>		
	</div>
</div>
-->
