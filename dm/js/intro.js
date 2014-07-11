initIntroJS = function() {
    var intro = introJs();
	
	intro.setOptions({
	  // steps that are shown during intro
	    steps: [
		{
		  element: '#map',
		  intro: 'On this map the location of the former messages is displayed.',
		  tooltipClass: 'map-intro'
		},
		{
		  element: '#message-bar',
		  intro: 'In this menu all current messages are displayed.',
		  position: 'right'
		},
		{
		  element: $('#message-bar').first(),
		  intro: 'With a click on this button you can create a new message.',
		},
		{
		  element: '#filter-form',
		  intro: 'With this form you can filter the messages.',
		  position: 'right'
		},
		{
		  element: '#login',
		  intro: 'You can login with various social media connections or by your email. After logging in you can post messages.',
		},
		{
		    element: '#create-message-button',
		    intro: 'With a click on this button you can post a new message.'
		},
		{
		  element: '#map-right-click-menu',
		  intro: 'With a rightclick on any positons the map you get additional functions.',
		},
	    ]
	});
    
    intro.start();
    
	// Show and do not show explained elements
	intro.onbeforechange(function(targetElement) {   
		switch (targetElement.id) 
			{ 
			case "map": 
			break;
			case "message-bar": 
				document.getElementById('message-bar').style.display = 'block';
				document.getElementById('message-form').style.display = 'none';
			break; 
			case "submit-message-button": 
				document.getElementById('submit-message-button').style.display = 'block';
				document.getElementById('message-form').style.display = 'none'; 
			break;
			case "message-form":
				document.getElementById('submit-message-button').style.display = 'none';
				document.getElementById('filter-form').style.display = 'none';
			break;
			case "filter-form":
				document.getElementById('filter-form').style.display = 'block';
				
			break;
			case "login": 
				document.getElementById('filter-form').style.display = 'none';
				$('#create-message-button').html('Login to Create Message');
			break;
			case "create-message-button": 
				$('#create-message-button').html('Create Message');
				document.getElementById('filter-form').style.display = 'none';
				document.getElementById('map-right-click-menu').style.display = 'none';
			break;
			case "map-right-click-menu":
				$('#create-message-button').html('Login to Create Message');
				document.getElementById('map-right-click-menu').style.left = '400px';
				document.getElementById('map-right-click-menu').style.top = '170px';
				document.getElementById('map-right-click-menu').style.display = 'block';
			break;
			}
	})
    
    // getting back to old appearence
    intro.oncomplete(function() {
	document.getElementById('map-right-click-menu').style.display = 'none';
	document.getElementById('message-form').style.display = 'none';
	$('#create-message-button').html('Login to Create Message');
    });
    
    intro.onexit(function() {
	document.getElementById('map-right-click-menu').style.display = 'none';
	document.getElementById('create-message-button').style.display = 'block';
	document.getElementById('message-form').style.display = 'none';
	$('#create-message-button').html('Login to Create Message');
    });
}