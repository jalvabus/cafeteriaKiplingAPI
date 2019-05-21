var router = require('express').Router();
var controller = require('./alumno.controller');

router.get('/', controller.getAll);
router.post('/', controller.createOne);
router.put('/:id', controller.updateOne);
router.delete('/:id', controller.deleteOne);

module.exports = router;