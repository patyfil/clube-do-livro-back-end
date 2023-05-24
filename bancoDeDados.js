const mongoose = require('mongoose')
require('dotenv').config()

async function conectaBancoDeDados() {
  try {
    await mongoose.connect(process.env.MONGO_URL)
    console.log("Conexão com o banco de dados realizada com sucesso!")
  } catch(erro) {
    console.log("Erro ao conectar com o banco de dados!")
  }
}

module.exports = conectaBancoDeDados