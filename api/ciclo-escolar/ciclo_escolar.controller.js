var Ciclo_escolar = require('./ciclo_escolar.model');
var moment = require('moment');

exports.createOne = (req, res) => {
    console.log("Registrando ciclo escolar")
    console.log(req.body);

    var ciclo_escolar = new Ciclo_escolar({
        fecha_inicio: req.body.fecha_inicio,
        fecha_fin: req.body.fecha_fin
    })

    ciclo_escolar.save((err) => {
        if (err) return res.json({
            mensaje: "error",
            err: err
        })

        return res.json();
    })
}

exports.getAll = (req, res) => {
    console.log(req.body);

    Ciclo_escolar.find((err, ciclos_escolares) => {
        if (err) return res.json({
            mensaje: "error",
            err: err
        })

        return res.json({ ciclos_escolares: ciclos_escolares });
    })
}

exports.deleteOne = (req, res) => {
    console.log(req.params);
    Ciclo_escolar.findByIdAndRemove({ _id: req.params.id }, (err, ciclos) => {
        if (err) return res.status(200).json({
            mensaje: "error",
            err: err
        })

        return res.status(200).json({
            ciclos_escolares: ciclos
        })
    })
}
