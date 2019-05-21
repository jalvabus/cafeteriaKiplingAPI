var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var menu_schema = new Schema({
    fecha: Date,
    comida: String,
    agua: String,
    postre: String,
    precio: String
})

module.exports = mongoose.model('Menu', menu_schema);