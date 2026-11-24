const mongoose = require("mongoose");

const listaDeseosSchema = new mongoose.Schema({
    correo_usuario: String,
    productos_guardados: [{
        sku_producto: String,
        fecha_agregado: Date,
        notificar_oferta: Boolean,
        _id: false
    }]
}, {versionKey: false});

const ModelListaDeseos = mongoose.model("ListaDeseos", listaDeseosSchema, "lista_deseos");
module.exports = ModelListaDeseos;