module.exports = (app,direccion) => {
    app.get('/loteria',(req,res) => {
        res.sendFile(direccion + "/public/loteria.html");
    });
}