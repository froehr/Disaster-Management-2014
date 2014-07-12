<?php

function getConnection(){
    $db_connection = pg_connect("")
    or die('Verbindungsaufbau fehlgeschlagen: ' . pg_last_error());
    
    return $db_connection;
} 

?>
