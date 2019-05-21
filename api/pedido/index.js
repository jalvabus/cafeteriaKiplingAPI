var router = require('express').Router();
var controller = require('./controller.pedido');

router.get('/', controller.getAll);
router.post('/', controller.createPedido);

module.exports = router;