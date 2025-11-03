const url = 'http://localhost:3000/api/';

fetch(url+'movies')
  .then(res => res.json())
  .then(movies => {
    const container = document.querySelector('.container');
    for (let movie of movies) {
      fetch(url+'reviews/'+movie.id)
        .then(res => res.json())
        .then(reviews => {
          let sum = 0;
          for (let review of reviews) sum += review.rating;
          let rating = sum / reviews.length;
          if (reviews.length == 0) rating = 0; 
          let card = createMovieCard(movie,rating);
          container.append(card);
        });
    }
  })
  .catch(err => console.error(err));

function createMovieCard(movie,stars) {
  const { id, name, movie_poster } = movie;
  let card = document.createElement('div');
  let poster = document.createElement('img');
  let title = document.createElement('h3');
  let btn = document.createElement('button');
  let rating = document.createElement('h4');
  title.textContent = name;
  poster.src = movie_poster;
  btn.textContent = 'Dejar reseña';
  btn.onclick = createReview;
  btn.dataset.movieId = id;
  rating.textContent = `${stars}/5 ⭐`;
  card.append(title,poster,btn,rating);
  card.classList.add('movie-card');
  return card;
}

function createReview(e) {
  let id = e.target.dataset.movieId;
  let form = document.createElement('form');
  form.dataset.movieId = id;
  let author = document.createElement('input');
  let text = document.createElement('textarea');
  let rating = document.createElement('input');
  let submit = document.createElement('input');
  let div = document.createElement('div');
  form.classList.add('modal');
  div.classList.add('modal-content');
  author.type = 'text';
  rating.type = 'text';
  author.name = 'author';
  text.name = 'text';
  rating.name = 'rating';
  submit.type = 'submit';
  author.placeholder = 'Autor';
  text.placeholder = 'Tu reseña';
  text.cols = 21;
  text.rows = 10;
  rating.placeholder = 'Estrellas';
  submit.value = 'Enviar'
  div.append(author,text,rating,submit);
  form.append(div);
  form.onsubmit = handleSubmit;
  form.onclick = handleClick;
  document.body.prepend(form);

}

function handleClick(e) {
  if (e.target.classList.contains('modal'))
    e.target.style.display = 'none';
}

function handleSubmit(e) {
  e.preventDefault();
  console.log('hacer');
  let f = e.target;
  // leer los datos del form y mandar la reseña
  let formData = {
    author: f.author.value,
    review_text: f.text.value,
    movie: f.dataset.movieId,
    rating: +f.rating.value
  };
  const options = {
    method: 'POST',
    body: JSON.stringify(formData),
    headers: { 'Content-Type': 'application/json' }
  };
  fetch(url+'reviews', options);
  console.log(formData);
  f.style.display = 'none';
}