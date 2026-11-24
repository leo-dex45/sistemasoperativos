const mongoose = require("mongoose");

const carritosSchema = new mongoose.Schema({
    correo_usuario: String,
    items: [{
        sku_producto: String,
        cantidad: Number,
        _id: false
    }]
}, {versionKey: false});

const ModelCarritos = mongoose.model("Carritos", carritosSchema, "carritos");
module.exports = ModelCarritos;

