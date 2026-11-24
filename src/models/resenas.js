const mongoose = require("mongoose");

const resenasSchema = new mongoose.Schema({
    sku_producto: String,
    correo_usuario: String,
    calificacion: Number,
    comentario: String,
    fecha_resena: Date
}, {versionKey: false});

const ModelResenas = mongoose.model("Resenas", resenasSchema, "resenas");
module.exports = ModelResenas;