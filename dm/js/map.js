// Create a map in the "map" div, set the view to a given place and zoom
var map = new L.Map('map', {
		center : [51.96, 7.61],
		zoom : 14,
		dragging : true,
		touchZoom : true,
		scrollWheelZoom : true,
		doubleClickZoom : true,
		boxZoom : true,
		tap : true,
		tapTolerance : 15,
		trackResize : true,
		worldCopyJump : false,
		closePopupOnClick : true,
		scale : true
	});

// Global variable for position of weatherforcast
var latlng;


// Get messages from database
$.getJSON("php/getMessagesAsGeoJSON.php", function (data) {
	messages = L.geoJson(data, {
		onEachFeature : function (feature, layer) {
			layer.bindPopup(feature.properties.description);
		},
		style : function (feature) {
			switch (feature.properties.message_type) {
			case "emergency":
				return {
					color : '#A50026'
				};
			case "need-support":
				return {
					color : '#eba259'
				};
			case "offer-support":
				return {
					color : '#468f5c'
				};
			case "message":
				return {
					color : '#45544a'
				}
			}
		}
	});
messages.addData(data);
// Excluded this, because this solves the error that messages got drawn darker (added twice) after the intial loading
//messages.addTo(map);

// Slidercontrol which refers to the creation-date of a case
var sliderControl = L.control.sliderControl({
	position : "topright",
		layer : messages
});
map.addControl(sliderControl);
sliderControl.startSlider();
});


// Waterlevel measurement data (Pegel Online Restservice is used)
var waterMeasurementData = L.layerJSON({
	caching : true, ////disable markers caching and regenerate every time
	url : 'http://www.pegelonline.wsv.de/webservices/rest-api/v2/stations.json?latitude=51.9544&longitude=7.627&radius=800&includeTimeseries=true&includeCurrentMeasurement=true',
	// Pegel Rest API Documentation: http://www.pegelonline.wsv.de/webservice/dokuRestapi
	// propertyItems: 'timeseries',
	propertyTitle : 'shortname',
	propertyLoc : ['latitude', 'longitude'],
	buildIcon : function (data, shortname) {
		return new L.Icon({
			iconUrl : 'img/icons/pegel.png',
			iconSize : new L.Point(32, 37),
			iconAnchor : new L.Point(18, 37),
			popupAnchor : new L.Point(0, -37)
		});
	},
	buildPopup : function (data, marker) {
		var measurementStationName = data.shortname;
		var waterName = data.water.longname;
		var currentMeasurementValue = data.timeseries[0].currentMeasurement.value;
		var currentMeasurementUnit = data.timeseries[0].unit;
		var currentMeasurementTimestamp = data.timeseries[0].currentMeasurement.timestamp;

		var gaugeZeroValue = "";
		var notAvailable = "not available";
		if (data.timeseries[0].gaugeZero && data.timeseries[0].gaugeZero.value) {
			gaugeZeroValue = data.timeseries[0].gaugeZero.value
		} else {
			gaugeZeroValue = notAvailable
		};

		var gaugeZeroUnit = "";
		if (data.timeseries[0].gaugeZero && data.timeseries[0].gaugeZero.unit) {
			gaugeZeroUnit = data.timeseries[0].gaugeZero.unit
		};

		function toTitleCase(str) {
			return str.replace(/-/g, ' ').replace(/\w\S*/g, function (txt) {
				return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
			});
		}

		var index = currentMeasurementTimestamp.indexOf('+');
		var time = currentMeasurementTimestamp.replace('T', ' ').substr(0, index - 3);

		// Popup with name of measurementstation, the watername, the gaugezerovalue+unit, the current waterlevelmeasurement+unit and timestamp of last measurement
		return ('<div class="pegelonline">' +
			'<h1>' + toTitleCase(measurementStationName) + '</h1>' +
			'<table border="0">' +
			'<tr>' +
			'<td>River:</td>' +
			'<td>' + toTitleCase(waterName) + '</td>' +
			'</tr>' +
			'<tr>' +
			'<td>Zero value:</td>' +
			'<td>' + gaugeZeroValue + ' ' + gaugeZeroUnit + '</td>' +
			'</tr>' +
			'<tr>' +
			'<td>Current water level:</td>' +
			'<td>' + currentMeasurementValue + ' ' + currentMeasurementUnit.replace('+NN', '<br />(above absolute altitude)') + '</td>' +
			'</tr>' +
			'<tr>' +
			'<td>Last measurement:</td>' +
			'<td>' + time + '</td>' +
			'</tr>' +
			'</table>' +
			'<div class="img"><img src="http://www.pegelonline.wsv.de/webservices/rest-api/v2/stations/' + encodeURIComponent(measurementStationName) + '/W/measurements.png?start=P15D&width=260&height=130"></div>' +
			'<div class="highchart-link"><a href="#" id="highchart-button" data-stationName="' + encodeURIComponent(measurementStationName) + '">more information <span class="arrow">&#9658;</span></a></div>' +
			'</div>') || null;
	}
});

