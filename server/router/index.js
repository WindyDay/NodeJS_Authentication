const DIR_PUBLIC = __dirname + "/public/";
express = require('express');

function route(server){
    server.use(express.static("server/public"));

    server.get('/',function(req, res){
        res.status(200);
        res.sendFile(DIR_PUBLIC+'index.html');
        console.log(DIR_PUBLIC+'index.html');
    })
}

module.exports = {
    route:route,
}