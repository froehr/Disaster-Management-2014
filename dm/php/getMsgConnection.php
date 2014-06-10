	
<?php
	
//function to connect to database and return connection obj		
function getConnection()
		 {
		 	
			$db_connection = pg_connect("host=localhost port=5432 dbname=dbProject user=postgres password=pgadmin")

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
		$queryString = 'SELECT * FROM message order by time_start Desc ;';
				
		$result = pg_query($con, $queryString);
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


//function to filter the data--->create query string (concatenate all the filter values )
function getFilteredData() {
	
	$Parameters='';
	$con = getConnection();
	
	if($_POST['MessageType'] !=null or "")
	{
		$Type=$_POST['MessageType'];
		if($Parameters!='')
		{$Parameters=$Parameters.' '.'And';}
		else {
				$Parameters=' '.'message_type=\'' . $Type . '\'';
			}
		
	}
	
	if($_POST['SubCategory'] !=null or "")
	{
		$SubCategory=$_POST['SubCategory'];
		if($Parameters!='')
		{$Parameters=$Parameters.' '.'And';}
		else {
				$Parameters=' '.'category=\'' . $SubCategory . '\'';
			}
		
		
	}
	
	if($_POST['TimeStart'] !=null or "")
	{
		$TimeStamp=$_POST['TimeStart'];
		if($Parameters!='')
		{$Parameters=$Parameters.' '.'And';}
		else {
				$Parameters=' '.'time_start=\'' . $TimeStamp . '\'';
			}
		
		
	}
	
	if(!$con)
	{  die(json_encode(array("error" => "no connection to the server")));}
	
	if($Parameters!='' or null)
	{  return json_encode(array("error" => "No valid search parameter"));}
	else {
		
		$queryString = 'SELECT * FROM message WHERE  \'' . $Parameters . '\' order by time_start Desc;';
				
				$result = pg_query($con, $queryString);
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
		
	}
	
}
//return all official message order by submit time
function getOfficial()
{
	
	$con = getConnection();
	if(!$con)
	{  die(json_encode(array("error" => "no connection to the server")));}
	
		$queryString = 'SELECT * FROM message where isofficial=1 order by time_start Desc ;';
				
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
	return json_encode($data);
	
	
}

		
function helpShortage()
{
	
	$con = getConnection();
	if(!$con)
	{  die(json_encode(array("error" => "no connection to the server")));}
	
		$queryString = 'SELECT * FROM message where people_needed > people_attending order by time_start Desc ;';
				
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
	return json_encode($data);
	
	
}
  
?>