// Basemaps
// add an OpenStreetMap tile layer
var osm_hot = new L.tileLayer('http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
	attribution : '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

var defaultLayer = osm_hot;

var osm_mq = new L.tileLayer('http://{s}.mqcdn.com/tiles/1.0.0/osm/{z}/{x}/{y}.png', {
	attribution : '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
	subdomains : ['otile1', 'otile2', 'otile3', 'otile4']
	});

var osm_mapnik = new L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
		attribution : '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
	});

// Orthophoto layer
var layerOrtho = new L.tileLayer.wms('http://www.wms.nrw.de/geobasis/wms_nw_dop40', {
	layers : 'WMS_NW_DOP40',
	format : 'image/png',
	version : '1.3.0',
	transparent : true,
	opacity : 0.4
});

// Layers of Geobasis NRW: http://www.bezreg-koeln.nrw.de/brk_internet/organisation/abteilung07/produkte/nrwatlas/index.html
// (website which provides different Web Map Service (WMS)-URLs)
var layerDGK5 = new L.tileLayer.wms('http://www.wms.nrw.de/geobasis/wms_nw_dgk5', {
	attribution : '| &copy Geobasis NRW 2013',
	layers : 'WMS_NW_DGK5',
	format : 'image/png',
	transparent : true,
	opacity : 0.5
});

var layerDTK10 = new L.tileLayer.wms('http://www.wms.nrw.de/geobasis/wms_nw_dtk10', {
	attribution : '| &copy Geobasis NRW 2013',
	layers : 'nw_dtk10_pan,nw_dtk10_res,NW_DTK10_col,WMS_NW_DTK10',
	format : 'image/png',
	transparent : true,
	opacity : 0.5
});

// Areas affected by flooding: See: http://www.gis4.nrw.de/DienstelisteInternet/
var flood = new L.TileLayer.WMS("http://www.wms.nrw.de/umwelt/wasser/uesg", {
	layers : '6',
	format : 'image/png',
	//crs: L.CRS.EPSG4326,
	version : '1.3.0',
	transparent : true,
	opacity : 0.5
});

// Rain layer
var rain = new L.tileLayer('http://{s}.tile.openweathermap.org/map/rain_cls/{z}/{x}/{y}.png', {
	options : {
		attribution : 'Map data &copy; <a href="http://openweathermap.org">OpenWeatherMap</a>',
		opacity : 0.5
	},
	transparent : true,
	opacity : 0.5
});


// New minimap - Plugin magic goes here! Note that you cannot use the same layer object again, as that will confuse the two map controls
var overviewMap = new L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
	maxZoom : 18,
	attribution : 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap<\/a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA<\/a>, Imagery © <a href="http://cloudmade.com">CloudMade<\/a>'
});


// Minimap
var LminiMap = new L.Control.MiniMap(overviewMap, {
	toggleDisplay : true,
	mapOptions : {
		panControl : false,
		zoomsliderControl : false,
		crs : L.CRS.Simple,
	}
}).addTo(map);


// Scalebar
var Lscalebar = new L.control.scale({
	position : 'bottomright',
	metric : true,
	imperial : false
}).addTo(map)


