var router = require('express').Router();

router.get('/', (req, res) => {
    res.json({ mensaje: "GET /api" })
});

router.use('/ciclo_escolar', require('./ciclo-escolar'));
router.use('/ciclo_escolar_actual', require('./ciclo-escolar-actual'));
router.use('/alumno', require('./alumno'));
router.use('/usuario', require('./usuario'));
router.use('/menu', require('./menu'));
router.use('/pedido', require('./pedido'));
router.use('/puntos', require('./puntos'));
router.use('/venta-puntos', require('./venta-puntos'));
router.use('/paypal', require('./PAYPAL'));

module.exports = router;