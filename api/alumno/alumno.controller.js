var Alumno = require('./alumno.model');

exports.createOne = (req, res) => {
    console.log(req.body);
    var alumno = new Alumno(req.body);

    alumno.save(err => {
        if (err) return res.status(400).json({
            mensaje: "error",
            err: err
        })

        return res.status(200).json(alumno);
    })
}

exports.getAll = (req, res) => {
    Alumno.find((err, alumnos) => {
        if (err) return res.status(400).json({
            mensaje: "error",
            err: err
        })

        return res.status(200).json(alumnos);
    })
        .populate({
            path: 'ciclo_escolar',
            model: 'Ciclo_escolar'
        })
}

exports.updateOne = (req, res) => {

}

exports.deleteOne = (req, res) => {
    Alumno.findByIdAndRemove({ _id: req.params.id }, (err, alumnos) => {
        if (err) return res.status(200).json({
            mensaje: "error",
            err: err
        })

        return res.status(200).json({
            alumnos: alumnos
        })
    })
}