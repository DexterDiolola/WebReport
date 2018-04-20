function graphPackages(cond, type){
	var dateTime = [], xxxMinutes = [], iHour = [], iiHours = [],
		vHours = [], iDay = [], iiDays = [], ivDays = [], iWeek = [];


	$.getJSON('/api/max-of-packages/?cond=' + cond, function(response){
		for(var x=0; x<response.length; x++){
			var spliter = response[x]['dateCreated'].split(" ");

			dateTime.unshift(spliter[0]);
			xxxMinutes.unshift(response[x]['xxxmins']);
			iHour.unshift(response[x]['ihr']);
			iiHours.unshift(response[x]['iihrs']);
			vHours.unshift(response[x]['vhrs']);
			iDay.unshift(response[x]['iday']);
			iiDays.unshift(response[x]['iidays']);
			ivDays.unshift(response[x]['ivdays']);
			iWeek.unshift(response[x]['iweek']);

		}
		//DESTROYS THE OLD EXISTING GRAPH TO AVOID HOVER BUG
		if(myChart || myChart2){
			myChart.destroy();
			myChart2.destroy();
		}

		//INITIALIZE HTML CANVAS
		var ctx = document.getElementById("canvas1").getContext("2d");
		var ctx2 = document.getElementById("canvas2").getContext("2d");


		if(type=="30Minutes"){
			myChart = new Chart(ctx2, {
				type: "bar",
				data: {
					labels: dateTime,
					datasets: [{
						label: "30 Minutes",
						data: xxxMinutes,
						backgroundColor: "rgba(35, 255, 86, 0.3)",
						borderColor: "rgba(0, 204, 47, 0.76)",
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
		else if(type=="1Hour"){
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
		else if(type=="2Hours"){
			myChart = new Chart(ctx2, {
				type: "bar",
				data: {
					labels: dateTime,
					datasets: [{
						label: "2 Hours",
						data: iiHours,
						backgroundColor: "rgba(35, 255, 86, 0.3)",
						borderColor: "rgba(0, 204, 47, 0.76)",
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
		else if(type=="5Hours"){
			myChart = new Chart(ctx2, {
				type: "bar",
				data: {
					labels: dateTime,
					datasets: [{
						label: "5 Hours",
						data: vHours,
						backgroundColor: "rgba(35, 255, 86, 0.3)",
						borderColor: "rgba(0, 204, 47, 0.76)",
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


		else if(type=="1Day"){
			myChart = new Chart(ctx2, {
				type: "bar",
				data: {
					labels: dateTime,
					datasets: [{
						label: "1Day",
						data: iDay,
						backgroundColor: "rgba(35, 255, 86, 0.3)",
						borderColor: "rgba(0, 204, 47, 0.76)",
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
		else if(type=="2Days"){
			myChart = new Chart(ctx2, {
				type: "bar",
				data: {
					labels: dateTime,
					datasets: [{
						label: "2Days",
						data: iiDays,
						backgroundColor: "rgba(35, 255, 86, 0.3)",
						borderColor: "rgba(0, 204, 47, 0.76)",
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
		else if(type=="4Days"){
			myChart = new Chart(ctx2, {
				type: "bar",
				data: {
					labels: dateTime,
					datasets: [{
						label: "4Days",
						data: ivDays,
						backgroundColor: "rgba(35, 255, 86, 0.3)",
						borderColor: "rgba(0, 204, 47, 0.76)",
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
		else if(type=="1Week"){
			myChart = new Chart(ctx2, {
				type: "bar",
				data: {
					labels: dateTime,
					datasets: [{
						label: "1Week",
						data: iWeek,
						backgroundColor: "rgba(35, 255, 86, 0.3)",
						borderColor: "rgba(0, 204, 47, 0.76)",
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
	






	/*console.log(xxxMinutes);
	console.log(dateTime);
	console.log(iHour);
	console.log(iiHours);
	console.log(vHours);
	console.log(iDay);
	console.log(iiDays);
	console.log(ivDays);
	console.log(iWeek);
	*/
}
