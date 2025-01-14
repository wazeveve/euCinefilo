async function salvaAvaliacao(){
    const enviar = document.querySelector('#formulario');

    enviar.addEventListener("submit", async function (event) {
        event.preventDefault(); // Prevenir o comportamento padrão (recarregar a página)
        var movieTitle = document.getElementById('movieTitle').value;
        var username = document.getElementById('username').value;
        var dataCriacao = new Date();
        var stars = document.querySelectorAll('.star-icon');
        var description = document.getElementById('description').value;
        var nota;

        for(let i = 0; i < stars.length; i++){
            if(stars[i] && stars[i].className.includes("ativo")){
                nota = i + 1;
                break;
            }

            if(i + 1 == stars.length){
                alert("Selecione uma avaliação!");
            }
        }
        console.log("Nome do filme:", movieTitle);
        console.log("Usuário:", username);
        console.log("Data de criação:", dataCriacao);
        console.log("Descrição:", description);
        console.log("Nota:", nota);

        var filmes = (await axios.get("http://localhost:3000/filme")).data;
        var idFilme = encontraFilme(filmes,movieTitle);
        
        console.log(filmes);

        if(nota && idFilme > -1){
            await axios.post('http://localhost:3000/avaliacao', {
                nomeUsuario: username,
                dataCriacao: dataCriacao,
                nota: nota,
                comentario: description,
                filmeId: parseInt(idFilme)
            })
            .then((resposta) => {
                console.log("Criado com sucesso!", resposta.data);
            })
            .catch((erro) => {
                console.error("Erro ao criar uma avaliação:", erro);
            });
            window.location.href = "../index.html";
        }
    });
}

function encontraFilme(filmes, titulo){
    for(let i = 0; i < filmes.length; i++){
        if(filmes[i].titulo.localeCompare(titulo) == 0)
            return filmes[i].id;
    }
    return -1;
}


salvaAvaliacao();