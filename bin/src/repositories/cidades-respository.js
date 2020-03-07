const mongoose = require('mongoose');
const Cidades = mongoose.model('Cidades');

exports.listarCidades = async () => {
  const res = await Cidades.find({}, 'nome abreviacao idEstado');
  return res;
};

exports.listarCidadesPorEstado = async (idEstado) => {
  const res = await Cidades.find({'idEstado' : idEstado}, 'nome abreviacao idEstado');
  return res;
};


exports.selecionarCidade = async(id) => {
  const res = await Cidades.findById(id,'nome abreviacao idEstado');
  return res;
};

exports.criarCidade = async data => {
  const cidade = new Cidades(data);
  await cidade.save();
};

exports.atualizarCidade = async (id, data) => {
  await Cidades.findByIdAndUpdate(id, {
    $set: data
  });
};

exports.excluirCidade = async id => {
  await Cidades.findByIdAndDelete(id);
};