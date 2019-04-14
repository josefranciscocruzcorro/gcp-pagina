module.exports = (app,User,middleware = (req,res,next)=>{next();}) => {
    //RUTAS
    app.get('/api/user',middleware,(req,res) => {
        User.find(function(err, usuario) {
            if (err)
                res.send(err);
            res.json(usuario);
        });
    });

    app.get('/api/user/:id',middleware,(req,res) => {
        User.findOne({_id: req.params.id},function(err, usuario) {
            if (err)
                res.send(err);
            res.json(usuario);
        });
    });

    app.post('/api/user',middleware,(req,res) => {
        let fecha = new Date(); 
    
        const md5 = require('md5');

        User.findOne({ user: req.body.user },function(errx, usuarios) {
            if (errx) {
                res.send(err);
            }    
            if (usuarios) {
                res.json(null);
            }else{
                User.create({user: req.body.user,password: md5(req.body.password),token: fecha.getTime()+""},function(err, usuario) {
                    if (err)
                        res.send(err);
                    res.json(usuario);
                });
            }
        });
    });

    app.put('/api/user/:id',middleware,(req,res) => {
        let fecha = new Date(); 
    
        const md5 = require('md5');
        User.findOneAndUpdate({_id: req.params.id},{password: md5(req.body.password),token: fecha.getTime()+""},function(err, usuario) {
            if (err)
                res.send(err);
            res.json(usuario);
        });
    });

    app.delete('/api/user/:id',middleware,(req,res) => {
        User.deleteOne({_id: req.params.id},function(err) {
            if (err)
                res.send(err);
            res.send("Usuario Eliminado");
        });
    });

    app.post('/api/login',(req,res) => {
        let fecha = new Date(); 
    
        const md5 = require('md5');

        let newToken = fecha.getTime()+"";

        User.findOneAndUpdate({user: req.body.user, password: md5(req.body.password)},{token: newToken},function(err, usuario) {
            if (err)
                res.send(err);
               
            if(usuario){
                res.json({
                    user: usuario.user,
                    token: newToken
                });
            }else{
                res.json(null);
            }
        });
    });
}