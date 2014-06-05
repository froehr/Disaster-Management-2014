DROP TABLE comment;
DROP TABLE message;

CREATE TABLE message(
message_id SERIAL NOT NULL,
message_type TEXT NOT NULL,
title TEXT,
location GEOMETRY,
time_start TIMESTAMP NOT NULL,
relevant BOOLEAN NOT NULL,
date_of_change TIMESTAMP NOT NULL,
description TEXT NOT NULL,
people_needed INT,
people_attending INT,
file BYTEA,
category TEXT,
tags TEXT,
status TEXT,
person_name TEXT,
person_contact TEXT,
person_email TEXT,
PRIMARY KEY (message_id)
);

CREATE TABLE comment(
comment_id SERIAL NOT NULL,
message TEXT NOT NULL,
date_of_creation TIMESTAMP NOT NULL,
file BYTEA,
person_name TEXT,
message_id INT NOT NULL,
PRIMARY KEY (comment_id),
FOREIGN KEY (message_id) REFERENCES message
	ON DELETE CASCADE
	ON UPDATE CASCADE
);
