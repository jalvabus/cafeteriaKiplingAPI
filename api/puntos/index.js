var router = require('express').Router();
var controller = require('./puntos.controller');

router.get('/', controller.getAll)

router.get('/createPuntos', controller.createPuntos);
router.get('/addPuntos/:id/:total', controller.AddPuntos);

router.post('/removePuntos/:id', controller.removePuntos);

module.exports = router;