// new Geolocation tool
var Llocater = new L.control.locate({
	position : 'topleft', // set the location of the control
	drawCircle : true, // controls whether a circle is drawn that shows the uncertainty about the location
	follow : true, // follow the location if `watch` and `setView` are set to true in locateOptions
	stopFollowingOnDrag : false, // stop following when the map is dragged if `follow` is set to true
	circleStyle : {}, // change the style of the circle around the user's location
	markerStyle : {},
	followCircleStyle : {}, // set difference for the style of the circle around the user's location while following
	followMarkerStyle : {},
	circlePadding : [0, 0], // padding around accuracy circle, value is passed to setBounds
	metric : true, // use metric or imperial units
	watch : true,
	onLocationError : function (err) {
		alert(err.message)
	}, // define an error callback function
	onLocationOutsideMapBounds : function (context) { // called when outside map boundaries
		alert(context.options.strings.outsideMapBoundsMsg);
	},
	setView : true, // automatically sets the map view to the user's location
	strings : {
		title : "Show your location", // title of the locat control
		popup : "You are within {distance} {unit} from this point", // text to appear if user clicks on circle
		outsideMapBoundsMsg : "You seem located outside the boundaries of the map" // default message for onLocationOutsideMapBounds
	}
	//locateOptions: {}  // define location options e.g enableHighAccuracy: true
}).addTo(map);


// new Geoseach Bar
var Lgeosearch = new L.Control.GeoSearch({
	provider : new L.GeoSearch.Provider.Google(),
	position : 'topleft',
	showMarker : true
}).addTo(map);


// new interactive coordinates display
/* var LcoordinateDisplay = new L.control.coordinates({
position : "bottomleft", //optional default "bottomright"
decimals : 4, //optional default 4
decimalSeperator : ".", //optional default "."
labelTemplateLat : "Latitude: {y}", //optional default "Lat: {y}"
labelTemplateLng : "Longitude: {x}", //optional default "Lng: {x}"
enableUserInput : true, //optional default true
useDMS : false, //optional default false
useLatLngOrder : true //ordering of labels, default false-> lng-lat
}).addTo(map);
*/


/*
Has to be extended and restyled later on, so that the created markers (which are stored in the database) got visualized depending on the bounding box.
The messages in the MessageBoard should be synchronized with the Bounding Box.
Check github repository for more information: https://github.com/kajic/leaflet-locationfilter/
An example could be found here: http://tripbirds.com/hotels/new-york/?budget=on&mid=on&high=on&sort=social&bounds=40.721,-73.992,40.75,-73.969
 */
var LlocationFilter = new L.LocationFilter({
	//bounds: (optional): The initial bounds for the location filter. Defaults to the maps own bounds.
	enable : false, //Set to true to enable the filter as soon as it is added to the map. Defaults to false.
	buttonPosition : 'topleft', //Set to position the associated buttons on the map. Defaults to 'topleft'.
	enableButton : {
		enableText : "",
		disableText : ""
	},
	adjustButton : {
		text : ""
	}
}).addTo(map);


// Measure Control
var LmeasureControl = new L.Control.measureControl({
	position : "topleft"
}).addTo(map);


// Drawing Tool
// Initialise the FeatureGroup to store editable layers
var drawnItems = new L.FeatureGroup();
map.addLayer(drawnItems);

// Initialise the draw control and pass it the FeatureGroup of editable layers
var drawControl = new L.Control.Draw({
	draw : {
		position : 'topleft',
		circle : false,
		psolygon : {
			allowIntersection : false, // Restricts shapes to simple polygons
			drawError : {
				color : '#FF0000', // Color the shape will turn when intersects
				message : 'You can not draw a intersection path!' // Message that will show when intersect
			},
			opacity : 1.0,
		}
	},
	edit : {
		featureGroup : drawnItems,
		remove : true
	}
});
map.addControl(drawControl);

// Change position of draw-control into message-form
$("#draw-buttons").append($(".leaflet-draw-draw-polygon"));
$("#draw-buttons").append($(".leaflet-draw-draw-rectangle"));
$("#draw-buttons").append($(".leaflet-draw-draw-polyline"));
$("#draw-buttons").append($(".leaflet-draw-draw-marker"));
$("#draw-buttons").append($(".leaflet-draw-edit-edit"));
$("#draw-buttons").append($(".leaflet-draw-edit-remove"))
$("#draw-buttons").append($(".leaflet-draw-actions"));
$("#draw-buttons").append($(".leaflet-draw-actions"));


// Adding some moving behavior for the toolbar buttons
$(".leaflet-draw-draw-polygon").click(function () {
	$(".leaflet-draw-actions").css('left', '44px');
});
$(".leaflet-draw-draw-rectangle").click(function () {
	$(".leaflet-draw-actions").css('left', "87px");
});
$(".leaflet-draw-draw-polyline").click(function () {
	$(".leaflet-draw-actions").css('left', "130px");
});
$(".leaflet-draw-draw-marker").click(function () {
	$(".leaflet-draw-actions").css('left', "173px");
});
$(".leaflet-draw-edit-edit").click(function () {
	$(".leaflet-draw-actions").css('left', "99px");
});
$(".leaflet-draw-edit-remove").click(function () {
	$(".leaflet-draw-actions").css('left', "142px");
});


