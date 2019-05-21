var router = require('express').Router();
var controller = require('./ciclo_escolar.controller')

router.get('/', controller.getAll)
router.post('/', controller.createOne)
router.delete('/:id', controller.deleteOne)

module.exports = router;