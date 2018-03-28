const DIR_PUBLIC = __dirname + "/public/";
const users = require('./users');


function route(server){

    server.get('/',function(req, res){
        try {
            console.log("THIS IS USER\n" +  req.user);
        } catch (error) {
            console.log('NO USER');
        }
        res.render('index');
        // res.status(200);
        // res.sendFile(DIR_PUBLIC+'index.html');
        // console.log(DIR_PUBLIC+'index.html');
    })

    server.use('/users', users);
}

module.exports = {
    route:route,
}