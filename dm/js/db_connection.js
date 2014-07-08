//authors: Markus Konkol, Daniel Schumacher

	//get last drawn feature and check the type of the feature
	var coordinates='';
	map.on('draw:created', function (e) {
		var type = e.layerType,
			layer = e.layer;

		if (type === 'marker') {				
			coordinates = JSON.stringify(layer.toGeoJSON());
		}
		 
		else if (type === 'polyline') {
			coordinates = JSON.stringify(layer.toGeoJSON());
		}
		
		else if (type === 'polygon') {
			coordinates = JSON.stringify(layer.toGeoJSON());	
		}
		
		else if (type === 'rectangle') {
			coordinates = JSON.stringify(layer.toGeoJSON());
		}
		else{
			coordinates = '';
		}
	});

	
	var border;
	var cfield;
	
	//check which type of message will be submitted and trigger particular function
	function saveToDB(){
		if ( isOnline() ) {
			d = new Date();
			
			$('#error-message').fadeOut();
			$('#' + cfield).css('border', border);
			
			var type = document.getElementById("issue").value;
			switch ( type ){
				case '':
					fieldError('type-buttons', 'You need to choose a message type.');
					break;
				case 'need-support':
					return submitNeedSupport();
					break;
				case 'offer-support':
					return submitOfferSupport();
					break;
				case 'message':
					return submitMessage();
					break;
				default:
					break;
			}
		}
	}
	
	function fieldError(field, message) {
		cfield = field;
		border = $('#' + field).css('border');
		$('#' + field).css('border', '2px solid #A50026');
		
		$('#error-message').html(message);
		var top = $('#' + field).position().top + 90;
		if ( top < 110 ) top = 110;
		$('#error-message').css('top', top + 'px');
		$('#error-message').width('auto');
		$('#error-message').fadeIn();
		
		$('#error-message').click(function () {
			$('#error-message').fadeOut();
			$('#' + field).css('border', border);
		});
	}
	
	//submit a need-support message
	function submitNeedSupport(){
	
		//get all values
		var issue = document.getElementById('issue').value;
		var title = document.getElementById('title').value;
		var description = document.getElementById('description').value;
		var category = document.getElementById('category').value;
		var contact = document.getElementById('person_contact').value;
		var geometry = coordinates;
		var name = document.getElementById('person_name').value;
		var peopleAttending = document.getElementById('people_attending').value;
		var peopleNeeded = document.getElementById('people_need').value;
		var tags = document.getElementById('tags').value;
		var creationDate = d.getFullYear() + '-' + (d.getMonth()+1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
		var hulluserProfile = getUserInfo();
		var hulluser_id;
		
		//check for wrong input and throw error-messages for the user
		if ( hulluserProfile != null ) {
			hulluser_id = hulluserProfile.id;
		}
		else {
			hulluser_id = 0;
		}
		
		if (peopleAttending == '' && peopleAttending == ''){
			peopleAttending = 0;
			peopleNeeded = 0;
		}
		else{
		}
		
		if ( isNaN(document.getElementById('people_attending').value) || isNaN(document.getElementById('people_attending').value) ){
			fieldError('helpers', 'Helpers attending/needed is not a number.');
		}
		else if ( document.getElementById('title').value == '' ) {
			fieldError('title', 'Title is stil empty.');
		}
		else if ( document.getElementById('description').value == '' ){
			fieldError('description', 'Description is still empty.');
		}
		else if ( coordinates == '' ){
			fieldError('draw-buttons', 'A feature on the map is missing.');
		}
		else if ( document.getElementById('person_contact').value == '' ){
			fieldError('person_contact', 'Contact information missing.');
		}
		else if ((document.getElementById('people_attending').value != '' && document.getElementById('people_need').value =='') || 
				(document.getElementById('people_need').value != '' && document.getElementById('people_attending').value == '')){
			fieldError('helpers', 'People attending or people needed missing.');
		}
		else{
			$.post(
				'php/insertMessage.php?',
				{	
					Issue:issue,
					Title:title,
					Description:description,
					Category:category,
					PersonContact:contact,
					Geometry: geometry,
					Name:name,
					Hulluser_id:hulluser_id,
					PeopleAttending:peopleAttending,
					PeopleNeeded:peopleNeeded,
					Tags:tags,
					CreationDate: creationDate
				},
				function(data){
					console.log(data);
					if ( document.getElementsByName('twitter')[0].checked ){
						twitterMessage(issue, title, data);
					}
					console.log
					uploadFile(data);
					}	
				);
			return true;
		}
		return false;
	}
	
	//submit an offer-support message
	function submitOfferSupport(){
		//get all values
		var issue = document.getElementById('issue').value;
		var title = document.getElementById('title').value;
		var description = document.getElementById('description').value;
		var category = document.getElementById('category').value;
		var contact = document.getElementById('person_contact').value;
		var geometry = coordinates;
		var name = document.getElementById('person_name').value;
		var peopleAttending = document.getElementById('people_attending').value;
		var peopleNeeded = document.getElementById('people_need').value;
		var tags = document.getElementById('tags').value;
		var creationDate = d.getFullYear() + '-' + (d.getMonth()+1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
		var hulluserProfile = getUserInfo();
		var hulluser_id = hulluserProfile.id;
		console.log('Your user id: ' + hulluser_id);
		
		//check for wrong input and throw error-messages for the user
		if (peopleAttending == '' && peopleAttending == ''){
			peopleAttending = 0;
			peopleNeeded = 0;
		}
		else{
		}
		
		if (isNaN(document.getElementById('people_attending').value) || isNaN(document.getElementById('people_attending').value)){
			fieldError('helpers', 'Helpers attending/needed is not a number.');
		}
		else if (document.getElementById('title').value == '' ) {
			fieldError('title', 'Title is stil empty.');
		}
		else if (document.getElementById('description').value == ''){
			fieldError('description', 'Description is still empty.');
		}
		else if (document.getElementById('person_contact').value == ''){
			fieldError('person_contact', 'Contact information missing.');
		}
		else if ((document.getElementById('people_attending').value != '' && document.getElementById('people_need').value == '') || 
				(document.getElementById('people_need').value != "" && document.getElementById('people_attending').value == '')){
			fieldError('helpers', 'People attending or people needed missing.');
		}
		else{
			$.post(
				'php/insertMessage.php?',
				{	
					Issue:issue,
					Title:title,
					Description:description,
					Category:category,
					PersonContact:contact,
					Geometry: geometry,
					Name:name,
					Hulluser_id:hulluser_id,
					PeopleAttending:peopleAttending,
					PeopleNeeded:peopleNeeded,
					Tags:tags,
					CreationDate: creationDate
				},
				function(data){
					console.log(data);
					if ( document.getElementsByName('twitter')[0].checked ){
						twitterMessage(issue, title, data);
					}					
					uploadFile(data);
					}	
				);
			return true;
		}	
		return false;
	}
	
	//submit a simple message 
	function submitMessage(){
		//get all values
		var issue = document.getElementById('issue').value;
		var title = document.getElementById('title').value;
		var description = document.getElementById('description').value;
		var category = document.getElementById('category').value;
		var contact = document.getElementById('person_contact').value;
		var geometry = coordinates;
		var name = document.getElementById('person_name').value;
		var peopleAttending = document.getElementById('people_attending').value;
		var peopleNeeded = document.getElementById('people_need').value;
		var tags = document.getElementById('tags').value;
		var creationDate = d.getFullYear() + '-' + (d.getMonth()+1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
		var hulluserProfile = getUserInfo();
		var hulluser_id = hulluserProfile.id;
		console.log('Your user id: ' + hulluser_id);
		
		//check for wrong input and throw error-messages for the user
		if (peopleAttending == '' && peopleAttending == ''){
			peopleAttending = 0;
			peopleNeeded = 0;
		}
		else{
		}
		
		if (isNaN(peopleAttending) || isNaN(peopleNeeded)){
			fieldError('helpers', 'Helpers attending/needed is not a number.');
		}
		else if (document.getElementById("title").value == "" ) {
			fieldError('title', 'Title is stil empty.');
		}
		else if (document.getElementById("description").value == ""){
			fieldError('description', 'Description is still empty.');
		}
		else if ((document.getElementById("people_attending").value != '' && document.getElementById('people_need').value =='') || 
				(document.getElementById('people_need').value != '' && document.getElementById('people_attending').value == '')){
			fieldError('helpers', 'People attending or people needed missing.');
		}
		else{
			$.post(
				'php/insertMessage.php',
				{	
					Issue:issue,
					Title:title,
					Description:description,
					Category:category,
					PersonContact:contact,
					Geometry: geometry,
					Name:name,
					Hulluser_id:hulluser_id,
					PeopleAttending:peopleAttending,
					PeopleNeeded:peopleNeeded,
					Tags:tags,
					CreationDate: creationDate
				},
				function(data){
					console.log(data);
					if ( document.getElementsByName('twitter')[0].checked ){
						twitterMessage(issue, title, data);
					}					
					uploadFile(data);
					}	
				);			
			return true;
		}	
		return false;
	}

	//sends  a submitted message to twitter including issue, title, and id for the URL
	function twitterMessage(issue, title, id){
			$.post(
				'php/twitter.php?',
				{	
					Issue:issue,
					Title:title,
					Id:id	
				},
				function(data){
					console.log(id)
				}
			);
	}
	
	//  saves file on server
	function uploadFile(name)
		{
			console.log(document.getElementById('fileA').value);
			
			//checks if file is given.
			if (document.getElementById('fileA').value != ''){
				var file = document.getElementById('fileA').files[0];
				var formData = new FormData();
				var client = new XMLHttpRequest();
					dataType = file.type.split('/');
				
				//Then checks if type is one of the allowed ones.
				if ( dataType[1] == 'png' || dataType[1] == 'PNG' || dataType[1] == 'jpg' || dataType[1] == 'JPG' || dataType[1] == 'jpeg' || dataType[1] == 'JPEG' ){

					if(!file)
						return;
				
					//build name
					dataType = file.type.split('/');
					name = name + "." + dataType[1];

					formData.append('datei', file, name);
					client.onerror = function(e) {
						alert('onError');
					};
					//Then sends it to the server-file upload.php
					client.open("POST", "php/upload.php?");
					client.send(formData);
				}
				else{
				}
			}	
		}
	