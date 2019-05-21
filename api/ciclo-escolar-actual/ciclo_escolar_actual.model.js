var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ciclo_escolar_actual_schema = new Schema({
    ciclo_escolar: {
        type: Schema.Types.ObjectId,
        ref: 'Ciclo_escolar'
    }
})

module.exports = mongoose.model('Ciclo_escolar_actual', ciclo_escolar_actual_schema);