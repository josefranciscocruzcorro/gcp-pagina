const express = require("express");
const app = express();
const puerto = 8080;
const mongoose = require("mongoose");
const argv = require("optimist")
                .default('db_ip','localhost')
                .default('db_port',27017)
                .default('db_base','my_database')
                .default('pag_ip','localhost')
                .argv;

mongoose.connect("mongodb://" + argv.db_ip + ":" + argv.db_port + "/" + argv.db_base);

app.use(express.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method,user,token');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});


app.use("/js",express.static("public/js"));
app.use("/css",express.static("public/css"));


let UserM = require("./models/user");
let User = UserM(mongoose);

let LoteriaM = require("./models/loteria");
let Loteria = LoteriaM(mongoose);

let verificarToken = (req,res,next) => {
    User.findOne({user: req.header("user") , token: req.header("token")},function(err, usuario) {
        if (err)
            res.send(err);
        if (usuario) {
            next();
        }else{
            res.sendFile(__dirname + "/public/errores/noAutorizado.html");
        }
    });
}


let UserC = require("./controllers/user");
UserC(app,User,verificarToken);

let LoteriaC = require("./controllers/loteria");
LoteriaC(app,Loteria,verificarToken);

let Paginas = require("./controllers/paginas");
Paginas(app,__dirname);


app.listen(puerto, argv.pag_ip, () => {
    console.log("Servidor Corriendo en el puerto: " + puerto);
});