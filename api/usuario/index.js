var router = require('express').Router();
var controller = require('./usuario.controller')

router.get('/', controller.getAll);
router.post('/', controller.createOne);
router.put('/', controller.updateOne);
router.delete('/:id', controller.deleteOne);

router.post('/:id', controller.addAlumno);
router.delete('/removeAlumno/:id', controller.removeAlumno);

module.exports = router;