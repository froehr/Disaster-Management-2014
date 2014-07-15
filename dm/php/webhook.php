<?php

	require 'Hull/Utils.php';
	require 'Hull/Event.php';
	require 'Hull/Connection.php';
	require 'Hull/Client.php';
	require 'Hull/Cache.php';
	require 'sendMail.php';
	

	$hull = new Hull_Client(array( 'hull' => array(
	    'host' => '*',
	    'appId' => '*',
	    'appSecret' => '*',
	    'debug' => true // optional
	  )));


	$json = $hull->getEvent();
	$payload = $json->payload;
	$event = $payload->event;
	$data = $payload->data;
	$target = $data->target;
	$object = $data->object;
	$type = $object->type;


	//Handle new Comments
	if ( $type == 'comment' && $event == 'activity.create' ) {

		$message_id = $target->encoded_uid;
		$message_id = base64_decode($message_id);
		$message_owner_id = getHullUserId($message_id); 
		  
		$credentials = $hull->asUser($message_owner_id)->get('me');
		$credentials = array($credentials)[0];

		$name = $credentials->name;
		$email = $credentials->email;

		$message_url = 'http://giv-disastermanagement.uni-muenster.de?message='.$message_id;                                  
		$Subject = 'New Comment to your Message';
		$content    = 'Hello '.$name.', </br></br>'.$object->user->name.' commented on your Message:</br></br><a href="'.$message_url.'">VIEW</a></br></br>Floodwatch';
		
		sendMail($email, $content, $subject)

		
		
	}

	function getHullUserId ($message_id) {
		
		include 'db_connect.php';

		$con = getConnection();

	 	$query = 'SELECT "hulluser_id" FROM message WHERE message_id ='.$message_id;

		$message_owner_id = pg_query($query);
		$message_owner_id = pg_fetch_array($message_owner_id);
		$message_owner_id = ($message_owner_id[0]);

		return $message_owner_id;

	}

?>