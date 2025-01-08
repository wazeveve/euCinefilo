import axios from 'axios';

async function getMovies(page){
    const list = await axios({
        method: 'GET',
        url: `https://api.themoviedb.org/3/discover/movie?page=${page}`,
        params: {
            api_key: '79a0e1e8a093423c02eafe4270fbf8a7',
            language: 'pt-BR',
        }
    });
    return list.data.results;
}

async function getGenres(){
    const genres = await axios({
        method: 'GET',
        url: 'https://api.themoviedb.org/3/genre/movie/list',
        params: {
            api_key: '79a0e1e8a093423c02eafe4270fbf8a7',
            language: 'pt-BR',
        }
    });
    return genres.data.genres;
}

async function saveMovies(page){
    const list = await getMovies(page);
    const genres = await getGenres();
    list.forEach((movie) => {
        movie.genre_ids = movie.genre_ids.map((genreId) => {
            const genre = genres.find((g) => g.id === genreId);
            return genre ? genre.name : genreId; // Substitui pelo nome, ou mantém o ID caso não encontre
        });
    });
    list.forEach(async (movie) => {
        axios({
            method: 'POST',
            url: 'http://localhost:3000/filme',
            data: {
                id: movie.id,
                titulo: movie.title,
                sinopse: movie.overview,
                dataLancamento: movie.release_date,
                genero: movie.genre_ids.toString(),
                caminhoImagem: movie.poster_path
            }
        });
    });
}

async function getReview(idMovie){
    const list = await axios({
        method: 'GET',
        url: `https://api.themoviedb.org/3/movie/${idMovie}/reviews`,
        params: {
            api_key: '79a0e1e8a093423c02eafe4270fbf8a7',
            language: 'en-US',
        }
    });
    return list.data.results;
}

async function saveReviews(idMovie){
    const list = await getReview(idMovie);
    list.forEach(async (review) => {
        if(review.author_details.rating === null){
            review.author_details.rating = -1;
        }
        axios({
            method: 'POST',
            url: 'http://localhost:3000/avaliacao',
            data: {
                id: review.id,
                nomeUsuario: review.author_details.username,
                nota: review.author_details.rating,
                filmeId: idMovie,
                comentario: review.content,
                dataCriacao: review.created_at
            }
        });
    });
}

/*
for(let i = 1; i <= 500; i++){
    await saveMovies(i).catch(() => console.log('Erro ao salvar filmes da página ' + i));   
}
*/
const list = await axios.get('http://localhost:3000/filme');

list.data.forEach(async (movie) => {
    await saveReviews(movie.id).catch(() => console.log('Erro ao salvar reviews do filme ' + movie.id));
});