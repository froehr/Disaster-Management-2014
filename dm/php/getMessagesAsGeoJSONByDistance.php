<?php
	
	function getConnection()
		 {$db_connection = pg_connect("host=host port=5432 dbname=dbname user=user password=pw")
			or die('Verbindungsaufbau fehlgeschlagen: ' . pg_last_error());
  
  			return $db_connection;
		 } 
		 


		//get messages that are within a distance X from Point p
	
		$xCoordinate = $_POST["Coordinate"];
		$distance = $_POST["distance"];
		//$type = $_POST["type"];          //in case of other geometry not only point
		
		
		if($xCoordinate!='' & $distance!='')
		
		{
			$coordArray = explode(",", $xCoordinate);
			//$coordString=buildCoords($coordArray, $type);    //in case of other geometry not only point
			
			if($coordArray!='')
			{
				
				$con = getConnection();
		
				if(!$con)
				{  die(json_encode(array("error" => "no connection to the server")));}
				
					//use ST_MakePoint or ST_Point or ST_GeomFromText
					$queryString = "SELECT *, ST_AsGeoJSON(location) AS geojson FROM message
									where ST_Distance(ST_Transform(ST_GeomFromText('Point(".$coordArray[0]." ".$coordArray[1].")',4326),26986),ST_Transform(location,26986))
									 <=".$distance." order by time_start Desc ;" ;
					
				//or transform to 2163  less accurate.
					$result = pg_query($con, $queryString);
					if($result)
					{
						
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

						pg_close($con);
   						
						echo json_encode($FeatureCollection);
				
					}

				else
					{die(json_encode(array("error" => "no result found ")));}
				
			}
			else
			{
				{ throw new Exception("not valid coordinate");}
			}
		}
		
?>