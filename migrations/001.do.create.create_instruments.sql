CREATE TABLE instrument (
    id SERIAL PRIMARY KEY,
    image TEXT,
    name TEXT NOT NULL,
    description TEXT,
    date_created TIMESTAMP DEFAULT now() 
);