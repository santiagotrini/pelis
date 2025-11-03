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

-- INSERT TEST DATA

INSERT INTO movies VALUES
  (1,'Superman',2025,129,'James Gunn','Accion','El multimillonario tecnológico Lex Luthor aprovecha la oportunidad para quitarse de en medio definitivamente al Hombre de Acero. ¿Podrán la reportera Lois Lane y el compañero de cuatro patas de Superman, Krypto, ayudarle antes de que sea tarde?','David Corenswet, Rachel Brosnahan','http://localhost:3000/images/superman.webp'),
  (2,'E.T.',1982,120,'Steven Spielberg','Ciencia ficcion','Elliott es un niño de nueve años que se encuentra con un extraterrestre y decide esconderlo en su casa para protegerlo. Contará con la ayuda de su pequeña hermana y su hermano mayor para mantener el secreto y juntos vivirán una aventura inolvidable.','Henry Thomas','http://localhost:3000/images/et.jpg'),
  (3,'RRR',2022,120,'S. S. Rajamouli','Accion','La historia de dos revolucionarios legendarios que luchan contra los colonizadores británicos en la década de 1920.','Ram Charan','http://localhost:3000/images/rrr.jpg');
