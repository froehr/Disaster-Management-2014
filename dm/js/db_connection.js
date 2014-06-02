		var coordinates="";
		map.on('draw:created', function (e) {
			var type = e.layerType,
				layer = e.layer;

			if (type === 'marker') {				
				coordinates = JSON.stringify(layer.toGeoJSON());
				//var coord=coordinates.geometry.coordinates.toString();
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
			
			if (type === 'circle') {
				coordinates = JSON.stringify(layer.toGeoJSON());
				console.log(coordinates);
			}
		});

	
	function saveToDB(){

		$.post(
			"php/insertMessage.php?",
			{	
			Issue:document.getElementById("issue").value,
			Title:document.getElementById("title").value,
			Geometry: coordinates,
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
	
	
