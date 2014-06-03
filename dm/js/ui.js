function setElementDisplay(elementId, newDisplay) {
	var element = document.getElementById(elementId);
	element.style.display = newDisplay;
}

// initialize global variables for time stamps
var today = new Date();
var dd = today.getDate();
var mm = today.getMonth() + 1;
var h = today.getHours();
var m = today.getMinutes();
var yyyy = today.getFullYear();
if ( dd < 10 ) {
	dd = '0' + dd;
}
if ( mm < 10 ) {
	mm = '0' + mm;
}
if ( h < 10 ) {
	h = '0' + h;
}
if ( m < 10 ) {
	m = '0' + m;
}
today = yyyy + '-' + mm + '-' + dd;   

var now = h + ':' + m;

// fill time and date input fields
$('#startdate').val(today);
$('#starttime').val(now);

// creating clickfunktion for the headerbuttons to open the input form
function setHeaderButtonClickFunctions(tag, color, title) {
	$('#' + tag).click(function() {
		if ( $('#message-form').css('display') == 'none' ) {
			changeMessageForm(tag, color, title);
			$('#message-form').slideDown('slow', 'linear');
		}
		else {
			$('#message-form').fadeOut(500);
			setTimeout(function (){
				changeMessageForm(tag, color, title);
				 $('#message-form').fadeIn();
			 }, 500);
		}
	});
}

var issueTag = '';

// change the style and content of form
function changeMessageForm(tag, color, title) {
	issueTag = tag;
	
	// change options of the drawn feature corresponding to tag
	changeDrawFeatures(tag);
	
	// message form head color and content
	var messageFormHead = document.getElementById('message-form-head');
	messageFormHead.style.color = color;
	messageFormHead.innerHTML = title;
	
	setElementDisplay('more-form', 'inline');
	setElementDisplay('less-form', 'none');
	
	// hidden field value
	document.getElementById('issue').value = tag;
	
	function addMandatoryStars(fields) {
		$('#head-category-mandatory').remove();
		$('#head-person-contact-mandatory').remove();
		$('#head-location-mandatory').remove();
		
		for ( var i = 0; i < fields.length; i++ ) {
			$('#head-' + fields[i]).append(' <span class="mandatory" id="head-' + fields[i] + '-mandatory">*</span>');
		}
	}
	
	// show the mandatory fields
	switch ( tag ) {
		case 'emergency':
		case 'need-support':
			setElementDisplay('details-message', 'block');
			setElementDisplay('details-offer-support', 'block');
			setElementDisplay('details-emergency-need-support', 'none');
			
			addMandatoryStars(['category', 'person-contact', 'location']);
			break;
		case 'offer-support':
			setElementDisplay('details-message', 'block');
			setElementDisplay('details-offer-support', 'none');
			setElementDisplay('details-emergency-need-support', 'none');
			
			addMandatoryStars(['category', 'person-contact']);
			break;
		case 'message':
			setElementDisplay('details-message', 'none');
			setElementDisplay('details-offer-support', 'none');
			setElementDisplay('details-emergency-need-support', 'none');
			
			addMandatoryStars([]);
			break;
	}
}

setHeaderButtonClickFunctions('emergency', '#A50026', 'Submit Emergency Issue');
setHeaderButtonClickFunctions('need-support', '#eba259', 'Submit Support Request');
setHeaderButtonClickFunctions('offer-support', '#468f5c', 'Submit Support Offer');
setHeaderButtonClickFunctions('message', '#45544a', 'Submit Message');

// click function to close the input form
$('#x-form').click(function() {
	$('#message-form').slideUp('slow', 'linear');
});

// popup function
function createPopUp(width, height, content) {
	if ( height != 0 ) $('#popup').height(height);
	var marginTop = $('#popup').height() / 2;
	$('#popup').css('margin-top', '-' + marginTop + 'px');
	
	if ( width != 0 ) $('#popup').width(width);
	var marginLeft = $('#popup').width() / 2;
	$('#popup').css('margin-left', '-' + marginLeft + 'px');
	
	if ( content != '' ) $('#popup-content').html(content);
	$('#popup').fadeIn();
}

function closePopUp() {
	$('#popup').fadeOut().promise().done(function() {
		$('#popup').height('auto');
		$('#popup-content').html('');
	});
}

// click functions to open popups
$('#hotlines').click(function() {
	$('#popup-content').html('');
	createPopUp(800, 300, '');
});

