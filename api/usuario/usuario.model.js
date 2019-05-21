var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var usuario_schema = new Schema({
    nombre: String,
    apellido_paterno: String,
    apellido_materno: String,
    direccion: String,
    email: String,
    telefono: String,
    usuario: String,
    password: String,
    tipo: String,
    alumno: [{
        type: Schema.Types.ObjectId,
        ref: 'Alumno'
    }]
})

module.exports = mongoose.model('Usuario', usuario_schema);