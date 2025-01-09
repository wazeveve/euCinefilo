async function geraFilmes(){
    const filmes = document.getElementById("filmes");
    
        const filmes2 = 
           (await axios
                .get("http://localhost:3000/filme")
           ).data;
    
    for(let i = 0; i < filmes2.length; i = i + 1){ 
        filmes.innerHTML += `<a href="../paginas/avaliacao.html">
        <img class="rounded m-1" style="width: 154px;" 
        src="https://image.tmdb.org/t/p/w154${filmes2[i].caminhoImagem}"></a>`;
        
    }
}

geraFilmes();