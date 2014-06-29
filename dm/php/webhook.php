<?php

	require 'Hull/Utils.php';
	require 'Hull/Event.php';
	require 'Hull/Connection.php';
	require 'Hull/Client.php';
	require 'Hull/Cache.php';
	require 'PHPmailer/PHPMailerAutoload.php';
	require 'PHPmailer/class.phpmailer.php';
	require 'PHPmailer/class.smtp.php';

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
		var_dump($message_owner_id);   
		$credentials = $hull->asUser($message_owner_id)->get('me');
		$credentials = array($credentials)[0];

		$name = $credentials->name;
		$email = $credentials->email;
		
		//Mail Setup
		$mail = new PHPMailer;
	    $mail->isSMTP();                                     
	    $mail->Host = '*';
	    $mail->Port = 587;  
	    $mail->SMTPAuth = true;           
	    $mail->Username = '*';  
	    $mail->Password = '*';  
	    $mail->SMTPSecure = 'tls';
	    $mail->From = '*';
	    $mail->FromName = 'Floodwatch';
		$mail->isHTML(true);

	    $mail->addAddress($email);

		$message_url = 'http://giv-disastermanagement.uni-muenster.de?message='.$message_id;                                  
		$mail->Subject = 'New Comment to your Message';
		$mail->Body    = 'Hello '.$name.', </br></br>'.$object->user->name.' commented on your Message:</br></br><a href="'.$message_url.'">'.$message_url.'</a></br></br>Floodwatch';
		$mail->AltBody = 'TODO';

		echo $mail->Body;

		if( !$mail->send() ) {
		    echo 'Message could not be sent.';
		    echo 'Mailer Error: ' . $mail->ErrorInfo;
		} else {
		    echo 'Message has been sent';
		}
		
	}

	function getHullUserId ($message_id) {

		$con = pg_connect("host=* port=* dbname=* user=postgres password=*")
	    or die('Verbindungsaufbau fehlgeschlagen: ' . pg_last_error());

	 	$query = 'SELECT "hulluser_id" FROM message WHERE message_id ='.$message_id;

		$message_owner_id = pg_query($query);
		$message_owner_id = pg_fetch_array($message_owner_id);
		$message_owner_id = ($message_owner_id[0]);

		return $message_owner_id;

	}

?>