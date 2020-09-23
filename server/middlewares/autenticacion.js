const jwt = require('jsonwebtoken');


//========================
//Verificar token
//========================

let verificaToken = (req, res, next) => {

    let token = req.get('token'); //lee el token del header

    jwt.verify(token, process.env.SEED, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                err: { message: 'Token invalido', err }

            });
        }

        req.usuario = decoded.usuario; //se sabe que dentro del objeto que se encriptó viene el usuario
        next();

    })


};


//========================
//Verifica ADMINROLE
//========================
let verificaAdmin_Rol = (req, res, next) => {

    let usuario = req.usuario;

    if (usuario.rol === 'ADMIN_ROLE') {
        next();
    } else {

        return res.status(401).json({
            ok: false,
            err: { message: 'Usuario no autorizado' }

        });
    }
};



module.exports = {

    verificaToken,
    verificaAdmin_Rol
}