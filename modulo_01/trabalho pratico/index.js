import fetch from 'node-fetch';

import fs from 'fs';

// Caminho do arquivo JSON local
const caminhoDoArquivo = 'products.json';

axios.get(`file://${caminhoDoArquivo}`)
.then(response => {
  // Manipula a resposta JSON
  console.log(response.data);
})
.catch(error => {
  // Trata erros
  console.error('Erro ao obter o arquivo JSON:', error);
});