const express = require('express');
const router = express.Router();
const estadosController = require('../controllers/estados-controller');
const { check } = require('express-validator');

var VerifyToken = require('../controllers/VerifyToken');
var Cache = require('../controllers/Cache');

router.get('/',VerifyToken, Cache(10),estadosController.listarEstados);

router.get('/:id',VerifyToken,Cache(10), estadosController.selecionarEstado);

router.post('/',VerifyToken,Cache(10),[
    check('nome').isLength({ min: 4, max: 20 }).withMessage("O nome precisa ter no mínimo 4 caracteres e no máximo 20."),
    check('abreviacao').isLength({ min: 2, max: 2 }).withMessage("A abreviacao precisar ter 2 caracteres")
], estadosController.criarEstado);

router.put('/:id',VerifyToken,Cache(10),[
    check('nome').isLength({ min: 4, max: 20 }).withMessage("O nome precisa ter no mínimo 4 caracteres e no máximo 20."),
    check('abreviacao').isLength({ min: 2, max: 2 }).withMessage("A abreviacao precisar ter 2 caracteres")
 ], estadosController.atualizarEstado);

 router.delete('/:id',VerifyToken,Cache(10), estadosController.excluirEstado);

module.exports = router;