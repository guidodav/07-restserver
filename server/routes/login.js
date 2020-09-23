const express = require('express');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Usuario = require('../modelos/usuarios');
const app = express();


app.post('/login', (req, res) => {

    let body = req.body;

    Usuario.findOne({ email: body.email }, (err, usuarioDB) => {

        if (err) {

            return res.status(500).json({
                ok: false,
                err
            });
        }



        if (!usuarioDB) {

            return res.status(400).json({
                ok: false,
                err: { message: '(Usuario) o contraseña incorrectos' }
            });

        }

        /* if (!bcryptjs.compareSync(body.password, usuarioDB.password)) {

             return res.status(400).json({
                 ok: false,
                 err: { message: 'Usuario o (contraseña) incorrectos' }
             });

         }*/

        let token = jwt.sign({
            usuario: usuarioDB
        }, process.env.SEED, { expiresIn: process.env.CADUCIDAD_TOKEN }); //en nuestro payload viene 
        //todo el usuario de base de datos


        res.json({
            ok: true,
            usuario: usuarioDB,
            token
        });


    })


});





module.exports = app;