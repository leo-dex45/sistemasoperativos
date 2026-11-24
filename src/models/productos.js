const mongoose = require("mongoose");

const productosSchema = new mongoose.Schema({
    id_categoria: String,
    nombre: String,
    descripcion: String,
    ingredientes_botanicos: String,
    certificacion_organica: String,
    precio: Number,
    stock: Number,
    sku: String,
    imagen_url: String,
    fecha_creacion: Date
}, {versionKey: false});

const ModelProductos = mongoose.model("Productos", productosSchema, "productos");
module.exports = ModelProductos;