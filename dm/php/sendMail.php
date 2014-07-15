<?php

	require 'PHPmailer/PHPMailerAutoload.php';
	require 'PHPmailer/class.phpmailer.php';
	require 'PHPmailer/class.smtp.php';

	function sendMail($email, $content, $subject) {

		$mail = new PHPMailer;
	    $mail->isSMTP();                                     
	    $mail->Host = '';
	    $mail->Port = 587;  
	    $mail->SMTPAuth = true;           
	    $mail->Username = '';  
	    $mail->Password = '';  
	    $mail->SMTPSecure = 'tls';
	    $mail->From = '';
	    $mail->FromName = 'Floodwatch';
		$mail->isHTML(true);

	    $mail->addAddress($email);
           
		$mail->Subject = $subject;
		$mail->Body    = $content;
		$mail->AltBody = 'TODO';

		echo $mail->Body;

		if( !$mail->send() ) {
		    echo 'Message could not be sent.';
		    echo 'Mailer Error: ' . $mail->ErrorInfo;
		} else {
		    echo 'Message has been sent';
		}
	}

?>