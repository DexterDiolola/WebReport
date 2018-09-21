var xxxMinutesBar, xxxMinutesLine, iHourBar, iHourLine, iiHoursBar, iiHoursLine, iiiHoursBar, iiiHoursLine,
	vHoursBar, vHoursLine, iDayBar, iDayLine, iiDaysBar, iiDaysLine, ivDaysBar, 
	ivDaysLine, iWeekBar, iWeekLine;

var tpBar, tpLine, tdBar, tdLine;

//var dateTime = [], xxxMinutes = [], iHour = [], iiHours = [], vHours = [], iDay = [], iiDays = [], ivDays = [], iWeek = [];


function xxxMinutesGraph(obj, trendStr){
	var dateTime = [], xxxMinutes = [];

	for(var x=0; x<obj.length; x++){
		var spliter = obj[x]['dateCreated'].split(" ");

		dateTime.unshift(spliter[0]);
		xxxMinutes.unshift(obj[x]['xxxMinutes']);
	}

	if(xxxMinutesBar || xxxMinutesLine){
		xxxMinutesBar.destroy();
		xxxMinutesLine.destroy();
	}
	
	var ctx = document.getElementById("canvas21").getContext("2d");
	var ctx2 = document.getElementById("canvas22").getContext("2d");

	xxxMinutesBar = new Chart(ctx2, {
		type: "bar",
		data: {
			labels: dateTime,
			datasets: [{
				label: "30Minutes",
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
				text: "30Minutes Package "+ trendStr,
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
			}
		}
	});
	xxxMinutesLine = new Chart(ctx, {
		type: "line",
		data: {
			labels: dateTime,
			datasets: [{
				label: "30Minutes",
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
				text: "30Minutes Package "+ trendStr,
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
			}
		}
	});

}

function iHourGraph(obj, trendStr){
	var dateTime = [], iHour = [];

	for(var x=0; x<obj.length; x++){
		var spliter = obj[x]['dateCreated'].split(" ");

		dateTime.unshift(spliter[0]);
		iHour.unshift(obj[x]['iHour']);
	}

	if(iHourBar || iHourLine){
		iHourBar.destroy();
		iHourLine.destroy();
	}
	
	var ctx = document.getElementById("canvas23").getContext("2d");
	var ctx2 = document.getElementById("canvas24").getContext("2d");

	iHourBar = new Chart(ctx2, {
		type: "bar",
		data: {
			labels: dateTime,
			datasets: [{
				label: "1Hour",
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
				text: "1Hour Package "+ trendStr,
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
			}
		}
	});
	iHourLine = new Chart(ctx, {
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
				text: "1Hour Package "+ trendStr,
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
			}
		}
	});

}

function iiHoursGraph(obj, trendStr){
	var dateTime = [], iiHours = [];

	for(var x=0; x<obj.length; x++){
		var spliter = obj[x]['dateCreated'].split(" ");

		dateTime.unshift(spliter[0]);
		iiHours.unshift(obj[x]['iiHours']);
	}

	if(iiHoursBar || iiHoursLine){
		iiHoursBar.destroy();
		iiHoursLine.destroy();
	}
	
	var ctx = document.getElementById("canvas25").getContext("2d");
	var ctx2 = document.getElementById("canvas26").getContext("2d");

	iiHoursBar = new Chart(ctx2, {
		type: "bar",
		data: {
			labels: dateTime,
			datasets: [{
				label: "2Hours",
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
				text: "2Hours Package "+ trendStr,
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
			}
		}
	});
	iiHoursLine = new Chart(ctx, {
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
				text: "2Hours Package "+ trendStr,
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
			}
		}
	});

}

