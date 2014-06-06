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
	      element: '#layer',
	      intro: 'With this Buttons you can add different map data',
	    },
	     {
	      element: '#map-right-click-menu',
	      intro: 'With a rightclick on the map you get another menu',
	    },{
	      element: '#type-buttons',
	      intro: 'With this button you can select the type of your message',
	    }
	    
	  ]
	});
    
    intro.start();
    
    // eanable right-click-menu to show it
    $('#map-right-click-menu').fadeOut(100, function () {
	document.getElementById('map-right-click-menu').style.left = '500px';
	document.getElementById('map-right-click-menu').style.top = '300px';
	$('#map-right-click-menu').fadeIn(200);
    });
    // disable right-click-menu after showing
    intro.onexit(function() {
	$('#map-right-click-menu').fadeOut(200);
    });
    // disable right-click-menu after showing
    intro.oncomplete(function() {
	$('#map-right-click-menu').fadeOut(200);
    });
}