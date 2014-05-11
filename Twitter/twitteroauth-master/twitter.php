<?php
require_once('TwitterAPIExchange.php');
 $Type = $_POST['Type'];
 $Des = $_POST['Des'];
 $Mail = $_POST['Mail'];

/** Set access tokens here - see: https://dev.twitter.com/apps/ **/
$settings = array(
    'oauth_access_token' => "***",
    'oauth_access_token_secret' => "***",
    'consumer_key' => "***",
    'consumer_secret' => "***"
);

$url = "https://api.twitter.com/1.1/statuses/update.json";

$requestMethod = "POST";
$getfield = array('status'=>''.$Type.$Des.$Mail.'','screen_name'=>'MarkusKonkol');

$twitter = new TwitterAPIExchange($settings);
echo $twitter->buildOauth($url, $requestMethod)
             ->setPostfields($getfield)
			 ->performRequest();
?>