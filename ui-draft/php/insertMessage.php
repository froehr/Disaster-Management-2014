<?php
$dbconn = pg_connect("host=giv-disastermanagement.uni-muenster.de port=5432 dbname=disaster_management user=postgres password=3rux4sNtZZkDV")
    or die('Verbindungsaufbau fehlgeschlagen: ' . pg_last_error());
	
	$issue = $_POST['Issue'];
	$title = $_POST['Title'];
	$description = $_POST['Description'];
	$startdate = $_POST['Startdate'];
	$starttime = $_POST['Starttime'];
	$enddate = $_POST['Enddate'];
	$endtime = $_POST['Endtime'];
	$category = $_POST['Category'];
	$person_contact = $_POST['PersonContact'];
	$person_name = $_POST['Name'];
	$people_attending = $_POST['PeopleAttending'];
	$people_need = $_POST['PeopleNeeded'];
	$tags = $_POST['Tags'];
	$priority = 10;
	echo $startdate;
	$query=pg_query($dbconn,"Insert into \"message\" values (DEFAULT,'".$issue."','".$title."','POINT(10 20)',TIMESTAMP '".$startdate."',TIMESTAMP '".$startdate."',TIMESTAMP '".$enddate."',TIMESTAMP '".$enddate."','".$description."',".$people_need.",".$people_attending.",'bla',".$priority.",'".$category."',0,0,'Upcoming','".$person_name."','".$person_contact."','delete?');");
	
	
	
?>
