<?php
//authors: Markus Konkol

	include 'db_connect.php';
		$dbconn = getConnection();
	
		$issue = htmlentities(pg_escape_string($_POST['Issue']));
		$title = htmlentities(pg_escape_string($_POST['Title']));
		$description = htmlentities(pg_escape_string($_POST['Description']));
		$category = htmlentities(pg_escape_string($_POST['Category']));
		$person_contact = htmlentities(pg_escape_string($_POST['PersonContact']));
		$feature = pg_escape_string($_POST['Geometry']);
		$person_name = htmlentities(pg_escape_string($_POST['Name']));
		$people_attending = htmlentities(pg_escape_string($_POST['PeopleAttending']));
		$people_need = htmlentities(pg_escape_string($_POST['PeopleNeeded']));
		$tags = htmlentities(pg_escape_string($_POST['Tags']));
		$creationDate = htmlentities(pg_escape_string($_POST['CreationDate']));
		$hulluser_id = htmlentities(pg_escape_string($_POST['Hulluser_id']));
		$dataType = htmlentities(pg_escape_string($_POST['FileType']));

		$feature;
		$coords;
		$geometry;

		$data_send = array(	
			'issue' => $issue,
			'title' => $title,
			'description' => $description,
			'category' => $category,
			'person_contact' => $person_contact,
			'feature' => $feature,
			'person_name' => $person_name,
			'person_attending' => $people_attending,
			'people_need' => $people_need,
			'tags' => $tags,
			'creationDate' => $creationDate,	
			'hulluser_id' => $hulluser_id,	
		);

		if ($feature != ''){
			$feature = json_decode($feature);
			$coords = $feature->geometry->coordinates;
			$geometry = $feature->geometry->type;		}

		function buildCoords($coordinates, $type){
			$coordString = '';
			if ( $type == 'Point' ){
				$coordString = $coordString.'ST_SetSRID(ST_MakePoint('.$coordinates[0].', '.$coordinates[1] . ')';
			}
			else if ( $type == 'LineString' ){
				$coordString = $coordString. "ST_GeomFromText('LINESTRING(";
				for ( $i = 0; $i < count($coordinates); $i++ ){
					$coordString = $coordString . ''.$coordinates[$i][0].' '.$coordinates[$i][1].',';
				}
				$coordString = substr($coordString,0,strlen($coordString)-1);
				$coordString = $coordString . ")'";
			}	
			else{
				$coordString = $coordString."ST_SetSRID((ST_MakePolygon(ST_GeomFromText('LINESTRING(";
				for ( $i = 0; $i < count($coordinates); $i++ ){
					for ( $j = 0; $j < count($coordinates[$i]); $j++ ){
						$coordString = $coordString.$coordinates[$i][$j][0].' '.$coordinates[$i][$j][1].',';

					}
				}
				$coordString = substr($coordString,0,strlen($coordString)-1);
				$coordString = $coordString.")')))";
			}
			$coordString .= ', 4326)';
			return $coordString;
		}

		if ($feature != ''){
			$coordinates = buildCoords($coords, $geometry);
		}
		else{
			$geometry = "Point";
			$coordinates = "null";
		}
		
		$query=pg_query($dbconn,"Insert into message values (DEFAULT,'".$issue."','".$title."',".$coordinates.",TIMESTAMP '".$creationDate."',true,TIMESTAMP '".$creationDate."','".$description."',".$people_need.",".$people_attending.",'".$dataType."','".$category."','".$tags."','".$person_name."','".$person_contact."','delete?','".$hulluser_id."');");
		
		$query2=pg_query($dbconn,"Select max(message_id) from message where hulluser_id = '".$hulluser_id."';");	
	
		while ($line = pg_fetch_array($query2, null, PGSQL_ASSOC)) {
			foreach ($line as $col_value) {
				echo $col_value;
			}
		}
?>