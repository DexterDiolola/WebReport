var totalActiveBar, totalActiveLine, maxConnectedBar, maxConnectedLine,
	maxUtilBar, maxUtilLine, maxUsageBar, maxUsageLine, maxCcqBar,
	maxCcqLine, maxLeaseBar, maxLeaseLine, maxFreeMemBar, maxFreeMemLine,
	maxCpuFreqBar, maxCpuFreqLine, maxCpuLoadBar, maxCpuLoadLine,
	maxFreeHddBar, maxFreeHddLine;

function graphActiveDevices(urlParam, trendStr){
	$.getJSON('/api/' + urlParam, function(response){
		var activeDevices = [], dateTime = [];
		
		for(var x=0; x<response.length; x++){
			dateTime.unshift(response[x].dateCreated2);
			activeDevices.unshift(response[x].totalActive);
		}

		//DESTROYS THE OLD EXISTING GRAPH TO AVOID HOVER BUG
		if(totalActiveBar || totalActiveLine){
			totalActiveBar.destroy();
			totalActiveLine.destroy();
		}

		//INITIALIZE HTML CANVAS
		var ctx = document.getElementById("canvas1").getContext("2d");
		var ctx2 = document.getElementById("canvas2").getContext("2d");

		totalActiveBar = new Chart(ctx2, {
			type: "bar",
			data: {
				labels: dateTime,
				datasets: [{
					label: "Active Devices",
					data: activeDevices,
					backgroundColor: "rgba(255, 40, 169, 0.3)",
					borderColor: "rgba(204, 0, 122, 0.76)",
					borderWidth: "2"
				}]
			},
			options:{
				maintainAspectRatio: false,
				title: {
					display: true,
					text: "Active Devices "+ trendStr,
				},
				scales:{
					yAxes:[{
						ticks:{
							beginAtZero: true,
						}
					}],
					xAxes:[{
						display: false
					}]
				},
			}
		});
		totalActiveLine = new Chart(ctx, {
			type: "line",
			data: {
				labels: dateTime,
				datasets: [{
					label: "Active Devices ",
					data: activeDevices,
					backgroundColor: "rgba(255, 40, 169, 0.3)",
					borderColor: "rgba(204, 0, 122, 0.76)",
					borderWidth: "2",
					lineTension: 0.3,
	        		fill: true,
	        		pointBackgroundColor: "rgba(204, 0, 122, 0.76)",
	        		pointRadius: 2
				}]
			},
			options:{
				maintainAspectRatio: false,
				title: {
					display: true,
					text: "Active Devices "+ trendStr,
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
function graphMaxConnected(urlParam, trendStr){
	$.getJSON('/api/' + urlParam, function(response){
		var maxConnected = [], dateTime = [];
		
		for(var x=0; x<response.length; x++){
			dateTime.unshift(response[x].dateCreated2);
			maxConnected.unshift(response[x].active);
		}
		if(maxConnectedBar || maxConnectedLine){
			maxConnectedBar.destroy();
			maxConnectedLine.destroy();
		}
		var ctx = document.getElementById("canvas3").getContext("2d");
		var ctx2 = document.getElementById("canvas4").getContext("2d");

		maxConnectedBar = new Chart(ctx2, {
			type: "bar",
			data: {
				labels: dateTime,
				datasets: [{
					label: "Max Connected",
					data: maxConnected,
					backgroundColor: "rgba(93, 0, 193, 0.5)",
					borderColor: "rgba(76, 0, 158, 0.9)",
					borderWidth: "2"
				}]
			},
			options:{
				maintainAspectRatio: false,
				title: {
					display: true,
					text: "Max Connected "+ trendStr,
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
		maxConnectedLine = new Chart(ctx, {
			type: "line",
			data: {
				labels: dateTime,
				datasets: [{
					label: "Max Connected ",
					data: maxConnected,
					backgroundColor: "rgba(93, 0, 193, 0.5)",
					borderColor: "rgba(76, 0, 158, 0.9)",
					borderWidth: "2",
					lineTension: 0.3,
	        		fill: true,
	        		pointBackgroundColor: "rgba(76, 0, 158, 0.9)",
	        		pointRadius: 2
				}]
			},
			options:{
				maintainAspectRatio: false,
				title: {
					display: true,
					text: "Max Connected "+ trendStr,
				},
				scales:{
					yAxes:[{
						ticks:{
							beginAtZero: true,
							max: Math.max(...maxConnected) + 1
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
function graphMaxCcq(urlParam, trendStr){
	$.getJSON('/api/' + urlParam, function(response){
		var maxCcq = [], dateTime = [];
		
		for(var x=0; x<response.length; x++){
			dateTime.unshift(response[x].dateCreated2);
			maxCcq.unshift(response[x].ccq);
		}
		if(maxCcqBar || maxCcqLine){
			maxCcqBar.destroy();
			maxCcqLine.destroy();
		}
		var ctx = document.getElementById("canvas5").getContext("2d");
		var ctx2 = document.getElementById("canvas6").getContext("2d");

		maxCcqBar = new Chart(ctx2, {
			type: "bar",
			data: {
				labels: dateTime,
				datasets: [{
					label: "Max Ccq",
					data: maxCcq,
					backgroundColor: "rgba(14, 16, 15, 0.4)",
					borderColor: "rgba(14, 16, 15, 0.9)",
					borderWidth: "2"
				}]
			},
			options:{
				maintainAspectRatio: false,
				title: {
					display: true,
					text: "Max Ccq "+ trendStr,
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
		maxCcqLine = new Chart(ctx, {
			type: "line",
			data: {
				labels: dateTime,
				datasets: [{
					label: "Max Ccq ",
					data: maxCcq,
					backgroundColor: "rgba(14, 16, 15, 0.4)",
					borderColor: "rgba(14, 16, 15, 0.9)",
					borderWidth: "2",
					lineTension: 0.3,
	        		fill: true,
	        		pointBackgroundColor: "rgba(14, 16, 15, 0.9)",
	        		pointRadius: 2
				}]
			},
			options:{
				maintainAspectRatio: false,
				title: {
					display: true,
					text: "Max Ccq "+ trendStr,
				},
				scales:{
					yAxes:[{
						ticks:{
							beginAtZero: true,
							max: Math.max(...maxCcq) + 1
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
function graphMaxUtil(urlParam, trendStr){
	$.getJSON('/api/' + urlParam, function(response){
		var maxUtiltx = [], maxUtilrx = [], dateTime = [];
		
		for(var x=0; x<response.length; x++){
			dateTime.unshift(response[x].dateCreated2);
			maxUtiltx.unshift(response[x].utiltx);
			maxUtilrx.unshift(response[x].utilrx);
		}
		if(maxUtilBar || maxUtilLine){
			maxUtilBar.destroy();
			maxUtilLine.destroy();
		}
		var ctx = document.getElementById("canvas7").getContext("2d");
		var ctx2 = document.getElementById("canvas8").getContext("2d");
		maxUtilBar = new Chart(ctx2, {
			type: "bar",
			data: {
				labels: dateTime,
				datasets: [{
					label: "Max Utiltx (in KB)",
					data: maxUtiltx,
					backgroundColor: "rgba(44, 116, 251, 0.3)",
					borderColor: "rgba(0, 71, 204, 0.76)",
					borderWidth: "2"
				},
				{
					label: "Max Utilrx (in KB)",
					data: maxUtilrx,
					backgroundColor: "rgba(26, 65, 54, 0.3)",
					borderColor: "rgba(11, 29, 24, 0.76)",
					borderWidth: "2"	
				}]
			},
			options:{
				maintainAspectRatio: false,
				title: {
					display: true,
					text: "Max Utiltx-Utilrx "+ trendStr,
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
		maxUtilLine = new Chart(ctx, {
			type: "line",
			data: {
				labels: dateTime,
				datasets: [{
					label: "Max Utiltx (in KB)",
					data: maxUtiltx,
					backgroundColor: "rgba(44, 116, 251, 0.3)",
					borderColor: "rgba(0, 71, 204, 0.76)",
					borderWidth: "2",
					lineTension: 0.3,
	        		fill: true,
	        		pointBackgroundColor: "rgba(0, 71, 204, 0.76)",
	        		pointRadius: 2
				},
				{
					label: "Max Utilrx (in KB)",
					data: maxUtilrx,
					backgroundColor: "rgba(26, 65, 54, 0.3)",
					borderColor: "rgba(11, 29, 24, 0.76)",
					borderWidth: "2",
					lineTension: 0.3,
        			fill: false,
        			pointBackgroundColor: "rgba(11, 29, 24, 0.76)",
        			pointRadius: 2
				}]
			},
			options:{
				maintainAspectRatio: false,
				title: {
					display: true,
					text: "Max Utiltx-Utilrx "+ trendStr,
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
	})
}
function graphMaxUsage(urlParam, trendStr){
	$.getJSON('/api/' + urlParam, function(response){
		var maxUsagetx = [], maxUsagerx = [], dateTime = [];
		
		for(var x=0; x<response.length; x++){
			dateTime.unshift(response[x].dateCreated2);
			maxUsagetx.unshift(response[x].usagetx);
			maxUsagerx.unshift(response[x].usagerx);
		}
		if(maxUsageBar || maxUsageLine){
			maxUsageBar.destroy();
			maxUsageLine.destroy();
		}
		var ctx = document.getElementById("canvas9").getContext("2d");
		var ctx2 = document.getElementById("canvas10").getContext("2d");
		maxUsageBar = new Chart(ctx2, {
			type: "bar",
			data: {
				labels: dateTime,
				datasets: [{
					label: "Max Usagetx (in GB)",
					data: maxUsagetx,
					backgroundColor: "rgba(170, 35, 255, 0.3)",
					borderColor: "rgba(100, 0, 163, 0.76)",
					borderWidth: "2"
				},
				{
					label: "Max Usagerx (in GB)",
					data: maxUsagerx,
					backgroundColor: "rgba(26, 65, 54, 0.3)",
					borderColor: "rgba(11, 29, 24, 0.76)",
					borderWidth: "2"	
				}]
			},
			options:{
				maintainAspectRatio: false,
				title: {
					display: true,
					text: "Max Usagetx-Usagerx "+ trendStr,
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
		maxUsageLine = new Chart(ctx, {
			type: "line",
			data: {
				labels: dateTime,
				datasets: [{
					label: "Max Usagetx (in GB)",
					data: maxUsagetx,
					backgroundColor: "rgba(170, 35, 255, 0.3)",
					borderColor: "rgba(100, 0, 163, 0.76)",
					borderWidth: "2",
					lineTension: 0.3,
	        		fill: true,
	        		pointBackgroundColor: "rgba(100, 0, 163, 0.76)",
	        		pointRadius: 2
				},
				{
					label: "Max Usagerx (in GB)",
					data: maxUsagerx,
					backgroundColor: "rgba(26, 65, 54, 0.3)",
					borderColor: "rgba(11, 29, 24, 0.76)",
					borderWidth: "2",
					lineTension: 0.3,
        			fill: false,
        			pointBackgroundColor: "rgba(11, 29, 24, 0.76)",
        			pointRadius: 2
				}]
			},
			options:{
				maintainAspectRatio: false,
				title: {
					display: true,
					text: "Max Usagetx-Usagerx "+ trendStr,
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
	})
}
function graphMaxLease(urlParam, trendStr){
	$.getJSON('/api/' + urlParam, function(response){
		var maxLease = [], dateTime = [];
		
		for(var x=0; x<response.length; x++){
			dateTime.unshift(response[x].dateCreated2);
			maxLease.unshift(response[x].lease);
		}
		if(maxLeaseBar || maxLeaseLine){
			maxLeaseBar.destroy();
			maxLeaseLine.destroy();
		}
		var ctx = document.getElementById("canvas11").getContext("2d");
		var ctx2 = document.getElementById("canvas12").getContext("2d");
		maxLeaseBar = new Chart(ctx2, {
			type: "bar",
			data: {
				labels: dateTime,
				datasets: [{
					label: "Max Lease ",
					data: maxLease,
					backgroundColor: "rgba(35, 255, 86, 0.3)",
					borderColor: "rgba(0, 204, 47, 0.76)",
					borderWidth: "2"
					
				}]
			},
			options:{
				maintainAspectRatio: false,
				title: {
					display: true,
					text: "Max Lease "+ trendStr,
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
		maxLeaseLine = new Chart(ctx, {
			type: "line",
			data: {
				labels: dateTime,
				datasets: [{
					label: "Max Lease ",
					data: maxLease,
					backgroundColor: "rgba(35, 255, 86, 0.3)",
					borderColor: "rgba(0, 204, 47, 0.76)",
					borderWidth: "2",
					lineTension: 0.3,
	        		fill: true,
	        		pointBackgroundColor: "rgba(0, 204, 47, 0.76)",
	        		pointRadius: 2
				}]
			},
			options:{
				maintainAspectRatio: false,
				title: {
					display: true,
					text: "Max Lease "+ trendStr,
				},
				scales:{
					yAxes:[{
						ticks:{
							beginAtZero: true,
							max: Math.max(...maxLease) + 1
						}
					}],
					xAxes:[{
						display: false
					}]
				},
			}
		});
	})
}
function graphMaxFreeMem(urlParam, trendStr){
	$.getJSON('/api/' + urlParam, function(response){
		var maxFreeMem = [], dateTime = [];
		
		for(var x=0; x<response.length; x++){
			dateTime.unshift(response[x].dateCreated2);
			maxFreeMem.unshift(response[x].freeMem);
		}
		if(maxFreeMemBar || maxFreeMemLine){
			maxFreeMemBar.destroy();
			maxFreeMemLine.destroy();
		}
		var ctx = document.getElementById("canvas13").getContext("2d");
		var ctx2 = document.getElementById("canvas14").getContext("2d");
		
		maxFreeMemBar = new Chart(ctx2, {
			type: "bar",
			data: {
				labels: dateTime,
				datasets: [{
					label: "Max Free Memory (in MB) ",
					data: maxFreeMem,
					backgroundColor: "rgba(103, 245, 253, 0.3)",
					borderColor: "rgba(0, 198, 179, 0.76)",
					borderWidth: "2"
					
				}]
			},
			options:{
				maintainAspectRatio: false,
				title: {
					display: true,
					text: "Max Free Memory "+ trendStr,
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
		maxFreeMemLine = new Chart(ctx, {
			type: "line",
			data: {
				labels: dateTime,
				datasets: [{
					label: "Max Free Memory (in MB)",
					data: maxFreeMem,
					backgroundColor: "rgba(103, 245, 253, 0.3)",
					borderColor: "rgba(0, 198, 179, 0.76)",
					borderWidth: "2",
					lineTension: 0.3,
	        		fill: true,
	        		pointBackgroundColor: "rgba(0, 198, 179, 0.76)",
	        		pointRadius: 2
				}]
			},
			options:{
				maintainAspectRatio: false,
				title: {
					display: true,
					text: "Max Free Memory "+ trendStr,
				},
				scales:{
					yAxes:[{
						ticks:{
							beginAtZero: true,
							max: Math.max(...maxFreeMem) + 1
						}
					}],
					xAxes:[{
						display: false
					}]
				},
			}
		});
	})
}
function graphMaxCpuFreq(urlParam, trendStr){
	$.getJSON('/api/' + urlParam, function(response){
		var maxCpuFreq = [], dateTime = [];
		
		for(var x=0; x<response.length; x++){
			dateTime.unshift(response[x].dateCreated2);
			maxCpuFreq.unshift(response[x].cpuFreq);
		}
		if(maxCpuFreqBar || maxCpuFreqLine){
			maxCpuFreqBar.destroy();
			maxCpuFreqLine.destroy();
		}
		var ctx = document.getElementById("canvas15").getContext("2d");
		var ctx2 = document.getElementById("canvas16").getContext("2d");
		
		maxCpuFreqBar = new Chart(ctx2, {
			type: "bar",
			data: {
				labels: dateTime,
				datasets: [{
					label: "Max CPU Frequency ",
					data: maxCpuFreq,
					backgroundColor: "rgba(255, 174, 35, 0.3)",
					borderColor: "rgba(204, 129, 0, 0.76)",
					borderWidth: "2"
					
				}]
			},
			options:{
				maintainAspectRatio: false,
				title: {
					display: true,
					text: "Max CPU Frequency "+ trendStr,
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
		maxCpuFreqLine = new Chart(ctx, {
			type: "line",
			data: {
				labels: dateTime,
				datasets: [{
					label: "Max CPU Frequency ",
					data: maxCpuFreq,
					backgroundColor: "rgba(255, 174, 35, 0.3)",
					borderColor: "rgba(204, 129, 0, 0.76)",
					borderWidth: "2",
					lineTension: 0.3,
	        		fill: true,
	        		pointBackgroundColor: "rgba(204, 129, 0, 0.76)",
	        		pointRadius: 2
				}]
			},
			options:{
				maintainAspectRatio: false,
				title: {
					display: true,
					text: "Max CPU Frequency "+ trendStr,
				},
				scales:{
					yAxes:[{
						ticks:{
							beginAtZero: true,
							max: Math.max(...maxCpuFreq) + 10
						}
					}],
					xAxes:[{
						display: false
					}]
				},
			}
		});
	})
}
function graphMaxCpuLoad(urlParam, trendStr){
	$.getJSON('/api/' + urlParam, function(response){
		var maxCpuLoad = [], dateTime = [];
		
		for(var x=0; x<response.length; x++){
			dateTime.unshift(response[x].dateCreated2);
			maxCpuLoad.unshift(response[x].cpuLoad);
		}
		if(maxCpuLoadBar || maxCpuLoadLine){
			maxCpuLoadBar.destroy();
			maxCpuLoadLine.destroy();
		}
		var ctx = document.getElementById("canvas17").getContext("2d");
		var ctx2 = document.getElementById("canvas18").getContext("2d");
		
		maxCpuLoadBar = new Chart(ctx2, {
			type: "bar",
			data: {
				labels: dateTime,
				datasets: [{
					label: "Max CPU Load",
					data: maxCpuLoad,
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
					text: "Max CPU Load "+ trendStr,
				}
			}
		});	
		maxCpuLoadLine = new Chart(ctx, {
			type: "line",
			data: {
				labels: dateTime,
				datasets: [{
					label: "Max CPU Load ",
					data: maxCpuLoad,
					backgroundColor: "rgba(255, 35, 35, 0.3)",
					borderColor: "rgba(198, 0, 0, 0.76)",
					borderWidth: "2",
					lineTension: 0.3,
       				fill: true,
       				pointBackgroundColor: "rgba(198, 0, 0, 0.76)",
       				pointRadius: 2
				}]
			},
			options:{
				maintainAspectRatio: false,
				scales:{
					yAxes:[{
						ticks:{
							beginAtZero: true,
							max: Math.max(...maxCpuLoad) + 1
						}
					}],
					xAxes:[{
						display: false
					}]
				},
				title: {
					display: true,
					text: "Max CPU Load "+ trendStr,
				}
			}
		});
	})
}
function graphMaxFreeHdd(urlParam, trendStr){
	$.getJSON('/api/' + urlParam, function(response){
		var maxFreeHdd = [], dateTime = [];
		
		for(var x=0; x<response.length; x++){
			dateTime.unshift(response[x].dateCreated2);
			maxFreeHdd.unshift(response[x].freeHdd/1000000);
		}
		if(maxFreeHddBar || maxFreeHddLine){
			maxFreeHddBar.destroy();
			maxFreeHddLine.destroy();
		}
		var ctx = document.getElementById("canvas19").getContext("2d");
		var ctx2 = document.getElementById("canvas20").getContext("2d");
		
		maxFreeHddBar = new Chart(ctx2, {
			type: "bar",
			data: {
				labels: dateTime,
				datasets: [{
					label: "Max Free Hdd",
					data: maxFreeHdd,
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
					text: "Max Free Hdd "+ trendStr,
				}
			}
		});	
		maxFreeHddLine = new Chart(ctx, {
			type: "line",
			data: {
				labels: dateTime,
				datasets: [{
					label: "Max Free Hdd ",
					data: maxFreeHdd,
					backgroundColor: "rgba(26, 65, 54, 0.3)",
					borderColor: "rgba(11, 29, 24, 0.76)",
					borderWidth: "2",
					lineTension: 0.3,
       				fill: false,
       				pointBackgroundColor: "rgba(11, 29, 24, 0.76)",
       				pointRadius: 2
				}]
			},
			options:{
				maintainAspectRatio: false,
				scales:{
					yAxes:[{
						ticks:{
							beginAtZero: true,
							max: Math.max(...maxFreeHdd) + 1
						}
					}],
					xAxes:[{
						display: false
					}]
				},
				title: {
					display: true,
					text: "Max Free Hdd "+ trendStr,
				}
			}
		});
	})
}
