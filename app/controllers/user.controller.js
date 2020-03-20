const User = require('../models/user.model.js');
const passwordHash = require("password-hash");
const jwt = require('jwt-simple');
const config = require('../../config');

function tokenForUser(user) {
    const timestamp = new Date().getTime();
    return jwt.encode({ sub: user.id, iat: timestamp}, config.secret);
}

exports.signup = function(req, res) {
    //console.log(req.body);
    if (!req.body.email ||
        !req.body.password ||
        !req.body.lastName ||
        !req.body.firstName) {
        //Le cas où l'email ou bien le password ne serait pas soumit ou nul
        res.status(400).json({
            "text": "Requête invalide"
        })

    } else {

        let user = {
            email: req.body.email,
            password: passwordHash.generate(req.body.password),
            lastName: req.body.lastName,
            firstName: req.body.firstName
        };

        console.log(user);
        let findUser = new Promise(function (resolve, reject) {
            User.findOne({
                email: user.email
            }, function (err, result) {
                if (err) {
                    reject(500);
                } else {
                    if (result) {
                        reject(204)
                    } else {
                        resolve(true)
                    }
                }
            })
        });
        console.log('find user then');
        findUser.then(function () {
            let _u = new User(user);
            _u.save(function (err, user) {
                if (err) {
                    console.log('fail saving');
                    console.log(err);
                    res.status(500).json({
                        "text": "Erreur interne first"
                    })
                } else {

                    res.status(200).json({
                        "text": "Succès",
                        "token": tokenForUser(user),
                        "user" : user
                    });
                }
            })
        }, function (error) {
            switch (error) {
                case 500:
                    console.log('fail find one');
                    res.status(500).json({
                        "text": "Erreur interne switch",
                        "error" : error
                    });
                    break;
                case 204:
                    res.status(204).json({
                        "text": "L'adresse email existe déjà"
                    });
                    break;
                default:
                    res.status(500).json({
                        "text": "Erreur interne"
                    })
            }
        })
    }
};

exports.login = function (req, res) {
    //console.log(req.body);
    if (!req.body.email || !req.body.password) {
        //Le cas où l'email ou bien le password ne serait pas soumit ou nul
        res.status(400).json({
            "text": "Requête invalide"
        })
    } else {
        User.findOne({
            email: req.body.email
        }, function (err, user) {
            if (err) {
                res.status(500).json({
                    "text": "Erreur interne"
                })
            }
            else if (!user) {
                res.status(401).json({
                    "text": "L'utilisateur n'existe pas"
                })
            }
            else {
                if (user.authenticate(req.body.password)) {
                    res.status(200).json({
                        "token": tokenForUser(user),
                        "text": "Authentification réussi",
                        "user":user,
                        "email":req.body.email
                    })
                }
                else {
                    res.status(401).json({
                        "text": "Mot de passe incorrect"
                    })
                }
            }
        })
    }
};

