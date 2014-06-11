Hull.init({ 
	"appId": "538382639df5c0a8da00018a",
	"orgUrl": "https://22dd92ac.hullapp.io"
	}, function(hull, me, app, org){
	
	}, function(error){
    //An Error happend, handle it.
});


//Facebook login
var $button = $('#facebook-login');

function refreshButton() {
    var user = Hull.currentUser();
    if (user) {
		$('#login').html('Logout');
      $button.html("Connected as " + user.name + ". Logout");
    } else {
      //$button.html("Login with Facebook");
    }
  };



//Event for Initalization of Hull.io - Include every function that needs to be called on start
Hull.on('hull.init', function() {
	refreshButton();
	showMessages();
	
	$('#login').click(function () {
		if (Hull.currentUser()) {
			Hull.logout();
		} 
	});
	
	$button.on('click', function() {
		if (Hull.currentUser()) {
			Hull.logout();
		} else {
			Hull.login('facebook');
			
	  }
	});
	
});


//User logged in
Hull.on('hull.auth.*', function() {
	refreshButton();
	});
	
//returning user information, null if not logged in
function getUserInfo() {
	return Hull.currentUser();
}


//encoding Hull.id
function getHullId(id) {
	var entity = Hull.util.entity.encode(id);
	return entity;
}

