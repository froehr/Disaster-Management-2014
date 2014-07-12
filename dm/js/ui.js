function setElementDisplay(elementId, newDisplay) {
	var element = document.getElementById(elementId);
	element.style.display = newDisplay;
}

function scrollToId(id) {
    var tag = $('#' + id);
	var top = $('#message-bar').scrollTop() + tag.position().top;
    $('#message-bar').animate({scrollTop: top}, 'slow');
}

var issueTag = '';
var username = '';
var activeCategory = '';
var activeIssueTag = '';

// creating clickfunktion for the headerbuttons to open the input form
function setMessageFormButtonClickFunctions(tag, color, title) {
	$('#' + tag + '-button').click(function() {
		changeMessageForm(tag, color, title, activeCategory);
	});
}

function addRequiredStars(fields) {
	$('#head-category-required').remove();
	$('#head-person-contact-required').remove();
	$('#head-location-required').remove();
	
	for ( var i = 0; i < fields.length; i++ ) {
		$('#head-' + fields[i]).append(' <span class="required" id="head-' + fields[i] + '-required">*</span>');
	}
}

// change the style and content of form
function changeMessageForm(tag, color, title, activeCategory) {
	activeIssueTag = tag;
	issueTag = tag;
	
	// change options of the drawn feature corresponding to tag
	changeDrawFeatures(tag, activeCategory);
	
	// message form head color and content
	var messageFormHead = document.getElementById('message-form-head');
	messageFormHead.style.color = color;
	messageFormHead.innerHTML = title;
	
	setElementDisplay('less-form', 'none');
	
	// hidden field value
	document.getElementById('issue').value = tag;
	
	$('#' + tag + '-button').css('background-color', color);
	setElementDisplay('more-form', 'block');
	
	// show the required fields
	switch ( tag ) {
		case 'need-support':
			setElementDisplay('details-message', 'block');
			setElementDisplay('details-offer-support', 'block');
			setElementDisplay('details-need-support', 'none');
			
			addRequiredStars(['category', 'person-contact', 'location']);
			
			$('#offer-support-button').css('background-color', '#c1ebce');
			$('#message-button').css('background-color', '#d1dad4');
			break;
		case 'offer-support':
			setElementDisplay('details-message', 'block');
			setElementDisplay('details-offer-support', 'none');
			setElementDisplay('details-need-support', 'none');
			
			addRequiredStars(['category', 'person-contact']);
			
			$('#need-support-button').css('background-color', '#f4dec8');
			$('#message-button').css('background-color', '#d1dad4');
			break;
		case 'message':
			setElementDisplay('details-message', 'none');
			setElementDisplay('details-offer-support', 'none');
			setElementDisplay('details-need-support', 'none');
			
			addRequiredStars([]);
			
			$('#need-support-button').css('background-color', '#f4dec8');
			$('#offer-support-button').css('background-color', '#c1ebce');
			break;
	}
}

setMessageFormButtonClickFunctions('need-support', '#eba259', 'Submit Support Request');
setMessageFormButtonClickFunctions('offer-support', '#468f5c', 'Submit Support Offer');
setMessageFormButtonClickFunctions('message', '#45544a', 'Submit Message');

// click function to close the input form
$('#x-form').click(function() {
	$('#message-form').slideUp('fast', 'linear',  function() {
		$('#message-bar').css('top', '126px');
		$('#create-message-button').css('display', 'block');
	});
	
	$('#error-message').fadeOut();
});

$('#category-select').click(function() {
	if ( $('#category-select-options').css('display') != 'block' ) {
		$('#category-select-options').css('display', 'block');
	}
	else {
		$('#category-select-options').css('display', 'none');
	}
});

var categories = ['shelter', 'transport', 'damage', 'energy', 'food', 'healthcare', 'gathering-point', 'sandbag-sandwall', 'tap-water', 'school', 'childcare'];

function selectCategory(category) {
	activeCategory = category;
	changeDrawFeatures(activeIssueTag, activeCategory);
	$('#category').val(category);
	$('#' + category).css('background-color', '#DDDDDD');
	$('#category-select-text').html(category.replace('-', ' ').replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();}));
	for ( var i = 0; i < categories.length; i++ ) {
		if ( categories[i] != category ) {
			$('#' + categories[i]).css('background-color', '#FFFFFF');
		}
	}
}

