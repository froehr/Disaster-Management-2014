<?php
// It reads the values from the last 24hours of a measurement station
// It reads a json formatted text file and outputs it.
// Passes the measurementStationName from map.js
$measurementStationName = $_GET["measurementStationName"];
// Decode URL for links with space
$id = urldecode($measurementStationName);
$id = str_replace(" ", "%20", $id);

$string = file_get_contents("http://www.pegelonline.wsv.de/webservices/rest-api/v2/stations/".$id."/W/measurements.json?start=P1D");
echo $string;

?>
