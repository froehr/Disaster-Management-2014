	
<?php
	
//function to connect to database and return connection obj		
function getConnection()
		 {
		 	
			$db_connection = pg_connect("host=host port=5432 dbname=dbname user=user password=password")
			or die('Error in Connection');
  
  			return $db_connection;
		}
		 
			
//function to return al messages with associated comments
function getAllData() {
	
	$con = getConnection();
	$data = Array();
	
	if(!$con)
	{  die(json_encode(array("error" => "no connection to the server")));}
	
		//get all messages order by submition time, still editable 'extent'
		$queryString = 'SELECT "message_id", "message_type", "title", ST_AsText(location),"time_start","time_stop", "date_of_change", "date_of_creation", "description", "people_needed", "people_attending",
								"file","priority","category", "upvotes", "downvotes", "status", "person_name", "person_contact", "person_email" FROM message order by time_start Desc ;';
				
		$result = pg_query($con, $queryString);
		if(!$result)
		{ throw new Exception("no results found");}
	 	while($row = pg_fetch_assoc($result)){
	 					
			$data[] = array($row);	
			//get all comments 
			$queryString2 = 'SELECT * FROM comment where message_id='.$row['message_id'].' ;';
				
				$result2 = pg_query($con, $queryString2);
	 			while($row2 = pg_fetch_assoc($result2)){
	 					
			
				   		$data[]['new comment'] = array($row2);	
						
					
				}
	 }
	 
	 pg_close($con);
    echo(json_encode($data));
	
}



//function to filter the data--->create dynamic query string (concatenate all the filter values )
function getFilteredData() {
	
	$Type=$_POST['MessageType'];
	$SubCategory=$_POST['SubCategory'];
	$TimeStart=$_POST['TimeStart'];
	$TimeEnd=$_POST['TimeStart'];
	
	
	$con = getConnection();
	//clear array
	unset($varArray);

//check the values for filtir and added to one array
	if($Type)
	{	
		$varArray[]='message_type=\'' . $Type . '\'';
		
	}
	
	if($SubCategory)
	{
		
		$varArray[]='category=\'' . $SubCategory . '\'';
				
	}
	
	if($TimeStart & $TimeEnd)
	{
		//$varArray[]='time_start >= \'' . $TimeStart . '\' AND time_start <= \''. $TimeEnd .'\'';	
		$varArray[]='time_start BETWEEN \'' . $TimeStart . '\' AND \''. $TimeEnd .'\'';	
	}  
	
	if(!$con)
	{  die(json_encode(array("error" => "no connection to the server")));}
	
	
	$query = 'SELECT "message_id", "message_type", "title", ST_AsText(location),
								"time_start", "description", "people_needed", "people_attending",
								"category", "person_name", "person_contact",
								 "person_email" FROM message';

	if (!empty($varArray)) {
    	$query .= ' WHERE ' . implode(' AND ', $varArray) . ' order by time_start Desc ; ';
	
	echo($query);
	
		$result = pg_query($con, $query);
				if(!$result) 
				{
            // throw exception
            throw new Exception("no results found");
				}
	 			while($row = pg_fetch_assoc($result)){
	 					
				   		$data[] = array($row);	
			
				$queryString2 = 'SELECT * FROM comment where message_id='.$row['message_id'].' ;';
				
				$result2 = pg_query($con, $queryString2);
	 			while($row2 = pg_fetch_assoc($result2)){
	 					
			
				   		$data[]['new comment'] = array($row2);	
						
					
				}
				}
	pg_close($con);
    echo(json_encode($data));
	
	}
	else{
			
		return json_encode(array("error" => "No valid search parameter"));
		
		}
									
		}



//return all official message order by submition time
function getOfficial()
{
	
	$con = getConnection();
	if(!$con)
	{  die(json_encode(array("error" => "no connection to the server")));}
	
		$queryString = 'SELECT "message_id", "message_type", "title", ST_AsText(location),
								"time_start","time_stop", "date_of_change", "date_of_creation", "description", "people_needed", "people_attending",
								"file","priority","category", "upvotes", "downvotes", "status", "person_name", "person_contact", 
								"person_email" FROM message where isofficial=1 order by time_start Desc ;';
				
		$result = pg_query($con, $queryString);
	 	while($row = pg_fetch_assoc($result)){
	 					
			$data[] = array($row);	
			
			$queryString2 = 'SELECT * FROM comment where message_id='.$row['message_id'].' ;';
				
				$result2 = pg_query($con, $queryString2);
	 			while($row2 = pg_fetch_assoc($result2)){
	 					
			
				   		$data[]['new comment'] = array($row2);	
						
					
				}
	 }
	 
	pg_close($con);
    echo(json_encode($data));
	//return json_encode($data);
	
	
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
		
	 	while($row = pg_fetch_assoc($result)){
	 					
			$data[] = array($row);	
			
			$queryString2 = 'SELECT * FROM comment where message_id='.$row['message_id'].' ;';
				
				$result2 = pg_query($con, $queryString2);
	 			while($row2 = pg_fetch_assoc($result2)){
	 					
			
				   		$data[]['new comment'] = array($row2);	
						
					
				}
	 }
	 
	pg_close($con);
    echo(json_encode($data));
	//return json_encode($data);
	
	
}


//get messages that are within a distance X from Point p
function selectByDistance($Point,$distance)
{
	
	$con = getConnection();
	if(!$con)
	{  die(json_encode(array("error" => "no connection to the server")));}
	
	
	if($Point && $distance )
	{
	//remember to use ST_GeometryFromText
		$queryString = 'SELECT "message_id", "message_type", "title", ST_AsText(location),
								"time_start","time_stop", "date_of_change", "date_of_creation", "description", "people_needed", "people_attending",
								"file","priority","category", "upvotes", "downvotes", "status", "person_name", "person_contact", 
								"person_email" FROM message where ST_DWithin(location, '.$Point.','.$distance.') order by time_start Desc ;';
				
				
		$result = pg_query($con, $queryString);
		if(!$result) 
				{
           			 // throw exception
            		throw new Exception("no results found");
				}
		else{}
		
	 	while($row = pg_fetch_assoc($result)){
	 					
			$data[] = array($row);	
			
			$queryString2 = 'SELECT * FROM comment where message_id='.$row['message_id'].' ;';
				
				$result2 = pg_query($con, $queryString2);
	 			while($row2 = pg_fetch_assoc($result2)){
	 					
			
				   		$data[]['new comment'] = array($row2);	
						
					
				}
		} 
	 }
	 
	pg_close($con);
    echo(json_encode($data));
	return json_encode($data);
	
	
}

  
?>