var tagColor;
map.on('draw:created', function (e) {
	var type = e.layerType,
	layer = e.layer;
	var vOffset;

	if (type === 'marker') {
		vOffset = -41;
	} else {
		vOffset = -5;
	}

	var popup = new L.popup({
			closeButton : false,
			className : 'feature-popup',
			offset : [0, vOffset]
		});

	function updatePopupContent() {
		var popupContent;
		if ($('#title').val() == '') {
			popupContent = 'Please enter a title.';
		} else {
			popupContent = $('#title').val();
		}
		popup.setContent('<span style="color: ' + tagColor + ';">' + popupContent + '</span>');
	}

	layer.on('mouseover', function (evt) {
		updatePopupContent();
		popup.setLatLng(evt.latlng);
		popup.openOn(map);
	});

	layer.on('mouseout', function (evt) {
		map.closePopup(popup);
	});

	layer.on('mousemove', function (evt) {
		updatePopupContent();
		popup.setLatLng(evt.latlng);
	});

	drawnItems.addLayer(layer);
});


function changeDrawFeatures(issueTag) {
	var iconUrl = 'img/marker/marker-icon-' + issueTag + '.png';

	switch (issueTag) {
	case 'emergency':
		tagColor = '#A50026';
		break;
	case 'need-support':
		tagColor = '#eba259'
			break;
	case 'offer-support':
		tagColor = '#468f5c'
			break;
	case 'message':
		tagColor = '#45544a'
			break;
	}

	drawControl.setDrawingOptions({
		polygon : {
			shapeOptions : {
				color : tagColor
			}
		},
		rectangle : {
			shapeOptions : {
				color : tagColor
			}
		},
		polyline : {
			shapeOptions : {
				color : tagColor
			}
		},
		circle : {
			shapeOptions : {
				color : tagColor
			}
		},
		marker : {
			icon : new L.Icon({
				iconUrl : iconUrl,
				iconAnchor : [12, 41],
				popupAnchor : [0, -42]
			})
		}
	});
	drawnItems.setStyle({
		fillColor : tagColor,
		color : tagColor
	});

	drawnItems.eachLayer(function (layer) {
		if (typeof layer.setIcon == 'function') {
			layer.setIcon(new L.Icon({
					iconUrl : iconUrl,
					iconAnchor : [12, 41],
					popupAnchor : [0, -42]
				}));
		}
	});
}


/*
// Search for specific features depending on their categroy. Json can be used.
// Should be discussed if we want to do the filtering using a plugin or using the frontend itself
var LfuseSearch = new L.control.fuseSearch({
		position : "topleft",
		title : "Search for category",
		placeholder : "Search",
		maxResultLength : null, //number of features displayed in the result list, default is null and all features found by Fuse are displayed
		showInvisibleFeatures : true, // display the matching features even if their layer is invisible, default true
		//function to display a feature returned by the search, parameters are the feature and an HTML container.
		showResultFct : function (feature, container) {
			props = feature.properties;
			var name = L.DomUtil.create('b', null, container);
			name.innerHTML = props.name;
			container.appendChild(L.DomUtil.create('br', null, container));
			container.appendChild(document.createTextNode(props.details));
		}
}).addTo(map);
*/


baseLayers = {
	'Open Street Map Humanitarian' : osm_hot,
	'Open Street Map MapQuest' : osm_mq,
	'Open Street Map Mapnik' : osm_mapnik,
	//'Aerial View' : layerOrtho,
	//'No Basemap' : " " //works, but produces an error
};


groupedOverLayers = {
	"Additional Maps" : {
		'Pegel Online|pegel|false|Current water level and water level diagrams from gauges in Germany. Click on the icons on the map to show more information.|51.40|10.70|6' : waterMeasurementData,
		'World Wide Rain Forecast|rain|true|Precipitation forecast from Open Weather map. This layer is only visible on very low zoom levels, so you need to zoom out to visualize it.|51.962|7.624|5' : rain,
		'Flood Prone Areas|flood_prone|true|Flood prone areas in North-Rhine Westphalia. Calculated for a statistical flood once in one hundred years.|51.961|7.652|12' : flood,
		'Ground Map (DGK5)|dgk|true|German ground map in scale 1:5000 for North-Rhine Westphalia. This layer ist only visible on very high zoom levels, so you need to zoom in to visualize it.|51.962|7.624|16' : layerDGK5,
		'Topographical Map (DTK10)|dtk|true|German topographical map in scale 1:10000 for North-Rhine Westphalia. This layer ist only visible on very high zoom levels, so you need to zoom in to visualize it.|51.962|7.624|14' : layerDTK10
	}
};


