<?php
	// Exclude insertMessage.php, because otherwise json could not be parsed
	//include('insertMessage.php');
	//connect to database and return connection obj		
       include 'db_connect.php';
	
	/*
    *	@Nourhan: Please check if this is needed anymore?!
	*/
	if($_POST["action"] == "GetAll")
  		{getAllData();}
	else if($_POST["action"] == "ByExtent") {
		$bboxString = pg_escape_string($_POST["bboxString"]);
		getMsgByExtent($bboxString);
	}
	
	
	// getAllData();		
	//function to return al messages with associated comments
	function getAllData() {
	
		$con = getConnection();
		$data = Array();
	
		if(!$con)
			{  die(json_encode(array("error" => "no connection to the server")));}
	
		//get all messages order by submission time, still editable 'extent'
		$queryString = 'SELECT "message_id", "message_type", "title", ST_AsText(location),"time_start", "relevant" ,"date_of_change",
						"description", "people_needed", "people_attending","file","category", "tags", "person_name", "person_contact",
						"person_email" FROM message order by time_start Desc ;';
				

		$result = pg_query($con, $queryString);
		
		if($result)
		{
			
	 		while($row = pg_fetch_assoc($result))
	 		{
	 					
				$data[] = $row;	
				//get all comments 
				$queryString2 = 'SELECT * FROM comment where message_id='.$row['message_id'].' ;';
				
				$result2 = pg_query($con, $queryString2);
	 			while($row2 = pg_fetch_assoc($result2))
	 			{
	 					$data[]['new comment'] = array($row2);	
						
				}
	    	}
	 
	 	pg_close($con);
		echo(json_encode($data));
     		return json_encode($data);
	 		
		}
		
		else
		{
			throw new Exception("no results found");
		}
	
}


	
	//function to filter the data--->create dynamic query string (concatenate all the filter values )
	function getFilteredData() 
	{
		
		$data = Array();
		$con = getConnection();
		//clear array
		unset($varArray);

		//check the values for filtir and added to one array
		if($_POST['MessageType']!=null or "")
		{	
			$varArray[]='message_type=\'' . $_POST['MessageType'] . '\'';
		
		}
	
		if($_POST['SubCategory']!=null or "")
		{
		
			$varArray[]='category=\'' . $_POST['SubCategory'] . '\'';
				
		}
	
		if(($_POST['TimeStart']!=null or "")  && ($_POST['TimeEnd']!=null or ""))
		{
		
			$varArray[]='time_start BETWEEN \'' . $_POST['TimeStart'] . '\' AND \''. $_POST['TimeEnd'] .'\'';	
		
		}  
	
		
		if(!$con)
		{  die(json_encode(array("error" => "no connection to the server")));}
		
		$query = 'SELECT "message_id", "message_type", "title", ST_AsText(location),"time_start", "relevant" ,"date_of_change",
						"description", "people_needed", "people_attending","file","category", "tags", "person_name", "person_contact",
						"person_email" FROM message';

		if (!empty($varArray))
		 {
    			$query .= ' WHERE ' . implode(' AND ', $varArray) . ' order by time_start Desc ; ';
	
				$result = pg_query($con, $query);
				if($result!=null)
				{
            		
	 				while($row = pg_fetch_assoc($result))
	 				{
	 					
				   		$data[] = array($row);	
			
						$queryString2 = 'SELECT * FROM comment where message_id='.$row['message_id'].' ;';
				
						$result2 = pg_query($con, $queryString2);
	 					while($row2 = pg_fetch_assoc($result2))
	 					{
	 					
			
				   				$data[]['new comment'] = array($row2);	
						
					
						}
					}
			
					pg_close($con);
					echo(json_encode($data));
    				return json_encode($data);
				}
				else
				{	// throw exception
            		throw new Exception("no results found");
				}
	
		}
		else
		{
			
			return json_encode(array("error" => "No valid search parameter"));
		
		}
									
	}



	//return all official message order by submition time
	function getOfficial()
	{
	
			$con = getConnection();
			if(!$con)
			{
				  die(json_encode(array("error" => "no connection to the server")));
			}
	
			else
			{
				$queryString = 'SELECT "message_id", "message_type", "title", ST_AsText(location),"time_start","time_stop", "date_of_change", "date_of_creation", "description", "people_needed", "people_attending",
								"file","priority","category", "upvotes", "downvotes", "status", "person_name", "person_contact", "person_email" FROM message where isofficial=1 order by time_start Desc ;';
				
				$result = pg_query($con, $queryString);
				if($result!=null)
				{
	 				while($row = pg_fetch_assoc($result))
	 				{
	 					
						$data[] = array($row);	
			
						$queryString2 = 'SELECT * FROM comment where message_id='.$row['message_id'].' ;';
				
						$result2 = pg_query($con, $queryString2);
	 					while($row2 = pg_fetch_assoc($result2))
	 					{
				   			$data[]['new comment'] = array($row2);	
						
						}
	 				}
	 
					pg_close($con);
    				//echo(json_encode($data));
					return json_encode($data);
				}
				else
				{// throw exception
            		throw new Exception("no results found");
				}
	
			}
	}

		
	function helpShortage()
	{
		$con = getConnection();
		if(!$con)
		{  die(json_encode(array("error" => "no connection to the server")));}
	
			$queryString = 'SELECT "message_id", "message_type", "title", ST_AsText(location),
								"time_start","time_stop", "date_of_change", "date_of_creation", "description", "people_needed", "people_attending",
								"file","priority","category", "upvotes", "downvotes", "status", "person_name", "person_contact", 
								"person_email" FROM message where people_needed > people_attending order by time_start Desc ;';
				
			$result = pg_query($con, $queryString);
			if($result)
			{
	 			while($row = pg_fetch_assoc($result))
	 			{
	 					
					$data[] = array($row);	
			
					$queryString2 = 'SELECT * FROM comment where message_id='.$row['message_id'].' ;';
				
					$result2 = pg_query($con, $queryString2);
	 				while($row2 = pg_fetch_assoc($result2))
	 				{
				   		$data[]['new comment'] = array($row2);	
					}
	 			}
	 
				pg_close($con);
    			//echo(json_encode($data));
				return json_encode($data);
			}
			else
				{// throw exception
            		throw new Exception("no results found");
				}
	
	
	}


	//get messages that are within a distance X from Point p
	function selectByDistance($xCoordinate,$type,$distance)
	{
		
		$data = Array();
		
		if($xCoordinate!='' & $type!='')
		{
			$coordString=buildCoords($xCoordinate, $type);
			
			if($coordString!='')
			{
					
				$coordString=$type.$coordString;
				
				$con = getConnection();
		
				if(!$con)
				{  die(json_encode(array("error" => "no connection to the server")));}
				
	
				else
				{
					//use ST_MakePoint or ST_Point or ST_GeomFromText
					$queryString = "SELECT message_id, message_type, title, ST_AsText(location),time_start, relevant ,date_of_change,
						description, people_needed, people_attending,file,category, tags, person_name, person_contact,
						person_email FROM message where ST_DWithin(location, ST_Centroid(ST_GeomFromText( '".$coordString."')), ".$distance.")  order by time_start Desc ;";
				
								
					$result = pg_query($con, $queryString);
					if($result)
					{
	 					while($row = pg_fetch_assoc($result))
	 					{
	 						
							$data[] = array($row);	
			
							$queryString2 ='SELECT * FROM comment where message_id='.$row['message_id'].' ;';
				
							$result2 = pg_query($con, $queryString2);
	 						while($row2 = pg_fetch_assoc($result2))
	 						{
	 					
			
				   				$data[]['new comment'] = array($row2);	
						
					
							}
	 					}

						pg_close($con);
   						//echo(json_encode($data));
						return json_encode($data);
				
					}

					else
					{die(json_encode(array("error" => "no result found ")));}
				}
			}
			else
			{
				{ throw new Exception("not valid coordinate");}
			}
		}
		
	}  
?>