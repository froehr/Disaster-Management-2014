var options = {
	chart : {
		renderTo : 'popup',
		type : 'spline',
		shadow : true
	},
	title : {
		text : 'Water level of the last xx days'
	},
	subtitle : {
		text : 'Measured in xxxx'
	},
	credits : {
		text : 'Data from Pegelonline',
		href : 'http://www.pegelonline.wsv.de/'
	},
	xAxis : {
		type : 'datetime',
		minRange : 1 * 24 * 3600000 // one day
	},
	yAxis : {
		title : {
			text : 'Waterlevel'
		}
	},
	legend : {
		enabled : true
	},
	series : [{}

	]
};
$.getJSON('php/getPegelOnlineData.php', function (data) {
	chart_data = [];
	$.each(data, function (i, obj) {
		chart_data.push([Date.parse(obj.timestamp), obj.value]);
	});
	options.series[0].data = chart_data;
	var chart = new Highcharts.Chart(options);
});
