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

	
	function saveToDB(){
		d = new Date()

		var type = document.getElementById("issue").value;
		switch (type){
			case "emergency":
				submitEmergency();
				break;
			case "need-support":
				submitEmergency();
				break;
			case "offer-support":
				submitOfferSupport();
				break;
			case "message":
				submitMessage();
				break;
			default:
				break;
		}
	}	
	
	function submitEmergency(){
		
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
		
		if (peopleAttending == "" && peopleAttending == ""){
			peopleAttending = 0;
			peopleNeeded = 0;
		}
		else{
		}
		
		if (isNaN(document.getElementById("people_attending").value) || isNaN(document.getElementById("people_attending").value)){
			alert("Helpers attending/needed is not a number");
		}
		else if (document.getElementById("title").value == "" || document.getElementById("description").value == ""){
			alert("Title and description are still empty");
		}
		else if (coordinates == ""){
			alert("A Feature on the map is missing");
		}
		else if (document.getElementById("person_contact").value == ""){
			alert("Contact information missing");
		}
		else if ((document.getElementById("people_attending").value != "" && document.getElementById("people_need").value =="") || 
				(document.getElementById("people_need").value != "" && document.getElementById("people_attending").value == "")){
			alert("People attending or people needed missing");
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
				PeopleAttending:peopleAttending,
				PeopleNeeded:peopleNeeded,
				Tags:tags,
				CreationDate: creationDate
				},
				function(data){console.log(data);}	
				);
		}	
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
		
		if (peopleAttending == "" && peopleAttending == ""){
			peopleAttending = 0;
			peopleNeeded = 0;
		}
		else{
		}
		
		if (isNaN(document.getElementById("people_attending").value) || isNaN(document.getElementById("people_attending").value)){
			alert("Helpers attending/needed is not a number");
		}
		else if (document.getElementById("title").value == "" || document.getElementById("description").value == ""){
			alert("Title and description are still empty");
		}
		else if (document.getElementById("person_contact").value == ""){
			alert("Contact information missing");
		}
		else if ((document.getElementById("people_attending").value != "" && document.getElementById("people_need").value =="") || 
				(document.getElementById("people_need").value != "" && document.getElementById("people_attending").value == "")){
			alert("People attending or people needed missing");
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
				PeopleAttending:peopleAttending,
				PeopleNeeded:peopleNeeded,
				Tags:tags,
				CreationDate: creationDate
				},
				function(data){console.log(data);}	
				);
		}	
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
		
		if (peopleAttending == "" && peopleAttending == ""){
			peopleAttending = 0;
			peopleNeeded = 0;
		}
		else{
		}
		
		if (isNaN(peopleAttending) || isNaN(peopleNeeded)){
			alert("Helpers attending/needed is not a number");
		}
		else if (document.getElementById("title").value == "" || document.getElementById("description").value == ""){
			alert("Title and description are still empty");
		}
		else if ((document.getElementById("people_attending").value != "" && document.getElementById("people_need").value =="") || 
				(document.getElementById("people_need").value != "" && document.getElementById("people_attending").value == "")){
			alert("People attending or people needed missing");
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
				PeopleAttending:peopleAttending,
				PeopleNeeded:peopleNeeded,
				Tags:tags,
				CreationDate: creationDate
				},
				function(data){console.log(data);}	
				);
		}	
	}
	
	
	
