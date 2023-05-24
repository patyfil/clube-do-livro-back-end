const express = require('express')  // Inicia o express
const router = express.Router()   // Configurando a 1ª parte da rota
const cors = require('cors')  // Importando o pacote cors, que permite consumir essa API no FrontEnd
const conectaBancoDeDados = require('./bancoDeDados') // Ligando ao arquivo BD
conectaBancoDeDados() // Chamando a função que conecta o BD

const Livro = require('./livrosModel')
const app = express()   // Iniciando o APP
app.use(express.json())  // Configurando o express para ler JSON
app.use(cors())  // Configurando o cors para permitir acesso externo
const porta = 3333    // Criando a porta

// GET
async function mostraLivros(request, response) {
  try {
    const livrosVindasDoBancoDeDados = await Livro.find()
    response.json(livrosVindasDoBancoDeDados)
  } catch (erro) {
    console.log(erro)
  }
}

// POST
async function criaLivro(request, response) {
  const novoLivro = new Livro({
    titulo: request.body.titulo,
    autor: request.body.autor,
    imagem: request.body.imagem,
    ano: request.body.ano,
  })
  try {
    const livroCriado = await novoLivro.save()
    response.status(201).json(livroCriado)
  } catch (erro) {
    console.log(erro)
  }
}

// PATCH
async function corrigeLivro(request, response) {
  try {
    const livroEncontrado = await Livro.findById(request.params.id)
    if (request.body.titulo) {
      livroEncontrado.titulo = request.body.titulo
    }
    if (request.body.autor) {
      livroEncontrado.autor = request.body.autor
    }
    if (request.body.imagem) {
      livroEncontrado.imagem = request.body.imagem
    }
    if (request.body.ano) {
      livroEncontrado.ano = request.body.ano
    }

    const livroAtualizadoNoBancoDeDados = await livroEncontrado.save()
    response.json(livroAtualizadoNoBancoDeDados)

  } catch (erro) {
    console.log(erro)
  }
}

// DELETE
async function deletaLivro(request, response) {
  try {
    await Livro.findByIdAndDelete(request.params.id)
    response.json({ messagem: 'Livro deletado com sucesso!' })
  } catch (erro) {
    console.log(erro)
  }
}


// PORTA
function mostraPorta() {
  console.log('Servidor criado e rodando na porta', porta)
}

app.listen(porta, mostraPorta)  // Servidor ouvindo a porta
// Configurando a 2ª parte da rota
app.use(router.get('/livros', mostraLivros)) // Configura rota GET /livros:
app.use(router.post('/livros', criaLivro))  // Configura rota POST /livros
app.use(router.patch('/livros/:id', corrigeLivro))  // Configura rota PATCH /livros/:id
app.use(router.delete('/livros/:id', deletaLivro)) // Configura rota DELETE /livros/:id