const {response} = require ("express");
const User = require ('../models/user').User;
const passport = require("passport");

module.exports = {
    create: (req, res, next) => {
        const newUser = new User ({username: req.body.username});
        User.register (newUser, req.body.password, (error, user) => {
            if (user) next ();
            else console.log(error)
        });
    },

    authenticate: passport.authenticate ("local", {
        failureRedirect: "/",
        failureFlash: "Login non riuscito",
        successRedirect: "/getProducts",
        successFlash: "Login riuscito"
    }),

    logout: (req, res, next) => {
        req.logout(function(err) {
            if (err) { return next(err); }
            res.redirect('/');
        });
    }
}