const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  
  id: {
    type: String,
    required: false
  },
  idEstado: {
    type: String,
    required: true
  },
  nome: {
    type: String,
    required: true
  },
  dataCriacao: {
    type: Date,
    required: true
  },
  dataAlteracao: {
    type: Date,
    required: true
  }
});

module.exports = mongoose.model('Cidades', schema);