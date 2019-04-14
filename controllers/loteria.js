module.exports = (app,Loteria,middleware = (req,res,next)=>{next();}) => {

    //RUTAS
    app.get('/api/loteria',(req,res) => {
        Loteria.find(function(err, loterias) {
            if (err)
                res.send(err);
            res.json(loterias);
        });
    });

    app.get('/api/loteria/:id',(req,res) => {
        Loteria.findOne({_id: req.params.id},function(err, loterias) {
            if (err)
                res.send(err);
            res.json(loterias);
        });
    });

    app.post('/api/loteria',middleware,(req,res) => {
        Loteria.create({numero: req.body.numero},function(err, loterias) {
            if (err)
                res.send(err);
            res.json(loterias);
        });
    });

    app.put('/api/loteria/:id',middleware,(req,res) => {
        Loteria.findOneAndUpdate({_id: req.params.id},{numero: req.body.numero},function(err, loterias) {
            if (err)
                res.send(err);
            res.json(loterias);
        });
    });

    app.delete('/api/loteria/:id',middleware,(req,res) => {
        Loteria.deleteOne({_id: req.params.id},function(err) {
            if (err)
                res.send(err);
            res.send("Numero Eliminado");
        });
    });    

    app.get('/api/loteria-numero/:numero',(req,res) => {
        Loteria.find({numero: req.params.numero},function(err, loterias) {
            if (err)
                res.send(err);
            res.json(loterias);
        });
    });
}