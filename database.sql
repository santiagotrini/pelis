DROP DATABASE IF EXISTS pelis;
CREATE DATABASE IF NOT EXISTS pelis;
USE pelis;

CREATE TABLE movies(
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  release_year YEAR,
  duration INT,
  director VARCHAR(255),
  genre VARCHAR(255),
  synopsis TEXT,
  cast TEXT,
  movie_poster VARCHAR(255) -- url de la imagen
);

CREATE TABLE reviews(
  id INT AUTO_INCREMENT PRIMARY KEY,
  author VARCHAR(255),
  review_text TEXT,
  movie INT,
  rating TINYINT, 
  FOREIGN KEY (movie) REFERENCES movies(id)
);

