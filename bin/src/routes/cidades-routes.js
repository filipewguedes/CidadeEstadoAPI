const express = require('express');
const router = express.Router();
const cidadesController = require('../controllers/cidades-controller');
const { check } = require('express-validator');

var VerifyToken = require('../controllers/VerifyToken');
var Cache = require('../controllers/Cache');


router.get('/',VerifyToken,Cache(10), cidadesController.listarCidades);

router.get('/:id', VerifyToken,Cache(10),cidadesController.selecionarCidade);

router.post('/',VerifyToken,Cache(10),[
    check('nome').isLength({ min: 4, max: 20 }).withMessage("O nome precisa ter no mínimo 4 caracteres e no máximo 20.")
], cidadesController.criarCidade);

router.put('/:id',VerifyToken,Cache(10),[
    check('nome').isLength({ min: 4, max: 20 }).withMessage("O nome precisa ter no mínimo 4 caracteres e no máximo 20.")
 ], cidadesController.atualizarCidade);

 router.delete('/:id', VerifyToken,Cache(10),cidadesController.excluirCidade);

module.exports = router;