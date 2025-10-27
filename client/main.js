const url = 'http://localhost:3000/api/';

fetch(url+'movies')
  .then(res => res.json())
  .then(movies => {
    const container = document.querySelector('.container');
    for (let movie of movies) {
      let card = createMovieCard(movie);
      container.append(card);
    }
  })
  .catch(err => console.error(err));

function createMovieCard(movie) {
  const { id, name, movie_poster } = movie;
  let card = document.createElement('div');
  let poster = document.createElement('img');
  let title = document.createElement('h3');
  let btn = document.createElement('button');
  title.textContent = name;
  poster.src = movie_poster;
  btn.textContent = 'Dejar reseña';
  btn.onclick = () => prompt('Dame tu reseña');
  card.append(title,poster,btn);
  card.classList.add('movie-card');
  return card;
}