<?php
//This file can be used to post messages of our application on twitter

require_once('TwitterAPIExchange.php');
 
/** Set access tokens here - see: https://dev.twitter.com/apps/ **/
$settings = array(
    'oauth_access_token' => "***",
    'oauth_access_token_secret' => "***",
    'consumer_key' => "***",
    'consumer_secret' => "***"
);

		$issue = $_POST['Issue'];
		$title = $_POST['Title'];
		$description =$_POST['Description'];
		$category = $_POST['Category'];
		$person_contact = $_POST['PersonContact'];


$url = "https://api.twitter.com/1.1/statuses/update.json";

$requestMethod = "POST";
//Post something in Twitter, e.g. $getfield = array('status'=>'another funtweet','screen_name'=>'MarkusKonkol');
//Originally $getfield = array('status'=>'New Message: '$issue.', '.$description,'screen_name'=>'DisasterManagement');   but this gave me an error. Switched to something differnt for testing purposes.
$getfield = array('status'=>'New Message: '.$issue. ', ' .$title. ', ' .$category. ', ' .$person_contact);

$twitter = new TwitterAPIExchange($settings);
echo $twitter->buildOauth($url, $requestMethod)
             ->setPostfields($getfield)
			 ->performRequest();
?>