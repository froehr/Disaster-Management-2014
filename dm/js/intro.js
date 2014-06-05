initIntroJS = function() {
    var intro = introJs();
	//intro.setOption('doneLabel', 'Exit');
	//intro.setOption('nextLabel', 'Next');
	//intro.setOption('showButtons', 'true');
	//intro.setOption('showStepNumbers', 'false');
	
	intro.setOptions({
	  steps: [
	    {
	      element: '#emergency',
	      intro: 'With this Buttons you can add a new Emergency',
	    },
	    {
	      element: '#need-support',
	      intro: 'With this Buttons you can call for support',
	    },
	     {
	      element: '#offer-support',
	      intro: 'With this Buttons you can offer support',
	    },
	     {
	      element: '#messages',
	      intro: 'Here you get an overview of the newest messages',
	      position: 'right',
	    },
	     {
	      element: '#map-right-click-menu',
	      intro: 'With a rightclick on the map you get another menu',
	    }
	  ]
	});
    
    intro.start();
    
    $('#map-right-click-menu').fadeOut(100, function () {
	document.getElementById('map-right-click-menu').style.left = '500px';
	document.getElementById('map-right-click-menu').style.top = '300px';
	$('#map-right-click-menu').fadeIn(200);
    });
    
    intro.onexit(function() {
	$('#map-right-click-menu').fadeOut(200);
    });
    
    intro.oncomplete(function() {
	$('#map-right-click-menu').fadeOut(200);
    });
}