$('#shelter').click(function() {
	selectCategory('shelter');
});

$('#transport').click(function() {
	selectCategory('transport');
});

$('#damage').click(function() {
	selectCategory('damage');
});

$('#energy').click(function() {
	selectCategory('energy');
});

$('#food').click(function() {
	selectCategory('food');
});

$('#healthcare').click(function() {
	selectCategory('healthcare');
});

$('#gathering-point').click(function() {
	selectCategory('gathering-point');
});

$('#sandbag-sandwall').click(function() {
	selectCategory('sandbag-sandwall');
});

$('#tap-water').click(function() {
	selectCategory('tap-water');
});

$('#school').click(function() {
	selectCategory('school');
});

$('#childcare').click(function() {
	selectCategory('childcare');
});

// popup function
function createPopUp(width, height, content) {
	$('#popup-content').html(content);
	
	if ( height != 0 ) $('#popup').height(height);
	var marginTop = $('#popup').height() / 2;
	$('#popup').css('margin-top', '-' + marginTop + 'px');
	
	if ( width != 0 ) $('#popup').width(width);
	var marginLeft = $('#popup').width() / 2;
	$('#popup').css('margin-left', '-' + marginLeft + 'px');
	$('#popup').draggable();
	
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
	   $('#map-right-click-menu').fadeOut();
	   createPopUp(800, 400, '');
	   initHighChartForForecast(latlng);
});

$('#nearestgauge').click(function() {
	   $('#map-right-click-menu').fadeOut();
	   showNearestGauge(latlng);
});

$('#quickstart').click(function() {
	initIntroJS();	
});

$('#about').click(function() {
	var content = '<h1>About FloodWatch</h1>' +
		'<p class="justify">FloodWatch is a project, which was startet in a project seminar at the Institute for Geoinformatics of the University of Münster.</p>' +
		'<p><b>Institute for Geoinformatics</b><br />Heisenbergstraße 2<br />48149 Münster, Germany</p><br />' +
		'<p class="justify">FloodWatch is an interactive-map web application, which is designed to plan, ' +
		'mitigate and assess the effects resulting from flood events as one of the commonly known natural hazards. It ' +
		'targets to support decision makers with regard to environmental, infrastructural and health issues usually ' +
		'followed by a flood disaster, while placing emphasis on priority issues to foster the reform efforts that ' +
		'push the disaster risk reduction forward. <img src="img/floodwatch_logo_small.png" alt="FloodWatch Logo" style="float: right; margin-left: 20px;" />Moreover, FloodWatch strives to enhance cooperation between various ' +
		'ministries and governmental authorities by opening communication channels with and among the public, in different ways; ' +
		'using either various social media platforms like Facebook, Twitter and Google+, or throughout the direct message ' +
		'submission from the message bar on the left side of the page. Using the Floodwatch system it is possible to measure, ' +
		'inform, and exchange news about the citizen\'s needs, resources shortage, and infrastructure damages during a flood event. </p>' +
		'<p class="justify">It also works on the electronic dissemination of up-to-date data and information such as topographical and rain forecast maps, ' +
		'and water level diagrams, in addition to sandbags, ration supplies, and evacuation plans, in case of such severe situations. ' +
		'FloodWatch can be applied at national, regional and local level and in different sectors to provide flood guidance on both ' +
		'levels: public and governmental.</p>';
	createPopUp(800, 420, content);
});

$('body').on('click', '#highchart-button', function(e) {
	createPopUp(800, 400, '');
	initHighChartForStation($(e.target).attr('data-stationName'));
});

$('#x-popup').click(function() {
	closePopUp();
});

$('#submit').click(function() {
	if ( saveToDB() ) {
		$('#message-form').slideUp('fast', 'linear',  function() {
			$('#message-bar').css('top', '126px');
			$('#create-message-button').css('display', 'block');
		});
		
		$('#error-message').fadeOut();
		
		var content = '<h1>Message created</h1>' +
			'<p>Thank you for your participation!</p>' +
			'<p class="right">' +
				'<a href="#" id="create-message-okay">Okay</a>' +
			'</p>';
		createPopUp(300, 72, content);
		
		$('#grey').css('display', 'block');
		
		$('#create-message-okay').click(function() {
			location.reload();
		});
		
		$('#x-popup').click(function() {
			location.reload();
		});
	}
});

