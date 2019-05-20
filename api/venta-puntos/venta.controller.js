var Venta = require('./venta.model');

exports.createOne = (req, res) => {
    console.log(req.body);
    var venta = new Venta(req.body);
    venta.fecha = new Date();

    venta.save((err, venta) => {
        if (err) return res.status(500).json({
            mensaje: "error",
            err: err
        })

        return res.status(200).json(venta);
    })
}

exports.getAll = (req, res) => {
    Venta.find((err, ventas) => {
        if (err) return res.status(500).json({
            mensaje: "error",
            err: err
        })

        return res.status(200).json(ventas);
    })
}