initHighChartForForecast = function (latlng) {
	var options = {
		chart : {
			renderTo : 'popup-content',
			type : 'spline',
			width : 780,
			shadow : false
		},
		title : {
			text : 'Weatherforecast for the next ten days'
		},
		subtitle : {
			text : ''
		},
		credits : {
			text : 'by Open Weather Map',
			href : 'http://www.openweathermap.com'
		},
		xAxis : {
			type : 'datetime',
			plotLines : [{
					dashStyle : 'longdashdot'
				}
			]

		},
		yAxis: [{
                            title: {
                                text: 'Temperature',
                                style: {
                                    color: '#BF0B23'
                                }
                            },
                            labels: {
                                format: '{value} \xB0C',
                                style: {
                                    color: '#BF0B23'
                                }
                            }
                        },
                        {
                            title : {
                                text: 'Sea-Level Pressure',
                                style: {
                                    color: '#727279'
                                }
                            },
                            labels: {
                                format: '{value} hPa',
                                style: {
                                    color: '#727279'
                                }
                            },
                            opposite: true,
            
                        },
                        {
                        title: {
                            text: 'Rainfall',
                            style: {
                                    color: '#5C9DFF'
                                }
                        },
                        labels: {
                                format: '{value} mm',
                                style: {
                                    color: '#5C9DFF'
                                }
                            },
                        opposite: true, 
                        }],

		plotOptions : {
			series : {
				pointStart : '',
				pointInterval : 18 * 3600 * 1000 // ~seven day
			}
		},
		
                tooltip : {
			crosshairs : true,
			shared : true
		},
                
		legend : {
			enabled : true
		},
                
		series : [{
                                name: 'Rainfall',
                                color: '#5C9DFF',
                                type: 'column',
                                yAxis: 2,
                                tooltip: {
                                    valueSuffix: ' mm'
                                }
                                
                            },{
                                name: 'Sea-Level Pressure',
                                color: '#727279',
                                tooltip: {
                                         valueSuffix: ' hPa'
                                    },
                                marker : {
                                        fillColor: 'none',
                                        lineColor: null
                                },
                                dashStyle: 'shortdot',
                                yAxis: 1,
                                
                            }, {
                                name: 'Temperatur',
                                color: '#BF0B23',
                                yAxis: 0,
                                data : [
                                            { y : '', marker: {symbol: ''}},
                                            { y : '', marker: {symbol: ''}},
                                            { y : '', marker: {symbol: ''}},
                                            { y : '', marker: {symbol: ''}},
                                            { y : '', marker: {symbol: ''}},
                                            { y : '', marker: {symbol: ''}},
                                            { y : '', marker: {symbol: ''}},
                                            { y : '', marker: {symbol: ''}},
                                            { y : '', marker: {symbol: ''}},
                                            { y : '', marker: {symbol: ''}},
                                        ],
                                tooltip: {
                                     valueSuffix: ' \xB0C'
                                }
                                
                            }, 
                        ]
	}
        
        // Getting Data from open weather map and handling different scales
	$.getJSON('http://api.openweathermap.org/data/2.5/forecast/daily?lat=' + latlng.lat + '&lon=' + latlng.lng + '&cnt=10&mode=json&lang=en', function (data) {
		chart_data = [[[],[]], [], []];
		options['plotOptions']['series']['pointStart'] = data.list[0].dt * 1000;
		options['subtitle']['text'] = "around "+data.city.name;
		for (var i = 0; i < data.list.length; i++) {
                    chart_data[0][0][i] = (parseFloat((data.list[i].temp.day - 272.15).toFixed(2)));
                    chart_data[0][1][i] = ('url(img/weathericons/' + data.list[i].weather[0].icon + '.png)');
                    chart_data[1].push(data.list[i].pressure);
                    
                    // As rain is only in the JSON if there is rain this has to be catched
                    if (typeof data.list[i].rain != "undefined") {
                        chart_data[2].push(data.list[i].rain);
                    }
                    else{
                        chart_data[2].push(0);
                    }
		}
                
                // Filling Axis with data
                for (var ii = 0; ii < data.list.length; ii++) {
                    options.series[2]['data'][ii]['y'] = chart_data[0][0][ii];
                    options.series[2]['data'][ii]['marker']['symbol'] = chart_data[0][1][ii];
                }
		options.series[1]['data'] = chart_data[1];
                options.series[0]['data'] = chart_data[2];

		var chart = new Highcharts.Chart(options);
	});
};