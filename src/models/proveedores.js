const mongoose = require("mongoose");

const proveedoresSchema = new mongoose.Schema({
    razon_social: String,
    ruc: String,
    contacto: String,
    telefono: String,
    correo: String,
    pais_origen: String
}, {versionKey: false});

const ModelProveedores = mongoose.model("Proveedores", proveedoresSchema, "proveedores");
module.exports = ModelProveedores;