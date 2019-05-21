var Pedido = require('./pedido.model');
var mongoose = require('mongoose');

exports.getAll = (req, res) => {
    Pedido.find((err, pedidos) => {
        if (err) return res.status(500).json({error: err});

        return res.status(200).json(pedidos);
    })
    .populate({
        path: 'usuario',
        model: 'Usuario'
    })
    .populate({
        path: 'detalles.menu',
        model: 'Menu'
    })
    .populate({
        path: 'detalles.alumno',
        model: 'Alumno'
    })
}

exports.getByDate = (req, res) => {

}

exports.createPedido = (req, res) => {
    console.log(req.body);

    var menu = req.body;
    var total = 0;

    var cantidad = menu['0'].total;
    var usuario  = menu['1'].usuario;

    console.log("USUARIO")
    console.log(usuario);

    var pedido = new Pedido({
        fecha: new Date(),
        usuario: usuario._id
    })

    for (var i = 2; i <= cantidad; i++) {
        pedido.detalles.push({
            menu: mongoose.Types.ObjectId(menu[String(i)]._id),
            alumno: mongoose.Types.ObjectId(menu[String(i)].id_alumno),
            entregado: false
        })
        total += Number(menu[String(i)].precio) * Number(menu[String(i)].cantidad);
    }
    
    pedido.total = total;
    pedido.pagado = false;
    pedido.save((err, pedido) => {
        if (err) return res.status(500).json({error: err});

        return res.status(200).json({
            mensaje: "Pedido creado exitosamente",
            pedido: pedido
        })
    })
}