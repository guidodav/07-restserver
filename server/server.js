require('./config/config');

const express = require('express');
const mongoose = require('mongoose');
const app = express()
const path = require('path');


app.use(require('./routes/index')); //para referenciar al index donde se encuentran las rutas validas a utilizar (usuario, login, etc

//habilitar la carpeta publica para que sea accedida desde cualquier lugar

app.use(express.static(path.resolve(__dirname, '../public')));
console.log(path.resolve(__dirname, '../public')); // lo que hace path es resolver el path, como que busca cual es el correcto y lo arma asi


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