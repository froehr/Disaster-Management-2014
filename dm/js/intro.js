initIntroJS = function() {
    var intro = introJs();
	//intro.setOption('doneLabel', 'Exit');
	//intro.setOption('nextLabel', 'Next');
	//intro.setOption('showButtons', 'true');
	//intro.setOption('showStepNumbers', 'false');
	
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
		  intro: 'With this button you can create a new message',
		},
		{
		  element: '#message-form',
		  intro: 'Within this form you can describe and submit your message',
		},
		{
		  element: '#layer',
		  intro: 'With this Buttons you can add different map data',
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
    
    
	intro.onbeforechange(function(targetElement) {   
		switch (targetElement.id) 
			{ 
			case "map": 
				console.log('step1');
			break;
			case "messages": 
				$('#submit-message-button').fadeIn('fast', 'linear');
				$('#message-form').fadeOut('fast', 'linear'); 
			break; 
			case "submit-message-button": 
				 
			break;
			case "message-form":
				$('#submit-message-button').fadeOut('fast', 'linear');
				document.getElementById('message-form').style.display = 'block'; 
			break;
			case "layer": 
				
			break;
			case "login": 
				$('#map-right-click-menu').fadeOut(100);
			break;
			case "map-right-click-menu": 
					document.getElementById('map-right-click-menu').style.left = '400px';
					document.getElementById('map-right-click-menu').style.top = '170px';
					$('#map-right-click-menu').fadeIn(100);
			break;
			}
	})
	intro.onafterchange(function(targetElement) {   
		switch (targetElement.id) 
			{ 
			case "map": 
				
			break;
			case "messages": 
				
			break; 
			case "submit-message-button": 
				$('#message-form').fadeOut('fast', 'linear');
			break;
			case "message-form":
				 $('#message-form').fadeIn('fast', 'linear');
			break;
			case "layer": 
				$('#message-form').fadeOut('fast', 'linear');
			break;
			case "login": 
				
			break;
			case "map-right-click-menu": 
					
			break;
			}
	})
    
    // disable right-click-menu after showing
    intro.onexit(function() {
	$('#map-right-click-menu').fadeOut(200);
    });
}