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


process.env.CADUCIDAD_TOKEN = '48h';


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


//===========================
//Google client id
//===========================

process.env.CLIENT_ID = process.env.CLIENT_ID || '1000070341896-bgdnncta0gqv4tcled5p6ucp341s8thi.apps.googleusercontent.com';