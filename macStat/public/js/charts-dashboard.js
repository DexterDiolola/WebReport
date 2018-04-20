//GRAPH FUNCTIONS
var myChart, myChart2;	// IN ORDER TO AVOID HOVER BUGS, DECLARE CHART VARIABLE OUTSIDE

function graphActiveDevices(urlParam, trendStr){
	$.getJSON('/api/' + urlParam, function(result){
		var activeDevices = [], dateTime = [];
		
		for(var x=0; x<result.length; x++){
			dateTime.unshift(result[x].dateCreated2);
			activeDevices.unshift(result[x].totalActive);
		}

		//DESTROYS THE OLD EXISTING GRAPH TO AVOID HOVER BUG
		if(myChart || myChart2){
			myChart.destroy();
			myChart2.destroy();
		}

		//INITIALIZE HTML CANVAS
		var ctx = document.getElementById("canvas1").getContext("2d");
		var ctx2 = document.getElementById("canvas2").getContext("2d");

		myChart = new Chart(ctx2, {
			type: "bar",
			data: {
				labels: dateTime,
				datasets: [{
					label: "Active Devices",
					data: activeDevices,
					backgroundColor: "rgba(14, 16, 15, 0.4)",
					borderColor: "rgba(14, 16, 15, 0.9)",
					borderWidth: "2"
				}]
			},
			options:{
				maintainAspectRatio: false,
				title: {
					display: true,
					text: "Active Devices per "+ trendStr,
				},
				scales:{
					yAxes:[{
						ticks:{
							beginAtZero: true,
							max: 30
						}
					}],
					xAxes:[{
						display: false
					}]
				},
			}
		});
		myChart2 = new Chart(ctx, {
			type: "line",
			data: {
				labels: dateTime,
				datasets: [{
					label: "Active Devices ",
					data: activeDevices,
					backgroundColor: "rgba(14, 16, 15, 0.4)",
					borderColor: "rgba(14, 16, 15, 0.9)",
					borderWidth: "2",
					lineTension: 0,
        			fill: true,
        			pointBackgroundColor: "rgba(14, 16, 15, 0.4",
        			pointBorderColor: "rgba(14, 16, 15, 0.9)"
				}]
			},
			options:{
				maintainAspectRatio: false,
				title: {
					display: true,
					text: "Active Devices per "+ trendStr,
				},
				scales:{
					yAxes:[{
						ticks:{
							beginAtZero: true,
							max: Math.max(...activeDevices) + 1
						}
					}],
					xAxes:[{
						display: false
					}]
				},
			}
		});

	});
}

