const mongoose = require("mongoose");

const pedidosSchema = new mongoose.Schema({
    correo_usuario: String,
    id_direccion: Number,
    codigo_cupon: String,
    monto_total: Number,
    estado_pedido: String,
    fecha_pedido: Date,

    detalles: [{
        sku_producto: String,
        cantidad: Number,
        precio_unitario: Number,
        subtotal: Number,
        _id: false
    }],

    pago: {
        metodo_pago: String,
        transaccion_ref: String,
        monto: Number,
        estado_pago: String,
        fecha_pago: Date
    }
}, {versionKey: false});

const ModelPedidos = mongoose.model("Pedidos", pedidosSchema, "pedidos");
module.exports = ModelPedidos;