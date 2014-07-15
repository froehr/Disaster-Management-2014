<?php
//authors: Markus Konkol

	include 'db_connect.php';
		$dbconn = getConnection();

		
		$id = $_POST['ID'];
		$title = htmlentities(pg_escape_string($_POST['Title']));
		$description = htmlentities(pg_escape_string($_POST['Description']));
		$person_contact = htmlentities(pg_escape_string($_POST['PersonContact']));
		$person_name = htmlentities(pg_escape_string($_POST['Name']));
		$people_attending = htmlentities(pg_escape_string($_POST['PeopleAttending']));
		$people_need = htmlentities(pg_escape_string($_POST['PeopleNeeded']));
		$tags = htmlentities(pg_escape_string($_POST['Tags']));

		
		$query=pg_query($dbconn,"UPDATE message SET title='".$title."',description='".$description."',person_contact='".$person_contact."',person_name='".$person_name."',
									people_attending='".$people_attending."',people_needed='".$people_need."',tags='".$tags."' WHERE message_id=".$id.";");
	
?>