const {Router} = require("express");

const router = Router();

const ModelCarritos = require("../models/carritos.js");
const ModelCategorias = require("../models/categorias.js");
const ModelCupones = require("../models/cupones.js");
const ModelEnvios = require("../models/envios.js");
const ModelListaDeseos = require("../models/lista_deseos.js");
const ModelLotesInventario = require("../models/lotes_inventario.js");
const ModelPedidos = require("../models/pedidos.js");
const ModelProductos = require("../models/productos.js");
const ModelProveedores = require("../models/proveedores.js");
const ModelResenas = require("../models/resenas.js");
const ModelUsuarios = require("../models/usuarios.js");

//ruta principal
router.get("/", (red, res) => {
    res.send("FlorDeNectar App")
})

// Operaciones CRUD para Carritos

// Create
router.post("/carritos", async (req, res) => {
    const body = req.body;
    const respuesta = await ModelCarritos.create(body);
    res.send(respuesta);
});

// Read
router.get("/carritos/ls", async (req, res) => {
    const respuesta = await ModelCarritos.find({});
    res.send(respuesta);
});

// Update
router.put("/carritos/:id", async (req, res) => {
    const body = req.body;
    const id = req.params.id;
    const respuesta = await ModelCarritos.findOneAndUpdate({ _id: id }, body);
    res.send(respuesta);
});

// Delete
router.delete("/carritos/:id", async (req, res) => {
    const id = req.params.id;
    const respuesta = await ModelCarritos.deleteOne({ _id: id });
    res.send(respuesta);
});

// Operaciones CRUD para Categorias

// Create
router.post("/categorias", async (req, res) => {
    const body = req.body;
    const respuesta = await ModelCategorias.create(body);
    res.send(respuesta);
});

// Read
router.get("/categorias/ls", async (req, res) => {
    const respuesta = await ModelCategorias.find({});
    res.send(respuesta);
});

// Update
router.put("/categorias/:id", async (req, res) => {
    const body = req.body;
    const id = req.params.id;
    const respuesta = await ModelCategorias.findOneAndUpdate({ _id: id }, body);
    res.send(respuesta);
});

// Delete
router.delete("/categorias/:id", async (req, res) => {
    const id = req.params.id;
    const respuesta = await ModelCategorias.deleteOne({ _id: id });
    res.send(respuesta);
});

// Operaciones CRUD para Cupones

// Create
router.post("/cupones", async (req, res) => {
    const body = req.body;
    const respuesta = await ModelCupones.create(body);
    res.send(respuesta);
});

// Read
router.get("/cupones/ls", async (req, res) => {
    const respuesta = await ModelCupones.find({});
    res.send(respuesta);
});

// Update
router.put("/cupones/:id", async (req, res) => {
    const body = req.body;
    const id = req.params.id;
    const respuesta = await ModelCupones.findOneAndUpdate({ _id: id }, body);
    res.send(respuesta);
});

// Delete
router.delete("/cupones/:id", async (req, res) => {
    const id = req.params.id;
    const respuesta = await ModelCupones.deleteOne({ _id: id });
    res.send(respuesta);
});

// Operaciones CRUD para Envios

// Create
router.post("/envios", async (req, res) => {
    const body = req.body;
    const respuesta = await ModelEnvios.create(body);
    res.send(respuesta);
});

// Read
router.get("/envios/ls", async (req, res) => {
    const respuesta = await ModelEnvios.find({});
    res.send(respuesta);
});

// Update
router.put("/envios/:id", async (req, res) => {
    const body = req.body;
    const id = req.params.id;
    const respuesta = await ModelEnvios.findOneAndUpdate({ _id: id }, body);
    res.send(respuesta);
});

// Delete
router.delete("/envios/:id", async (req, res) => {
    const id = req.params.id;
    const respuesta = await ModelEnvios.deleteOne({ _id: id });
    res.send(respuesta);
});

// Operaciones CRUD para Lista de Deseos

// Create
router.post("/lista_deseos", async (req, res) => {
    const body = req.body;
    const respuesta = await ModelListaDeseos.create(body);
    res.send(respuesta);
});

// Read
router.get("/lista_deseos/ls", async (req, res) => {
    const respuesta = await ModelListaDeseos.find({});
    res.send(respuesta);
});

// Update
router.put("/lista_deseos/:id", async (req, res) => {
    const body = req.body;
    const id = req.params.id;
    const respuesta = await ModelListaDeseos.findOneAndUpdate({ _id: id }, body);
    res.send(respuesta);
});

// Delete
router.delete("/lista_deseos/:id", async (req, res) => {
    const id = req.params.id;
    const respuesta = await ModelListaDeseos.deleteOne({ _id: id });
    res.send(respuesta);
});

// Operaciones CRUD para Lotes de Inventario

