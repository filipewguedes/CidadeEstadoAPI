const mongoose = require('mongoose');
const Estados = mongoose.model('Estados');
const repository = require('../repositories/estados-respository');
const { validationResult } = require('express-validator');


exports.listarEstados = async (req, res) => {
  try {
    const data = await repository.listarEstados();

     //Temp dirty fix
     data.forEach(element => {
      element.id = element._id;
    });
    
    res.status(200).send(data);
  } catch (e) {
    res.status(500).send({message: 'Falha ao carregar os estados.'});
  }
};

exports.selecionarEstado = async(req,res) => {
    try{
        const data = await repository.selecionarEstado(req.params.id);
        if(data == null)
            res.status(404).send({message: 'Estado não encontrado'});
        else
            res.status(200).send(data);            
    }catch(e){
        res.status(500).send({message: 'Falha ao carregar o estado.'});
    }
}

exports.criarEstado = async (req, res) => {
    
    const {errors} = validationResult(req);

  if(errors.length > 0) {
    return res.status(400).send({message: errors})
  }

  try {      
    const estado = new Estados({
      nome: req.body.nome,
      abreviacao: req.body.abreviacao,
      dataCriacao:  new Date(),
      dataAlteracao:  new Date() 
    });

    await repository.criarEstado(estado);

    res.status(201).send({message: 'Estado cadastrado com sucesso!'});
  } catch (e) {
    res.status(500).send({message: 'Falha ao cadastrar o estado.'});
  }
};

exports.atualizarEstado = async (req, res) => {

    const {errors} = validationResult(req);

    if(errors.length > 0) {
      return res.status(400).send({message: errors})
    }

    try {
      await repository.atualizarEstado(req.params.id, req.body);
      res.status(200).send({
        message: 'Estado atualizado com sucesso!'
      });
    } catch (e) {
      res.status(500).send({message: 'Falha ao atualizar o estado.'});
    }
  };


exports.excluirEstado = async (req, res) => {
    try {
      await repository.excluirEstado(req.params.id);
      res.status(200).send({
        message: 'Estado removido com sucesso!'
      });
    } catch (e) {
      res.status(500).send({message: 'Falha ao remover o estado.'});
    }
  };