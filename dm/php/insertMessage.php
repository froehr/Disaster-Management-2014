<?php
$dbconn = pg_connect("host=host port=5432 dbname=dbname user=user password=password")
    or die('Verbindungsaufbau fehlgeschlagen: ' . pg_last_error());
	
	$issue = $_POST['Issue'];
	$title = $_POST['Title'];
	$feature = $_POST['Geometry'];
	$description = $_POST['Description'];
	$startdate = $_POST['Startdate'];
	$enddate = $_POST['Enddate'];
	$creationDate = $_POST['CreationDate'];
	$category = $_POST['Category'];
	$person_contact = $_POST['PersonContact'];
	$person_name = $_POST['Name'];
	$people_attending = $_POST['PeopleAttending'];
	$people_need = $_POST['PeopleNeeded'];
	$tags = $_POST['Tags'];
	$priority = 10;
	$feature = json_decode($feature);
	$coords = $feature->geometry->coordinates;
	$geometry = $feature->geometry->type;
	
	function buildCoords($coordinates, $type){
		$coordString = '(';
		if ( $type == 'Point' ){
			$coordString = $coordString.$coordinates[0].' '.$coordinates[1];
		}
		if ( $type == 'LineString' ){
			for ( $i = 0; $i < count($coordinates); $i++ ){
				$coordString = $coordString.$coordinates[$i][0].' '.$coordinates[$i][1].',';
			}
			$coordString = substr($coordString,0,strlen($coordString)-1);
		}	
		else{
			$coordString = $coordString.'(';
			for ( $i = 0; $i < count($coordinates); $i++ ){
				for ( $j = 0; $j < count($coordinates[$i]); $j++ ){
					$coordString = $coordString.$coordinates[$i][$j][0].' '.$coordinates[$i][$j][1].',';
				}
			}
			$coordString = substr($coordString,0,strlen($coordString)-1);
			$coordString = $coordString.')';
		}
	
		$coordString = $coordString.')';
		return $coordString;
	}

	$coordinates = buildCoords($coords, $geometry);
	
	$query=pg_query($dbconn,"Insert into \"message\" values (DEFAULT,'".$issue."','".$title."','".$geometry.$coordinates."',TIMESTAMP '".$startdate."',TIMESTAMP '".$enddate."',TIMESTAMP '2001-09-28 01:00:00',TIMESTAMP '".$creationDate."','".$description."',".$people_need.",".$people_attending.",'',0,'".$category."',0,0,'Upcoming','".$person_name."','".$person_contact."','delete?');");
	
	//REMEBER: Select ST_AsText(location) from message;
	
?>
