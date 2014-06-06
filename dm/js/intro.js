initIntroJS = function() {
    var intro = introJs();
	
	intro.setOptions({
	  // steps that are shown during intro
	    steps: [
		{
		  element: '#map',
		  intro: 'On this map the location of the former messages is displayed',
		  tooltipClass: 'map-intro'
		},
		{
		  element: '#messages',
		  intro: 'In this menu all current messages are displayed',
		  position: 'right'
		},
		{
		  element: '#submit-message-button',
		  intro: 'With a click on this button you can create a new message',
		},
		{
		  element: '#message-form',
		  intro: 'Within this form you can describe and submit your message',
		  position: 'right'
		},
		{
		  element: '#layer',
		  intro: 'With this Buttons you can add additional map data',
		},
		{
		  element: '#login',
		  intro: 'Please login to the system to submit messages',
		},
		{
		  element: '#map-right-click-menu',
		  intro: 'With a rightclick on any positons the map you get additional functions',
		},
	    ]
	});
    
    intro.start();
    
	// Show and do not show explained elements
	intro.onbeforechange(function(targetElement) {   
		switch (targetElement.id) 
			{ 
			case "map": 
				console.log('step1');
			break;
			case "messages": 
				document.getElementById('submit-message-button').style.display = 'block';
				document.getElementById('message-form').style.display = 'none';
			break; 
			case "submit-message-button": 
				document.getElementById('submit-message-button').style.display = 'block';
				document.getElementById('message-form').style.display = 'none'; 
			break;
			case "message-form":
				document.getElementById('submit-message-button').style.display = 'none';
				document.getElementById('message-form').style.display = 'block'; 
			break;
			case "layer":
				document.getElementById('submit-message-button').style.display = 'block';
				document.getElementById('message-form').style.display = 'none';
			break;
			case "login": 
				document.getElementById('map-right-click-menu').style.display = 'none';
			break;
			case "map-right-click-menu": 
				document.getElementById('map-right-click-menu').style.left = '400px';
				document.getElementById('map-right-click-menu').style.top = '170px';
				document.getElementById('map-right-click-menu').style.display = 'block';
			break;
			}
	})
    
    // getting back to old appearence
    intro.oncomplete(function() {
	document.getElementById('map-right-click-menu').style.display = 'none';
	document.getElementById('submit-message-button').style.display = 'block';
	document.getElementById('message-form').style.display = 'none';
    });
    
    intro.onexit(function() {
	document.getElementById('map-right-click-menu').style.display = 'none';
	document.getElementById('submit-message-button').style.display = 'block';
	document.getElementById('message-form').style.display = 'none';
    });
}