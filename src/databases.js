const mongoose = require("mongoose")
const { mongodb } = require('./keys')//llamos a la base de datos para verificar si se conecto

mongoose.connect(mongodb.URI, {})
    .then(db => console.log('La base de datos esta conectada'))
    .catch(err => console.error(err));