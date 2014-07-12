<?php
	

		
	include 'db_connect.php';

	$message_type = $_POST['message_type'];
	$category = $_POST['category'];

	
		// create the 'WEHRE'-Query for the SQL Query
		/*if ($message_type != '') {
			$message_type = 'message_type ='. $message_type;
		}
		if ($category != '') {
			$category = 'category =' . $category;
		}*/
		if ($message_type == "'any'" and $category == "'any'") {
			$whereString = '';
		}
		elseif ($message_type == "'any'" and $category != "'any'") {
			$whereString = 'WHERE category =' . $category;
		}
		elseif ($message_type != "'any'" and $category == "'any'") {
			$whereString = 'WHERE message_type ='. $message_type;
		}
		else {
			$whereString = 'WHERE message_type ='. $message_type . ' AND category =' . $category;
		}

		$con = getConnection();
		$data = Array();
	
		if(!$con)
			{die(json_encode(array(error => 'no connection to the server')));}
			
		$queryString = 'SELECT * , ST_AsGeoJSON(location) AS geojson FROM message '
			. $whereString . '
			ORDER BY time_start DESC;';
		$result = pg_query($con, $queryString);
		
		$FeatureCollection = array();
		$FeatureCollection["type"] = "FeatureCollection";
		$FeatureCollection["features"] = array();
		
		
		while($row = pg_fetch_assoc($result)){
			$parsed_geojson = json_decode ($row["geojson"]);
			
			$feature["type"] = "Feature";
			$feature["geometry"] = $parsed_geojson;
			$feature["properties"] = array();
			$feature["properties"]["message_id"] = $row["message_id"];
			$feature["properties"]["message_type"] = $row["message_type"];
			$feature["properties"]["title"] = $row["title"];
			$feature["properties"]["time_start"] = $row["time_start"];
			$feature["properties"]["relevant"] = $row["relevant"] == 't' ? true : false;
			$feature["properties"]["date_of_change"] = $row["date_of_change"];
			$feature["properties"]["description"] = $row["description"];
			$feature["properties"]["people_needed"] = $row["people_needed"];
			$feature["properties"]["people_attending"] = $row["people_attending"];
			$feature["properties"]["file"] = $row["file"];
			$feature["properties"]["category"] = $row["category"];
			$feature["properties"]["tags"] = $row["tags"];
			$feature["properties"]["person_name"] = $row["person_name"];
			$feature["properties"]["person_contact"] = $row["person_contact"];
			$feature["properties"]["person_email"] = $row["person_email"];
			$feature["properties"]["hulluser_id"] = $row["hulluser_id"];
			$feature["properties"]["comments"] = "";
			
			$FeatureCollection["features"][] = $feature;
		}
		
		echo json_encode($FeatureCollection);
?>