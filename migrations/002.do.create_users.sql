CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  user_name TEXT NOT NULL UNIQUE,
  full_name TEXT NOT NULL,
  password TEXT NOT NULL,
  email TEXT,
  contact TEXT,
  date_created TIMESTAMP NOT NULL DEFAULT now(),
  date_modified TIMESTAMP
);

ALTER TABLE instrument
  ADD COLUMN
    user_id INTEGER REFERENCES users(id)
    ON DELETE SET NULL;
