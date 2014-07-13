<?php
	

	$bboxString = pg_escape_string($_POST["bboxString"]);
	$bboxArray = explode(",", $bboxString);
	
	include 'db_connect.php';

		$con = getConnection();
		$data = Array();
	
		if(!$con)
			{die(json_encode(array("error" => "no connection to the server")));}
			
		$queryString = "SELECT * ,ST_AsGeoJSON(location) AS geojson FROM message 
			WHERE 
			ST_Within(message.location, ST_SetSRID(ST_MakeBox2D(ST_Point(".$bboxArray[0].",".$bboxArray[1]."),ST_Point(".$bboxArray[2].",".$bboxArray[3].")),4326))
			OR
			ST_Intersects(message.location, ST_SetSRID(ST_MakeBox2D(ST_Point(".$bboxArray[0].",".$bboxArray[1]."),ST_Point(".$bboxArray[2].",".$bboxArray[3].")),4326)) ORDER BY time_start DESC;";
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