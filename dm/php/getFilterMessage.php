<?php
	
		include 'db_connect.php';
		
		$data = Array();
		$con = getConnection();
		//clear array
		unset($varArray);

		$messageType=$_POST['MessageType'];
		$subCategory=$_POST['SubCategory'];
		$timeStart=$_POST['TimeStart'];
		$timeEnd=$_POST['TimeEnd'];
		
		//check the values for filtir and added to one array
		if($messageType!=null or ""){	
			$varArray[]='message_type=\'' . $messageType . '\'';
		}
	
		if($subCategory!=null or ""){
			$varArray[]='category=\'' . $subCategory . '\'';		
		}
	
		if(($timeStart!=null or "")  && ($timeEnd!=null or "")){
			$varArray[]='time_start BETWEEN \'' . $timeStart . '\' AND \''. $timeEnd .'\'';	
		}  
	
		
		if(!$con)
		{  die(json_encode(array("error" => "no connection to the server")));}
		
		
		$query = 'SELECT *,ST_AsGeoJSON(location) AS geojson FROM message ';

		if (!empty($varArray))
		 {
    				$query .= ' WHERE ' . implode(' AND ', $varArray) . ' order by time_start Desc ; ';
					$result = pg_query($con, $query);
					$FeatureCollection = array();
					$FeatureCollection["type"] = "FeatureCollection";
					$FeatureCollection["features"] = array();
					
	 				while($row = pg_fetch_assoc($result))
	 				{
						
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
				else {
					// throw exception
            		return json_encode(array("error" => "No valid search parameter"));
					}
		
		
		
?>