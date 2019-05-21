var router = require('express').Router();
var controller = require('./menu.controller');

router.get('/', controller.getAll);
router.post('/', controller.createOne);
router.delete('/:id', controller.deleteOne);

router.post('/getByDate', controller.getByDate);

module.exports = router;