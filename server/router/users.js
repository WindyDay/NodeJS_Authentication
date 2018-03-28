//  /users
colors = require('colors')
var express = require('express')
var router = express.Router()
var User = require('../models/user')
var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;


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

        if (errors) {
            res.render('register', {
                errors: errors,
            })
        } else {
            var newUser = new User.User({
                fullName: fullName,
                email: email,
                password: password
            });

            User.createNewUser(newUser, (err, user) => {
                if (err) {
                    console.log(err.message.yellow);
                    req.flash('error', 'Email existed');
                    res.redirect('/users/login');
                } else {
                    console.log(JSON.stringify(user).green);
                    req.flash('success_msg', 'You can now login')
                    res.redirect('/users/login');
                };
            });

        }

    })


router.get('/login', function (req, res) {
    res.render('login');
});

passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    },
    function (email, password, done) {
        User.findUserByEmail(email, function (err, user) {
            if (err) {
                return done(err);
            }
            if (!user) {
                return done(null, false, {
                    message: 'Incorrect email.'
                });
            }

            if (User.matchPassword(password, user.password)) {
                
                return done(null, user);
            } else {
                return done(null, false, {
                    message: 'Incorrect password.'
                });
            }
        });

    }
));

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.findUserById(id, function (err, user) {
        done(err, user);
    });
});

router.post('/login', (req, res, next) => {
        req.body.email = req.body.email.trim().toLowerCase();
        next();
    },
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/users/login',
        failureFlash: true
    }),
    function (req, res) {
        res.redirect('/');
    });

router.get('/logout', function (req, res) {
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/users/login');
});

module.exports = router;