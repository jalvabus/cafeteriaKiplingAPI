var router = require('express').Router();
var controller = require('./ciclo_escolar_actual.controller')

router.get('/', controller.getActual)
router.put('/', controller.updateCiclo)

module.exports = router;