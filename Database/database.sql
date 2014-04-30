DROP TABLE comment;
DROP TABLE message;

CREATE TABLE message(
message_id INT NOT NULL,
message_type TEXT NOT NULL,
location GEOMETRY,
time_start TIMESTAMP NOT NULL,
time_stop TIMESTAMP NOT NULL,
date_of_change TIMESTAMP NOT NULL,
date_of_creation TIMESTAMP NOT NULL,
description TEXT NOT NULL,
people_needed INT,
people_attending INT,
file BYTEA,
priority INT NOT NULL,
help_category TEXT,
provide_category TEXT,
upvotes INT,
downvotes INT,
status TEXT,
person_name TEXT,
person_contact TEXT,
person_telefon TEXT,
person_email TEXT,
PRIMARY KEY (message_id)
);

CREATE TABLE comment(
comment_id INT NOT NULL,
message TEXT NOT NULL,
time TIMESTAMP NOT NULL,
file BYTEA,
message_id INT NOT NULL,
PRIMARY KEY (comment_id),
FOREIGN KEY (message_id) REFERENCES message
	ON DELETE CASCADE
	ON UPDATE CASCADE
);