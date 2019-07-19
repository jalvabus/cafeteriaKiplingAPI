var Pedido = require('./pedido.model');
var Usuario = require('../usuario/usuario.model');
var mongoose = require('mongoose');

exports.getAll = (req, res) => {
    Pedido.find((err, pedidos) => {
        if (err) return res.status(500).json({ error: err });

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

exports.getNoPagados = (req, res) => {
    Pedido.find({ pagado: false }, (err, pedidos) => {
        if (err) return res.status(500).json({ error: err });

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

exports.getNoEntregados = (req, res) => {
    Pedido.find({ 'detalles.entregado' : false }, (err, pedidos) => {
        if (err) return res.status(500).json({ error: err });

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


exports.getPedidosByUsuario = (req, res) => {
    console.log(req.body);
    Pedido.find({ usuario: req.body.id }, (err, pedidos) => {
        if (err) return res.status(500).json({ error: err });

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

exports.entregarPedido = (req, res) => {
    console.log(req.body);

    Pedido.findOne({ _id: req.body.idPedido }, (err, pedido) => {

        var pedidoEncontrado = pedido;
        console.log(pedidoEncontrado);

        pedidoEncontrado.detalles.forEach((pedidoEcontrado) => {
            console.log(pedidoEcontrado)
            if (String(pedidoEcontrado._id) === String(req.body.idDetalle)) {
                console.log("PEDIDO ENCONTRADO");
                console.log(pedidoEcontrado);

                pedidoEcontrado.entregado = true;

                pedidoEncontrado.save((err, pedidoGuardado) => {
                    if (err) return res.status(500).json({ error: err });

                    return res.status(200).json({
                        pedido: pedidoGuardado,
                        mensaje: "Se ah entregado el pedido"
                    });
                })

            }
        })
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

exports.pagoPedido = (req, res) => {

    Pedido.findOne({ _id: req.body.id }, (err, pedido) => {


        var pedidoEcontrado = pedido;

        pedidoEcontrado.pagado = true;

        pedidoEcontrado.save((err, pedidoGuardado) => {
            if (err) return res.status(500).json({ error: err });

            return res.status(200).json({
                pedido: pedidoGuardado,
                mensaje: "Se ah pagado el pedido"
            });
        })


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

exports.createPedido = (req, res) => {
    console.log(req.body);

    var menu = req.body;
    var total = 0;

    var cantidad = menu['0'].total;
    var usuario = menu['1'].usuario;

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
    pedido.pagado = true;


    pedido.save((err, pedido) => {
        if (err) return res.status(500).json({ error: err });

        return res.status(200).json({
            mensaje: "Pedido creado exitosamente",
            pedido: pedido
        })
    });
}