express = require('express');
server = express();
router = require('./router');
morgan = require('morgan');


function start(){
    const PORT = process.env.PORT || 9000;

    server.use(morgan('tiny'));
    
    router.route(server);

    server.listen(PORT, ()=>{
        console.log("Server is running on port " + PORT);
    })
}

module.exports = {
    start : start,
}