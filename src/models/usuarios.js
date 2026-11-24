const mongoose = require("mongoose");

const usuariosSchema = new mongoose.Schema({
    nombres: String,
    apellidos: String,
    correo: String,
    contrasena_hash: String,
    telefono: String,
    tipo_usuario: String,
    fecha_registro: Date,

    direcciones: [{
        id_direccion: Number,
        direccion_linea: String,
        departamento: String,
        provincia: String,
        distrito: String,
        referencia: String,
        codigo_postal: String,
        _id: false
    }]
}, {versionKey: false});

const ModelUsuarios = mongoose.model("Usuarios", usuariosSchema, "usuarios");
module.exports = ModelUsuarios;