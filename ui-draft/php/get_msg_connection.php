	
<?php
$db_connection = pg_connect("host=giv-disastermanagement.uni-muenster.de port=5432 dbname=disaster_management user=postgres password=XKMSbJE9xd5f")

	//$db_connection = pg_connect("host=localhost port=5432 dbname=dbProject user=postgres password=pgadmin")
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





 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 /*
	

    if( !isset($_POST['functionname']) ) { $aResult['error'] = 'No function name!'; }

    if( !isset($_POST['arguments']) ) { $aResult['error'] = 'No function arguments!'; }

    if( !isset($aResult['error']) ) {

        switch($_POST['functionname']) {
            case 'readData':
               if( !is_array($_POST['arguments']) ) {
                   $aResult['error'] = 'Error in arguments!';
               }
               else {
                   	
					
					
                   $result = pg_query($db_connection, $_POST['arguments']);
				   while($row =pg_fetch_assoc($result)){
				   		echo $row['lastupdate'];
				   }
				   
		*/		   
				   
				   
				   
				   
				   
				   
			/*	   
               }
               break;

            default:
               $aResult['error'] = 'Not found function '.$_POST['functionname'].'!';
               break;
    */	