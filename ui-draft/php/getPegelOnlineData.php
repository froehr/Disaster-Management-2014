<?php

// It reads the values from the last 24hours of a measurement station
// It reads a json formatted text file and outputs it.

$string = file_get_contents("http://www.pegelonline.wsv.de/webservices/rest-api/v2/stations/BONN/W/measurements.json?start=P1D");
echo $string;

?>
