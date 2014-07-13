<?php
include 'db_connect.php';

	$con = getConnection();
	$message_id = pg_escape_string($_POST['message_id']);

	$query=pg_query($con,'UPDATE message SET relevant = FALSE WHERE "message_id"='.$message_id.';');
	echo ("Successfully deleted");

?>
