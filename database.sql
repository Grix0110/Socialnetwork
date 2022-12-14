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

SELECT users.id, first_name, last_name, accepted, image_url FROM users 
        JOIN friendships
        ON (accepted = true AND recipent_id = 235 AND users.id = friendships.sender_id)
        OR (accepted = true AND sender_id = 235 AND users.id = friendships.recipent_id)
        OR (accepted = false AND recipent_id = 235 AND users.id = friendships.sender_id);

CREATE TABLE chat_messages(
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users (id),
    message VARCHAR,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO chat_messages(user_id, message) VALUES (235, 'message number three is an assurance');