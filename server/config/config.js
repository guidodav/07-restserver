//===========================
//Puerto
//===========================

process.env.PORT = process.env.PORT || 4000


//===========================
//Entorno
//===========================

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

//===========================
//Entorno
//===========================

let urlDB;

/*if (process.env.NODE_ENV === 'dev') {

    urlDB = 'mongodb://localhost:27017/cafe'
} else {*/

urlDB = 'mongodb+srv://admin:1591ZACNfOWJle4i@cluster0.rg96z.mongodb.net/cafe'
    //}

process.env.urlDB = urlDB;