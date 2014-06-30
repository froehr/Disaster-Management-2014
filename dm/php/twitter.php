<?php
//This file can be used to post messages of our application on twitter

require_once('TwitterAPIExchange.php');
 
/** Set access tokens here - see: https://dev.twitter.com/apps/ **/
$settings = array(
    'oauth_access_token' => "2583629221-30EF6N1ZjTytKUjNWylzdVrPIRQjO0Z5yvdnrI1",
    'oauth_access_token_secret' => "Ya7lt5Pa9O2py2l0uQzfbPeUBQdH41c8TJzbI8Qzwl96x",
    'consumer_key' => "FX5ipRMNyxDTDNlOTTwV5Suml",
    'consumer_secret' => "7cHzAgBBfCTTmnTVpuHzlOebLGmgV0lhQtUBS9kpTbjUJ2gfeA"
);

		$issue = $_POST['Issue'];
		$title = $_POST['Title'];
		$id = $_POST['Id'];		


$url = "https://api.twitter.com/1.1/statuses/update.json";

$requestMethod = "POST";
//Post something in Twitter, e.g. $getfield = array('status'=>'another funtweet','screen_name'=>'MarkusKonkol');
//Originally $getfield = array('status'=>'New Message: '$issue.', '.$description,'screen_name'=>'DisasterManagement');   but this gave me an error. Switched to something differnt for testing purposes.
$getfield = array('status'=>'New: '.$issue. ': ' .$title. ' http://giv-disastermanagement.uni-muenster.de/dm/?message='.$id);

$twitter = new TwitterAPIExchange($settings);
echo $twitter->buildOauth($url, $requestMethod)
             ->setPostfields($getfield)
			 ->performRequest();
?>