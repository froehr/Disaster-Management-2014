function Comment(comment_id, name, message, date_time, file) {
	this.comment_id = comment_id;
	this.name = name;
	this.message = message;
	this.date_time = date_time;
	this.file = file;
}

// Database/geoJson Structure
function Message(message_id, message_type, title, location, time_start, relevant, date_of_change, description, people_need, people_attending, file, category, tags, person_name, person_contact, person_email, hulluser_id, comments) {
	this.message_id = message_id;
	this.message_type = message_type;
	this.title = title;
	this.location = location;
	this.time_start = time_start;
	this.relevant = relevant;
	this.date_of_change = date_of_change;
	this.description = description;
	this.people_need = people_need;
	this.people_attending = people_attending;
	this.file = file;
	this.category = category;
	this.tags = tags;
	this.person_name = person_name;
	this.person_contact = person_contact;
	this.person_email = person_email;
	this.hulluser_id = hulluser_id;
	
	this.comments = comments;
}
var layerGroup = L.layerGroup();
function showMessages() {
			
	/*
		Function to appent messages to the messageboard and draw features to the map
		@param {object} message: the message to appent to the message boart
		@param {boolean} refreshMessages: true if the messageboard have to be refreshed
		@param {boolean} redrawMapFeatures: ture if the features on the map have to be redrawn
	*/
	function showMessage(message, refreshMessages, redrawMapFeatures) {
		var logged_in = getUserInfo();
		var not_logged_in = ((logged_in == null) || (logged_in ==false));
		if (refreshMessages && message['relevant']) {
			var tags_html = '';
			var tags = message['tags'].split(',');
			for ( var i = 0; i < tags.length; i++ ) {
				tags_html += '<a href="#">' + tags[i] + '</a>, ';
			}
			tags_html = tags_html.substring(0, tags_html.length - 2);
			
			var edit_remove_html = '';
			if ( not_logged_in == false ) {
				edit_remove_html = '<div id="remove-' + message['message_id'] + '" class="message-button"><img src="img/icons/remove.png" /><div> Remove</div></div><div id="edit-' + message['message_id'] + '" class="message-button"><img src="img/icons/edit.png" /><div> Edit</div></div>';
			}
			
			var file_html = '';
			if ( message['file'] != '' ) {
				file_html = '<div class="image-box"><img src="img/' + message['file'] + '" alt="' + message['title'] + '" class="image" /></div>';
			}
			
			$('#messages').append(
				'<div class="message message-' + message['message_type'] + '" id="message-' + message['message_id'] + '">' +
					'<h1 class="' + message['message_type'] + '-head" id="head-' + message['message_id'] + '">' + message['title'] + '</h1>' +
					'<p id="description-' + message['message_id'] + '">' + message['description'] + '<br /><a href="#" id="more-' + message['message_id'] + '">Comments and more <span class="arrow">&#9658;</span></a></p>' +
					'<div class="details" id="details-' + message['message_id'] + '">' +
						'<div id="report-' + message['message_id'] + '" class="message-button"><img src="img/icons/report.png" /><div> Report</div></div>' +
						edit_remove_html +
						'<table border="0">' +
							'<tr>' +
								'<td class="first">Sender:</td>' +
								'<td>' + message['person_name'] + '</td>' +
							'</tr>' +
							'<tr>' +
								'<td class="first">Contact:</td>' +
								'<td>' + message['person_contact'] + '</td>' +
							'</tr>' +
							'<tr>' +
								'<td class="first">Helpers:</td>' +
								'<td>' + message['people_attending'] + ' attending, ' + message['people_need'] + ' needed</td>' +
							'</tr>' +
							'<tr>' +
								'<td class="first">Tags:</td>' +
								'<td>' + tags_html + '</td>' +
							'</tr>' +
						'</table>'
						+ file_html +
						'<div class="comments" id="comments-' + message['message_id'] + '">' +
						'<div class="less" id="less-' + message['message_id'] + '-top">' +
							'<a href="#"><span>&#9668;</span> less</a>' +
						'</div>' +
						'<div class="new-comment">' +
							'<p><b>New comment</b></p>' +
							'<textarea name="description" placeholder="Your comment" id="commentdescription"></textarea>' +
							'<div class="submit">' +
								'<input type="submit" value="Submit &nbsp; &#9658;" id="postcomment" onclick="postComment(' + message + ')"></div>' +
							'</div>' +
						'</div>' +
						'<div class="less" id="less-' + message['message_id'] + '-bottom">' +
							'<a href="#"><span>&#9668;</span> less</a>' +
						'</div>' +
					'</div>' +
					'<div class="category">Category: ' + message['category'] + '</div>' +
					'<div class="location-name">' + message['date_of_change'] + '</div>' +
				'</div>');
		}
		if (redrawMapFeatures) {
			if ( message['location'] != '' ) {
				var featureColor;
				switch(message['message_type']) {
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
						return new L.Marker([data.coordinates[1],data.coordinates[0]], {
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
							opacity: 1.0
						};
					},
					id: message['message_id'],
					onEachFeature: function (feature, layer) {
						var vOffset;
			
						if ( data.type == 'Point' ) {
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
							if ( ! messageBarStatus ) {
								$('#message-bar').animate({width: 'toggle'});
								$('#message-search').animate({width: 'toggle'});
								$('#hide-message-bar-container').animate({left: 301});
								$('#hide-message-bar').css('background-image', 	'url(img/icons/hide-message-bar.png)');
								document.getElementById('hide-message-bar').title = 'Hide message bar';
								$('.leaflet-left').animate({left: 310});
								messageBarStatus = true;
							}
						});
					},
					filter: function (feature, layer) {
						if (message['relevant'] == true) {
							return true;
						}
						
					}
				}).addTo(layerGroup);
				
			}
		}
		layerGroup.addTo(map);
		// end of function showMessage(message, refreshMessages, redrawMapFeatures)
	}
	
	function switchMessageDetails(message) {
		
		var message_id = message['message_id'];
				
		if ( ! message['display'] ) {
			getComments(message);
			setElementDisplay('more-' + message_id, 'none');
			setElementDisplay('less-' + message_id + '-top', 'block');
			setElementDisplay('less-' + message_id + '-bottom', 'block');
			$('#details-' + message_id).slideDown('slow', 'linear', function() {
				scrollToId('message-' + message['message_id']);
			});
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
			$('#details-' + message_id).slideUp('slow', 'linear', function() {
				scrollToId('message-' + message['message_id']);
			});
			message['display'] = false;
		}
	}
		
	// Toggler to expand or collapse messages
	function setMessageClickFunctions(message) {
		var popup = new L.popup({
			closeButton: false,
			className: 'feature-popup',
			offset: [0, -41]
		});
		
		// center the map on the message location
		$('#message-' + message['message_id']).click(function() {
			if ( typeof message['location-json'] != 'undefined' ) {
				var loc = message['location-json'].getBounds();
				if ( typeof loc._southWest != 'undefined' ) {
					map.fitBounds(loc);
					map.setView(loc.getCenter());
				
					var featureColor;
					switch(message['message_type']) {
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
					
					var popupContent = message['title'];
					popup.setContent('<span style="color: ' + featureColor + ';">' + popupContent + '</span>');
					popup.setLatLng(loc.getCenter());
					popup.openOn(map);
				}
			}
		});
		
		
		
		$('#remove-' + message['message_id']).click(function() {
			createRemovePopUp('message', message['message_id'], message);
		});
		
		$('#report-' + message['message_id']).click(function() {
			createReportPopUp('message', message['message_id']);
		});
		
		
		
		$('#description-' + message['message_id']).click(function() {
			switchMessageDetails(message);
		});
		
		$('#head-' + message['message_id']).click(function() {
			switchMessageDetails(message);
		});
		
		$('#edit-' + message['message_id']).click(function() {
			// TODO: EDIT MESSAGE
		});
		
		

	}


	function createReportPopUp(report, id) {
		var content = '<h1>Report ' + report + '</h1>' +
			'<p>Why do you want to report this ' + report + '?</p>' +
			'<input type="hidden" id="report-report" value="' + report + '" />' +
			'<input type="hidden" id="report-id" value="' + id + '" />' +
			'<p><label class="pointer"><input type="radio" name="report-reason" class="report-reason" value="wrong" checked="checked" /> Wrong information</label></p>' +
			'<p><label class="pointer"><input type="radio" name="report-reason" class="report-reason" value="spam" /> Spam or misleading</label></p>' +
			'<p><label class="pointer"><input type="radio" name="report-reason" class="report-reason" value="violent" /> Violent or repulsive</label></p>' +
			'<p><label class="pointer"><input type="radio" name="report-reason" class="report-reason" value="hateful" /> Hateful or abusive</label></p>' +
			'<p><label class="pointer"><input type="radio" name="report-reason" class="report-reason" value="sexual" /> Sexual content</label></p>' +
			'<p><label class="pointer"><input type="radio" name="report-reason" class="report-reason" value="other" /> Other</label></p>' +
			'<p class="right">' +
				'<a href="#" id="report-submit">Report it!</a> &nbsp; <a href="#" id="report-cancel">Cancel</a>' +
			'</p>';
		createPopUp(400, 225, content);
		
		$('#report-submit').click(function() {
			var report = $('#report-report').val();
			var id = $('#report-id').val();
			var reason = $('.report-reason:checked').val();
			// TODO: SUBMIT REPORT
			closePopUp();
		});
		
		$('#report-cancel').click(function() {
			closePopUp();
		});
	}

	function createRemovePopUp(remove, id, message) {
		var content = '<h1>Remove ' + remove + '</h1>' +
			'<p>Do you really want to remove this ' + remove + '?</p>' +
			'<p class="right">' +
				'<a href="#" id="remove-yes">Yes, remove it!</a> &nbsp; <a href="#" id="remove-no">No, cancel!</a>' +
			'</p>';
		createPopUp(230, 90, content);
		
		$('#remove-yes').click(function() {
			if ( remove == 'message' ) {
					// Delete message from database
					$.ajax({
						type: 'POST',
						url: 'php/deleteMessages.php',
						data: {
							message_id: id	
						},
						success: function(data){
							console.log("Successfully deleted");
						},
						error: function(xhr, textStatus, error){
							console.log(xhr.statusText);
							console.log(textStatus);
							console.log(error);
						}
					});
				
				if ( typeof message['location-json'] != 'undefined' ) map.removeLayer(message['location-json']);
				map.closePopup(popup);
				message['display'] = false;
				$('#message-' + id).remove();
			}
			else if ( remove == 'comment' ) {
				
				deleteComment(id, message);
				decreaseNumberOfComments(message['message_id'], 1);
				
				$('#comment-' + id).remove();
			}
			closePopUp();
		});
		
		$('#remove-no').click(function() {
			closePopUp();
		});
	}


	function createEditCommentPopUp(comment_id, old_content, message) {
		var content = '<h1>Edit Comment</h1>' +
			'<textarea name="description" id="commentdescription-' + comment_id + '">' + old_content +'</textarea>' +
			'<p class="right">' +
				'<a href="#" id="edit-comment-submit">Save changes!</a> &nbsp; <a href="#" id="edit-comment-cancel">Cancel</a>' +
			'</p>' +
			'<p id="edit-comment-empty-' + comment_id + '"></p>';
		createPopUp(250, 125, content);
		
		$('#edit-comment-submit').click(function() {
			var content = $('#commentdescription-' + comment_id).val();
			if (content != '') {
				editComment(comment_id, content, message);
				closePopUp();
			}
			else {
				$('#edit-comment-empty-' + comment_id).text('Your comment must not be empty!');
			}	
		});
		
		$('#comment-edit-cancel').click(function() {
			closePopUp();
		});
	}

//post to hull with message_id as object
	function postComment (message) {
		var message_id = message['message_id'];
		var hull_id = getHullId(message_id);
		var content = $('#commentdescription-' + message['message_id']).val(); 
		Hull.api(hull_id + '/comments', 'post', {
			description: content
		}).then(function(comment) {
			  getComments(message);
		});
	}


	function deleteComment(comment_id, message) {
		Hull.api(comment_id, 'delete').then(function(response) {
			getComments(message);
		});
	}


	function editComment(comment_id, content, message) {
		
		Hull.api(comment_id, 'put', {
			description: content
		}).then(function(response) {
			getComments(message);
		});
	}


	function reportComment(comment_id, message) {
		
		//TODO
	}


	//get Comments from Hull.io
	function getComments(message) {
		
		var hull_id = getHullId(message.message_id);
		var url = "https://22dd92ac.hullapp.io/api/v1/" + hull_id + "/comments?order_by=created_at%20ASC";
		var logged_in = getUserInfo();
		var not_logged_in = ((logged_in == null) || (logged_in ==false));

		$.getJSON(url, function(data){
			message['comments'] = [];
			for ( var i = 0; i < data.length; i++ ) {
				message['comments'].push(new Comment(
					data[i].id,
					data[i].user,
					data[i].description,
					data[i].created_at,
					''));

			}					
			
			var comments_html = '<div class="less" id="less-' + message['message_id'] + '-top" style="display: block;">' +
								'<a href="#"><span>&#9668;</span> less</a>' +
							'</div>' +
							'<p><b>Comments (<span id="number-of-comments-' + message['message_id'] + '">' + message['comments'].length + '</span>)</p></b>';
			
			var comments_fields_html = '<div class="new-comment">' +
											'<p><b>New comment</b></p>' +
											//'<input type="text" name="name" placeholder="Your name" />' +
											'<textarea name="description" placeholder="Your comment" id="commentdescription-' + message['message_id'] +'"></textarea>' +
											'<div class="submit">' +
												'<input type="submit" value="Submit &nbsp; &#9658;" id="postcomment-' + message['message_id'] + '"/></div>' +
										'</div>';
			
			for ( var i = 0; i < message['comments'].length; i++ ) {
				
				var edit_remove_comment_html = '';
				if ( not_logged_in == false ) {
					edit_remove_comment_html = '<div id="remove-comment-' + message['comments'][i]['comment_id'] + '" class="message-button"><img src="img/icons/remove.png" /><div> Remove</div></div><div id="edit-comment-' + message['comments'][i]['comment_id'] + '" class="message-button"><img src="img/icons/edit.png" /><div> Edit</div></div><br />';					
										
				}

				comments_html += '<div class="comment" id="comment-' + message['comments'][i]['comment_id'] + '">' +
									'<table border="0">' +
										'<tr>' +
											'<td><b>' + message['comments'][i]['name']['name'] + '</b></td>' +
											'<td class="right">' + message['comments'][i]['date_time'] + '</td>' +
										'</tr>' +
										'<tr>' +
											'<td colspan="2" class="justify">' + message['comments'][i]['message'] + '</td>' +
										'</tr>' +
									'</table>' +
									'<div id="report-comment-' + message['comments'][i]['comment_id'] + '" class="message-button"><img src="img/icons/report.png" /><div> Report</div></div>' +
									edit_remove_comment_html +
								'</div>';
			}
			
			document.getElementById('comments-' + message['message_id']).innerHTML = comments_html + comments_fields_html;

			$.each(message['comments'], function(i, v) {
				var comment_id = v['comment_id'];
				$('#report-comment-' + comment_id).click(function() {
					createReportPopUp('comment', comment_id);
				});

				$('#remove-comment-' + comment_id).click(function() {
					createRemovePopUp('comment', comment_id, message);
				});

				$('#edit-comment-' + comment_id).click(function() {
					createEditCommentPopUp(comment_id, v['message'], message);
				});
			});

			$('#less-' + message['message_id'] + '-bottom').off('click');

			$('#myimage').off('click');
			
			$('#postcomment-' + message['message_id']).off('click');

			$('#less-' + message['message_id'] + '-top').click(function() {
				switchMessageDetails(message);
			});
		
			$('#less-' + message['message_id'] + '-bottom').click(function() {
				switchMessageDetails(message);
			});
			

			$('#postcomment-' + message['message_id']).click(function () {
				postComment(message);
			});
		});
	}

	for ( var i = 0; i < messages.length; i++ ) {
		showMessage(messages[i], true, true);
		setMessageClickFunctions(messages[i]);
	}
	
	/*
	File has to be done separately? At least while accessing file here ("messageFeatures.properties.file" instead of "") jquery gives me an error
	*/
	$.getJSON("php/getMessagesAsGeoJSON.php", function (data) {
		for (var i = 0, len = data.features.length; i < len; i++){
			var messageFeatures = data.features[i];
			var msg = new Message(messageFeatures.properties.message_id, messageFeatures.properties.message_type, messageFeatures.properties.title, JSON.stringify(messageFeatures.geometry), messageFeatures.properties.time_start, messageFeatures.properties.relevant, messageFeatures.properties.date_of_change, messageFeatures.properties.description, messageFeatures.properties.people_needed, messageFeatures.properties.people_attending, "", messageFeatures.properties.category, messageFeatures.properties.tags, messageFeatures.properties.person_name, messageFeatures.properties.person_contact, messageFeatures.properties.person_email, messageFeatures.properties.hulluser_id);
			showMessage(msg, true, true);
			setMessageClickFunctions(msg);
		}
		showMessagebyUrl();
	});
	function spatialFilter (){
		northEastBoundsLat = LlocationFilter._ne.lat;
		northEastBoundsLong = LlocationFilter._ne.lng;
		southWestBoundsLat = LlocationFilter._sw.lat;
		southWestBoundsLong = LlocationFilter._sw.lng;
		PointUp = new Array(LlocationFilter._ne.lat, LlocationFilter._ne.lng);
		PointDown = new Array(LlocationFilter._sw.lat, LlocationFilter._sw.lng);
		var bboxString = southWestBoundsLong + "," + southWestBoundsLat + "," + northEastBoundsLong + "," + northEastBoundsLat;
		//testGroup.clearLayers();
		$("#messages").empty();
		$.post( "php/getMessagesAsGeoJSONByExtend.php", 
			{ 
				bboxString: bboxString
			},
			function( data ) {
				for (var i = 0, len = data.features.length; i < len; i++) {
					var messageFeatures = data.features[i];
					var msg = new Message(messageFeatures.properties.message_id, messageFeatures.properties.message_type, messageFeatures.properties.title, JSON.stringify(messageFeatures.geometry), messageFeatures.properties.time_start, messageFeatures.properties.relevant, messageFeatures.properties.date_of_change, messageFeatures.properties.description, messageFeatures.properties.people_needed, messageFeatures.properties.people_attending, "", messageFeatures.properties.category, messageFeatures.properties.tags, messageFeatures.properties.person_name, messageFeatures.properties.person_contact, messageFeatures.properties.person_email, messageFeatures.properties.hulluser_id);
					showMessage(msg, true, false);
					setMessageClickFunctions(msg);
				}
			},
			"json"
		);
	}
	LlocationFilter.on("enabled", function (e) {
		spatialFilter();
	});

	LlocationFilter.on("change", function (e) {
		spatialFilter();
	});
	// messages.addData(data);
	// messages.addTo(map)
	
	//end of showmessages() function	
}

function decreaseNumberOfComments(id, amount) {
	var numberOfComments = parseInt($('#number-of-comments-' + id).html());
	console.log(id);
	numberOfComments -= amount;
	$('#number-of-comments-' + id).html(numberOfComments);
}
	
function increaseNumberOfComments(id, amount) {
	var numberOfComments = parseInt($('#number-of-comments-' + id).html());
	numberOfComments += amount;
	$('#number-of-comments-' + id).html(numberOfComments);

}

//Link messages to URLs: e.g.: host.com/?message=1
function showMessagebyUrl() {

	var host = window.location.host;
	var path = window.location.pathname;
	var url = host + path;

	if (url != host) {
		var message_id = getURLParameter('message');
		var message_element_id = '#head-' + message_id;

		//show message details & show on map
		$(message_element_id).trigger("click");
	}

	function getURLParameter(message) {
		return decodeURIComponent((new RegExp('[?|&]' + message + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null
	}
}

