const mongoose = require('mongoose');
const Cidades = mongoose.model('Cidades');
const repository = require('../repositories/cidades-respository');
const estadoRepository = require('../repositories/estados-respository');
const { validationResult } = require('express-validator');


exports.listarCidades = async (req, res) => {
  let data;
  try {
    if(req.query.idEstado)
      data = await repository.listarCidadesPorEstado(req.query.idEstado);      
    else
      data = await repository.listarCidades();

      //Temp dirty fix
      data.forEach(element => {
        element.id = element._id;
      });

    res.status(200).send(data);
  } catch (e) {
    res.status(500).send({message: 'Falha ao carregar as cidades.'});
  }
};

exports.selecionarCidade = async(req,res) => {
    try{
        const data = await repository.selecionarCidade(req.params.id);
        if(data == null)
            res.status(404).send({message: 'Cidade não encontrada'});
        else
            res.status(200).send(data);            
    }catch(e){
        res.status(500).send({message: 'Falha ao carregar a cidade.'});
    }
}

exports.criarCidade = async (req, res) => {
    
    const {errors} = validationResult(req);

  if(errors.length > 0) {
    return res.status(400).send({message: errors})
  }

  try {      

    const data = await estadoRepository.selecionarEstado(req.body.idEstado);
    
    if(data == null){
      return res.status(400).send({message: "Estado não encontrado"})
    }

    const Cidade = new Cidades({
      nome: req.body.nome,
      idEstado: req.body.idEstado,
      dataCriacao:  new Date(),
      dataAlteracao:  new Date() 
    });

    await repository.criarCidade(Cidade);

    res.status(201).send({message: 'Cidade cadastrada com sucesso!'});
  } catch (e) {
    res.status(500).send({message: 'Falha ao cadastrar a cidade.'});
  }
};

exports.atualizarCidade = async (req, res) => {

    const {errors} = validationResult(req);

    if(errors.length > 0) {
      return res.status(400).send({message: errors})
    }

    try {

      const data = await estadoRepository.selecionarEstado(req.body.idEstado);
    
    if(data == null){
      return res.status(400).send({message: "Estado não encontrado"})
    }
    
      await repository.atualizarCidade(req.params.id, req.body);
      res.status(200).send({
        message: 'Cidade atualizada com sucesso!'
      });
    } catch (e) {
      res.status(500).send({message: 'Falha ao atualizar a cidade.'});
    }
  };


exports.excluirCidade = async (req, res) => {
    try {
      await repository.excluirCidade(req.params.id);
      res.status(200).send({
        message: 'Cidade removida com sucesso!'
      });
    } catch (e) {
      res.status(500).send({message: 'Falha ao remover a cidade.'});
    }
  };