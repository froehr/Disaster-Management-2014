	
<?php
include 'db_connect.php';
$db_connection = getConnection();

//get the filter type and values or[arguments] for the query  ...will be edit later 'filters'
	//$filterValue = isset($_POST['filterValue']) ? $_POST['filterValue'] : null;
	//$filterType = isset($_POST['filterType']) ? $_POST['filterType'] : null;
	
	$filterValue = "*";
	$filterType = "getAllMessages";
	
	
	$data = Array();
	
	if($filterValue && $db_connection && $filterType){
			
		switch($filterType){
			case 'getAllMessages':	
				//$queryString = 'SELECT * FROM message WHERE message_type = \'' . $filterValue . '\';';
				$queryString = 'select "message_id", "message_type", "title", ST_AsText(location),
								"time_start","time_stop", "date_of_change", "date_of_creation", "description", "people_needed", "people_attending",
								"file","priority","category", "upvotes", "downvotes", "status", "person_name", "person_contact", "person_email"  from "message";';
				
				$result = pg_query($db_connection, $queryString);
	 			while($row = pg_fetch_assoc($result)){
				   		$data[] = array('key' => $row);
				}
		}
	}
		 
	pg_close($db_connection);
    echo(json_encode($data));

?>





 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
