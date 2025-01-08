import axios from 'axios';

async function main() {
  const totalAvaliacoes = 100000;
  const totalFilmes = 294;

  for (let i = 1; i <= totalAvaliacoes; i++) {
    await axios.post('http://localhost:3000/avaliacao', {
        nomeUsuario: `Usuário ${i}`,
        dataCriacao: new Date(),
        nota: parseFloat((Math.random() * 5).toFixed(1)), // Nota entre 0.0 e 5.0
        comentario: `Comentário ${i}`,
        filmeId: (i % totalFilmes) + 1,
    }).catch((err) => console.log(err));
  }
}

await main();