// Layer switcher
/*var LlayerSwitcher = new L.control.groupedLayers(baseLayers, groupedOverLayers, {
		position : 'bottomleft'
}).addTo(map);*/

$.each(groupedOverLayers, function (i, v) {
	$.each(v, function (properties, layer) {
		var border = '';
		var active = '';
		properties = properties.split('|');
		if (properties[2] == 'true') {
			border = ' class="border"';
		}
		if (map.hasLayer(layer)) {
			active = ' active'
		}
		var layerHTML =
			'<div class="layer' + active + '" id="layer-' + layer._leaflet_id + '">' +
			'<img src="img/icons/check.png" id="layer-check-' + layer._leaflet_id + '" class="check' + active + '" />' +
			'<img src="img/layerthumb/' + properties[1] + '.png"' + border + ' />' +
			'<div> ' + properties[0] + '</div>' +
			'<div class="small">' + properties[3] + '</div>' +
			'</div>';
		$('#layer-popup').append(layerHTML);

		$('#layer-' + layer._leaflet_id).click(function () {
			if (!map.hasLayer(layer)) {
				$('#layer-' + layer._leaflet_id).addClass('active');
				$('#layer-check-' + layer._leaflet_id).addClass('active');
				map.addLayer(layer);
				map.setView([properties[4], properties[5]], properties[6]);
			} else {
				$('#layer-' + layer._leaflet_id).removeClass('active');
				$('#layer-check-' + layer._leaflet_id).removeClass('active');
				map.removeLayer(layer);
			}
		});
	});
});


// closing PopUp when clicking on map
map.on('click', function () {
	closePopUp();
	if (popUpTrigger) {
		closeLayerPopUp();
		closeLoginPopUp();
		popUpTrigger = false;
	}
});


// Right click menubar
if (document.getElementById('map').addEventListener) {
	var popUpWidth = $('#map-right-click-menu').width();
	var popUpTop = $('#map-right-click-menu').offset().top;

	var popUpHeight = $('#map-right-click-menu').height();
	var popUpLeft = $('#map-right-click-menu').offset().left;

	// Nobody knows, why it is these numbers, but trust me, it works!!!
	var rightOffset = ($('#page').css('margin')).replace("px", "");
	var bottomOffset = parseInt(($('#map').css('bottom')).replace("px", "")) + parseInt(($('#page').css('margin')).replace("px", ""));

	//Getting lat long at rightclick
	function onMapClick(e) {
		latlng = e.latlng;
	}
	map.on('contextmenu', onMapClick);

	document.getElementById('map').addEventListener('contextmenu', function (e) {
		var evt = e ? e : window.event;

		var x = evt.clientX;
		var y = evt.clientY;

		if ($(window).width() - rightOffset < (evt.clientX + popUpWidth)) {
			x -= popUpWidth;
		}
		// + parseInt(($('#page').css('margin')).replace("px",""))
		if (($(window).height() - evt.clientY - bottomOffset - 2) < popUpHeight) {
			y -= (popUpHeight + 2);
		}

		$('#map-right-click-menu').fadeOut(100, function () {
			document.getElementById('map-right-click-menu').style.left = x + 'px';
			document.getElementById('map-right-click-menu').style.top = y + 'px';
			$('#map-right-click-menu').fadeIn(200);
		});

		e.preventDefault();
	}, false);

	document.getElementById('map').addEventListener('click', function (e) {
		var evt = e ? e : window.event;

		if (!(evt.clientX > popUpLeft && evt.clientX < popUpLeft + popUpWidth && evt.clientY > popUpTop && event.clientY < popUpTop + popUpHeight)) {
			$('#map-right-click-menu').fadeOut(200);
		}

		if ($('.leaflet-popup-pane' || '.leaflet-control-layers-list').css('display') == 'none') {
			e.preventDefault();
		}
	}, false);

} else {
	document.getElementById('map').attachEvent('oncontextmenu', function () {
		alert("You've tried to open context menu");
		window.event.returnValue = false;
	});
}
