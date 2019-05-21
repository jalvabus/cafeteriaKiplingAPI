var router = require('express').Router();
var controller = require('./controller');

router.post('/pay', controller.pay);
router.get('/sucess', controller.success);

module.exports = router;    