function iiiHoursGraph(obj, trendStr){
	var dateTime = [], iiiHours = [];

	for(var x=0; x<obj.length; x++){
		var spliter = obj[x]['dateCreated'].split(" ");

		dateTime.unshift(spliter[0]);
		iiiHours.unshift(obj[x]['iiiHours']);
	}

	if(iiiHoursBar || iiiHoursLine){
		iiiHoursBar.destroy();
		iiiHoursLine.destroy();
	}
	
	var ctx = document.getElementById("canvas37").getContext("2d");
	var ctx2 = document.getElementById("canvas38").getContext("2d");

	iiiHoursBar = new Chart(ctx2, {
		type: "bar",
		data: {
			labels: dateTime,
			datasets: [{
				label: "3Hours",
				data: iiiHours,
				backgroundColor: "rgba(255, 35, 35, 0.3)",
				borderColor: "rgba(198, 0, 0, 0.76)",
				borderWidth: "2"
			}]
		},
		options:{
			maintainAspectRatio: false,
			title: {
				display: true,
				text: "3Hours Package "+ trendStr,
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
			}
		}
	});
	iiiHoursLine = new Chart(ctx, {
		type: "line",
		data: {
			labels: dateTime,
			datasets: [{
				label: "3Hours",
				data: iiiHours,
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
			title: {
				display: true,
				text: "3Hours Package "+ trendStr,
			},
			scales:{
				yAxes:[{
					ticks:{
						beginAtZero: true,
						max: Math.max(...iiiHours) + 1
					}
				}],
				xAxes:[{
					display: false
				}]
			}
		}
	});

}



function vHoursGraph(obj, trendStr){
	var dateTime = [], vHours = [];

	for(var x=0; x<obj.length; x++){
		var spliter = obj[x]['dateCreated'].split(" ");

		dateTime.unshift(spliter[0]);
		vHours.unshift(obj[x]['vHours']);
	}

	if(vHoursBar || vHoursLine){
		vHoursBar.destroy();
		vHoursLine.destroy();
	}
	
	var ctx = document.getElementById("canvas27").getContext("2d");
	var ctx2 = document.getElementById("canvas28").getContext("2d");

	vHoursBar = new Chart(ctx2, {
		type: "bar",
		data: {
			labels: dateTime,
			datasets: [{
				label: "5Hours",
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
				text: "5Hours Package "+ trendStr,
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
			}
		}
	});
	vHoursLine = new Chart(ctx, {
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
				text: "5Hours Package "+ trendStr,
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
			}
		}
	});

}

function iDayGraph(obj, trendStr){
	var dateTime = [], iDay = [];

	for(var x=0; x<obj.length; x++){
		var spliter = obj[x]['dateCreated'].split(" ");

		dateTime.unshift(spliter[0]);
		iDay.unshift(obj[x]['iDay']);
	}

	if(iDayBar || iDayLine){
		iDayBar.destroy();
		iDayLine.destroy();
	}
	
	var ctx = document.getElementById("canvas29").getContext("2d");
	var ctx2 = document.getElementById("canvas30").getContext("2d");

	iDayBar = new Chart(ctx2, {
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
				text: "1Day Package "+ trendStr,
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
			}
		}
	});
	iDayLine = new Chart(ctx, {
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
				text: "1Day Package "+ trendStr,
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
			}
		}
	});

}

function iiDaysGraph(obj, trendStr){
	var dateTime = [], iiDays = [];

	for(var x=0; x<obj.length; x++){
		var spliter = obj[x]['dateCreated'].split(" ");

		dateTime.unshift(spliter[0]);
		iiDays.unshift(obj[x]['iiDays']);
	}

	if(iiDaysBar || iiDaysLine){
		iiDaysBar.destroy();
		iiDaysLine.destroy();
	}
	
	var ctx = document.getElementById("canvas31").getContext("2d");
	var ctx2 = document.getElementById("canvas32").getContext("2d");

	iiDaysBar = new Chart(ctx2, {
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
				text: "2Days Package "+ trendStr,
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
			}
		}
	});
	iiDaysLine = new Chart(ctx, {
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
				text: "2Days Package "+ trendStr,
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
			}
		}
	});

}

