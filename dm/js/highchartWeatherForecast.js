initHighChartForForecast = function (latlng) {
    var options = {
        chart: {
            renderTo: 'popup-content',
	    type:'spline',
            width: 780,
            shadow: false
        },
        title: {
            text: 'Weatherforecast'
        },
        subtitle: {
            text: ''
        },
        credits: {
            text: 'Source',
            href: 'openweathermap.com'
        },
        xAxis: {
            type: 'datetime',
            plotLines: [{dashStyle: 'longdashdot'}]
            
           
        },
        yAxis: [{
            title: {
                text: 'Temperature in \xB0C'
            },
        },
        {
            title : {
                text: 'Presure'
            },
            opposite: true,
            
        }],
            
        plotOptions: {
            series: {
                pointStart: '',
                pointInterval: 24 * 3600 * 1000 // one day
            }
        },
                       
        legend: {
            enabled: false
        },
        series: [{},{}]
    }
    $.getJSON('http://api.openweathermap.org/data/2.5/forecast/daily?lat='+latlng.lat+'&lon='+latlng.lng+'&cnt=10&mode=json', function (data) {
        chart_data = [[],[]];
        options['plotOptions']['series']['pointStart'] =  data.list[0].dt;
        options['subtitle']['text'] = data.city.name;
        for (var i = 0; i < data.list.length; i++) {
         chart_data[0].push(parseFloat((data.list[i].temp.day - 272.15).toFixed(2)));
         chart_data[1].push(data.list[i].pressure);
        }
        options.series[0]['data'] = chart_data[0];
        options.series[0]['color'] = '#BF0B23';
        options.series[0].yAxis = 0;
        options.series[0].name = 'Temperatur in \xB0C';
        
        options.series[1]['data'] = chart_data[1];
        options.series[1].yAxis = 1;
        options.series[1].name = 'Pressure in hPa';
        
        var chart = new Highcharts.Chart(options);
    });
};