function setElementDisplay(elementId, newDisplay) {
	var element = document.getElementById(elementId);
	element.style.display = newDisplay;
}

$('.header-buttons').click(function() {
	setElementDisplay('message-form', 'block');
});

$('#emergency').click(function() {
	var messageFormHead = document.getElementById('message-form-head');
	messageFormHead.style.color = '#A50026';
	messageFormHead.innerHTML = 'Submit Emergency Issue';
});

$('#need-support').click(function() {
	var messageFormHead = document.getElementById('message-form-head');
	messageFormHead.style.color = '#eba259';
	messageFormHead.innerHTML = 'Submit Support Request';
});

$('#offer-support').click(function() {
	var messageFormHead = document.getElementById('message-form-head');
	messageFormHead.style.color = '#468f5c';
	messageFormHead.innerHTML = 'Submit Support Offer';
});

$('#message').click(function() {
	var messageFormHead = document.getElementById('message-form-head');
	messageFormHead.style.color = '#45544a';
	messageFormHead.innerHTML = 'Submit Message';
});

$('#x').click(function() {
	setElementDisplay('message-form', 'none');
});


function setMessageClickFunctions(messageId, lat, lon, zoom) {
	$('#message-' + messageId).click(function() {
		map.setView(new L.LatLng(lat, lon), zoom);
	});

	$('#more-' + messageId).click(function() {
		setElementDisplay('more-' + messageId, 'none');
		setElementDisplay('less-' + messageId, 'block');
		setElementDisplay('details-' + messageId, 'block');
	});

	$('#less-' + messageId).click(function() {
		setElementDisplay('more-' + messageId, 'inline');
		setElementDisplay('less-' + messageId, 'none');
		setElementDisplay('details-' + messageId, 'none');
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