const express = require('express');

const app = express();

const bodyParser = require('body-parser');

const Usuario = require('../modelos/usuarios');

const bcryptjs = require('bcryptjs');

const _ = require('underscore');

const { verificaToken, verificaAdmin_Rol } = require('../middlewares/autenticacion');



// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());



app.get('/usuario', [verificaToken], function(req, res) { //no estoy ejecutando la funcion de middleware, estoy indicando que ese es el middleware que se va a usar

    /* return res.json({
         usuario: req.usuario,
         nombre: req.usuario.nombre,
         email: req.usuario.email
     });*/

    let desde = Number(req.query.desde) || 0;

    let limite = Number(req.query.limite) || 5;
    //let desde = req.query.desde || 0;
    Usuario.find({ estado: true }, 'nombre email img estado rol google') //trae aquellos con estado activo (true)
        .skip(desde) //salta de a cinco registros
        .limit(limite) //limita a cinco
        .exec((err, usuarios) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            Usuario.count({ estado: true }, (err, conteo) => { //funcion con callback para contar cantidad de registros. en este caso solo cuenta aquellos con estado activo (true)
                res.json({
                    ok: true,
                    cantidad: conteo,
                    usuarios: usuarios
                });
            })


        })
        //res.json('get usuario Localllllo')
})


app.post('/usuario', [verificaToken, verificaAdmin_Rol], function(req, res) {
    let body = req.body
    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcryptjs.hashSync(body.password, 10),
        rol: body.rol
    });

    usuario.save((err, usuarioDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }


        res.json({
            ok: true,
            usuario: usuarioDB
        });


    });


    /*if (body.nombre === undefined) {
        res.status(400).json({ ok: false, mensaje: 'El nombre es necesario' });
    } else {
        res.json({ persona: body });
    }*/
});

app.put('/usuario/:id', [verificaToken, verificaAdmin_Rol], function(req, res) {
    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'email', 'rol', 'estado', 'img']); //permite poner que campos podemos actualizar con put

    //delete body.password;
    //delete body.google;

    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, usuarioDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            usuario: usuarioDB
        });
    })


})

/*app.delete('/usuario/:id', function(req, res) {
    let id = req.params.id;
    Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }



        if (!usuarioBorrado) { //para validar que el usuario a borrar ya no existe en la base

            return res.status(400).json({
                ok: false,
                err: { message: 'Usuario no encontrado' }
            });


        }
        res.json({
            ok: true,
            usuario: usuarioBorrado
        });

    });
    //res.json('delete usuario')
})*/



app.delete('/usuario/:id', [verificaToken, verificaAdmin_Rol], function(req, res) {
    let id = req.params.id;
    let body = _.pick(req.body);

    body.estado = false;
    Usuario.findByIdAndUpdate(id, body, (err, usuarioBorrado) => {
        usuarioBorrado.estado = false;
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }



        if (!usuarioBorrado) { //para validar que el usuario a borrar ya no existe en la base

            return res.status(400).json({
                ok: false,
                err: { message: 'Usuario no encontrado' }
            });


        }
        res.json({
            ok: true,
            usuario: usuarioBorrado
        });

    });
    //res.json('delete usuario')
});


module.exports = app;