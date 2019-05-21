var Menu = require('./menu.model');
var moment = require('moment');

exports.createOne = (req, res) => {
    console.log(req.body);

    var menu = new Menu(req.body);

    menu.save((err) => {
        if (err) return res.status(500).json(err);

        return res.status(200).json(menu);
    })
}

exports.getAll = (req, res) => {

}

exports.getByDate = (req, res) => {
    console.log(req.body);
    var fecha_inicio = moment(req.body.fecha_inicio).subtract(1, 'days');
    var fecha_fin = moment(req.body.fecha_fin).add(1, 'days');

    console.log(fecha_inicio);
    console.log(fecha_fin);

    Menu.find({
        fecha: {
            "$gte": new Date(fecha_inicio),
            "$lt": new Date(fecha_fin)
        }
    }, (err, menus) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json({ menus: menus });
    })
}

exports.deleteOne = (req, res) => {
    Menu.findByIdAndRemove({ _id: req.params.id }, (err, menu) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json({ menu: menu });
    })
}
