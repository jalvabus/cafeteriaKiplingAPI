var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var puntos_schema = new Schema({
    totalPuntos: Number
})

module.exports = mongoose.model('Puntos', puntos_schema);