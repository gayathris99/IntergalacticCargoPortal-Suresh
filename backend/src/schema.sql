CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  role TEXT NOT NULL
);

CREATE TABLE cargo (
  id SERIAL PRIMARY KEY,
  cargo_id TEXT NOT NULL,
  weight FLOAT NOT NULL,
  destination TEXT NOT NULL,
  date TEXT NOT NULL
);