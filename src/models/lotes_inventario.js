const mongoose = require("mongoose");

const lotesInventarioSchema = new mongoose.Schema({
    sku_producto: String,
    ruc_proveedor: String,
    codigo_lote: String,
    cantidad: Number,
    fecha_produccion: Date,
    fecha_vencimiento: Date
}, {versionKey: false});

const ModelLotesInventario = mongoose.model("LotesInventario", lotesInventarioSchema, "lotes_inventario");
module.exports = ModelLotesInventario;