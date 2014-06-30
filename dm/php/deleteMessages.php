<?php
include 'db_connect.php';

	$con = getConnection();
	$message_id = $_POST['message_id'];

	$query=pg_query($con,'DELETE FROM "message" WHERE "message_id"='.$message_id.';');
	echo ("Successfully deleted");

?>