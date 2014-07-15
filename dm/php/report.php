<?php

	require 'sendMail.php';

	$report = $_POST['report'];
	$id = $_POST['id'];
	$reason = $_POST['reason'];
	$content = $_POST['content'];

	$address = 'admin@example.ifgi';
	$content = $content.'</br></br>'.'<a href="http://giv-disastermanagement.uni-muenster.de?message='.$id.'">VIEW</a>'; 
	
	switch ($report) {
	    case 'comment':
	        	$subject = 'Comment reported - '.$reason;
	        break;
	    case 'message':
	        	$subject = 'Message reported - '.$reason;
	        break;
    }

	sendMail($address, $content, $subject);

?>