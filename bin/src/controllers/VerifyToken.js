var jwt = require('jsonwebtoken');
require('dotenv').config();

function verifyToken(req, res, next) {
  var token = req.headers['x-access-token'];
  if (!token)
    return res.status(403).send({ auth: false, message: 'Nenhum token enviado.' });
    
  jwt.verify(token, process.env.TOKEN_SECRET, function(err, decoded) {
    if (err)
    return res.status(500).send({ auth: false, message: 'Falha ao autenticar token.' });
      
    req.userId = decoded.id;
    next();
  });
}

module.exports = verifyToken;