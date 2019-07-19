var router = require('express').Router();
var controller = require('./controller.pedido');

router.get('/', controller.getAll);
router.post('/', controller.createPedido);

router.get('/getNoPagados', controller.getNoPagados);
router.get('/getNoEntregados', controller.getNoEntregados);

router.post('/pagarPedido', controller.pagoPedido);
router.post('/entregarPedido', controller.entregarPedido);

router.post('/getHistorialUsuario', controller.getPedidosByUsuario);

module.exports = router;