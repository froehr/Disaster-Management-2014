<?php
include 'db_connect.php';

	$con = getConnection();
	$message_id = $_POST['message_id'];

	$query=pg_query($con,'UPDATE message SET relevant = FALSE WHERE "message_id"='.$message_id.';');
	echo ("Successfully deleted");

?>
