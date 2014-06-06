function toTitleCase(str) {
	return str.replace(/-/g, ' ').replace(/\w\S*/g, function(txt) {return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

initHighChartForStation = function(id) {
    var options = {
        chart: {
            renderTo: 'popup-content',
            type: 'spline',
			width: 780,
            shadow: false
        },
        title: {
            text: 'Water level of the last 12 hours'
        },
        subtitle: {
            text: 'measured in ' + toTitleCase(decodeURIComponent(id))
        },
        credits: {
            text: 'Source',
            href: 'http://www.pegelonline.wsv.de'
        },
        xAxis: {
            type: 'datetime',
            minRange: 0.5 * 24 * 3600000 // half day
        },
        yAxis: {
            title: {
                text: 'Water Level'
            }
        },
        legend: {
            enabled: false
        },
	navigation: {
	    buttonOptions: {
		theme: {
		    'stroke-width': 1,
		    stroke: 'silver',
		    r: 0,
		    states: {
			hover: {
			    fill: '#CCCCCC',
			},
			select: {
			    fill: '#CCCCCC'
			}
		    }
		}
	    }
        },
		
        series: [{}]
    };
    $.getJSON('php/getPegelOnlineData.php?measurementStationName='+id, function (data) {
        chart_data = [];
        $.each(data, function (i, obj) {
            chart_data.push([Date.parse(obj.timestamp), obj.value]);
        });
        options.series[0].data = chart_data;
        var chart = new Highcharts.Chart(options);
		
		createPopUp(800, 440, '');
    });
};