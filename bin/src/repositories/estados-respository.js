const mongoose = require('mongoose');
const Estados = mongoose.model('Estados');


exports.listarEstados = async () => {
  const res = await Estados.find({}, 'nome abreviacao');
  return res;
};

exports.selecionarEstado = async(id) => {
  const res = await Estados.findById(id,'nome abreviacao');
  return res;
};


exports.criarEstado = async data => {
  const estado = new Estados(data);
  await estado.save();
};

exports.atualizarEstado = async (id, data) => {
  await Estados.findByIdAndUpdate(id, {
    $set: data
  });
};

exports.excluirEstado = async id => {
  await Estados.findByIdAndDelete(id);
};