// click functions and close the "more" fields for the input form
$('#more-form').click(function() {
	setElementDisplay('more-form', 'none');
	setElementDisplay('less-form', 'block');
	
	switch ( issueTag ) {
		case 'need-support':
			$('#details-need-support').slideDown('fast', 'linear');
			break;
		case 'offer-support':
			$('#details-need-support').slideDown('fast', 'linear').promise().done(function() { $('#details-offer-support').slideDown('fast', 'linear'); });
			break;
		case 'message':
			$('#details-need-support').slideDown('fast', 'linear').promise().done(function() { $('#details-offer-support').slideDown('fast', 'linear'); }).promise().done(function() { $('#details-message').slideDown('fast', 'linear'); });
			break;
	}
});

$('#less-form').click(function() {
	setElementDisplay('more-form', 'inline');
	setElementDisplay('less-form', 'none');

	switch ( issueTag ) {
		case 'need-support':
			$('#details-need-support').slideUp('fast', 'linear');
			break;
		case 'offer-support':
			$('#details-need-support').slideUp('fast', 'linear').promise().done(function() { $('#details-offer-support').slideUp('fast', 'linear'); });
			break;
		case 'message':
			$('#details-need-support').slideUp('fast', 'linear').promise().done(function() { $('#details-offer-support').slideUp('fast', 'linear'); }).promise().done(function() { $('#details-message').slideUp('fast', 'linear'); });
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
		$('#create-message-button').animate({width: 'hide'});
		messageBarStatus = false;
	}
	else {
		$('#hide-message-bar-container').animate({left: 301});
		$('#hide-message-bar').css('background-image', 'url(img/icons/hide-message-bar.png)');
		document.getElementById('hide-message-bar').title = 'Hide message bar';
		$('.leaflet-left').animate({left: 310});
		$('#create-message-button').animate({width: 'show'});
		messageBarStatus = true;
	}
});

function setAutoHeight(id) {
	$('#' + id).css('height', 'auto');
	var autoHeight = $('#' + id).height();
	$('#' + id).css('height', 0);
	$('#' + id).css('display', 'block');
	$('#' + id).animate({height: autoHeight}, 'fast');
}

function switchCreateMessageStatus() {

	if (isOnline()) {
		$('#create-message-button').text('Create New Message');
		$('#create-message-button').unbind('click');
		$('#create-message-button').click(function() {
			$('#create-message-button').css('display', 'none');
			$('#message-bar').css('top', '85px');
			$('#message-form').slideDown('slow', 'linear');
			scrollToId('message-form');
		});
	}else{
		$('#create-message-button').text('Login to create message');
		$('#create-message-button').unbind('click');
		$('#create-message-button').click(function() {
			setAutoHeight('login-popup');
			popUpTrigger = true;

		});
	}
}

$('#layer').mouseover(function() {
	setAutoHeight('layer-popup');
	closeLoginPopUp();
});



function setPopUpTrigger(value) {
	popUpTrigger = value;
}

setPopUpTrigger(false);

$('#layer').click(function() {
	popUpTrigger = true;
});

$('#login').mouseover(function() {
	setAutoHeight('login-popup');
	closeLayerPopUp();
	popUpTrigger = false;
});

$('#login').click(function() {
	popUpTrigger = true;
});

$('#login-popup').click(function() {
	popUpTrigger = true;
});

function closeLayerPopUp() {
	$('#layer-popup').fadeOut();
}

function closeLoginPopUp() {
	var close = true;
	if ( $('#mail').is(':focus') ) {
		close = false;
	}

	if ( $('#password').is(':focus') ) {
		close = false;
	}
	
	if ( close ) {
		$('#login-popup').fadeOut();
	}
}

$('#map').mouseover(function() {
	if ( popUpTrigger == false ) {
		closeLoginPopUp();
		closeLayerPopUp();
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