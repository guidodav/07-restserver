//===========================
//Puerto
//===========================

process.env.PORT = process.env.PORT || 4000


//===========================
//Vencimiento del token
//===========================
// 60 segundos
// 60 minutos
// 24 horas
// 30 dias


process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;


//===========================
//Semilla de autenticacion
//===========================

process.env.SEED = 'este-es-el-secret-de-desarrollo' || process.env.SEED;



//===========================
//Entorno
//===========================

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';



//===========================
//Entorno
//===========================

let urlDB;

if (process.env.NODE_ENV === 'dev') {

    urlDB = 'mongodb://localhost:27017/cafe'
} else {

    urlDB = process.env.MONGO_URI;
}

process.env.urlDB = urlDB;