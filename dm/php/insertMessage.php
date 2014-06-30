<?php

include 'db_connect.php';
$dbconn = getConnection();
	
		$issue = $_POST['Issue'];
		$title = $_POST['Title'];
		$description =$_POST['Description'];
		$category = $_POST['Category'];
		$person_contact = $_POST['PersonContact'];
		$feature = $_POST['Geometry'];
		$person_name = $_POST['Name'];
		$people_attending = $_POST['PeopleAttending'];
		$people_need = $_POST['PeopleNeeded'];
		$tags = $_POST['Tags'];
		$creationDate = $_POST['CreationDate'];
		$hulluser_id = $_POST['Hulluser_id'];

		$feature;
		$coords;
		$geometry;

		$data_send = array(	
			"issue" => $issue,
			"title" => $title,
			"description" => $description,
			"category" => $category,
			"person_contact" => $person_contact,
			"feature" => $feature,
			"person_name" => $person_name,
			"person_attending" => $people_attending,
			"people_need" => $people_need,
			"tags" => $tags,
			"creationDate" => $creationDate,	
			"hulluser_id" => $hulluser_id,	
		);

	if ($feature != ""){
	$feature = json_decode($feature);
	$coords = $feature->geometry->coordinates;
	$geometry = $feature->geometry->type;
	}

	function buildCoords($coordinates, $type){
		$coordString = '';
		if ( $type == 'Point' ){
			$coordString = $coordString.'ST_SetSRID(ST_MakePoint('.$coordinates[0].', '.$coordinates[1];
		}
		else if ( $type == 'LineString' ){
			$coordString = $coordString. 'ST_SetSRID((ST_MakeLine(';
			for ( $i = 0; $i < count($coordinates); $i++ ){
				$coordString = $coordString . 'ST_MakePoint('.$coordinates[$i][0].' '.$coordinates[$i][1].'),';
			}
			$coordString = substr($coordString,0,strlen($coordString)-1);
		}	
		else{
			$coordString = $coordString."ST_SetSRID((ST_MakePolygon(ST_GeomFromText('LINESTRING(";
			for ( $i = 0; $i < count($coordinates); $i++ ){
				for ( $j = 0; $j < count($coordinates[$i]); $j++ ){
					$coordString = $coordString.$coordinates[$i][$j][0].' '.$coordinates[$i][$j][1].',';

				}
			}
			$coordString = substr($coordString,0,strlen($coordString)-1);
			$coordString = $coordString.")'))";
		}
		$coordString .= '), 4326)';
		return $coordString;
	}


	if ($feature != ""){
		$coordinates = buildCoords($coords, $geometry);
	}
	else{
		$geometry = "Point";
		$coordinates = "null";
	}
	$query=pg_query($dbconn,"Insert into message values (DEFAULT,'".$issue."','".$title."',".$coordinates.",TIMESTAMP '".$creationDate."',true,TIMESTAMP '".$creationDate."','".$description."',".$people_need.",".$people_attending.",'false','".$category."','','".$person_name."','".$person_contact."','delete?','".$hulluser_id."');");

	$query2=pg_query($dbconn,'Select max(message_id) from "message";');	
	while ($line = pg_fetch_array($query2, null, PGSQL_ASSOC)) {
		foreach ($line as $col_value) {
			echo $col_value;
		}
	}
	//Necessary?:
	//echo json_encode ($data_send);
	//REMEBER: Select ST_AsText(location) from message;

?>