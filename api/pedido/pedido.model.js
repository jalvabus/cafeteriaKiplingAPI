var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var pedido_schema = new Schema({
    fecha: Date,
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    total: Number,
    pagado: Boolean,
    detalles: [{
        menu: {
            type: Schema.Types.ObjectId,
            ref: 'Menu'
        },
        alumno: {
            type: Schema.Types.ObjectId,
            ref: 'Alumno'
        },
        entregado: Boolean
    }]
})

module.exports = mongoose.model('Pedido', pedido_schema);