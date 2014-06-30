			var coordinates="";
		map.on('draw:created', function (e) {
			var type = e.layerType,
				layer = e.layer;

			if (type === 'marker') {				
				coordinates = JSON.stringify(layer.toGeoJSON());
				//console.log(coordinates);
			}
			 
			else if (type === 'polyline') {
				coordinates = JSON.stringify(layer.toGeoJSON());
				//console.log(coordinates);
			}
			
			else if (type === 'polygon') {
				coordinates = JSON.stringify(layer.toGeoJSON());
				//console.log(coordinates);	
			}
			
			else if (type === 'rectangle') {
				coordinates = JSON.stringify(layer.toGeoJSON());
				//console.log(coordinates);
			}
			else{
				coordinates = "";
			}
		});

	
	var border;
	var cfield;
	
	function saveToDB(){
		d = new Date();
		
		$('#error-message').fadeOut();
		$('#' + cfield).css('border', border);
		
		var type = document.getElementById("issue").value;
		switch (type){
			case '':
				fieldError('type-buttons', 'You need to choose a message type.');
				break;
			case "need-support":
				return submitNeedSupport();
				break;
			case "offer-support":
				return submitOfferSupport();
				break;
			case "message":
				return submitMessage();
				break;
			default:
				break;
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
	
	function submitNeedSupport(){
		
		var issue = document.getElementById("issue").value;
		var title = document.getElementById("title").value;
		var description = document.getElementById("description").value;
		var category = document.getElementById("category").value;
		var contact = document.getElementById("person_contact").value;
		var geometry = coordinates;
		var name = document.getElementById("person_name").value;
		var peopleAttending = document.getElementById("people_attending").value;
		var peopleNeeded = document.getElementById("people_need").value;
		var tags = document.getElementById("tags").value;
		var creationDate = d.getFullYear() + "-" + (d.getMonth()+1) + "-" + d.getDate() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
		var hulluserProfile = getUserInfo();
		var hulluser_id = hulluserProfile.id;
		console.log("Your user id: "+hulluser_id);
		
		if (peopleAttending == "" && peopleAttending == ""){
			peopleAttending = 0;
			peopleNeeded = 0;
		}
		else{
		}
		
		if (isNaN(document.getElementById("people_attending").value) || isNaN(document.getElementById("people_attending").value)){
			fieldError('helpers', 'Helpers attending/needed is not a number.');
		}
		else if (document.getElementById("title").value == "" ) {
			fieldError('title', 'Title is stil empty.');
		}
		else if (document.getElementById("description").value == ""){
			fieldError('description', 'Description is still empty.');
		}
		else if (coordinates == ""){
			fieldError('draw-buttons', 'A feature on the map is missing.');
		}
		else if (document.getElementById("person_contact").value == ""){
			fieldError('person_contact', 'Contact information missing.');
		}
		else if ((document.getElementById("people_attending").value != "" && document.getElementById("people_need").value =="") || 
				(document.getElementById("people_need").value != "" && document.getElementById("people_attending").value == "")){
			fieldError('helpers', 'People attending or people needed missing.');
		}
		else{
			$.post(
				"php/insertMessage.php?",
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
				}	
				);
	
			$.post(
				"php/twitter.php?",
				{	
					Issue:issue,
					Title:title,
					Description:description,
					Category:category,
					PersonContact:contact				
				},
				function(data){
					console.log(data)
					}
				);
			
			return true;
		}
		return false;
	}
	
	function submitOfferSupport(){
	
		var issue = document.getElementById("issue").value;
		var title = document.getElementById("title").value;
		var description = document.getElementById("description").value;
		var category = document.getElementById("category").value;
		var contact = document.getElementById("person_contact").value;
		var geometry = coordinates;
		var name = document.getElementById("person_name").value;
		var peopleAttending = document.getElementById("people_attending").value;
		var peopleNeeded = document.getElementById("people_need").value;
		var tags = document.getElementById("tags").value;
		var creationDate = d.getFullYear() + "-" + (d.getMonth()+1) + "-" + d.getDate() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
		var hulluserProfile = getUserInfo();
		var hulluser_id = hulluserProfile.id;
		console.log("Your user id: "+hulluser_id);
		
		if (peopleAttending == "" && peopleAttending == ""){
			peopleAttending = 0;
			peopleNeeded = 0;
		}
		else{
		}
		
		if (isNaN(document.getElementById("people_attending").value) || isNaN(document.getElementById("people_attending").value)){
			fieldError('helpers', 'Helpers attending/needed is not a number.');
		}
		else if (document.getElementById("title").value == "" ) {
			fieldError('title', 'Title is stil empty.');
		}
		else if (document.getElementById("description").value == ""){
			fieldError('description', 'Description is still empty.');
		}
		else if (document.getElementById("person_contact").value == ""){
			fieldError('person_contact', 'Contact information missing.');
		}
		else if ((document.getElementById("people_attending").value != "" && document.getElementById("people_need").value =="") || 
				(document.getElementById("people_need").value != "" && document.getElementById("people_attending").value == "")){
			fieldError('helpers', 'People attending or people needed missing.');
		}
		else{
			$.post(
				"php/insertMessage.php?",
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
					}	
				);
			$.post(
				"php/twitter.php?",
				{	
					Issue:issue,
					Title:title,
					Description:description,
					Category:category,
					PersonContact:contact				
				},
				function(data){
					console.log(data)
					}
				);	
			return true;
		}	
		return false;
	}
	
	function submitMessage(){
	
		var issue = document.getElementById("issue").value;
		var title = document.getElementById("title").value;
		var description = document.getElementById("description").value;
		var category = document.getElementById("category").value;
		var contact = document.getElementById("person_contact").value;
		var geometry = coordinates;
		var name = document.getElementById("person_name").value;
		var peopleAttending = document.getElementById("people_attending").value;
		var peopleNeeded = document.getElementById("people_need").value;
		var tags = document.getElementById("tags").value;
		var creationDate = d.getFullYear() + "-" + (d.getMonth()+1) + "-" + d.getDate() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
		var hulluserProfile = getUserInfo();
		var hulluser_id = hulluserProfile.id;
		console.log("Your user id: "+hulluser_id);
		
		if (peopleAttending == "" && peopleAttending == ""){
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
		else if ((document.getElementById("people_attending").value != "" && document.getElementById("people_need").value =="") || 
				(document.getElementById("people_need").value != "" && document.getElementById("people_attending").value == "")){
			fieldError('helpers', 'People attending or people needed missing.');
		}
		else{
			$.post(
				"php/insertMessage.php?",
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
				}	
				);
			$.post(
				"php/twitter.php?",
				{	
					Issue:issue,
					Title:title,
					Description:description,
					Category:category,
					PersonContact:contact				
				},
				function(data){
					console.log(data)
				}
			);
				
			return true;
		}	
		return false;
	}

	
