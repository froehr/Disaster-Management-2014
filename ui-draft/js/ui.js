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
			setFormTitle(tag, color, title);
			$('#message-form').slideDown('slow', 'linear');
		}
		else {
			$('#message-form').fadeOut(500);
			setTimeout(function (){
				setFormTitle(tag, color, title);
				 $('#message-form').fadeIn();
			 }, 500);
		}
	});
}

// setting the style of form title
function setFormTitle(tag, color, title) {
	var messageFormHead = document.getElementById('message-form-head');
	messageFormHead.style.color = color;
	messageFormHead.innerHTML = title;
	document.getElementById('issue').value = tag;
}

setHeaderButtonClickFunctions('emergency', '#A50026', 'Submit Emergency Issue');
setHeaderButtonClickFunctions('need-support', '#eba259', 'Submit Support Request');
setHeaderButtonClickFunctions('offer-support', '#468f5c', 'Submit Support Offer');
setHeaderButtonClickFunctions('message', '#45544a', 'Submit Message');

// click function to close the input form
$('#x-form').click(function() {
	$('#message-form').slideUp('slow', 'linear');
});

// click functions to open "hotlines", "help" and "about" popups
$('#hotlines').click(function() {
	$('#popup').fadeIn();
});

$('#help').click(function() {
	$('#popup').fadeIn();
});

$('#about').click(function() {
	$('#popup').fadeIn();
});

$('#x-popup').click(function() {
	$('#popup').fadeOut();
});

// click functions to open and clode the "more" fields for the input form
$('#more-form').click(function() {
	setElementDisplay('more-form', 'none');
	setElementDisplay('less-form', 'block');
	$('#details-form').slideDown('slow', 'linear');
});

$('#less-form').click(function() {
	setElementDisplay('more-form', 'inline');
	setElementDisplay('less-form', 'none');
	$('#details-form').slideUp('slow', 'linear');
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
		$('.leaflet-left').animate({left: 0});
		$('#sort-form').animate({width: 'hide'}, 350);
		$('#filter-form').animate({width: 'hide'}, 350);
		messageBarStatus = false;
	}
	else {
		$('#hide-message-bar-container').animate({left: 301});
		$('#hide-message-bar').css('background-image', 'url(img/icons/hide-message-bar.png)');
		$('.leaflet-left').animate({left: 300});
		messageBarStatus = true;
	}
});

// animations fot the filter and sorting buttons below the message-bar
$('#filter').mouseover(function() {
	$('#filter').attr("src", 'img/icons/filter-hover.png');
});

$('#filter').mouseout(function() {
	$('#filter').attr("src", 'img/icons/filter.png');
});

$('#filter').click(function() {
	$('#filter-form').animate({height: 'toggle'});
	$('#sort-form').animate({height: 'hide'});
});

$('#sort').mouseover(function() {
	$('#sort').attr("src", 'img/icons/sort-hover.png');
});

$('#sort').mouseout(function() {
	$('#sort').attr("src", 'img/icons/sort.png');
});

$('#sort').click(function() {
	$('#sort-form').animate({height: 'toggle'});
	$('#filter-form').animate({height: 'hide'});
});