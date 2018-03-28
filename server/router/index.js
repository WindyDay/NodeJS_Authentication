const DIR_PUBLIC = __dirname + "/public/";
const users = require('./users');


function route(server){

    server.get('/', requireAthenticated, function(req, res){
        res.render('index');
        // res.status(200);
        // res.sendFile(DIR_PUBLIC+'index.html');
        // console.log(DIR_PUBLIC+'index.html');
    })

    server.use('/users', users);
}

function requireAthenticated(req,res, next){
    if(req.isAuthenticated()){
        return next();
    }else{
        req.flash('error_msg', 'You need to login first');
        res.redirect('/users/login');
    }
};

module.exports = {
    route:route,
}