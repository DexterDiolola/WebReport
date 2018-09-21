var myChart3, myChart4;

function graphDispense(trend, owner, type){
	var dateTime = [], totalDispense = [], totalValue = [],
		xxxMinutes = [], iHour = [], iiHours = [], iiiHours = [],
		vHours = [], iDay = [], iiDays = [], ivDays = [], iWeek = [];

	$.getJSON('/api/dispense-results/?x=&trend=' +trend+ '&owner=' +owner, function(response){
		$('.preloader').fadeOut();
		for(var x=0; x<response.length; x++){
			var spliter = response[x]['dateCreated'].split(" ");

			dateTime.push(spliter[0]);
			totalDispense.push(response[x]['totalDispense']);
			totalValue.push(response[x]['totalValue']);
			
		}
		//DESTROYS THE OLD EXISTING GRAPH TO AVOID HOVER BUG
		if(myChart3 || myChart4){
			myChart3.destroy();
			myChart4.destroy();
		}

		//INITIALIZE HTML CANVAS
		var ctx3 = document.getElementById("canvas3").getContext("2d");
		var ctx4 = document.getElementById("canvas4").getContext("2d");

		if(type=="totalDispense"){
			myChart3 = new Chart(ctx4, {
				type: "bar",
				data: {
					labels: dateTime,
					datasets: [{
						label: "Total Dispense",
						data: totalDispense,
						backgroundColor: "rgba(14, 16, 15, 0.4)",
						borderColor: "rgba(14, 16, 15, 0.9)",
						borderWidth: "2"
					}]
				},
				options:{
					maintainAspectRatio: false,
					title: {
						display: true,
						text: "Total Dispense Graph ",
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
			myChart4 = new Chart(ctx3, {
				type: "line",
				data: {
					labels: dateTime,
					datasets: [{
						label: "Total Dispense",
						data: totalDispense,
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
						text: "Total Dispense Graph ",
					},
					scales:{
						yAxes:[{
							ticks:{
								beginAtZero: true,
								max: Math.max(...totalDispense) + 1
							}
						}],
						xAxes:[{
							display: false
						}]
					},
				}
			});
		}

		else if(type=="totalValue"){
			myChart3 = new Chart(ctx4, {
				type: "bar",
				data: {
					labels: dateTime,
					datasets: [{
						label: "Total Value",
						data: totalValue,
						backgroundColor: "rgba(170, 35, 255, 0.3)",
						borderColor: "rgba(100, 0, 163, 0.76)",
						borderWidth: "2"
					}]
				},
				options:{
					maintainAspectRatio: false,
					title: {
						display: true,
						text: "Total Value Graph ",
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
			myChart4 = new Chart(ctx3, {
				type: "line",
				data: {
					labels: dateTime,
					datasets: [{
						label: "Total Value",
						data: totalValue,
						backgroundColor: "rgba(170, 35, 255, 0.3)",
						borderColor: "rgba(100, 0, 163, 0.76)",
						borderWidth: "2",
						lineTension: 0.3,
	        			fill: true,
	        			pointBackgroundColor: "rgba(100, 0, 163, 0.76)",
	        			pointRadius: 2
					}]
				},
				options:{
					maintainAspectRatio: false,
					title: {
						display: true,
						text: "Total Value Graph ",
					},
					scales:{
						yAxes:[{
							ticks:{
								beginAtZero: true,
								max: Math.max(...totalValue) + 1
							}
						}],
						xAxes:[{
							display: false
						}]
					},
				}
			});
		}

	});
}


function graphDispense2(trend, owner, type){
	var dateTime = [], xxxMinutes = [], iHour = [], iiHours = [], iiiHours = [],
		vHours = [], iDay = [], iiDays = [], ivDays = [], iWeek = [];

	$.getJSON('/api/dispense-results/?x=&trend=' +trend+ '&owner=' +owner, function(response){
		$('.preloader').fadeOut();
		for(var x=0; x<response.length; x++){
			var spliter = response[x]['dateCreated'].split(" ");

			dateTime.push(spliter[0]);
			xxxMinutes.push(response[x]['xxxMinutes']);
			iHour.push(response[x]['iHour']);
			iiHours.push(response[x]['iiHours']);
			iiiHours.push(response[x]['iiiHours']);
			vHours.push(response[x]['vHours']);
			iDay.push(response[x]['iDay']);
			iiDays.push(response[x]['iiDays']);
			ivDays.push(response[x]['ivDays']);
			iWeek.push(response[x]['iWeek']);
		}
		//DESTROYS THE OLD EXISTING GRAPH TO AVOID HOVER BUG
		if(myChart || myChart2){
			myChart.destroy();
			myChart2.destroy();
		}

		//INITIALIZE HTML CANVAS
		var ctx = document.getElementById("canvas1").getContext("2d");
		var ctx2 = document.getElementById("canvas2").getContext("2d");

		

		if(type=="xxxMinutes"){
			myChart = new Chart(ctx2, {
				type: "bar",
				data: {
					labels: dateTime,
					datasets: [{
						label: "30 Minutes",
						data: xxxMinutes,
						backgroundColor: "rgba(14, 16, 15, 0.4)",
						borderColor: "rgba(14, 16, 15, 0.9)",
						borderWidth: "2"
					}]
				},
				options:{
					maintainAspectRatio: false,
					title: {
						display: true,
						text: "30Minutes Usage Graph ",
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
						label: "30 Minutes",
						data: xxxMinutes,
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
						text: "30Minutes Usage Graph ",
					},
					scales:{
						yAxes:[{
							ticks:{
								beginAtZero: true,
								max: Math.max(...xxxMinutes) + 1
							}
						}],
						xAxes:[{
							display: false
						}]
					},
				}
			});
		}

	//////////////////////////////////////////////////////////////////////////////////////////
		else if(type=="iHour"){
			myChart = new Chart(ctx2, {
				type: "bar",
				data: {
					labels: dateTime,
					datasets: [{
						label: "1 Hour",
						data: iHour,
						backgroundColor: "rgba(35, 255, 86, 0.3)",
						borderColor: "rgba(0, 204, 47, 0.76)",
						borderWidth: "2"
					}]
				},
				options:{
					maintainAspectRatio: false,
					title: {
						display: true,
						text: "1Hour Usage Graph ",
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
						label: "1Hour",
						data: iHour,
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
						text: "1Hour Usage Graph ",
					},
					scales:{
						yAxes:[{
							ticks:{
								beginAtZero: true,
								max: Math.max(...iHour) + 1
							}
						}],
						xAxes:[{
							display: false
						}]
					},
				}
			});
		}

	/////////////////////////////////////////////////////////////////////////////////////////////
		else if(type=="iiHours"){
			myChart = new Chart(ctx2, {
				type: "bar",
				data: {
					labels: dateTime,
					datasets: [{
						label: "2 Hours",
						data: iiHours,
						backgroundColor: "rgba(103, 245, 253, 0.3)",
						borderColor: "rgba(0, 198, 179, 0.76)",
						borderWidth: "2"
					}]
				},
				options:{
					maintainAspectRatio: false,
					title: {
						display: true,
						text: "2Hours Usage Graph ",
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
						label: "2Hours",
						data: iiHours,
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
						text: "2Hours Usage Graph ",
					},
					scales:{
						yAxes:[{
							ticks:{
								beginAtZero: true,
								max: Math.max(...iiHours) + 1
							}
						}],
						xAxes:[{
							display: false
						}]
					},
				}
			});
		}
		
	////////////////////////////////////////////////////////////////////////////////////////////////
		else if(type=="vHours"){
			myChart = new Chart(ctx2, {
				type: "bar",
				data: {
					labels: dateTime,
					datasets: [{
						label: "5 Hours",
						data: vHours,
						backgroundColor: "rgba(255, 174, 35, 0.3)",
						borderColor: "rgba(204, 129, 0, 0.76)",
						borderWidth: "2"
					}]
				},
				options:{
					maintainAspectRatio: false,
					title: {
						display: true,
						text: "5Hours Usage Graph ",
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
						label: "5Hours",
						data: vHours,
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
						text: "5Hours Usage Graph ",
					},
					scales:{
						yAxes:[{
							ticks:{
								beginAtZero: true,
								max: Math.max(...vHours) + 1
							}
						}],
						xAxes:[{
							display: false
						}]
					},
				}
			});
		}


		else if(type=="iDay"){
			myChart = new Chart(ctx2, {
				type: "bar",
				data: {
					labels: dateTime,
					datasets: [{
						label: "1Day",
						data: iDay,
						backgroundColor: "rgba(255, 40, 169, 0.3)",
						borderColor: "rgba(204, 0, 122, 0.76)",
						borderWidth: "2"
					}]
				},
				options:{
					maintainAspectRatio: false,
					title: {
						display: true,
						text: "1Day Usage Graph ",
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
						label: "1Day",
						data: iDay,
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
						text: "1Day Usage Graph ",
					},
					scales:{
						yAxes:[{
							ticks:{
								beginAtZero: true,
								max: Math.max(...iDay) + 1
							}
						}],
						xAxes:[{
							display: false
						}]
					},
				}
			});
		}

	////////////////////////////////////////////////////////////////////////////////////////////////
		else if(type=="iiDays"){
			myChart = new Chart(ctx2, {
				type: "bar",
				data: {
					labels: dateTime,
					datasets: [{
						label: "2Days",
						data: iiDays,
						backgroundColor: "rgba(93, 0, 193, 0.5)",
						borderColor: "rgba(76, 0, 158, 0.9)",
						borderWidth: "2"
					}]
				},
				options:{
					maintainAspectRatio: false,
					title: {
						display: true,
						text: "2Days Usage Graph ",
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
						label: "2Days",
						data: iiDays,
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
						text: "2Days Usage Graph ",
					},
					scales:{
						yAxes:[{
							ticks:{
								beginAtZero: true,
								max: Math.max(...iiDays) + 1
							}
						}],
						xAxes:[{
							display: false
						}]
					},
				}
			});
		}

	//////////////////////////////////////////////////////////////////////////////////////////////
		else if(type=="ivDays"){
			myChart = new Chart(ctx2, {
				type: "bar",
				data: {
					labels: dateTime,
					datasets: [{
						label: "4Days",
						data: ivDays,
						backgroundColor: "rgba(44, 116, 251, 0.3)",
						borderColor: "rgba(0, 71, 204, 0.76)",
						borderWidth: "2"
					}]
				},
				options:{
					maintainAspectRatio: false,
					title: {
						display: true,
						text: "4Days Usage Graph ",
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
						label: "4Days",
						data: ivDays,
						backgroundColor: "rgba(44, 116, 251, 0.3)",
						borderColor: "rgba(0, 71, 204, 0.76)",
						borderWidth: "2",
						lineTension: 0.3,
	        			fill: true,
	        			pointBackgroundColor: "rgba(0, 71, 204, 0.76)",
	        			pointRadius: 2
					}]
				},
				options:{
					maintainAspectRatio: false,
					title: {
						display: true,
						text: "4Days Usage Graph ",
					},
					scales:{
						yAxes:[{
							ticks:{
								beginAtZero: true,
								max: Math.max(...ivDays) + 1
							}
						}],
						xAxes:[{
							display: false
						}]
					},
				}
			});
		}

	///////////////////////////////////////////////////////////////////////////////////////////////////
		else if(type=="iWeek"){
			myChart = new Chart(ctx2, {
				type: "bar",
				data: {
					labels: dateTime,
					datasets: [{
						label: "1Week",
						data: iWeek,
						backgroundColor: "rgba(170, 35, 255, 0.3)",
						borderColor: "rgba(100, 0, 163, 0.76)",
						borderWidth: "2"
					}]
				},
				options:{
					maintainAspectRatio: false,
					title: {
						display: true,
						text: "1Week Usage Graph ",
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
						label: "1Week",
						data: iWeek,
						backgroundColor: "rgba(170, 35, 255, 0.3)",
						borderColor: "rgba(100, 0, 163, 0.76)",
						borderWidth: "2",
						lineTension: 0.3,
	        			fill: true,
	        			pointBackgroundColor: "rgba(100, 0, 163, 0.76)",
	        			pointRadius: 2
					}]
				},
				options:{
					maintainAspectRatio: false,
					title: {
						display: true,
						text: "1Week Usage Graph ",
					},
					scales:{
						yAxes:[{
							ticks:{
								beginAtZero: true,
								max: Math.max(...iWeek) + 1
							}
						}],
						xAxes:[{
							display: false
						}]
					},
				}
			});
		}



	});
}
