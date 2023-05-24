const mongoose = require('mongoose')

const LivroSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: true
    },
    autor: {
        type: String,
        required: true
    },
    imagem: {
        type: String,
        required: true
    },
    ano: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('book', LivroSchema)