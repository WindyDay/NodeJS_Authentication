//  /users

var express = require('express')
var router = express.Router()
var user = require('../models/user')

router.get('/register', function (req, res) {
    res.render('register')
})

router.post('/register',
    function (req, res) {
        let fullName = req.body.fullName;
        let email = req.body.email;
        let password = req.body.password;
        let password2 = req.body.password2;

        req.checkBody('fullName', 'Name is required').notEmpty();
        req.checkBody('email', 'Email is required').notEmpty();
        req.checkBody('email', 'Email is invalid').isEmail();
        req.checkBody('password', 'Password is required').notEmpty();
        req.checkBody('password2', 'Password do not match').equals(req.body.password);

        const errors = req.validationErrors();

        if(errors){
            res.render('register', {
                errors:errors,
            })
        }
        else{
            var newUser = new user.User({
                fullName:fullName,
                email:email,
                password:password
            });

            user.createNewUser(newUser);

            res.redirect('login' + '/?register=\"success\"');
        }

    })

router.get('/login', function (req, res) {
    res.render('login')
})

module.exports = router;