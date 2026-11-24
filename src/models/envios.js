const mongoose = require("mongoose");

const enviosSchema = new mongoose.Schema({
    transaccion_ref_pedido: String,
    correo_usuario: String,
    courier: String,
    codigo_tracking: String,
    distrito_destino: String,
    costo_envio: Number,
    estado_envio: String,
    fecha_despacho: Date,
    fecha_entrega_estimada: Date,
    fecha_entrega_real: Date
}, {versionKey: false});

const ModelEnvios = mongoose.model("Envios", enviosSchema, "envios");
module.exports = ModelEnvios;