$('#weatherforcast').click(function() {
	var content = $.ajax({url:"http://api.openweathermap.org/data/2.5/forecast/daily?lat="+latlng.lat+"&lon="+latlng.lng+"&cnt=10&mode=html",dataType: "text",success:function(result){
		console.log(result);
		console.log("http://api.openweathermap.org/data/2.5/forecast/daily?lat="+latlng.lat+"&lon="+latlng.lng+"&cnt=10&mode=html");
		$('#map-right-click-menu').fadeOut();
		
		createPopUp(800, 300, result);
	}});
});

$('#help').click(function() {
	createPopUp(800, 300, '');
});

$('#about').click(function() {
	createPopUp(800, 300, '');
});

$('body').on('click', '#highchart-button', function(e) {
	initHighChartForStation($(e.target).attr('data-stationName'));
});

$('#x-popup').click(function() {
	closePopUp();
});

// click functions to open and clode the "more" fields for the input form
$('#more-form').click(function() {
	setElementDisplay('more-form', 'none');
	setElementDisplay('less-form', 'block');
	
	switch ( issueTag ) {
		case 'emergency':
		case 'need-support':
			$('#details-emergency-need-support').slideDown('fast', 'linear');
			break;
		case 'offer-support':
			$('#details-emergency-need-support').slideDown('fast', 'linear').promise().done(function() { $('#details-offer-support').slideDown('fast', 'linear'); });
			break;
		case 'message':
			$('#details-emergency-need-support').slideDown('fast', 'linear').promise().done(function() { $('#details-offer-support').slideDown('fast', 'linear'); }).promise().done(function() { $('#details-message').slideDown('fast', 'linear'); });
			break;
	}
});

$('#less-form').click(function() {
	setElementDisplay('more-form', 'inline');
	setElementDisplay('less-form', 'none');

	switch ( issueTag ) {
		case 'emergency':
		case 'need-support':
			$('#details-emergency-need-support').slideUp('fast', 'linear');
			break;
		case 'offer-support':
			$('#details-emergency-need-support').slideUp('fast', 'linear').promise().done(function() { $('#details-offer-support').slideUp('fast', 'linear'); });
			break;
		case 'message':
			$('#details-emergency-need-support').slideUp('fast', 'linear').promise().done(function() { $('#details-offer-support').slideUp('fast', 'linear'); }).promise().done(function() { $('#details-message').slideUp('fast', 'linear'); });
			break;
	}
});

// animations for the message-bar-toggler 
$('#hide-message-bar').mouseover(function() {
	$('#hide-message-bar').animate({width: 18}, 200);
});

$('#hide-message-bar').mouseout(function() {
	$('#hide-message-bar').animate({width: 10}, 200);
});

// message-bar-toggler
var messageBarStatus = true;
$('#hide-message-bar').click(function() {
	$('#message-bar').animate({width: 'toggle'});
	$('#message-search').animate({width: 'toggle'});
	if ( messageBarStatus ) {
		$('#hide-message-bar-container').animate({left: 0});
		$('#hide-message-bar').css('background-image', 'url(img/icons/show-message-bar.png)');
		document.getElementById('hide-message-bar').title = 'Show message bar';
		$('.leaflet-left').animate({left: 10});
		$('#filter-form').animate({width: 'hide'}, 350);
		messageBarStatus = false;
	}
	else {
		$('#hide-message-bar-container').animate({left: 301});
		$('#hide-message-bar').css('background-image', 'url(img/icons/hide-message-bar.png)');
		document.getElementById('hide-message-bar').title = 'Hide message bar';
		$('.leaflet-left').animate({left: 310});
		messageBarStatus = true;
	}
});

// animations fot the filter button below the message-bar
$('#filter').mouseover(function() {
	$('#filter').attr("src", 'img/icons/filter-hover.png');
});

$('#filter').mouseout(function() {
	$('#filter').attr("src", 'img/icons/filter.png');
});

$('#filter').click(function() {
	$('#filter-form').animate({height: 'toggle'});
});

$('#x-filter').click(function() {
	$('#filter-form').animate({height: 'toggle'});
});

$('#desc').click(function() {
	document.getElementById('radio-desc').checked = true;
	document.getElementById('radio-asc').checked = false;
});

$('#asc').click(function() {
	document.getElementById('radio-desc').checked = false;
	document.getElementById('radio-asc').checked = true;
});

$('#sort-messages-distance').click(function() {
	// Connection to the database
	// Ajax call for sorting messages by distance
});