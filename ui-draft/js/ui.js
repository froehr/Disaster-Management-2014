function setElementDisplay(elementId, newDisplay) {
	var element = document.getElementById(elementId);
	element.style.display = newDisplay;
}

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

$('#startdate').val(today);
$('#starttime').val(now);

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

$('#x-form').click(function() {
	$('#message-form').slideUp('slow', 'linear');
});

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

function setMessageClickFunctions(messageId, lat, lon, zoom) {
	$('#message-' + messageId).click(function() {
		map.setView(new L.LatLng(lat, lon), zoom);
	});

	$('#more-' + messageId).click(function() {
		setElementDisplay('more-' + messageId, 'none');
		setElementDisplay('less-' + messageId, 'block');
		$('#details-' + messageId).slideDown('fast', 'linear');
	});

	$('#less-' + messageId).click(function() {
		setElementDisplay('more-' + messageId, 'inline');
		setElementDisplay('less-' + messageId, 'none');
		$('#details-' + messageId).slideUp('fast', 'linear');
	});

	$('#downvote-' + messageId).click(function() {
		document.getElementById('downvote-' + messageId).style.color = '#A50026';
		document.getElementById('upvote-' + messageId).style.color = '#959595';
	});

	$('#upvote-' + messageId).click(function() {
		document.getElementById('upvote-' + messageId).style.color = '#468f5c';
		document.getElementById('downvote-' + messageId).style.color = '#959595';
	});
}

setMessageClickFunctions(1, 37.246994, -121.840744, 12);
setMessageClickFunctions(2, 37.253192, -121.966156, 16);