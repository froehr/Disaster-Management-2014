<?php
//This file can be used to post messages of our application on twitter

require_once('Twitter/TwitterAPIExchange.php');
 
/** Set access tokens here - see: https://dev.twitter.com/apps/ **/
$settings = array(
    'oauth_access_token' => "",
    'oauth_access_token_secret' => "",
    'consumer_key' => "",
    'consumer_secret' => ""
);
	


$url = 'https://api.twitter.com/1.1/statuses/home_timeline.json';
$requestMethod = "GET";
$getfield = '?screen_name=*twitteraccount*';


$twitter = new TwitterAPIExchange($settings);
echo $twitter->setGetfield($getfield)
             ->buildOauth($url, $requestMethod)
             ->performRequest();

?>