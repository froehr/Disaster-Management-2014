<?php
require_once('TwitterAPIExchange.php');
 
/** Set access tokens here - see: https://dev.twitter.com/apps/ **/
$settings = array(
    'oauth_access_token' => "***",
    'oauth_access_token_secret' => "***",
    'consumer_key' => "***",
    'consumer_secret' => "***"
);

$url = "https://api.twitter.com/1.1/statuses/user_timeline.json";

$requestMethod = "GET";

//Enter a twitter-user: e.g. @FCBayern
$getfield = '?screen_name=***';

$twitter = new TwitterAPIExchange($settings);
echo $twitter->setGetfield($getfield)
			 ->buildOauth($url, $requestMethod)
			 ->performRequest();
?>