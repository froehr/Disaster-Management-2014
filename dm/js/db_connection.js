		var coordinates="";
		map.on('draw:created', function (e) {
			var type = e.layerType,
				layer = e.layer;

			if (type === 'marker') {				
				coordinates = JSON.stringify(layer.toGeoJSON());
				//var coord=coordinates.geometry.coordinates.toString();
				console.log(coordinates);
			}
			 
			if (type === 'polyline') {
				coordinates = JSON.stringify(layer.toGeoJSON());
				console.log(coordinates);
			}
			
			if (type === 'polygon') {
				coordinates = JSON.stringify(layer.toGeoJSON());
				console.log(coordinates);	
			}
			
			if (type === 'rectangle') {
				coordinates = JSON.stringify(layer.toGeoJSON());
				console.log(coordinates);
			}
		});

	
	function saveToDB(){
		d = new Date()
		console.log(d.getMonth()+1);
		/*if (isNaN(document.getElementById("people_attending").value) || isNaN(document.getElementById("people_attending").value)){
			alert("People attending and people need is not a number");
		}*/
		else{
			$.post(
				"php/insertMessage.php?",
				{	
				Issue:document.getElementById("issue").value,
				Title:document.getElementById("title").value,
				Geometry: coordinates,
				Description:document.getElementById("description").value,
				Startdate:document.getElementById("startdate").value + " " + document.getElementById("starttime").value,
				Enddate:document.getElementById("enddate").value + " " + document.getElementById("endtime").value,
				CreationDate: d.getFullYear() + "-" + (d.getMonth()+1) + "-" + d.getDate() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds(),
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
}
	
	
