var router = require('express').Router();
var controller = require('./venta.controller')

router.get('/', controller.getAll);
router.post('/', controller.createOne);

module.exports = router;