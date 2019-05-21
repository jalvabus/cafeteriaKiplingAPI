var router = require('express').Router();
var Usuario = require('./usuario/usuario.model');

router.post('/login', (req, res) => {
    console.log(req.body);
    Usuario.findOne({ usuario: req.body.usuario, password: req.body.password }, (err, usuario) => {
        if (usuario) {
            return res.status(200).json({ usuario: usuario, msg: 'Encontrado' });
        } else {
            return res.status(200).json({ msg: "No existe el usuario" });
        }
    })
        .populate({
            path: 'alumno',
            model: 'Alumno'
        })
});

module.exports = router;