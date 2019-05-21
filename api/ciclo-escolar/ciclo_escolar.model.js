var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ciclo_escolar_schema = new Schema({
    fecha_inicio: Date,
    fecha_fin: Date
})

module.exports = mongoose.model('Ciclo_escolar', ciclo_escolar_schema);