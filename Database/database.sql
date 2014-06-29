DROP TABLE comment;
DROP TABLE message;

CREATE TABLE message
(
message_id serial NOT NULL,
message_type text NOT NULL,
title text,
location geometry(Geometry,4326),
time_start timestamp without time zone NOT NULL,
relevant boolean NOT NULL,
date_of_change timestamp without time zone NOT NULL,
description text NOT NULL,
people_needed integer,
people_attending integer,
file bytea,
category text,
tags text,
person_name text,
person_contact text,
person_email text,
hulluser_id text,
CONSTRAINT message_pkey PRIMARY KEY (message_id)
);

CREATE TABLE comment
(
comment_id SERIAL NOT NULL,
message_id INT NOT NULL,
date_of_creation TIMESTAMP NOT NULL,
message TEXT NOT NULL,
file BYTEA,
person_name TEXT,
PRIMARY KEY (comment_id),
FOREIGN KEY (message_id) REFERENCES message
	ON DELETE CASCADE
	ON UPDATE CASCADE
);
