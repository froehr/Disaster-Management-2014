$(function () {
    var options = {
        chart: {
            renderTo: 'popup-content',
            type: 'line',
			width: 780,
            shadow: true
        },
        title: {
            text: 'Water level of the last xx days'
        },
        subtitle: {
            text: 'Measured in xxxx'
        },
        credits: {
            text: 'Data',
            href: 'link'
        },
        xAxis: {
            type: 'datetime',
            minRange: 1 * 24 * 3600000 // one day
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
    $.getJSON('php/getPegelOnlineData.php', function (data) {
        chart_data = [];
        $.each(data, function (i, obj) {
            chart_data.push([Date.parse(obj.timestamp), obj.value]);
        });
        options.series[0].data = chart_data;
        var chart = new Highcharts.Chart(options);
    });
});