var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var User = require('../models/users');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
require('dotenv').config();

router.post('/register', function(req, res) {
  
    var hashedPassword = bcrypt.hashSync(req.body.password, 8);
    
    User.create({
      name : req.body.name,
      email : req.body.email,
      password : hashedPassword
    },
    function (err, user) {
      if (err) return res.status(500).send("Houve um problema no registro.")
      var token = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET, {
        expiresIn: 86400000000
      });
      res.status(200).send({ auth: true, token: token });
    }); 
  });


  router.get('/me', function(req, res) {
    var token = req.headers['x-access-token'];
    if (!token) return res.status(401).send({ auth: false, message: 'Nenhum token enviado.' });
    
    jwt.verify(token, process.env.TOKEN_SECRET, function(err, decoded) {
      if (err) return res.status(500).send({ auth: false, message: 'Falha na autenticação do token.' });

      User.findById(decoded.id, { password: 0 }, function (err, user) {
        if (err) return res.status(500).send("Houve um problema para achar o usuário.");
        if (!user) return res.status(404).send("Usuário não encontrado.");
        
        res.status(200).send(user);
      });

    });
  });

  router.post('/login', function(req, res) {

    User.findOne({ email: req.body.email }, function (err, user) {
      if (err) return res.status(500).send('Erro no servidor.');
      if (!user) return res.status(404).send('Usuário não encontrado.');
      
      var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
      if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });
      
      var token = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET, {
        expiresIn: 86400000000 
      });
      
      res.status(200).send({ auth: true, token: token });
    });
    
  });

  router.get('/logout', function(req, res) {
    res.status(200).send({ auth: false, token: null });
  });

  module.exports = router;