// Create
router.post("/lotes_inventario", async (req, res) => {
    const body = req.body;
    const respuesta = await ModelLotesInventario.create(body);
    res.send(respuesta);
});

// Read
router.get("/lotes_inventario/ls", async (req, res) => {
    const respuesta = await ModelLotesInventario.find({});
    res.send(respuesta);
});

// Update
router.put("/lotes_inventario/:id", async (req, res) => {
    const body = req.body;
    const id = req.params.id;
    const respuesta = await ModelLotesInventario.findOneAndUpdate({ _id: id }, body);
    res.send(respuesta);
});

// Delete
router.delete("/lotes_inventario/:id", async (req, res) => {
    const id = req.params.id;
    const respuesta = await ModelLotesInventario.deleteOne({ _id: id });
    res.send(respuesta);
});

// Operaciones CRUD para Pedidos

// Create
router.post("/pedidos", async (req, res) => {
    const body = req.body;
    const respuesta = await ModelPedidos.create(body);
    res.send(respuesta);
});

// Read
router.get("/pedidos/ls", async (req, res) => {
    const respuesta = await ModelPedidos.find({});
    res.send(respuesta);
});

// Update
router.put("/pedidos/:id", async (req, res) => {
    const body = req.body;
    const id = req.params.id;
    const respuesta = await ModelPedidos.findOneAndUpdate({ _id: id }, body);
    res.send(respuesta);
});

// Delete
router.delete("/pedidos/:id", async (req, res) => {
    const id = req.params.id;
    const respuesta = await ModelPedidos.deleteOne({ _id: id });
    res.send(respuesta);
});

// Operaciones CRUD para Productos

// Create
router.post("/productos", async (req, res) => {
    const body = req.body;
    const respuesta = await ModelProductos.create(body);
    res.send(respuesta);
});

// Read
router.get("/productos/ls", async (req, res) => {
    const respuesta = await ModelProductos.find({});
    res.send(respuesta);
});

// Update
router.put("/productos/:id", async (req, res) => {
    const body = req.body;
    const id = req.params.id;
    const respuesta = await ModelProductos.findOneAndUpdate({ _id: id }, body);
    res.send(respuesta);
});

// Delete
router.delete("/productos/:id", async (req, res) => {
    const id = req.params.id;
    const respuesta = await ModelProductos.deleteOne({ _id: id });
    res.send(respuesta);
});

// Operaciones CRUD para Proveedores

// Create
router.post("/proveedores", async (req, res) => {
    const body = req.body;
    const respuesta = await ModelProveedores.create(body);
    res.send(respuesta);
});

// Read
router.get("/proveedores/ls", async (req, res) => {
    const respuesta = await ModelProveedores.find({});
    res.send(respuesta);
});

// Update
router.put("/proveedores/:id", async (req, res) => {
    const body = req.body;
    const id = req.params.id;
    const respuesta = await ModelProveedores.findOneAndUpdate({ _id: id }, body);
    res.send(respuesta);
});

// Delete
router.delete("/proveedores/:id", async (req, res) => {
    const id = req.params.id;
    const respuesta = await ModelProveedores.deleteOne({ _id: id });
    res.send(respuesta);
});

// Operaciones CRUD para Resenas

// Create
router.post("/resenas", async (req, res) => {
    const body = req.body;
    const respuesta = await ModelResenas.create(body);
    res.send(respuesta);
});

// Read
router.get("/resenas/ls", async (req, res) => {
    const respuesta = await ModelResenas.find({});
    res.send(respuesta);
});

// Update
router.put("/resenas/:id", async (req, res) => {
    const body = req.body;
    const id = req.params.id;
    const respuesta = await ModelResenas.findOneAndUpdate({ _id: id }, body);
    res.send(respuesta);
});

// Delete
router.delete("/resenas/:id", async (req, res) => {
    const id = req.params.id;
    const respuesta = await ModelResenas.deleteOne({ _id: id });
    res.send(respuesta);
});

// Operaciones CRUD para Usuarios

// Create
router.post("/usuarios", async (req, res) => {
    const body = req.body;
    const respuesta = await ModelUsuarios.create(body);
    res.send(respuesta);
});

// Read
router.get("/usuarios/ls", async (req, res) => {
    const respuesta = await ModelUsuarios.find({});
    res.send(respuesta);
});

// Update
router.put("/usuarios/:id", async (req, res) => {
    const body = req.body;
    const id = req.params.id;
    const respuesta = await ModelUsuarios.findOneAndUpdate({ _id: id }, body);
    res.send(respuesta);
});

// Delete
router.delete("/usuarios/:id", async (req, res) => {
    const id = req.params.id;
    const respuesta = await ModelUsuarios.deleteOne({ _id: id });
    res.send(respuesta);
});

module.exports = router;