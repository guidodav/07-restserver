const express = require('express');


let { verificaTokens, verificaToken } = require('../middlewares/autenticacion');
const { populate } = require('../modelos/categoria');

let app = express();

let Producto = require('../modelos/producto');
let Categoria = require('../modelos/categoria');
const { json } = require('body-parser');
const producto = require('../modelos/producto');
const _ = require('underscore');


//===========================
// Obtener Producto
//===========================

app.get('/productos', verificaToken, (req, res) => {

    let desde = req.query.desde || 0;
    desde = Number(desde);
    Producto.find({ disponible: true })
        .skip(desde)
        .limit(5)
        .populate('categoria', 'descripcion')
        .populate('usuario', 'nombre email')
        .exec((err, productos) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });


            }

            if (!productos) {
                return res.status(400).json({
                    ok: false,
                    message: 'No hay productos disponibles'
                });

            }

            return res.status(201).json({
                ok: true,
                productos
            })



        });


});

//===========================
// Obtener un producto por id
//===========================

app.get('/productos/:id', verificaToken, (req, res) => {

    let id = req.params.id;

    Producto.findById(id)
        .populate('categoria', 'descripcion')
        .populate('usuario', 'nombre email')
        .exec((err, productoDB) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    message: 'No hay productos para ese ID' //lo puse aqui al error
                });
            }
            if (!productoDB) {
                return res.status(400).json({
                    ok: false,
                    message: 'No hay productos para ese IDDDD'
                });

            }



            return res.status(201).json({
                ok: true,
                productoDB
            })



        });


});

//===========================
// para buscar un producto
//===========================

app.get('/productos/buscar/:termino', verificaToken, (req, res) => {

    let termino = req.params.termino;
    let regex = new RegExp(termino, 'i'); //expresion regular para que sea insensible a las mayusculas y minusculas


    Producto.find({ nombre: regex })
        .populate('categoria', 'nombre')
        .exec((err, productos) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    message: 'No hay productos para ese ID'
                });
            }
            if (!productos) {
                return res.status(400).json({
                    ok: false,
                    message: 'No hay productos para ese IDDDD'
                });

            }



            return res.status(201).json({
                ok: true,
                productos
            })

        })

});

//===========================
// para crear un nuevo producto
//===========================

app.post('/productos/', verificaToken, (req, res) => {

    let body = req.body;

    let producto = new Producto();
    producto.nombre = body.nombre;
    producto.precioUni = body.precioUni;
    producto.descripcion = body.descripcion;
    producto.usuario = req.usuario._id;
    producto.categoria = body.categoria;
    producto.disponible = body.disponible;


    producto.save((err, productoDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });

        }
        return res.status(201).json({
            ok: true,
            productoDB
        })
    });



    //grabar un usuario
    //grabar un producto del usuario

});


//===========================
// para actualizar un producto
//===========================

app.put('/productos/:id', verificaToken, (req, res) => {

    let id = req.params.id;

    let body = _.pick(req.body, ['nombre', 'precioUni', 'descripcion', 'categoria', 'disponible']);
    console.log(body); //permite poner que campos podemos actualizar con put


    Producto.findByIdAndUpdate(id, body, { new: true, runValidators: true })
        .populate('categoria', 'descripcion')
        .populate('usuario', 'nombre email')
        .exec((err, productoDB) =>

            {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        message: 'No hay productos para ese ID'
                    });


                }

                if (!productoDB) {
                    return res.status(400).json({
                        ok: false,
                        message: 'No hay productos para ese ID'
                    });

                }

                return res.status(201).json({
                    ok: true,
                    productoDB
                })


            });

});




//===========================
// para borrar un producto
//===========================

app.delete('/productos/:id', verificaToken, (req, res) => {

    let id = req.params.id;

    Producto.findByIdAndUpdate(id, { disponible: false }, { new: true, runValidators: true }, (err, productoDB) =>

        {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    message: 'No hay productos para ese ID'
                });


            }

            if (!productoDB) {
                return res.status(400).json({
                    ok: false,
                    message: 'No hay productos para ese ID'
                });

            }

            return res.status(201).json({
                ok: true,
                productoDB,
                mensaje: 'producto borrado'
            })

            //que disponible pase a falso
        });

});


module.exports = app;