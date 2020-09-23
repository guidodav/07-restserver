require('./config/config');

const express = require('express');
const mongoose = require('mongoose');
const app = express()


app.use(require('./routes/index')); //para referenciar al index donde se encuentran las rutas validas a utilizar (usuario, login, etc








mongoose.connect(process.env.urlDB, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true },
    (err, res) => {

        if (err) {
            throw err;

        } else {
            console.log('Base de datos online');
        }
    });

app.listen(process.env.PORT, () => {
    console.log("escuchando en el puerto: ", process.env.PORT);
})