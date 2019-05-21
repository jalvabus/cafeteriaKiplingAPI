var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var alumno_schema = new Schema({
    nombre: String,
    apellido_paterno: String,
    apellido_materno: String,
    grupo: String,
    status: String,
    ciclo_escolar: {
        type: Schema.Types.ObjectId,
        ref: 'Ciclo_escolar'
    }
})

module.exports = mongoose.model('Alumno', alumno_schema);