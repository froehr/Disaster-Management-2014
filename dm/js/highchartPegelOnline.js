initHighChartForStation = function (id) {
    var options = {
        chart: {
            renderTo: 'highchartContainer',
            type: 'spline',
            shadow: true
        },
        title: {
            text: 'Water level of the last 12 hours'
        },
        subtitle: {
            text: 'Measured in '+decodeURIComponent(id)
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
                text: 'data'
            }
        },
        legend: {
            enabled: true
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
    });
};