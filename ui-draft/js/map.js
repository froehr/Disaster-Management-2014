// create a map in the "map" div, set the view to a given place and zoom
var map = new L.Map('map', {
	center: [51.95442, 7.62709],
	zoom: 11,
	dragging: true,
	touchZoom: true,
	scrollWheelZoom: true,
	doubleClickZoom: true,
	boxZoom: true,
	tap: true,
	tapTolerance: 15,
	trackResize: true,
	worldCopyJump: false,
	closePopupOnClick: true,
	scale: true
});
	
//Basemaps
// add an OpenStreetMap tile layer
var osm = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
	attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

//Orthophoto layer
var layerOrtho = L.tileLayer.wms('http://www.wms.nrw.de/geobasis/wms_nw_dop40', {
	layers: 'WMS_NW_DOP40',
	format: 'image/png',
	version: '1.3.0',
	transparent: true,
	opacity: 0.4
});

//Layers of Geobasis NRW: http://www.bezreg-koeln.nrw.de/brk_internet/organisation/abteilung07/produkte/nrwatlas/index.html 
//						  (website which provides different Web Map Service (WMS)-URLs)
var layerDGK5 = L.tileLayer.wms('http://www.wms.nrw.de/geobasis/wms_nw_dgk5', {
	attribution: '| &copy Geobasis NRW 2013',
	layers: 'WMS_NW_DGK5',
	format: 'image/png',
	transparent: true,
	opacity: 0.5
});
var layerDTK10 = L.tileLayer.wms('http://www.wms.nrw.de/geobasis/wms_nw_dtk10', {
	attribution: '| &copy Geobasis NRW 2013',
	layers: 'nw_dtk10_pan,nw_dtk10_res,NW_DTK10_col,WMS_NW_DTK10',
	format: 'image/png',
	transparent: true,
	opacity: 0.5
});

// Areas affected by flooding: See: http://www.gis4.nrw.de/DienstelisteInternet/
var flood = new L.TileLayer.WMS("http://www.wms.nrw.de/umwelt/wasser/uesg", {
	layers: '6',
	format: 'image/png',
	//crs: L.CRS.EPSG4326,
	version: '1.3.0',
	transparent: true,
	opacity: 0.5
});

// Rain layer
var rain = new L.tileLayer('http://{s}.tile.openweathermap.org/map/rain/{z}/{x}/{y}.png', {
	options: {
		attribution: 'Map data &copy; <a href="http://openweathermap.org">OpenWeatherMap</a>',
		opacity: 0.5
	},
	transparent: true,
	opacity: 0.5
});


//Basemap Toggler
baseLayers = {
	'OSM': osm,
	'Aerial View': layerOrtho,
	'No Basemap': " ", //works, but produces an error
};

groupedOverLayers = {
	"Map Layers": {
		'DGK5': layerDGK5,
		'DTK10': layerDTK10,
	},
	"Weather Layers": {
		'Rain': rain,
		'Flooding Areas': flood,
	},
};


//Map control: Layer switcher		
var LayerSwitcher = L.control.groupedLayers(
	baseLayers, groupedOverLayers, {
		position: 'topright'
	}
).addTo(map);

// New minimap
// Plugin magic goes here! Note that you cannot use the same layer object again, as that will confuse the two map controls
var overviewMap = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
	maxZoom: 18,
	attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap<\/a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA<\/a>, Imagery © <a href="http://cloudmade.com">CloudMade<\/a>'
});

//Minimap
var miniMap = new L.Control.MiniMap(overviewMap, {
	toggleDisplay: true,
	mapOptions: {
		panControl: false,
		zoomsliderControl: false,
		crs: L.CRS.Simple,
	}
}).addTo(map);

//Scalebar
var scalebar = L.control.scale({
	position: 'bottomleft',
	metric: true,
	imperial: false
}).addTo(map)

//new Geolocation tool
var locater = L.control.locate({
	position: 'topleft', // set the location of the control
	drawCircle: true, // controls whether a circle is drawn that shows the uncertainty about the location
	follow: true, // follow the location if `watch` and `setView` are set to true in locateOptions
	stopFollowingOnDrag: false, // stop following when the map is dragged if `follow` is set to true
	circleStyle: {}, // change the style of the circle around the user's location
	markerStyle: {},
	followCircleStyle: {}, // set difference for the style of the circle around the user's location while following
	followMarkerStyle: {},
	circlePadding: [0, 0], // padding around accuracy circle, value is passed to setBounds
	metric: true, // use metric or imperial units
	watch: true,
	onLocationError: function (err) {
		alert(err.message)
	}, // define an error callback function
	onLocationOutsideMapBounds: function (context) { // called when outside map boundaries
		alert(context.options.strings.outsideMapBoundsMsg);
	},
	setView: true, // automatically sets the map view to the user's location
	strings: {
		title: "Show your location\nSpeech:Start/End location", // title of the locat control
		popup: "You are within {distance} {unit} from this point", // text to appear if user clicks on circle
		outsideMapBoundsMsg: "You seem located outside the boundaries of the map" // default message for onLocationOutsideMapBounds
	}
	//locateOptions: {}  // define location options e.g enableHighAccuracy: true
}).addTo(map);

// new Geoseach Bar			
new L.Control.GeoSearch({
	provider: new L.GeoSearch.Provider.Google(),
	position: 'topcenter',
	showMarker: true
}).addTo(map);