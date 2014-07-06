<?php
$id = $_POST["id"];
if (isset($_FILES['datei']))

{
     move_uploaded_file($_FILES['datei']['tmp_name'], 'upload/'.basename($_FILES['datei']['name'])');
}

//echo $id;
?>