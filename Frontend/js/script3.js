async function encontraNome(id) {
    const dados = (await axios.get("http://localhost:3000/filme")).data;
    const dadoEncontrado = dados.find((dado) => dado.id == id); 
    return dadoEncontrado ? dadoEncontrado.titulo : null;
}

async function listarAvaliacoes(){
    const lista = document.getElementById("corpo");

    const dados = (await axios.get("http://localhost:3000/avaliacao")).data;
    console.log(dados);

    for(let i = 0; i < dados.length; i = i + 1){
        var nomeUsuario = dados[i].nomeUsuario;
        var nota = dados[i].nota;
        var filmeId = dados[i].filmeId;
        var comentario = dados[i].comentario;

        var titulo = await encontraNome(filmeId);
        lista.innerHTML += `<tr>
            <td id="Titulo do filme">${titulo}</td>
            <td id="Usuario">${nomeUsuario}</td>
            <td id="Avaliação">${nota}</td>
            <td style="font-size: 15px;" id="Descricao">${comentario}</td>
        </tr>`;
    }
}

listarAvaliacoes();