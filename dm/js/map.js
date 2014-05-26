// create a map in the "map" div, set the view to a given place and zoom
var map = new L.Map('map', {
		center : [51.95442, 7.62709],
		zoom : 11,
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

// global variable for position of weatherforcast
var latlng;	
	
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
			// var gaugeZeroValue = data.timeseries[0].gaugeZero.value;			// covered by if-statement
			// var gaugeZeroUnit = data.timeseries[0].gaugeZero.unit			// covered by if-statement

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

			// Popup with name of measurementstation, the watername, the gaugezerovalue+unit, the current waterlevelmeasurement+unit and timestamp of last measurement
			return ("<b>Measurementstation:</b> " + measurementStationName + "<br /><b>Watername:</b> " + waterName + "<br /><b>Waterzerovalue:</b> " + gaugeZeroValue + gaugeZeroUnit + "<br /><b>Current Waterlevel:</b> " + currentMeasurementValue + currentMeasurementUnit + "<br /><b>Last Measurement:</b> " + currentMeasurementTimestamp + "<br/>" + "<img src=http://www.pegelonline.wsv.de/webservices/rest-api/v2/stations/" + encodeURIComponent(measurementStationName) + "/W/measurements.png?start=P15D&width=260&height=130>" + "<div id='highchart-button' class='generic-button' data-stationName='"+ encodeURIComponent(measurementStationName) +"'>More information &nbsp; &#9658;</div>") || null;
		}
	});

// Basemaps
// add an OpenStreetMap tile layer
var osm = new L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
		attribution : '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
	}).addTo(map);

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
var rain = new L.tileLayer('http://{s}.tile.openweathermap.org/map/rain/{z}/{x}/{y}.png', {
		options : {
			attribution : 'Map data &copy; <a href="http://openweathermap.org">OpenWeatherMap</a>',
			opacity : 0.5
		},
		transparent : true,
		opacity : 0.5
	});

/*
	//Pegelonline wms layers - For more information: https://www.pegelonline.wsv.de/webservice/wmsAktuell
var pp = new L.TileLayer.WMS("http://www.pegelonline.wsv.de/webservices/gis/wms/aktuell/mnwmhw", {
		layers : 'Pegelpunkte',
		format : 'image/png',
		//crs: L.CRS.EPSG4326,
		version : '1.1.1',
		transparent : false,
		opacity : 0.6
	});

var pn = new L.TileLayer.WMS("http://www.pegelonline.wsv.de/webservices/gis/wms/aktuell/mnwmhw", {
		layers : 'Pegelnamen',
		format : 'image/png',
		//crs: L.CRS.EPSG4326,
		version : '1.1.1',
		transparent : false,
		opacity : 0.6
	});

var pw = new L.TileLayer.WMS("http://www.pegelonline.wsv.de/webservices/gis/wms/aktuell/mnwmhw", {
		layers : 'Pegelwasserstand',
		format : 'image/png',
		//crs: L.CRS.EPSG4326,
		version : '1.1.1',
		transparent : false,
		opacity : 0.6
	});

var pt = new L.TileLayer.WMS("http://www.pegelonline.wsv.de/webservices/gis/wms/aktuell/mnwmhw", {
		layers : 'TendenzWasserstand',
		format : 'image/png',
		//crs: L.CRS.EPSG4326,
		version : '1.1.1',
		transparent : false,
		opacity : 0.6
	});
*/
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
			title : "Show your location\nSpeech:Start/End location", // title of the locat control
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
var LcoordinateDisplay = new L.control.coordinates({
		position : "bottomleft", //optional default "bottomright"
		decimals : 4, //optional default 4
		decimalSeperator : ".", //optional default "."
		labelTemplateLat : "Latitude: {y}", //optional default "Lat: {y}"
		labelTemplateLng : "Longitude: {x}", //optional default "Lng: {x}"
		enableUserInput : true, //optional default true
		useDMS : false, //optional default false
		useLatLngOrder : true //ordering of labels, default false-> lng-lat
	}).addTo(map);

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

