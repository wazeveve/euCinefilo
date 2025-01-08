const url = 'https://api.themoviedb.org/3/configuration';
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1YjlhNmJjYWQxMTliYjRlZTZhMGQwNTYyMzk4YjI2NCIsIm5iZiI6MTczNjI1NTgyMC4wMzIsInN1YiI6IjY3N2QyOTRjZDEwMmU3NzZmNTc0OTRhZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.NHyS29H9cbhzYjiFIwHItoxGJ6i8iW3_wIF084qY5Po'
  }
};

fetch(url, options)
  .then(res => res.json())
  .then(json => console.log(json))
  .catch(err => console.error(err));