CREATE TYPE typ AS ENUM ('Brass', 'Guitar', 'Keyboard', 'Misc', 'Percussion','Strings');
CREATE TABLE instrument (
    id SERIAL PRIMARY KEY,
    image TEXT,
    name TEXT NOT NULL,
    category typ NOT NULL, 
    description TEXT,
    date_created TIMESTAMP DEFAULT now()
);