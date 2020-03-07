const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

// App
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");

    next();
  });

// Database
mongoose.connect(process.env.DATABASE_CONNECTION_STRING, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(res=>{
    console.log("DB Connected!")
}).catch(err => {
console.log(Error, err.message);
});

const db = mongoose.connection;
  
db.on('connected', () => {
    console.log('Mongoose default connection is open');
});

db.on('error', err => {
    console.log(`Mongoose default connection has occured \n${err}`);
});

db.on('disconnected', () => {
    console.log('Mongoose default connection is disconnected');
});

process.on('SIGINT', () => {
    db.close(() => {
        console.log(
        'Mongoose default connection is disconnected due to application termination'
        );
        process.exit(0);
    });
});

// Load models
const Estados = require('./models/estados');
const Cidades = require('./models/cidades');

// Load routes
const indexRoutes = require('./routes/index-routes');
app.use('/', indexRoutes);
const estadosRoutes = require('./routes/estados-routes');
app.use('/estados', estadosRoutes);
const cidadesRoutes = require('./routes/cidades-routes');
app.use('/cidades', cidadesRoutes);
var AuthController = require('./controllers/auth-controller');
app.use('/auth', AuthController);
var UserController = require('./controllers/user-controller');
app.use('/users', UserController);

var swaggerUi = require('swagger-ui-express');
var swaggerDocument = require('./swagger.json');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = app;