function ivDaysGraph(obj, trendStr){
	var dateTime = [], ivDays = [];

	for(var x=0; x<obj.length; x++){
		var spliter = obj[x]['dateCreated'].split(" ");

		dateTime.unshift(spliter[0]);
		ivDays.unshift(obj[x]['ivDays']);
	}

	if(ivDaysBar || ivDaysLine){
		ivDaysBar.destroy();
		ivDaysLine.destroy();
	}
	
	var ctx = document.getElementById("canvas33").getContext("2d");
	var ctx2 = document.getElementById("canvas34").getContext("2d");

	ivDaysBar = new Chart(ctx2, {
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
				text: "4Days Package "+ trendStr,
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
			}
		}
	});
	ivDaysLine = new Chart(ctx, {
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
				text: "4Days Package "+ trendStr,
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
			}
		}
	});

}

function iWeekGraph(obj, trendStr){
	var dateTime = [], iWeek = [];

	for(var x=0; x<obj.length; x++){
		var spliter = obj[x]['dateCreated'].split(" ");

		dateTime.unshift(spliter[0]);
		iWeek.unshift(obj[x]['iWeek']);
	}

	if(iWeekBar || iWeekLine){
		iWeekBar.destroy();
		iWeekLine.destroy();
	}
	
	var ctx = document.getElementById("canvas35").getContext("2d");
	var ctx2 = document.getElementById("canvas36").getContext("2d");

	iWeekBar = new Chart(ctx2, {
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
				text: "1Week Package "+ trendStr,
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
			}
		}
	});
	iWeekLine = new Chart(ctx, {
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
				text: "1Week Package "+ trendStr,
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
			}
		}
	});

}

function totalPackageGraph(obj, trendStr){
	var dateTime = [], totalPackage = [];

	for(var x=0; x<obj.length; x++){
		var spliter = obj[x]['dateCreated'].split(" ");

		dateTime.unshift(spliter[0]);
		totalPackage.unshift(obj[x]['totalPackage']);
	}

	if(tpBar || tpLine){
		tpBar.destroy();
		tpLine.destroy();
	}
	
	var ctx = document.getElementById("canvas39").getContext("2d");
	var ctx2 = document.getElementById("canvas40").getContext("2d");

	tpBar = new Chart(ctx2, {
		type: "bar",
		data: {
			labels: dateTime,
			datasets: [{
				label: "Total Package",
				data: totalPackage,
				backgroundColor: "rgba(14, 16, 15, 0.4)",
				borderColor: "rgba(14, 16, 15, 0.9)",
				borderWidth: "2"
			}]
		},
		options:{
			maintainAspectRatio: false,
			title: {
				display: true,
				text: "Total Package "+ trendStr,
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
			}
		}
	});
	tpLine = new Chart(ctx, {
		type: "line",
		data: {
			labels: dateTime,
			datasets: [{
				label: "Total Package",
				data: totalPackage,
				backgroundColor: "rgba(14, 16, 15, 0.4)",
				borderColor: "rgba(14, 16, 15, 0.9)",
				borderWidth: "2",
				lineTension: 0.3,
	        	fill: true,
	        	pointBackgroundColor: "rgba(14, 16, 15, 0.9",
	        	pointRadius: 2
			}]
		},
		options:{
			maintainAspectRatio: false,
			title: {
				display: true,
				text: "Total Package "+ trendStr,
			},
			scales:{
				yAxes:[{
					ticks:{
						beginAtZero: true,
						max: Math.max(...totalPackage) + 1
					}
				}],
				xAxes:[{
					display: false
				}]
			}
		}
	});

}

