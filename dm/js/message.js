function Comment(comment_id, name, message, date_time, file) {
	this.comment_id = comment_id;
	this.name = name;
	this.message = message;
	this.date_time = date_time;
	this.file = file;
}

function Message(message_id, message_type, location, time_start, time_stop, date_of_change, date_of_creation, title, description, people_need, people_attending, file, priority, category, upvotes, downvotes, person_name, person_contact, person_telephone, person_email, display, tags, comments) {
	this.message_id = message_id;
	this.message_type = message_type;
	this.location = location;
	this.time_start = time_start;
	this.time_stop = time_stop;
	this.date_of_change = date_of_change;
	this.date_of_creation = date_of_creation;
	this.title = title;
	this.description = description;
	this.people_need = people_need;
	this.people_attending = people_attending;
	this.file = file;
	this.priority = priority;
	this.category = category;
	this.upvotes = upvotes;
	this.downvotes = downvotes;
	this.person_name = person_name;
	this.person_contact = person_contact;
	this.person_telephone = person_telephone;
	this.person_email = person_email;
	this.display = display;
	this.tags = tags;
	this.comments = comments;
}

function showMessages() {
	var messages = [
		new Message(0,
					'emergency','{"type":"Feature","properties":{},"geometry":{"type":"Polygon","coordinates":[[[7.612946033477782,51.96501340456607],[7.61101484298706,51.9650001835794],[7.609212398529052,51.96584631886286],[7.608332633972168,51.96476220515285],[7.606294155120849,51.96379705746947],[7.608118057250977,51.9627261158533],[7.60876178741455,51.96164192667244],[7.610800266265869,51.9623691296285],[7.612645626068115,51.962276577180184],[7.612946033477782,51.96501340456607]]]}}',
					'2014-04-17, 14:30',
					'2014-04-17, 14:30',
					'2014-04-17, 14:30',
					'2014-04-17, 14:30',
					'Flood in the Schlossgarten!',
					'The botanical garden of M&uuml;nster is flooded, we need help!',
					0,
					0,
					'message-image-example-0.jpg',
					0,
					'Flood',
					312,
					22,
					'Peter Miller',
					'',
					'',
					'',
					false,
					'flood,garden,castle', [
						new Comment(0,
									'Peter Miller',
									'Thanks for the information. It was very useful.',
									'2014-04-17, 14:35',
									''),
						new Comment(1,
									'Trollmaster 17',
									'Warning! This information is wrong.',
									'2014-04-17, 14:37',
									'')
					]
		),
		new Message(1,
					'need-support',
					'{"type":"Feature","properties":{},"geometry":{"type":"Point","coordinates":[7.595736980438232,51.969376117172324]}}',
					'2014-04-17, 14:26',
					'2014-04-17, 14:26',
					'2014-04-17, 14:26',
					'2014-04-17, 14:26',
					'Need support here!',
					'Writing an exam at ifgi. Please help!',
					0,
					0,
					'',
					0,
					'',
					0,
					0,
					'',
					'',
					'',
					'',
					false,
					'', [
					]
		),
		new Message(2,
					'offer-support',
					'{"type":"Feature","properties":{},"geometry":{"type":"LineString","coordinates":[[7.592325210571289,51.9396351536736],[7.597517967224121,51.94222785874081],[7.601037025451661,51.9449262293592],[7.6032257080078125,51.94810057520779],[7.609748840332032,51.951063095302274],[7.61549949645996,51.95378738300075],[7.619490623474122,51.95540071806757],[7.619490623474122,51.95651150518884],[7.619748115539551,51.958415647657844],[7.618331909179687,51.959817256410304],[7.617473602294921,51.96137748630892],[7.617902755737305,51.96325497910861],[7.6204776763916025,51.963492965537746],[7.622108459472655,51.964154032322156],[7.623567581176758,51.96433912927462]]}}',
					'2014-04-17, 14:26',
					'2014-04-17, 14:26',
					'2014-04-17, 14:26',
					'2014-04-17, 14:26',
					'Here you get bananas!',
					'Marathon in M&uuml;nster, you get free bananas!',
					0,
					0,
					'',
					0,
					'',
					0,
					0,
					'',
					'',
					'',
					'',
					false,
					'', [
					]
		),
		new Message(3,
					'message',
					'',
					'2014-04-17, 14:26',
					'2014-04-17, 14:26',
					'2014-04-17, 14:26',
					'2014-04-17, 14:26',
					'Thank you',
					'Your platform is great!',
					0,
					0,
					'',
					0,
					'',
					0,
					0,
					'Gunther',
					'',
					'',
					'',
					false,
					'', [
					]
		)
	];
	
	// Function appends one message-div element to the messages div for the message of the parameter
	function showMessage(message) {
		var tags_html = '';
		var tags = message['tags'].split(',');
		for ( var i = 0; i < tags.length; i++ ) {
			tags_html += '<a href="#">' + tags[i] + '</a>, ';
		}
		tags_html = tags_html.substring(0, tags_html.length - 2);
		
		var comments_html = '';
		for ( var i = 0; i < message['comments'].length; i++ ) {
			comments_html += '<div class="comment">' +
									'<table border="0">' +
										'<tr>' +
											'<td><b>' + message['comments'][i]['name'] + '</b></td>' +
											'<td class="right">' + message['comments'][i]['date_time'] + '</td>' +
										'</tr>' +
										'<tr>' +
											'<td colspan="2" class="justify">' + message['comments'][i]['message'] + '</td>' +
										'</tr>' +
									'</table>' +
								'</div>';
		}
		
		var location_name_html = 'Location';
		
		var file_html = '';
		if ( message['file'] != '' ) {
			file_html = '<div class="image-box"><img src="img/' + message['file'] + '" alt="' + message['title'] + '" class="image" /></div>';
		}
		
		$('#messages').append(
			'<a name="message-' + message['message_id'] + '"></a>' +
			'<div class="message message-' + message['message_type'] + '" id="message-' + message['message_id'] + '">' +
				'<h1 class="' + message['message_type'] + '-head">' + message['title'] + '</h1>' +
				'<p>' + message['description'] + '<br /><a href="#" id="more-' + message['message_id'] + '">Comments and more <span class="arrow">&#9658;</span></a></p>' +
				'<div class="details" id="details-' + message['message_id'] + '">' +
					'<table border="0">' +
						'<tr>' +
							'<td class="first">Sender:</td>' +
							'<td>' + message['person_name'] + '</td>' +
						'</tr>' +
						'<tr>' +
							'<td class="first">Tags:</td>' +
							'<td>' + tags_html + '</td>' +
						'</tr>' +
					'</table>'
					+ file_html +
					'<div class="comments">' +
					'<div class="less" id="less-' + message['message_id'] + '-top">' +
						'<a href="#"><span>&#9668;</span> less</a>' +
					'</div>' +
					'<h1>Comments (' + message['comments'].length + ')</h1>'
					+ comments_html +
					'<div class="new-comment">' +
						'<p><b>New comment</b></p>' +
						'<input type="text" name="name" placeholder="Your name" />' +
						'<textarea name="description" placeholder="Your comment"></textarea>' +
						'<div class="submit">' +
							'<input type="submit" value="Submit &nbsp; &#9658;" /></div>' +
						'</div>' +
					'</div>' +
					'<div class="less" id="less-' + message['message_id'] + '-bottom">' +
						'<a href="#"><span>&#9668;</span> less</a>' +
					'</div>' +
				'</div>' +
				'<div class="category">Category: ' + message['category'] + '</div>' +
				'<div class="location-voting">' +
					'<div class="downvote-number">' + message['downvotes'] + '</div>' +
					'<div class="upvote"><a href="#" id="upvote-' + message['message_id'] + '">&#9650;</a></div>' +
				'</div>' +
				'<div class="location-name">' + message['date_of_change'] + ', ' + location_name_html + '</div>' +
				'<div class="downvote"><a href="#" id="downvote-' + message['message_id'] + '">&#9660;</a></div>' +
				'<div class="upvote-number">' + message['upvotes'] + '</div>' +
			'</div>');
		
		if ( message['location'] != '' ) {
			var featureColor;
			switch(message['message_type']) {
				case 'emergency':
					featureColor = '#A50026';
					break;
				case 'need-support':
					featureColor = '#eba259'
					break;
				case 'offer-support':
					featureColor = '#468f5c'
					break;
				case 'message':
					featureColor = '#45544a'
					break;
			}
			var iconUrl = 'img/marker/marker-icon-' + message['message_type'] + '.png';
			
			var data = jQuery.parseJSON(message['location']);
		
			message['location-json'] = L.geoJson(data, {
				pointToLayer: function (latlng) {                    
					return new L.Marker([data.geometry.coordinates[1],data.geometry.coordinates[0]], {
						icon:  new L.Icon({
							iconUrl: iconUrl,
							iconAnchor: [12,41],
							popupAnchor: [0, -42]
						})
					});
				},
				style: function (feature) {
					return {
						color: featureColor,
						opacity: 0.8
					};
				},
				onEachFeature: function (feature, layer) {
					var vOffset;
		
					if ( data.geometry.type == 'Point' ) {
						vOffset = -41;
					}
					else {
						vOffset = 0;
					}
					
					var popup = new L.popup({
						closeButton: false,
						className: 'feature-popup',
						offset: [0, vOffset]
					});
					
					layer.on('mouseover', function(evt) {
						var popupContent = message['title'];
						
						popup.setContent('<span style="color: ' + featureColor + ';">' + popupContent + '</span>');
						popup.setLatLng(evt.latlng);
						popup.openOn(map);
					});
					
					layer.on('mouseout', function(evt) {
						map.closePopup(popup);
					});
					
					layer.on('mousemove', function(evt) {
						popup.setLatLng(evt.latlng);
					});
					
					layer.on('click', function(evt) {
						switchMessageDetails(message);
						document.location.href = '#message-' + message['message_id'];
					});
				}
			}).addTo(map);
		}
	}
	
	function switchMessageDetails(message) {
		var message_id = message['message_id'];
		
		if ( ! message['display'] ) {
			setElementDisplay('more-' + message_id, 'none');
			setElementDisplay('less-' + message_id + '-top', 'block');
			setElementDisplay('less-' + message_id + '-bottom', 'block');
			$('#details-' + message_id).slideDown('fast', 'linear');
			message['display'] = true;
			
			for ( var i = 0; i < messages.length; i++ ) {
				if ( messages[i]['message_id'] != message_id && messages[i]['display'] ) {
					setElementDisplay('more-' + messages[i]['message_id'], 'inline');
					setElementDisplay('less-' + messages[i]['message_id'] + '-top', 'none');
					setElementDisplay('less-' + messages[i]['message_id'] + '-bottom', 'none');
					$('#details-' + messages[i]['message_id']).slideUp('fast', 'linear');
					messages[i]['display'] = false;
				}
			}
		}
		else {
			setElementDisplay('more-' + message_id, 'inline');
			setElementDisplay('less-' + message_id + '-top', 'none');
			setElementDisplay('less-' + message_id + '-bottom', 'none');
			$('#details-' + message_id).slideUp('fast', 'linear');
			message['display'] = false;
		}
	}
		
	// Toggler to expand or collapse messages
	function setMessageClickFunctions(message) {
		// center the map on the message location
		$('#message-' + message['message_id']).click(function() {
			var loc = message['location-json'].getBounds();
			map.fitBounds(loc);
			map.setView(loc.getCenter());
			
			var featureColor;
			switch(message['message_type']) {
				case 'emergency':
					featureColor = '#A50026';
					break;
				case 'need-support':
					featureColor = '#eba259'
					break;
				case 'offer-support':
					featureColor = '#468f5c'
					break;
				case 'message':
					featureColor = '#45544a'
					break;
			}
			
			var popup = new L.popup({
				closeButton: false,
				className: 'feature-popup',
				offset: [0, -41]
			});
			var popupContent = message['title'];
						
			popup.setContent('<span style="color: ' + featureColor + ';">' + popupContent + '</span>');
			popup.setLatLng(loc.getCenter());
			popup.openOn(map);
		});

		// animations for the up- and downvote buttons
		$('#downvote-' + message['message_id']).click(function() {
			document.getElementById('downvote-' + message['message_id']).style.color = '#A50026';
			document.getElementById('upvote-' + message['message_id']).style.color = '#959595';
		});

		$('#upvote-' + message['message_id']).click(function() {
			document.getElementById('upvote-' + message['message_id']).style.color = '#468f5c';
			document.getElementById('downvote-' + message['message_id']).style.color = '#959595';
		});
		
		$('#more-' + message['message_id']).click(function() {
			switchMessageDetails(message);
		});
		
		$('#less-' + message['message_id'] + '-top').click(function() {
			switchMessageDetails(message);
		});
		
		$('#less-' + message['message_id'] + '-bottom').click(function() {
			switchMessageDetails(message);
		});
	}

	for ( var i = 0; i < messages.length; i++ ) {
		showMessage(messages[i]);
		setMessageClickFunctions(messages[i]);
	}
}

showMessages();