<?php
function getConnection()
	{$db_connection = pg_connect("host=host port=5432 dbname=dbname user=user password=pw")
		or die('Verbindungsaufbau fehlgeschlagen: ' . pg_last_error());
		return $db_connection;
	} 

	$con = getConnection();
	$message_id = $_POST['message_id'];

	$query=pg_query($con,'DELETE FROM "message" WHERE "message_id"='.$message_id.';');
	echo ("Successfully deleted");

?>