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
	      exitOnEsc: 'false',
	      showButtons: 'false'
	    },
	    {
	      element: '#need-support',
	      intro: 'With this Buttons you can call for support',
	      exitOnEsc: 'false'
	    },
	     {
	      element: '#offer-support',
	      intro: 'With this Buttons you can offer support',
	      exitOnEsc: 'false'
	    },
	  ]
	});

      intro.start();
}