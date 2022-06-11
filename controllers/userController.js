const {response} = require ("express");
const User = require ('../models/user').User;
const passport = require("passport");

module.exports = {
    create: (req, res, next) => {
        const newUser = new User ({username: req.body.username, type: req.body.type});
        User.register(newUser, req.body.password, (error, user) => {
            if (user) res.send(user);
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
            if(err)
                console.log(err)
            res.send("Logout effettuato con successo")
        });
    },

    isLogged: (req, res, next) => {
        res.send({
            isLogged: req.isAuthenticated(),
            user: req.user
        })
    }
}