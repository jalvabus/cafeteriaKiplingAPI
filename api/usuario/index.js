var router = require('express').Router();
var controller = require('./usuario.controller')

router.get('/', controller.getAll);
router.post('/', controller.createOne);
router.put('/', controller.updateOne);
router.delete('/:id', controller.deleteOne);

router.post('/:id', controller.addAlumno);
router.delete('/removeAlumno/:id', controller.removeAlumno);

router.post('/addPuntos/:id', controller.addPuntos);
router.post('/removePuntos/:id', controller.removePuntos);
router.get('/regAdmin', controller.createAdmin);

module.exports = router;