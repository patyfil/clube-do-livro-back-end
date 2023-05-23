const express = require('express')
const router = express.Router()
const app = express()
const porta = 3333
const livros = [
  {
    titulo: 'Fahrenheit 451',
    autor: 'Ray Bradbury',
    imagem: 'https://github.com/patyfil/clube-do-livro-prioli-karnal/blob/main/public/imagens/4-2023/04.jpg?raw=true',
    ano: '2023'
  },
  {
    titulo: 'Capitalismo sem rivais',
    autor: 'Branko Milanovic',
    imagem: 'https://github.com/patyfil/clube-do-livro-prioli-karnal/blob/main/public/imagens/4-2023/03.jpg?raw=true',
    ano: '2023'
  }

]
function mostraLivros(request, response) {
  response.json(livros)
}

function mostraPorta() {
  console.log('Servidor criado e rodando na porta', porta)
}

app.listen(porta, mostraPorta)
app.use(router.get('/livros', mostraLivros))