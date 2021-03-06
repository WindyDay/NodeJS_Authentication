
colors = require('colors')
express = require('express');
server = express();
router = require('./router');
morgan = require('morgan');
hbs = require('hbs');
bodyParser = require('body-parser');
session = require('express-session');
passport = require('passport');
LocalStrategy = require('passport-local').Strategy;
expressValidator = require('express-validator');
flash = require('connect-flash');

function start() {
    const PORT = process.env.PORT || 9000;

    //handlerbars
    server.set('view engine', 'html');
    server.engine('html', require('hbs').__express);

    server.set('views', __dirname + '/views');

    server.use(expressValidator()); //this line to be addded
    server.use(morgan('dev'));
    server.use(express.static(__dirname + "/public"));

    server.use(bodyParser.json());
    server.use(bodyParser.urlencoded({
        extended: false
    }));

    server.use(session({
        secret: 'keyboard cat lala',
        resave: true,
        saveUninitialized: true,
    }))

    server.use(passport.initialize());
    server.use(passport.session());
    //server.use(expressValidator(errorFormatter (param, msg, value, location)));

    server.use(flash());

    server.use((req,res,next)=>{
        res.locals.success_msg = req.flash('success_msg');
        res.locals.error_msg = req.flash('error_msg');
        res.locals.error = req.flash('error');
        res.locals.user = req.user || null;
        next();
    })

    router.route(server);

    server.listen(PORT, () => {
        console.log("Server is running on port " + PORT);
    })
}


module.exports = {
    start: start,
}