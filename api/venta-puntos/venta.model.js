var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var puntos_schema = new Schema({
    puntos: Number,
    usuario: [{
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    }],
    fecha: Date
})

module.exports = mongoose.model('venta_puntos', puntos_schema);