const express = require('express');
let { verificaToken, verificaAdmin_Rol } = require('../middlewares/autenticacion');
//const { populate } = require('../modelos/categoria');

let app = express();
let Categoria = require('../modelos/categoria');

//
// Mostrar todas las categorias
//
app.get('/categoria', (req, res) => {

    let id = req.params._id;

    Categoria.find({})
        .sort('descripcion') //ordena por descripcion
        .populate('usuario', 'nombre email') //completa con datos del usuario (nombre y mail)
        .exec((err, categorias) => {


            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            if (!categorias) {
                return res.status(400).json({
                    ok: false,
                    err
                });

            }
            return res.json({
                ok: true,
                categorias
            });


        });



});





//
// Mostrar una categoria por id
//
app.get('/categoria/:id', [verificaToken], (req, res) => {
    //Categoria.findById(...);
    let id = req.params.id;

    Categoria.findById(id, (err, categoriaDB) => {


        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                err: { message: 'El id no es valido' }
            });

        }
        return res.json({
            ok: true,
            categoriaDB
        });


    });

});



//
// crear una nueva categoria <-se puede usar para grabar datos en el modelo de firmas
//
app.post('/categoria', verificaToken, (req, res) => {

    let body = req.body;

    let categoria = new Categoria({
        descripcion: body.descripcion,
        usuario: req.usuario._id
    })

    console.log(categoria);

    categoria.save((err, categoriaDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                err
            });

        }
        return res.json({
            ok: true,
            categoria: categoriaDB
        });


    });


});




//
// actualizar la categoria
//
app.put('/categoria/:id', verificaToken, (req, res) => {
    //regresa la nueva categoria
    //req.usuario.id

    let id = req.params.id;

    let descrCategoria = { descripcion: req.body.descripcion };

    Categoria.findByIdAndUpdate(id, descrCategoria, { new: true, runValidators: true }, (err, categoriaDB) => {
        //Categoria.findByIdAndUpdate()
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        return res.json({
            ok: true,
            categoria: categoriaDB
        });
    })






});


//
// borrador de  categoria
//
app.delete('/categoria/:id', [verificaToken, verificaAdmin_Rol], (req, res) => {
    //solo un administrador puede borrar las categorias
    //Categoria.findByIdAndRemove
    let id = req.params.id;


    Categoria.findByIdAndRemove(id, (err, categoriaDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                err: { message: 'No se encontro la categoria a borrar' }
            });
        }

    })

    return res.json({
        ok: true,
        message: 'La categoria ha sido borrada'
    });

});





module.exports = app;