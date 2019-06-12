var Puntos = require('./puntos.model');

exports.getAll = function (req, res) {
    Puntos.find((err, puntos) => {
        if (err) return res.status(500).json({
            mensaje: "error",
            err: err
        })

        return res.status(200).json(puntos[0]);
    })
}

exports.createPuntos = (req, res) => {
    var puntos = new Puntos()
    puntos.totalPuntos = 0;

    puntos.save((err, puntos) => {
        if (err) return res.status(500).json({
            mensaje: "error",
            err: err
        })

        return res.status(200).json(puntos);
    })
}

exports.AddPuntos = (req, res) => {
    Puntos.findByIdAndUpdate({ _id: req.params.id }, { $set: { totalPuntos: req.params.total } }, (err, puntos) => {
        if (err) return res.status(500).json({
            mensaje: "error",
            err: err
        })

        return res.status(200).json(puntos);
    })
}

exports.removePuntos = (req, res) => {
    Puntos.findByIdAndUpdate({ _id: req.params.id }, { $set: { totalPuntos: req.body.puntos } }, (err, puntos) => {
        if (err) return res.status(500).json({
            mensaje: "error",
            err: err
        })

        return res.status(200).json(puntos);
    })
}