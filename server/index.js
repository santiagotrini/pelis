// importamos librerias
const mysql = require('mysql');
const express = require('express');
const cors = require('cors');

const connection = mysql.createConnection({
  host: 'localhost',
  database: 'pelis'
});
// conectate a la base de datos
// connect admite una callback para ejecutar una vez conectado o cuando no se puede conectar
connection.connect(err => {
  if (err) throw err;
  console.log('Todo bien, estamos conectados a la DB');
}); 

const app = express();
app.use(cors()); // no me tires error de cors xfa
app.use(express.json()); // para parsear el JSON de los bodies

// lista de endpoints que necesitamos:
// POST /api/movies
// POST /api/reviews
// GET  /api/movies
// GET  /api/reviews/movie

// ver todas las peliculas
app.get('/api/movies', (req, res) => {
  // 1) hacemos la query
  connection.query('SELECT * FROM movies', (err, rs) => {
    // 2) respondemos con rs en formato json
    res.status(200).json(rs);
  });
});
// queremos ver las reseñas de una pelicula
app.get('/api/reviews/:movie', (req, res) => {
  const { movie } = req.params;
  connection.query('SELECT * FROM reviews WHERE movie = ?', [movie], (err, rs) => {
    res.status(200).json(rs);
  });
});
// crear una reseña
app.post('/api/reviews', (req, res) => {
  // pasos para crear un nuevo recurso (fila en la db)
  // 1) leer lo que viene en el body
  const { author, review_text, movie, rating } = req.body;
  // 2) meter esas variables en un array
  const data = [ author, review_text, movie, rating ];
  console.log(data);
  
  // 3) hacer la query a la base de datos (un INSERT)
  connection.query('INSERT INTO reviews VALUES (NULL,?,?,?,?)', data, (err, rs) => {
    // 4) cuando termine el INSERT, responderle algo al cliente
    // 201 CREATED es el codigo HTTP adecuado para esta respuesta
    res.status(201).json({ msg: 'Review inserted!' });
  });
});
// crear una pelicula
app.post('/api/movies', (req, res) => {
  // pasos para crear un nuevo recurso (fila en la db)
  // 1) leer lo que viene en el body
  const { name, director, release_year, duration, genre, synopsis, cast, movie_poster } = req.body;
  // 2) meter esas variables en un array
  const data = [ name, release_year, duration, director, genre, synopsis, cast, movie_poster ];
  // 3) hacer la query a la base de datos (un INSERT)
  connection.query('INSERT INTO movies VALUES (NULL,?,?,?,?,?,?,?,?)', data, (err, rs) => {
    // 4) cuando termine el INSERT, responderle algo al cliente
    // 201 CREATED es el codigo HTTP adecuado para esta respuesta
    res.status(201).json({ msg: 'Movie inserted!' });
  });
});

app.listen(3000, () => console.log('Server funcionando en puerto 3000'));