function graphLayout(urlParam, trendStr, type){
	$.getJSON('/api/' + urlParam, function(result){
		var dateTime = [], totalActive = [], totalCcq = [], totalUtiltx = [], 
		totalUtilrx = [], totalUsagetx = [], totalUsagerx = [], totalLease = [],
		totalFreeMem = [], totalCpuFreq = [], totalCpuLoad = [], totalFreeHdd = [];

		//STORE THE JSON DATA IN ARRAYS
		for(var x=0; x<result.length; x++){
			dateTime.unshift(result[x].dateCreated2);	/*use unshift because the sql data is*/
			totalActive.unshift(result[x].active);		/*in DESCENDING order*/
			totalCcq.unshift(result[x].ccq);
			totalUtiltx.unshift(result[x].utiltx);
			totalUtilrx.unshift(result[x].utilrx);
			totalUsagetx.unshift(result[x].usagetx);
			totalUsagerx.unshift(result[x].usagerx);
			totalLease.unshift(result[x].lease);
			totalFreeMem.unshift(result[x].freeMem);
			totalCpuFreq.unshift(result[x].cpuFreq);
			totalCpuLoad.unshift(result[x].cpuLoad);
			if(result[x].freeHdd > 1000000){
				totalFreeHdd.unshift(result[x].freeHdd/1000000);
			}
			else{
				totalFreeHdd.unshift(result[x].freeHdd);
			}
			
		}

		//DESTROYS THE OLD EXISTING GRAPH TO AVOID HOVER BUG
		if(myChart || myChart2){
			myChart.destroy();
			myChart2.destroy();
		}

		//INITIALIZE HTML CANVAS
		var ctx = document.getElementById("canvas1").getContext("2d");
		var ctx2 = document.getElementById("canvas2").getContext("2d");
		//Chart.defaults.global.responsive = false;

		//TOTAL ACTIVE GRAPH
		if(type=="totalActive"){
			myChart = new Chart(ctx2, {
				type: "bar",
				data: {
					labels: dateTime,
					datasets: [{
						label: "Max Connected",
						data: totalActive,
						backgroundColor: "rgba(35, 255, 86, 0.3)",
						borderColor: "rgba(0, 204, 47, 0.76)",
						borderWidth: "2"
					}]
				},
				options:{
					maintainAspectRatio: false,
					title: {
						display: true,
						text: "Max Connected per "+ trendStr,
					},
					//responsive: false,
					scales:{
						yAxes:[{
							ticks:{
								beginAtZero: true
							}
						}],
						xAxes:[{
							display: false
						}]
					},
				}
			});	
			myChart2 = new Chart(ctx, {
				type: "line",
				data: {
					labels: dateTime,
					datasets: [{
						label: "Max Connected ",
						data: totalActive,
						backgroundColor: "rgba(35, 255, 86, 0.3)",
						borderColor: "rgba(0, 204, 47, 0.76)",
						borderWidth: "2",
						lineTension: 0,
        				fill: true,
        				pointBackgroundColor: "black",
        				pointBorderColor: "rgba(35, 255, 86, 0.3)"
					}]
				},
				options:{
					maintainAspectRatio: false,
					title: {
						display: true,
						text: "Max Connected per "+ trendStr,
					},
					scales:{
						yAxes:[{
							ticks:{
								beginAtZero: true,
								max: Math.max(...totalActive) + 1
							}
						}],
						xAxes:[{
							display: false
						}]
					},
				}
			});
		}

		//TOTAL CCQ GRAPH
		else if(type=="totalCcq"){
			myChart = new Chart(ctx2, {
				type: "bar",
				data: {
					labels: dateTime,
					datasets: [{
						label: "Max Ccq ",
						data: totalCcq,
						backgroundColor: "rgba(35, 255, 233, 0.3)",
						borderColor: "rgba(0, 198, 179, 0.76)",
						borderWidth: "2"
						
					}]
				},
				options:{
					maintainAspectRatio: false,
					title: {
						display: true,
						text: "Max Ccq per "+ trendStr,
					},
					scales:{
						yAxes:[{
							ticks:{
								beginAtZero: true
							}
						}],
						xAxes:[{
							display: false
						}]
					},
				}
			});
			myChart2 = new Chart(ctx, {
				type: "line",
				data: {
					labels: dateTime,
					datasets: [{
						label: "Max Ccq ",
						data: totalCcq,
						backgroundColor: "rgba(103, 245, 253, 0.3)",
						borderColor: "rgba(0, 198, 179, 0.76)",
						borderWidth: "2",
						lineTension: 0,
        				fill: true,
        				pointBackgroundColor: "black",
        				pointBorderColor: "rgba(0, 198, 179, 0.76)"
					}]
				},
				options:{
					maintainAspectRatio: false,
					title: {
						display: true,
						text: "Max Ccq per "+ trendStr,
					},
					scales:{
						yAxes:[{
							ticks:{
								beginAtZero: true,
								max: Math.max(...totalCcq) + 1
							}
						}],
						xAxes:[{
							display: false
						}]
					},
				}
			});
		}

		//TOTAL UTIL GRAPH
		else if(type=="totalUtil"){
			myChart = new Chart(ctx2, {
				type: "bar",
				data: {
					labels: dateTime,
					datasets: [{
						label: "Max Utiltx (in KB)",
						data: totalUtiltx,
						backgroundColor: "rgba(255, 174, 35, 0.3)",
						borderColor: "rgba(204, 129, 0, 0.76)",
						borderWidth: "2"
					},
					{
						label: "Max Utilrx (in KB)",
						data: totalUtilrx,
						backgroundColor: "rgba(26, 65, 54, 0.3)",
						borderColor: "rgba(11, 29, 24, 0.76)",
						borderWidth: "2"	
					}]
				},
				options:{
					maintainAspectRatio: false,
					title: {
						display: true,
						text: "Max Utiltx-Utilrx per "+ trendStr,
					},
					scales:{
						yAxes:[{
							ticks:{
								beginAtZero: true
							}
						}],
						xAxes:[{
							display: false
						}]
					},
				}
			});	
			myChart2 = new Chart(ctx, {
				type: "line",
				data: {
					labels: dateTime,
					datasets: [{
						label: "Max Utiltx (in KB)",
						data: totalUtiltx,
						backgroundColor: "rgba(255, 174, 35, 0.3)",
						borderColor: "rgba(204, 129, 0, 0.76)",
						borderWidth: "2",
						lineTension: 0,
        				fill: true,
        				pointBackgroundColor: "black",
        				pointBorderColor: "rgba(204, 129, 0, 0.76)"
					},
					{
						label: "Max Utilrx (in KB)",
						data: totalUtilrx,
						backgroundColor: "rgba(26, 65, 54, 0.3)",
						borderColor: "rgba(11, 29, 24, 0.76)",
						borderWidth: "2",
						lineTension: 0,
        				fill: false,
        				pointBackgroundColor: "black",
        				pointBorderColor: "rgba(11, 29, 24, 0.76)"
					}]
				},
				options:{
					maintainAspectRatio: false,
					title: {
						display: true,
						text: "Max Utiltx-Utilrx per "+ trendStr,
					},
					scales:{
						yAxes:[{
							ticks:{
								beginAtZero: true
							}
						}],
						xAxes:[{
							display: false
						}]
					},
				}
			});
		}

		//TOTAL USAGE GRAPH
		else if(type=="totalUsage"){
			myChart = new Chart(ctx2, {
				type: "bar",
				data: {
					labels: dateTime,
					datasets: [{
						label: "Max Usagetx (in GB)",
						data: totalUsagetx,
						backgroundColor: "rgba(255, 40, 169, 0.3)",
						borderColor: "rgba(204, 0, 122, 0.76)",
						borderWidth: "2"
					},
					{
						label: "Max Usagerx (in GB)",
						data: totalUsagerx,
						backgroundColor: "rgba(26, 65, 54, 0.3)",
						borderColor: "rgba(11, 29, 24, 0.76)",
						borderWidth: "2"	
					}]
				},
				options:{
					maintainAspectRatio: false,
					title: {
						display: true,
						text: "Max Usagetx-Usagerx per "+ trendStr,
					},
					scales:{
						yAxes:[{
							ticks:{
								beginAtZero: true
							}
						}],
						xAxes:[{
							display: false
						}]
					},
				}
			});	
			myChart2 = new Chart(ctx, {
				type: "line",
				data: {
					labels: dateTime,
					datasets: [{
						label: "Max Usagetx (in GB)",
						data: totalUsagetx,
						backgroundColor: "rgba(255, 40, 169, 0.3)",
						borderColor: "rgba(204, 0, 122, 0.76)",
						borderWidth: "2",
						lineTension: 0,
        				fill: true,
        				pointBackgroundColor: "black",
        				pointBorderColor: "rgba(204, 0, 122, 0.76)"
					},
					{
						label: "Max Usagerx (in GB)",
						data: totalUsagerx,
						backgroundColor: "rgba(26, 65, 54, 0.3)",
						borderColor: "rgba(11, 29, 24, 0.76)",
						borderWidth: "2",
						lineTension: 0,
        				fill: false,
        				pointBackgroundColor: "black",
        				pointBorderColor: "rgba(11, 29, 24, 0.76)"
					}]
				},
				options:{
					maintainAspectRatio: false,
					title: {
						display: true,
						text: "Max Usagetx-Usagerx per "+ trendStr,
					},
					scales:{
						yAxes:[{
							ticks:{
								beginAtZero: true
							}
						}],
						xAxes:[{
							display: false
						}]
					},
				}
			});
		}

		//TOTAL LEASE GRAPH
		else if(type=="totalLease"){
			myChart = new Chart(ctx2, {
				type: "bar",
				data: {
					labels: dateTime,
					datasets: [{
						label: "Max Lease ",
						data: totalLease,
						backgroundColor: "rgba(93, 0, 193, 0.5)",
						borderColor: "rgba(76, 0, 158, 0.9)",
						borderWidth: "2"
						
					}]
				},
				options:{
					maintainAspectRatio: false,
					title: {
						display: true,
						text: "Max Lease per "+ trendStr,
					},
					scales:{
						yAxes:[{
							ticks:{
								beginAtZero: true
							}
						}],
						xAxes:[{
							display: false
						}]
					},
				}
			});
			myChart2 = new Chart(ctx, {
				type: "line",
				data: {
					labels: dateTime,
					datasets: [{
						label: "Max Lease ",
						data: totalLease,
						backgroundColor: "rgba(93, 0, 193, 0.5)",
						borderColor: "rgba(76, 0, 158, 0.9)",
						borderWidth: "2",
						lineTension: 0,
        				fill: true,
        				pointBackgroundColor: "black",
        				pointBorderColor: "rgba(76, 0, 158, 0.9)"
					}]
				},
				options:{
					maintainAspectRatio: false,
					title: {
						display: true,
						text: "Max Lease per "+ trendStr,
					},
					scales:{
						yAxes:[{
							ticks:{
								beginAtZero: true
							}
						}],
						xAxes:[{
							display: false
						}]
					},
				}
			});
		}

		//TOTAL FREEMEM GRAPH
		else if(type=="totalFreeMem"){
			myChart = new Chart(ctx2, {
				type: "bar",
				data: {
					labels: dateTime,
					datasets: [{
						label: "Max Free Memory (in MB) ",
						data: totalFreeMem,
						backgroundColor: "rgba(44, 116, 251, 0.3)",
						borderColor: "rgba(0, 71, 204, 0.76)",
						borderWidth: "2"
						
					}]
				},
				options:{
					maintainAspectRatio: false,
					title: {
						display: true,
						text: "Max Free Memory per "+ trendStr,
					},
					scales:{
						yAxes:[{
							ticks:{
								beginAtZero: true
							}
						}],
						xAxes:[{
							display: false
						}]
					},
				}
			});
			myChart2 = new Chart(ctx, {
				type: "line",
				data: {
					labels: dateTime,
					datasets: [{
						label: "Max Free Memory (in MB)",
						data: totalFreeMem,
						backgroundColor: "rgba(44, 116, 251, 0.3)",
						borderColor: "rgba(0, 71, 204, 0.76)",
						borderWidth: "2",
						lineTension: 0,
        				fill: true,
        				pointBackgroundColor: "black",
        				pointBorderColor: "rgba(0, 71, 204, 0.76)"
					}]
				},
				options:{
					maintainAspectRatio: false,
					title: {
						display: true,
						text: "Max Free Memory per "+ trendStr,
					},
					scales:{
						yAxes:[{
							ticks:{
								beginAtZero: true
							}
						}],
						xAxes:[{
							display: false
						}]
					},
				}
			});
		}

		else if(type=="totalCpuFreq"){
			myChart = new Chart(ctx2, {
				type: "bar",
				data: {
					labels: dateTime,
					datasets: [{
						label: "Max CPU Frequency ",
						data: totalCpuFreq,
						backgroundColor: "rgba(170, 35, 255, 0.3)",
						borderColor: "rgba(100, 0, 163, 0.76)",
						borderWidth: "2"
						
					}]
				},
				options:{
					maintainAspectRatio: false,
					title: {
						display: true,
						text: "Max CPU Frequency per "+ trendStr,
					},
					scales:{
						yAxes:[{
							ticks:{
								beginAtZero: true
							}
						}],
						xAxes:[{
							display: false
						}]
					},
				}
			});
			myChart2 = new Chart(ctx, {
				type: "line",
				data: {
					labels: dateTime,
					datasets: [{
						label: "Max CPU Frequency ",
						data: totalCpuFreq,
						backgroundColor: "rgba(170, 35, 255, 0.3)",
						borderColor: "rgba(100, 0, 163, 0.76)",
						borderWidth: "2",
						lineTension: 0,
        				fill: true,
        				pointBackgroundColor: "black",
        				pointBorderColor: "rgba(100, 0, 163, 0.76)"
					}]
				},
				options:{
					maintainAspectRatio: false,
					title: {
						display: true,
						text: "Max CPU Frequency per "+ trendStr,
					},
					scales:{
						yAxes:[{
							ticks:{
								beginAtZero: true
							}
						}],
						xAxes:[{
							display: false
						}]
					},
				}
			});
		}
		else if(type=="totalCpuLoad"){
			myChart = new Chart(ctx2, {
				type: "bar",
				data: {
					labels: dateTime,
					datasets: [{
						label: "Max CPU Load",
						data: totalCpuLoad,
						backgroundColor: "rgba(255, 35, 35, 0.3)",
						borderColor: "rgba(198, 0, 0, 0.76)",
						borderWidth: "2"
					}]
				},
				options:{
					maintainAspectRatio: false,
					scales:{
						yAxes:[{
							ticks:{
								beginAtZero: true
							}
						}],
						xAxes:[{
							display: false
						}]
					},
					title: {
						display: true,
						text: "Max CPU Load per "+ trendStr,
					}
				}
			});	
			myChart2 = new Chart(ctx, {
				type: "line",
				data: {
					labels: dateTime,
					datasets: [{
						label: "Max CPU Load ",
						data: totalCpuLoad,
						backgroundColor: "rgba(255, 35, 35, 0.3)",
						borderColor: "rgba(198, 0, 0, 0.76)",
						borderWidth: "2",
						lineTension: 0,
        				fill: true,
        				pointBackgroundColor: "black",
        				pointBorderColor: "rgba(198, 0, 0, 0.76)"
					}]
				},
				options:{
					maintainAspectRatio: false,
					scales:{
						yAxes:[{
							ticks:{
								beginAtZero: true
							}
						}],
						xAxes:[{
							display: false
						}]
					},
					title: {
						display: true,
						text: "Max CPU Load per "+ trendStr,
					}
				}
			});
		}

		else if(type=="totalFreeHdd"){
			myChart = new Chart(ctx2, {
				type: "bar",
				data: {
					labels: dateTime,
					datasets: [{
						label: "Max Free Hdd",
						data: totalFreeHdd,
						backgroundColor: "rgba(26, 65, 54, 0.3)",
						borderColor: "rgba(11, 29, 24, 0.76)",
						borderWidth: "2"
					}]
				},
				options:{
					maintainAspectRatio: false,
					scales:{
						yAxes:[{
							ticks:{
								beginAtZero: true
							}
						}],
						xAxes:[{
							display: false
						}]
					},
					title: {
						display: true,
						text: "Max Free Hdd per "+ trendStr,
					}
				}
			});	
			myChart2 = new Chart(ctx, {
				type: "line",
				data: {
					labels: dateTime,
					datasets: [{
						label: "Max Free Hdd ",
						data: totalFreeHdd,
						backgroundColor: "rgba(26, 65, 54, 0.3)",
						borderColor: "rgba(11, 29, 24, 0.76)",
						borderWidth: "2",
						lineTension: 0,
        				fill: false,
        				pointBackgroundColor: "black",
        				pointBorderColor: "rgba(11, 29, 24, 0.76)"
					}]
				},
				options:{
					maintainAspectRatio: false,
					scales:{
						yAxes:[{
							ticks:{
								beginAtZero: true
							}
						}],
						xAxes:[{
							display: false
						}]
					},
					title: {
						display: true,
						text: "Max Free Hdd per "+ trendStr,
					}
				}
			});
		}

		
	});
}
