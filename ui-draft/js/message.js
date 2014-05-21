function Location(lat, lon, zoom) {
	this.lat = lat;
	this.lon = lon;
	this.zoom = zoom;
}

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
					'emergency',
					new Location(37.246994, -121.840744, 12),
					'2014-04-17, 14:30',
					'2014-04-17, 14:30',
					'2014-04-17, 14:30',
					'2014-04-17, 14:30',
					'Dikebreak',
					'Students in Santa Clara Valley and Gunlock are being held at school after hours due to dikebreak.',
					0,
					0,
					'message-image-example-0.jpg',
					0,
					'Flood',
					312,
					221,
					'Peter Miller',
					'',
					'',
					'',
					false,
					'flood,dikebreak,school', [
						new Comment(0,
									'Peter Miller',
									'Thanks for the information. It was very useful.',
									'2014-04-17, 14:35',
									''),
						new Comment(1,
									'Susan Smith',
									'Warning! This information is wrong.',
									'2014-04-17, 14:37',
									'')
					]
		),
		new Message(1,
					'message',
					new Location(37.253192, -121.966156, 16),
					'2014-04-17, 14:26',
					'2014-04-17, 14:26',
					'2014-04-17, 14:26',
					'2014-04-17, 14:26',
					'Fire Alarm Recall',
					'The U.S. Consumer Product Safety Commission (CPSC) in cooperation with Walter Kidde Portable Equipment Inc., of Mebane, N.C. has issued a voluntary recall of about 94,000 Dual Sensor Smoke Alarms.',
					0,
					0,
					'message-image-example-1.jpg',
					0,
					'Fire',
					0,
					0,
					'Gunther',
					'',
					'',
					'',
					false,
					'smoke,fire,alarm', [
					]
		)/*,
		new Message(2,
					'need-support',
					new Location(37.253192, -121.966156, 16),
					'2014-04-17, 14:26',
					'2014-04-17, 14:26',
					'2014-04-17, 14:26',
					'2014-04-17, 14:26',
					'Test',
					'Test',
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
		)*/
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
			comments_html += '<div class="comment"><table border="0"><tr><td><b>' + message['comments'][i]['name'] + '</b></td><td class="right">' + message['comments'][i]['date_time'] + '</td></tr><tr><td colspan="2" class="justify">' + message['comments'][i]['message'] + '</td></tr></table></div>';
		}
		
		var location_name_html = 'Location';
		
		var file_html = '<div class="image-box"><img src="img/' + message['file'] + '" alt="' + message['title'] + '" class="image" /></div>';
		
		$('#messages').append('<div class="message message-' + message['message_type'] + '" id="message-' + message['message_id'] + '">' +
			'<h1 class="' + message['message_type'] + '-head">' + message['title'] + '</h1>' +
			'<div class="time">' + message['date_of_change'] + '</div>' +
				'<p>' + message['description'] + ' <a href="#" id="more-' + message['message_id'] + '">more <span class="arrow">&#9658;</span></a></p>' +
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
					'<div class="less" id="less-' + message['message_id'] + '">' +
						'<a href="#"><span>&#9668;</span> less</a>' +
					'</div>' +
				'</div>' +
				'<div class="category">Category: ' + message['category'] + '</div>' +
				'<div class="location-voting">' +
					'<div class="downvote-number">' + message['downvotes'] + '</div>' +
					'<div class="upvote"><a href="#" id="upvote-' + message['message_id'] + '">&#9650;</a></div>' +
					location_name_html +
				'</div>' +
				'<div class="downvote"><a href="#" id="downvote-' + message['message_id'] + '">&#9660;</a></div>' +
				'<div class="upvote-number">' + message['upvotes'] + '</div>' +
			'</div>');
	}
	
	// Toggler to expand or collapse messages
	function setMessageClickFunctions(message) {
		function switchMessageDetails(message_id) {
			if ( ! message['display'] ) {
				setElementDisplay('more-' + message_id, 'none');
				setElementDisplay('less-' + message_id, 'block');
				$('#details-' + message_id).slideDown('fast', 'linear');
				message['display'] = true;
				
				for ( var i = 0; i < messages.length; i++ ) {
					if ( messages[i]['message_id'] != message_id && messages[i]['display'] ) {
						setElementDisplay('more-' + messages[i]['message_id'], 'inline');
						setElementDisplay('less-' + messages[i]['message_id'], 'none');
						$('#details-' + messages[i]['message_id']).slideUp('fast', 'linear');
						messages[i]['display'] = false;
					}
				}
			}
			else {
				setElementDisplay('more-' + message_id, 'inline');
				setElementDisplay('less-' + message_id, 'none');
				$('#details-' + message_id).slideUp('fast', 'linear');
				message['display'] = false;
			}
		}
		
		// center the map on the message location
		$('#message-' + message['message_id']).click(function() {
			map.setView(new L.LatLng(message['location']['lat'], message['location']['lon']), message['location']['zoom']);
			switchMessageDetails(message['message_id']);
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
	}

	for ( var i = 0; i < messages.length; i++ ) {
		showMessage(messages[i]);
		setMessageClickFunctions(messages[i]);
	}
}

showMessages();