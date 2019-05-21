var paypal = require('paypal-rest-sdk');

exports.pay = (req, res) => {
    console.log(req.body);

    var menu = req.body;
    var items = [];

    var total = 0;

    var item = {
        name: String,
        description: String,
        quantity: Number,
        price: Number,
        tax: Number,
        sku: String,
        currency: String
    };

    var cantidad = menu['0'].total + 1;

    for (var i = 2; i <= cantidad; i++) {
        item = {};
        item.name = "Menu - " + menu[String(i)].comida;
        item.description = "Menu del dia " + menu[String(i)].dia;
        item.price = Number(menu[String(i)].precio);
        item.quantity = Number(menu[String(i)].cantidad);
        item.tax = 0.16;
        item.sku = menu[String(i)]._id;
        item.currency = "MXN";
        items.push(item);
        total += Number(menu[String(i)].precio) * Number(menu[String(i)].cantidad);
    }

    console.log("ITEMS")
    console.log(items);
    console.log(total);

    // Todos los calculos deben estar perfectos
    var create_payment_json = {
        "intent": "sale",
        "payer": {
            "payment_method": "paypal"
        },
        "redirect_urls": {
            "return_url": "http://localhost:3002/success",
            "cancel_url": "http://localhost:3002/cancel"
        },
        "transactions": [
            {
                "amount": {
                    "total": "30.11",
                    "currency": "MXN",
                    "details": {
                        "subtotal": "30.00",
                        "tax": "0.07", // Impuestos
                        "shipping": "0.03", // Envio
                        "handling_fee": "1.00", // Manejo
                        "insurance": "0.01", // Seguro
                        "shipping_discount": "-1.00" // Descuento de envio 
                    }
                },
                "description": "The payment transaction description.",
                "item_list": {
                    "items": [
                        {
                            "name": "hat",
                            "sku": "1",
                            "price": "3.00",
                            "currency": "MXN",
                            "quantity": "5",
                            "description": "Brown hat.",
                            "tax": "0.01" // Impuestos
                        },
                        {
                            "name": "Menu kln",
                            "sku": "5cc9dcfa83202d2c30506487",
                            "price": "15.00",
                            "currency": "MXN",
                            "quantity": "1",
                            "description": "Menu del dia Martes",
                            "tax": "0.02" // Impuestos
                        }
                    ],
                    /*
                    "shipping_address": {
                        "recipient_name": "Brian Robinson",
                        "line1": "4th Floor",
                        "line2": "Unit #34",
                        "city": "San Jose",
                        "state": "CA",
                        "phone": "011862212345678",
                        "postal_code": "95131",
                        "country_code": "US"
                    }
                    */
                }
            }
        ]
    }

    paypal.payment.create(create_payment_json, function (error, payment) {
        if (error) {
            console.log(error);
            console.log(error.response.details)
            throw error;
        } else {
            res.status(200).json(payment);
        }
    });

}

exports.success = (req, res) => {
    var payerId = req.query.PayerID;
    var paymentId = req.query.paymentId;

    var execute_payment_json = {
        "payer_id": payerId,
        "transactions": [{
            "amount": {
                "currency": "MXN",
                "total": "45.00"
            }
        }]
    };

    paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
        if (error) {
            console.log(error.response);
            throw error;
        } else {
            console.log("Get Payment Response");
            console.log(JSON.stringify(payment));
            res.send('success');
        }
    });
}

