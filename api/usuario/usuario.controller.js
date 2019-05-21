var Usuario = require('./usuario.model');

exports.getAll = (req, res) => {
    Usuario.find((err, usuarios) => {
        if (err) return res.json({
            mensaje: "error",
            err: err
        })

        return res.json(usuarios);
    })
        .populate({
            path: 'alumno',
            model: 'Alumno'
        })
}

exports.createOne = (req, res) => {
    var usuario = new Usuario(req.body);

    usuario.tipo = "usuario";
    usuario.usuario = "kipling2018";
    usuario.password = "kipling2018";

    console.log(usuario);

    usuario.save((err, ciclos) => {
        if (err) return res.json({
            mensaje: "error",
            err: err
        })

        return res.json(ciclos);
    })
}

exports.addAlumno = (req, res) => {
    Usuario.findOne({ _id: req.params.id }, (err, usuario) => {

        usuario.alumno.push(req.body.id_alumno);

        usuario.save((err) => {
            if (!err) return res.status(200).json({ mensaje: "ok" });
        })
    })
}

exports.removeAlumno = (req, res) => {
    Usuario.findByIdAndUpdate({ _id: req.params.id }, { $pull: { 'alumno': req.body.id_alumno } }, (err, alumno) => {
        if (err) return res.json({
            mensaje: "error",
            err: err
        })

        return res.json({
            mensaje: "Alumno removido",
            alumno: alumno
        });
    })
}

exports.deleteOne = (req, res) => {
    Usuario.findByIdAndRemove({ _id: req.params.id }, (err, usuario) => {
        if (err) return res.status(200).json({
            mensaje: "error",
            err: err
        })

        return res.status(200).json({
            usuario: usuario
        })
    })
}

exports.updateOne = (req, res) => {

}