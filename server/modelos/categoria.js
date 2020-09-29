const mongoose = require('mongoose');

var uniqueValidator = require('mongoose-unique-validator');
//require('../routes/usuario');

let Schema = mongoose.Schema;

let categoriaSchema = new Schema({
    descripcion: {
        type: String,
        unique: true,
        required: [true, 'La descripción es obligatoria']
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    }
});







module.exports = mongoose.model('Categoria', categoriaSchema);