/*
For now, the time information is used of a local json file.
Demo of temporal data and slidercontrol
 */
$.getJSON("js/lib/Leaflet.slidercontrol/points_time.json", function (json) {
	timepoints = L.geoJson(json),
	sliderControl = new L.control.sliderControl({
			position : "topright",
			layer : timepoints,
			range : false // change to true, to give the possibility of using an interval
		});
	//Make sure to add the slider to the map ;-)
	map.addControl(sliderControl);
	//And initialize the slider
	sliderControl.startSlider();
});

/*
For now, the time information is used of a local json file.
Demo of data-clustering
 */
$.getJSON("js/lib/Leaflet.markercluster/points_cluster.json", function (json) {
	geoJsonLayer = L.geoJson(json, {
			onEachFeature : function (feature, layer) {
				layer.bindPopup(feature.properties.title);
			}
		});
	clusterpoints.addLayer(geoJsonLayer);
	// map.fitBounds(markers.getBounds()); // deactivated, because of a high delay of map load
});
var clusterpoints = L.markerClusterGroup();
//Uncomment to show Clusterlayer directly after the site has loaded. For now it's loaded by using the LayerControl
//map.addLayer(clusterpoints);

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
			polygon : {
				title : 'Draw a sexy polygon!',
				allowIntersection : false,
				drawError : {
					color : '#b00b00',
					timeout : 1000
				},
				shapeOptions : {
					color : '#bada55'
				},
				showArea : true
			},
			polyline : {
				metric : true
			},
			circle : {
				shapeOptions : {
					color : '#662d91'
				}
			},
			marker : true
		},
		edit : {
			featureGroup : drawnItems,
			remove : true
		}
	});
map.addControl(drawControl);

map.on('draw:created', function (e) {
	var type = e.layerType,
	layer = e.layer;

	if (type === 'marker') {
		layer.bindPopup('A popup!');
		// Do marker specific actions
	}
	// Do whatever elso you want to do. For example save all created items from Layer drawnItems to database.
	// First step would be to convert the Layer to geoJson by e.g. toDb = drawnItems.togeoJSON();
	drawnItems.addLayer(layer);
});

// Search for specific features depending on their categroy. Json can be used.
// Should be discussed if we want to do the filtering using a plugin or using the frontend itself
/*
var LfuseSearch = new L.control.fuseSearch({
position: "topleft",
title: "Search for category",
placeholder: "Search",
maxResultLength: null, //number of features displayed in the result list, default is null and all features found by Fuse are displayed
showInvisibleFeatures: true, // display the matching features even if their layer is invisible, default true
//function to display a feature returned by the search, parameters are the feature and an HTML container.
showResultFct: function(feature, container) {
props = feature.properties;
var name = L.DomUtil.create('b', null, container);
name.innerHTML = props.name;
container.appendChild(L.DomUtil.create('br', null, container));
container.appendChild(document.createTextNode(props.details));
}
}).addTo(map);
 */

baseLayers = {
	'OSM' : osm,
	'Aerial View' : layerOrtho,
	'No Basemap' : " ", //works, but produces an error
};

groupedOverLayers = {
	"Map Layers" : {
		'DGK5' : layerDGK5,
		'DTK10' : layerDTK10,
	},
	"Weather Layers" : {
		'Rain' : rain,
		'Flooding Areas' : flood,
	},
	/*"Pegel Online Layers" : {
		'Flodmarker' : pp,
		'Floodmarker Name' : pn,
		'Trend Water Gauge' : pt,
		'Water Gauge' : pw
	},
	*/
	"Demo Layer" : {
		'Clustering' : clusterpoints,
		'Pegel Online Data' : waterMeasurementData
	}
};

// Map control: Layer switcher
var LlayerSwitcher = new L.control.groupedLayers(
		baseLayers, groupedOverLayers, {
		position : 'topright'
	}).addTo(map);


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

		console.log(latlng);

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