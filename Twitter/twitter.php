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

$url = "https://api.twitter.com/1.1/statuses/update.json";

$requestMethod = "POST";
//Post something in Twitter, e.g. $getfield = array('status'=>'another funtweet','screen_name'=>'MarkusKonkol');
$getfield = array('status'=>'***','screen_name'=>'***');

$twitter = new TwitterAPIExchange($settings);
echo $twitter->buildOauth($url, $requestMethod)
             ->setPostfields($getfield)
			 ->performRequest();
?>