function totalDispenseGraph(obj, trendStr){
	var dateTime = [], totalDispense = [];

	for(var x=0; x<obj.length; x++){
		var spliter = obj[x]['dateCreated'].split(" ");

		dateTime.unshift(spliter[0]);
		totalDispense.unshift(obj[x]['totalDispense']);
	}

	if(tdBar || tdLine){
		tdBar.destroy();
		tdLine.destroy();
	}
	
	var ctx = document.getElementById("canvas41").getContext("2d");
	var ctx2 = document.getElementById("canvas42").getContext("2d");

	tdBar = new Chart(ctx2, {
		type: "bar",
		data: {
			labels: dateTime,
			datasets: [{
				label: "Total Dispense",
				data: totalDispense,
				backgroundColor: "rgba(170, 35, 255, 0.3)",
				borderColor: "rgba(100, 0, 163, 0.76)",
				borderWidth: "2"
			}]
		},
		options:{
			maintainAspectRatio: false,
			title: {
				display: true,
				text: "Total Dispense "+ trendStr,
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
			}
		}
	});
	tdLine = new Chart(ctx, {
		type: "line",
		data: {
			labels: dateTime,
			datasets: [{
				label: "Total Dispense",
				data: totalDispense,
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
				text: "Total Dispense "+ trendStr,
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
			}
		}
	});

}

/*
function packagesGraph(obj, trendStr){
	var dateTime = [], xxxMinutes = [], iHour = [], 
		iiHours = [], vHours = [], iDay = [], 
		iiDays = [], ivDays = [], iWeek = [];

	for(var x=0; x<obj.length; x++){
		var spliter = obj[x]['dateCreated'].split(" ");

		dateTime.unshift(spliter[0]);
		xxxMinutes.unshift(obj[x]['xxxMinutes']);
		iHour.unshift(obj[x]['iHour']);
		iiHours.unshift(obj[x]['iiHours']);
		vHours.unshift(obj[x]['vHours']);
		iDay.unshift(obj[x]['iDay']);
		iiDays.unshift(obj[x]['iiDays']);
		ivDays.unshift(obj[x]['ivDays']);
		iWeek.unshift(obj[x]['iWeek']);
	}

	if(packagesBar || packagesLine){
		packagesBar.destroy();
		packagesLine.destroy();
	}
	
	var ctx = document.getElementById("canvas37").getContext("2d");
	var ctx2 = document.getElementById("canvas38").getContext("2d");

	packagesBar = new Chart(ctx2, {
		type: "bar",
		data: {
			labels: dateTime,
			datasets: [{
				label: "30 Minutes",
				data: xxxMinutes,
				backgroundColor: "rgba(14, 16, 15, 0.4)",
				borderColor: "rgba(14, 16, 15, 0.9)",
				borderWidth: "2"
			},
			{
				label: "1Hour",
				data: iHour,
				backgroundColor: "rgba(35, 255, 86, 0.3)",
				borderColor: "rgba(0, 204, 47, 0.76)",
				borderWidth: "2",
			},
			{
				label: "2Hours",
				data: iiHours,
				backgroundColor: "rgba(103, 245, 253, 0.3)",
				borderColor: "rgba(0, 198, 179, 0.76)",
				borderWidth: "2",
			},
			{
				label: "5Hours",
				data: vHours,
				backgroundColor: "rgba(255, 174, 35, 0.3)",
				borderColor: "rgba(204, 129, 0, 0.76)",
				borderWidth: "2",
			},
			{
				label: "1Day",
				data: iDay,
				backgroundColor: "rgba(255, 40, 169, 0.3)",
				borderColor: "rgba(204, 0, 122, 0.76)",
				borderWidth: "2",
			},
			{
				label: "2Days",
				data: iiDays,
				backgroundColor: "rgba(93, 0, 193, 0.5)",
				borderColor: "rgba(76, 0, 158, 0.9)",
				borderWidth: "2",
			},
			{
				label: "4Days",
				data: ivDays,
				backgroundColor: "rgba(44, 116, 251, 0.3)",
				borderColor: "rgba(0, 71, 204, 0.76)",
				borderWidth: "2",
			},
			{
				label: "1Week",
				data: iWeek,
				backgroundColor: "rgba(170, 35, 255, 0.3)",
				borderColor: "rgba(100, 0, 163, 0.76)",
				borderWidth: "2",
			}]
		},
		options:{
			maintainAspectRatio: false,
			title: {
				display: true,
				text: "Package Dispensed Graph "+ trendStr,
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
	packagesLine = new Chart(ctx, {
		type: "line",
		data: {
			labels: dateTime,
			datasets: [{
				label: "30Minutes",
				data: xxxMinutes,
				backgroundColor: "rgba(14, 16, 15, 0.4)",
				borderColor: "rgba(14, 16, 15, 0.9)",
				borderWidth: "2",
				lineTension: 0.3,
	      		fill: false,
	       		pointBackgroundColor: "rgba(14, 16, 15, 0.9)",
	       		pointRadius: 2
			},
			{
				label: "1Hour",
				data: iHour,
				backgroundColor: "rgba(35, 255, 86, 0.3)",
				borderColor: "rgba(0, 204, 47, 0.76)",
				borderWidth: "2",
				lineTension: 0.3,
	        	fill: false,
	        	pointBackgroundColor: "rgba(0, 204, 47, 0.76)",
	        	pointRadius: 2
			},
			{
				label: "2Hours",
				data: iiHours,
				backgroundColor: "rgba(103, 245, 253, 0.3)",
				borderColor: "rgba(0, 198, 179, 0.76)",
				borderWidth: "2",
				lineTension: 0.3,
	        	fill: false,
	        	pointBackgroundColor: "rgba(0, 198, 179, 0.76)",
	        	pointRadius: 2
			},
			{
				label: "5Hours",
				data: vHours,
				backgroundColor: "rgba(255, 174, 35, 0.3)",
				borderColor: "rgba(204, 129, 0, 0.76)",
				borderWidth: "2",
				lineTension: 0.3,
	        	fill: false,
	        	pointBackgroundColor: "rgba(204, 129, 0, 0.76)",
	        	pointRadius: 2
			},
			{
				label: "1Day",
				data: iDay,
				backgroundColor: "rgba(255, 40, 169, 0.3)",
				borderColor: "rgba(204, 0, 122, 0.76)",
				borderWidth: "2",
				lineTension: 0.3,
	        	fill: false,
	        	pointBackgroundColor: "rgba(204, 0, 122, 0.76)",
	        	pointRadius: 2
			},
			{
				label: "2Days",
				data: iiDays,
				backgroundColor: "rgba(93, 0, 193, 0.5)",
				borderColor: "rgba(76, 0, 158, 0.9)",
				borderWidth: "2",
				lineTension: 0.3,
	        	fill: false,
	        	pointBackgroundColor: "rgba(76, 0, 158, 0.9)",
	        	pointRadius: 2
			},
			{
				label: "4Days",
				data: ivDays,
				backgroundColor: "rgba(44, 116, 251, 0.3)",
				borderColor: "rgba(0, 71, 204, 0.76)",
				borderWidth: "2",
				lineTension: 0.3,
	        	fill: false,
	        	pointBackgroundColor: "rgba(0, 71, 204, 0.76)",
	        	pointRadius: 2
			},
			{
				label: "1Week",
				data: iWeek,
				backgroundColor: "rgba(170, 35, 255, 0.3)",
				borderColor: "rgba(100, 0, 163, 0.76)",
				borderWidth: "2",
				lineTension: 0.3,
	        	fill: false,
	        	pointBackgroundColor: "rgba(100, 0, 163, 0.76)",
	        	pointRadius: 2
			}]
		},
		options:{
			maintainAspectRatio: false,
			title: {
				display: true,
				text: "Package Dispensed Graph "+ trendStr,
			},
			scales:{
				yAxes:[{
					ticks:{
						beginAtZero: true,
						//max: Math.max(...xxxMinutes) + 1
					}
				}],
				xAxes:[{
					display: false
				}]
			},
		}
	});

}
*/
