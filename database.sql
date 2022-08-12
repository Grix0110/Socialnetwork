CREATE TABLE users (
    id SERIAL primary key,
    first_name VARCHAR(255) NOT NULL CHECK (first_name <> ''),
    last_name VARCHAR(255) NOT NULL CHECK (last_name <> ''),
    email VARCHAR UNIQUE NOT NULL CHECK (email <> ''),
    pword VARCHAR NOT NULL CHECK (pword <> '')
);

CREATE TABLE reset_codes(
    id SERIAL PRIMARY KEY,
    email VARCHAR NOT NULL,
    code VARCHAR NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE users ADD image_url VARCHAR;

ALTER TABLE users ADD bio VARCHAR;

ALTER TABLE users DROP pword;

ALTER TABLE users ADD pword VARCHAR NOT NULL CHECK (pword <> '');

CREATE TABLE friendships(
    id SERIAL PRIMARY KEY,
    sender_id INTEGER REFERENCES users (id),
    recipent_id INTEGER REFERENCES users (id),
    accepted BOOLEAN DEFAULT false 
);