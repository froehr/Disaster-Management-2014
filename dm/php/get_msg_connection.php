	
<?php
$db_connection = pg_connect("host=hostname port=5432 dbname=disaster_management user=user password=password")
	or die('Error in Connection');

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
				$queryString = 'SELECT * FROM message ;';
				
				$result = pg_query($db_connection, $queryString);
	 			while($row = pg_fetch_assoc($result)){
	 					
				   		$data[] = array('key' => $row);
					
					
				}
		}
	}
		 

	pg_close($db_connection);
    echo(json_encode($data));

  
?>





 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
