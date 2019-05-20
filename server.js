var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
var morgan = require('morgan');
const paypal = require('paypal-rest-sdk');
var app = express();

var CONFIG = require('./config');

var mongoose = require('mongoose');
mongoose.connect(CONFIG.DATABASE.URL, (err, connect) => {
    if (err) throw err;
    console.log("Conexion establecida a la base de datos.")
});

paypal.configure({
    'mode': CONFIG.PAYPAL.MODE, //sandbox or live
    'client_id': CONFIG.PAYPAL.CLIENT_ID,
    'client_secret': CONFIG.PAYPAL.CLIENT_SECRET
});

app.use(bodyParser.urlencoded({ 'extended': 'true' }));         // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());

app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({ 'extended': 'true' }));         // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json


app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});


app.get('/', (req, res) => {
    res.status(200).json({
        mensajeAPI: "API WORKS"
    })
});

app.use('/', require('./api'));
app.use('/api', require('./api/api'));

app.use('*', (req, res) => {
    res.status(400).json({
        error: "NOT FOUND"
    })
})

app.listen(CONFIG.PORT, () => {
    console.log("Nobu api working on http://localhost:" + CONFIG.PORT);
})
