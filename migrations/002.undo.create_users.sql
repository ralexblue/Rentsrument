ALTER TABLE instrument
  DROP COLUMN IF EXISTS user_id;

DROP TABLE IF EXISTS users;
