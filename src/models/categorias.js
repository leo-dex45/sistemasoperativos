const mongoose = require("mongoose");

const categoriasSchema = new mongoose.Schema({
    _id: String,
    nombre: String,
    descripcion: String,
    activo: Boolean
}, {versionKey: false});

const ModelCategorias = mongoose.model("Categorias", categoriasSchema, "categorias");
module.exports = ModelCategorias;