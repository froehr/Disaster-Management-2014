
	function saveToDB(){

		$.post(
			"php/insertMessage.php?",
			{	
			Issue:document.getElementById("issue").value,
			Title:document.getElementById("title").value,
			Description:document.getElementById("description").value,
			Startdate:document.getElementById("startdate").value,
			Starttime:document.getElementById("starttime").value,
			Enddate:document.getElementById("enddate").value,
			Endtime:document.getElementById("endtime").value,
			Category:document.getElementById("category").value,
			PersonContact:document.getElementById("person_contact").value,
			Name:document.getElementById("person_name").value,
			PeopleAttending:document.getElementById("people_attending").value,
			PeopleNeeded:document.getElementById("people_need").value,
			Tags:document.getElementById("tags").value,
			},
			function(data){console.log(data);}	
			);		
}
	
	
