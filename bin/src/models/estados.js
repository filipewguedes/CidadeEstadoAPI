const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  
  id: {
    type: String,
    required: false
  },
  nome: {
    type: String,
    required: true
  },
  abreviacao: {
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

module.exports = mongoose.model('Estados', schema);