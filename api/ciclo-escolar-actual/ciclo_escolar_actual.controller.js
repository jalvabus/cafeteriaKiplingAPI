var Ciclo_escolar_actual = require('./ciclo_escolar_actual.model');

exports.getActual = (req, res) => {
    Ciclo_escolar_actual.find((err, ciclo) => {
        console.log(ciclo);
        if (err) return res.status(500).json({
            mensaje: "err",
            err: err
        })

        return res.status(200).json(ciclo[0])
    })
        .populate({
            path: 'ciclo_escolar',
            model: 'Ciclo_escolar'
        })
}

exports.updateCiclo = (req, res) => {
    console.log(req.body);
    
    if (Number(req.body.id_ciclo_escolar_actual) != 0) {
        console.log("Actualizado");
        Ciclo_escolar_actual.findById({ _id: req.body.id_ciclo_escolar_actual }, (err, ciclo) => {

            ciclo.ciclo_escolar = req.body.id_ciclo_escolar;

            ciclo.save().then((ciclo_guardado, err) => {
                if (err) return res.status(500).json({
                    error: err
                })

                res.status(200).json({
                    mensaje: 'Ciclo escolar actual actualizado con éxito',
                    ciclo: ciclo_guardado
                })

            })
        })
    } else {
        console.log("Creando");
        var ciclo = new Ciclo_escolar_actual();

        ciclo.ciclo_escolar = req.body.id_ciclo_escolar;

        ciclo.save().then((ciclo_guardado, err) => {
            if (err) return res.status(500).json({
                error: err
            })

            res.status(200).json({
                mensaje: 'ciclo escolar actual registrado con éxito',
                ciclo: ciclo_guardado
            })

        })
    }

}