//Importamos EXPRESS
const express = require("express");

//Generando la app web
const app = express();

app.use(express.json())

require("./database")
app.use(require("./routes/index.routes.js"))

//Puerto del servicio web
app.listen(3000);
console.log("Server on port: ", 3000);