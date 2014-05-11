<html>
<a href="https://twitter.com/share" class="twitter-share-button" data-lang="en" data-size="large">Tweet</a>
<script>
!function(d,s,id){
	var js,fjs=d.getElementsByTagName(s)[0];
	if(!d.getElementById(id)){
		js=d.createElement(s);
		js.id=id;
		js.src="https://platform.twitter.com/widgets.js";
		fjs.parentNode.insertBefore(js,fjs);
	}
}
(document,"script","twitter-wjs");
</script>

<a href="https://twitter.com/share" class="twitter-share-button" data-url="http://www.disaster-management.de/" data-via="Disaster">Tweet</a>
<script>
!function(d,s,id){
	var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';
	if(!d.getElementById(id)){
		js=d.createElement(s);
		js.id=id;
		js.src=p+'://platform.twitter.com/widgets.js';
		fjs.parentNode.insertBefore(js,fjs);
	}
}
(document, 'script', 'twitter-wjs');</script>


<a href="https://twitter.com/DFB_Themen" class="twitter-follow-button" data-show-count="true">Follow @DREAM</a>
<script>
!function(d,s,id){
	var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';
	if(!d.getElementById(id)){
		js=d.createElement(s);
		js.id=id;
		js.src=p+'://platform.twitter.com/widgets.js';
		fjs.parentNode.insertBefore(js,fjs);
	}
}
(document, 'script', 'twitter-wjs');</script>

<a href="https://twitter.com/intent/tweet?button_hashtag=TwitterStories" class="twitter-hashtag-button" data-related="DFB_Themen">Tweet #TwitterStories</a>
<script>
!function(d,s,id){
	var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';
	if(!d.getElementById(id)){
		js=d.createElement(s);
		js.id=id;
		js.src=p+'://platform.twitter.com/widgets.js';
		fjs.parentNode.insertBefore(js,fjs);
	}
}
(document, 'script', 'twitter-wjs');</script>

<a href="https://twitter.com/intent/tweet?screen_name=MarkusKonkol" class="twitter-mention-button" data-related="MarkusKonkol">Tweet to @MarkusKonkol</a>
<script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+'://platform.twitter.com/widgets.js';fjs.parentNode.insertBefore(js,fjs);}}(document, 'script', 'twitter-wjs');</script>

<a href="https://twitter.com/share" class="twitter-share-button" data-via="" data-lang="en">Tweet</a>
<script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src="https://platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");</script>

<a class="twitter-timeline" href="https://twitter.com/MarkusKonkol" data-widget-id="457078164632510464">Tweets von @MarkusKonkol</a>
<script>
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



</html>
