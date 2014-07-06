Hull.init({ 
	"appId": "538382639df5c0a8da00018a",
	"orgUrl": "https://22dd92ac.hullapp.io"
	},
	function(hull, me, app, org) {
		
		showMessages();
	},
	function(error) {
    console.log(error);
	}
);

function setLoginContent() {
	$('#login').html('User Login');
	
	var defaultContent = '<h1>E-Mail</h1>' +
		'<input type="text" name="mail" id="mail" />' +
		'<h1>Password</h1>' +
		'<input type="password" name="password" id="password" />' +
		'<p><a href="#" id="forgot-password">Forgot password?</a><br /><a href="#" id="create-account">Create new account.</a></p>' +
		'<div class="submit"><input type="submit" value="Login &nbsp; &#9658;" id="email-login" /></div><br />' +
		'<p id="login-error"></p>' +
		'<h1>Social Media Login</h1>' +
		'<div class="center">' +
			'<div id="facebook" class="um-button">Login with Facebook</div>' +
			'<div id="twitter" class="um-button">Login with Twitter</div>' +
			'<div id="google" class="um-button">Login with Google+</div>' +
		'</div>';
	$('#login-popup').html(defaultContent);
	$('#login-popup').css('height', 'auto');
	$('#email-login').click(function() {
		signIn();
	});


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
			'<p id="signup-error"></p><div class="submit normalized"><input type="submit" value="Submit" id="create-account-submit" /></div><br />';
		createPopUp(257, 310, content);
		$('#create-account-submit').click(function() {
			signUp();
		});
	});

	
	$('#forgot-password').click(function() {
		resetPW();
	});

	$('#facebook').click(function() {
		Hull.login('facebook');
	});

	
	$('#twitter').click(function() {
		Hull.login('twitter');
	});
	
	$('#google').click(function() {
		Hull.login('google');
	});
}

function setLogoutContent() {
	$('#login').html('Account');
	
	var user = getUserInfo();
	provider = 'dummy';
	try {
    	provider = user.identities[0].provider;
	}
	catch(err) {
    	
	}
	
	if (provider == 'dummy') {
		provider = 'email';
	}

	var uppercaseProvider = provider.charAt(0).toUpperCase() + provider.substr(1, provider.length);
	if ( uppercaseProvider == 'Email' ) uppercaseProvider = 'E-Mail';
	content = '<div class="center">' +
			'<img src="' + user.picture + '" class="float-left profile-img" />' +
			'<div class="left username">Connected as <b>' + user.name + '</b> via ' + uppercaseProvider + '.</div>' +
			'<a href="#" id="change-password">Change Password</a> &nbsp; <a href="#" id="delete-account">Delete Account</a>' +
			'<div id="' + provider + '" class="um-button">Logout</div>' +
		'</div>';
	$('#login-popup').html(content);
	$('#login-popup').css('height', 'auto');

	$('#' + provider).click(function() {
		Hull.logout();
	});

	$('#delete-account').click(function() {
		setDeleteAccountContext();
	});

	$('#change-password').click(function(){
		setChangePasswordContext();
	});
}

var provider = '';
var content = '';

// Event for Initalization of Hull.io - Include every function that needs to be called on start
Hull.on('hull.init', function() {
	
	if ( Hull.currentUser() ) {
		username = getUserInfo().name;
		$('#person_name').val(username);
		setLogoutContent();
	}
	else {
		setLoginContent();
	}
});


// User logged in
Hull.on('hull.auth.login', function() {
	username = getUserInfo().name;
	$('#person_name').val(username);
	setLogoutContent();
});

