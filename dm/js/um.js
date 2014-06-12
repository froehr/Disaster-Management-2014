Hull.init({ 
	"appId": "538382639df5c0a8da00018a",
	"orgUrl": "https://22dd92ac.hullapp.io"
	},
	function(hull, me, app, org) {
	
	},
	function(error) {
    // An Error happend, handle it.
	}
);

function setLoginContent() {
	$('#login').html('User Login');
	
	var defaultContent = '<h1>E-Mail</h1>' +
		'<input type="text" name="mail" id="mail" />' +
		'<h1>Password</h1>' +
		'<input type="password" name="password" id="password" />' +
		'<p><a href="#" id="forgot-password">Forgot password?</a><br /><a href="#" id="create-account">Create new account.</a></p>' +
		'<div class="submit"><input type="submit" value="Login &nbsp; &#9658;" id="submit" /></div><br />' +
		'<h1>Social Media Login</h1>' +
		'<div class="center">' +
			'<div id="facebook" class="um-button">Login with Facebook</div>' +
			'<div id="twitter" class="um-button">Login with Twitter</div>' +
			'<div id="googleplus" class="um-button">Login with Google+</div>' +
		'</div>';
	$('#login-popup').html(defaultContent);
	$('#login-popup').css('height', 'auto');

	$('#create-account').click(function() {
		var content = '<h1>Create new account</h1>' +
			'<p>Name</p>' +
			'<input type="text" name="create-account-name" id="create-account-name" />' +
			'<p>E-Mail</p>' +
			'<input type="text" name="create-account-mail" id="create-account-mail" />' +
			'<p>Password</p>' +
			'<input type="password" name="create-account-password-1" id="create-account-password-1" />' +
			'<p>Confirm password</p>' +
			'<input type="password" name="create-account-password-2" id="create-account-password-2" />' +
			'<div class="submit normalized"><input type="submit" value="Submit" id="create-account-submit" /></div><br />';
		createPopUp(257, 310, content);
	});

	$('#facebook').click(function() {
		Hull.login('facebook');
	});

	/*
	$('#twitter').click(function() {
		Hull.login('twitter');
	});

	$('#google').click(function() {
		Hull.login('google');
	});
	*/
}

function setLogoutContent() {
	$('#login').html('Account');
	
	var user = Hull.currentUser();
	var provider = user.identities[0].provider;
	var uppercaseProvider = provider.charAt(0).toUpperCase() + provider.substr(1, provider.length);
	content = '<div class="center">' +
			'<img src="' + user.picture + '" class="float-left" />' +
			'<div class="left username">Connected as <b>' + user.name + '</b> via ' + uppercaseProvider + '.</div>' +
			'<div id="' + provider + '" class="um-button">Logout</div>' +
		'</div>';
	$('#login-popup').html(content);
	$('#login-popup').css('height', 'auto');

	$('#' + provider).click(function() {
		Hull.logout();
	});
}

var provider = '';
var content = '';

// Event for Initalization of Hull.io - Include every function that needs to be called on start
Hull.on('hull.init', function() {
	showMessages();
	if ( Hull.currentUser() ) {
		setLogoutContent();
	}
	else {
		setLoginContent();
	}
});


// User logged in
Hull.on('hull.auth.login', function() {
	setLogoutContent();
});

Hull.on('hull.auth.logout', function() {
	setLoginContent();
});
	
// returning user information, null if not logged in
function getUserInfo() {
	return Hull.currentUser();
}

// encoding Hull.id
function getHullId(id) {
	var entity = Hull.util.entity.encode(id);
	return entity;
}

