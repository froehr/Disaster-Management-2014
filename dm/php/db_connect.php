<?php

function getConnection(){
    $db_connection = pg_connect("host=host port=5432 dbname=dbname user=user password=pw")
    or die('Verbindungsaufbau fehlgeschlagen: ' . pg_last_error());
    
    return $db_connection;
} 

?>
