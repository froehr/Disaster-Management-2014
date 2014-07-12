<?php
	include 'db_connect.php';
	$con = getConnection();
	
	$searchKeyStr = $_POST['KeySearch'];
	if ( ! $con ) {
		die(json_encode(array("error" => "no connection to the server")));
	}
	
	if ( $searchKeyStr != null or "" ) {	
		$searchKeyStr = str_replace(",", '|', $searchKeyStr);	
		$query = 'SELECT *, ST_AsGeoJSON(location) AS geojson FROM message WHERE UPPER(title) LIKE UPPER(\'%' . $searchKeyStr. '%\') OR UPPER(description) LIKE UPPER(\'%' . $searchKeyStr. '%\') OR UPPER(tags) SIMILAR TO UPPER(\'%' . $searchKeyStr .'%\')';
		$result = pg_query($con, $query);
		$FeatureCollection = array();
		$FeatureCollection["type"] = "FeatureCollection";
		$FeatureCollection["features"] = array();
		
		while ($row = pg_fetch_assoc($result)) {
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
		pg_close($con);
		
		echo json_encode($FeatureCollection);
	}
?>