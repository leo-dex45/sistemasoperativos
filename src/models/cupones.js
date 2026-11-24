const mongoose = require("mongoose");

const cuponesSchema = new mongoose.Schema({
    codigo: String,
    descuento_porc: Number,
    monto_minimo: Number,
    fecha_expiracion: Date,
    activo: Boolean
}, {versionKey: false});

const ModelCupones = mongoose.model("Cupones", cuponesSchema, "cupones");
module.exports = ModelCupones;