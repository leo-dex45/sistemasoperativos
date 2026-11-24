const mongoose = require("mongoose");

//ENV produccion
mongoose.connect("mongodb://database:27017/flordenectar")
.then(db => console.log("DB is connected to ", db.connection.host))
.catch(err => console.error(err));


