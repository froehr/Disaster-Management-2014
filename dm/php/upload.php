<?php
//authors: Markus Konkol

	// see also http://code.tutsplus.com/tutorials/image-resizing-made-easy-with-php--net-10362
	include('resize-class.php');
	
	if (isset($_FILES['datei']))
	{
		 move_uploaded_file($_FILES['datei']['tmp_name'], 'upload/'.basename($_FILES['datei']['name']));
	}

	//$name -> basename($_FILES['datei']['name']);

	// *** 1) Initialize / load image
	$resizeObj = new resize('upload/'.basename($_FILES['datei']['name']));
	 
	// *** 2) Resize image (options: exact, portrait, landscape, auto, crop)
	$resizeObj -> resizeImage(150, 150, 'landscape');

	// *** 3) Save image
	$resizeObj -> saveImage('upload/thumb/'.basename($_FILES['datei']['name']), 100);

?>