Hull.on('hull.auth.logout', function() {
	username = '';
	$('#person_name').val(username);
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

//Registration with E-Mail
function signUp() {
	
	var name = $('#create-account-name').val();
	var email = $('#create-account-mail').val();
	var password1 = $('#create-account-password-1').val();
	var password2 = $('#create-account-password-2').val();
	if (password1 == password2) {
		Hull.api('/users', 'post',{
	  		"email": email,
	  		"password": password1,
	  		"name": name
			}).then(function(response) {
	 		
 				closePopUp();
 			}
 			,function(error) {
		    	var status = error.status;
		 		if (status == 400) {
		 			if (error.param == "email"){
	 					printErrorMsg("Invalid Mailing Adress!");
	 				}else{
	 					printErrorMsg("User already exists!");
	 				}
	 			} 
			}
		);
	} else {
		printErrorMsg("Passwords do not match!");
	}
	
	function printErrorMsg(message) {
		$("#signup-error").text(message);
		$('#popup').css('height', 330);
	}	
}

// Log in with E-Mail
function signIn() {
	var email = $('#mail').val();
	var password = $('#password').val();

	Hull.login(email, password).then(function (me) {
  		$("#login-error").text("");
		}, function (error) {
  		$("#login-error").text("Wrong E-Mail or Password.");
  		$('#login-error').css('color', '#A50026');
  		$('#login-popup').css('height', 'auto');
	});
}

function resetPW() {
	
	var onSuccess = function(user) {
  		closePopUp();
	};

	var onError = function(error) {
	  $('#recover-error').text('Invalid E-Mail or User does not exist.');
	  $('#recover-error').css('color', '#A50026');
	  $('#popup').css('height', '140');
	}

	var content = '<h1>Password Reset</h1>' +
				'<p>Please enter your E-Mail:<p>' +
					'<input type="text" name="mail" id="recover-mail" /><br />' +
					'<div class="submit normalized"><input type="submit" value="Submit &nbsp; &#9658;" id="reset-pw" /></div><br />' +
					'<p id="recover-error"></p>';
	createPopUp(255, 120, content);

	$("#reset-pw").click(function(){
		var email = $("#recover-mail").val();
		Hull.api('/users/request_password_reset', 'post',{
	  		"email": email
			}).then(onSuccess, onError);
	});			
			
}

function changeName(name) {
	Hull.api('me', 'put', {
				name: name	
			});
}

//Delete Account Confirmation Popup
function setDeleteAccountContext() {
	var content = '<div>' +
				'<h1>Delete Account</h1>' +
				'<p>Do you really want to delete your Account?<p>' +
				'<div class="submit normalized"><input type="submit" value="YES" id="delete-account-submit" />' +
				'</div>';
	createPopUp(260, 80, content);
	$('#delete-account-submit').click(function(){
		deleteUser(getUserInfo().id);
		Hull.logout();
		closePopUp();
	});

	//delete Hull E-Mail Account
	function deleteUser(id) {
		Hull.api(id, 'delete').then(function(response) {
			//
		});
	}				
}

function setChangePasswordContext() {
	
	var content = '<div>' +
				'<h1>Change Password</h1>' +
				'<p>Password</p>' +
				'<input type="password" name="create-account-password-1" id="update-account-password-1" />' +
				'<p>Confirm password</p>' +
				'<input type="password" name="create-account-password-2" id="update-account-password-2" />'+
				'<div class="submit normalized"><input type="submit" value="Submit &nbsp; &#9658;" id="update-pw-submit" />' +
				'</div>' +
				'<p id="change-password-error"></p>';

	createPopUp(275, 185, content);

	var onSuccess = function(user) {
  		closePopUp();
	};

	var onError = function(error) {
	  	console.log(error);	
		
	}			

	$('#update-pw-submit').click(function(){
		var password1 = $('#update-account-password-1').val();
		var password2 = $('#update-account-password-2').val();
		if (password1 == password2) {
			Hull.api('me', 'put', {
				password: password1	
			}).then(onSuccess, onError);
		}else {
			$('#change-password-error').text('Passwords do not match.');
			$('#change-password-error').css('color', '#A50026');
			$('#popup').css('height', 'auto');
		}
	
	});

}

function hasAccess(owner_id) {

	var hasAccess;

	if(isOnline() == false) {
		return false;
	}

	var isAdmin = getUserInfo().is_admin;
	var is_Owner = owner_id == getUserInfo().id;
	hasAccess = isAdmin || is_Owner;

	return hasAccess;
}

function isOnline() {
	
	var logged_in = getUserInfo();
	logged_in = !((logged_in == null) || (logged_in ==false));

	return logged_in;
}

function socialMediaShareContext (message) {

	
	var host = window.location.host;
	var path = window.location.pathname;
	var url = host + path + '?message=' + message['message_id'];
	var twitter_tag = '#dmifgi';
	var text = message['message_type'] + ': ' + message['title'] + ' ' + twitter_tag + ' - ';
	text = encodeURIComponent(text);

	var facebook_html = '<a href="http://www.facebook.com/sharer.php?u=' + url + '" target="_blank"><div id="facebook-share" class="um-button">Share on Facebook</div></a> ';
	var twitter_html = '<a href="http://twitter.com/intent/tweet?url=' + url + '&text=' + text + '" target="_blank"><div id="twitter-share" class="um-button">Share on Twitter</div></a> ';
	var google_html = '<a href="https://plus.google.com/share?url=' + url + '" target="_blank"><div id="google-share" class="um-button">Share on Google+</div></a>';
	var link_text_html = '<textarea readonly onfocus="this.select();">' + url + '</textarea>';

	var hull_component_html = facebook_html + twitter_html + google_html;

	var content = '<div id="usershare">' +
				'<h1>Share Message</h1>' +
				'<p>Share on Social Networks:</p>' +
				hull_component_html +
				'</br><p>Share Link:</p>'
				 + link_text_html +
				'</div>';
	
	createPopUp(255, 300, content);
}
