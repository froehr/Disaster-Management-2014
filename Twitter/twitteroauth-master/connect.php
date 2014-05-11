<html>
	<head>
		<!-- used librarys-->
		<link rel="stylesheet" href="http://code.jquery.com/ui/1.10.3/themes/smoothness/jquery-ui.css">
		<script src="http://code.jquery.com/jquery-1.9.1.js"></script>
	</head>
		<body>
			<a href="https://twitter.com/share" class="twitter-share-button" data-lang="en" data-size="large">Tweet</a>
			<a href="https://twitter.com/share" class="twitter-share-button" data-url="http://www.disaster-management.de/" data-via="DREAM">Tweet</a>
			<a href="https://twitter.com/DREAM" class="twitter-follow-button" data-show-count="true">Follow @DREAM</a>
			<a href="https://twitter.com/intent/tweet?button_hashtag=TwitterStories" class="twitter-hashtag-button" data-related="DFB_Themen">Tweet #Disaster</a>
			<a href="https://twitter.com/intent/tweet?screen_name=MarkusKonkol" class="twitter-mention-button" data-related="MarkusKonkol">Tweet to @MarkusKonkol</a>
			<a href="https://twitter.com/share" class="twitter-share-button" data-via="" data-lang="en">Tweet</a>

			</br></br>

			<a class="twitter-timeline" href="https://twitter.com/MarkusKonkol" data-widget-id="457078164632510464">Tweets von @MarkusKonkol</a>
			</br></br></br></br>

			Add a message:
			</br></br>
			Type:     <input type="text" size="40" name="Type" id ="type">
			Description:  <input type="text" size="40" name="Description" id = "des">
			E-Mail:   <input type="text" size="40" name="Mail" id ="mail">
			<button onclick="add()">submit</button>

			<script>
				function add(){
					var type = document.getElementById("type").value;
					var description =  document.getElementById("des").value;
					var mail = document.getElementById("mail").value;
					saveMessage(type,description,mail);
				}

				function saveMessage(type,des,mail){

					$.post(
						"twitter.php?",
						{	
						Type:type,
						Des:des,
						Mail:mail
						},
						function(data){}	
						);		
				}

				!function(d,s,id){
					var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';
					if(!d.getElementById(id)){
						js=d.createElement(s);
						js.id=id;js.src=p+"://platform.twitter.com/widgets.js";
						fjs.parentNode.insertBefore(js,fjs);
					}
				}
				(document,"script","twitter-wjs");
				</script>


<?php
/**
 * @file
 * Check if consumer token is set and if so send user to get a request token.
 */

/**
 * Exit with an error message if the CONSUMER_KEY or CONSUMER_SECRET is not defined.
 */
require_once('config.php');
if (CONSUMER_KEY === '' || CONSUMER_SECRET === '' || CONSUMER_KEY === 'CONSUMER_KEY_HERE' || CONSUMER_SECRET === 'CONSUMER_SECRET_HERE') {
  echo 'You need a consumer key and secret to test the sample code. Get one from <a href="https://dev.twitter.com/apps">dev.twitter.com/apps</a>';
  exit;
}

/* Build an image link to start the redirect process. */
$content = '<a href="./redirect.php"><img src="./images/lighter.png" alt="Sign in with Twitter"/></a>';
 
/* Include HTML to display on the page. */
include('html.inc');

?>
</body>
</html>
