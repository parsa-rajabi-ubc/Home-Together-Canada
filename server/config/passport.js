/**
 * @Author:     Rachelle Gelden
 * @Created:    2020.11.21
 *
 * @Description: strategies for passport to register and login
 *
 */

const abstractUserController = require('../controllers/abstractUserController');
const businessAccountController = require('../controllers/businessAccountController');
const db = require('../models')
const AbstractUser = db.abstractUser;
const PasswordService = require('../services/PasswordService');

// https://medium.com/@saranyamohandas2/passportjs-with-mysql-sequelize-and-expressjs-56fb903aaf8f
module.exports = function (passport) {
    const LocalStrategy = require('passport-local').Strategy;

    passport.use('local-signup', new LocalStrategy(
        {
            usernameField: 'username',
            passwordField: 'password',
            passReqToCallback: true     // allows us to pass back the entire request to the callback
        },
        function(req, username, password, done) {

            let abstractUserObj;
            abstractUserController.createAbstractUser(req)
                .then((abstractUser) => {
                    abstractUserObj = {...abstractUser};
                    return businessAccountController.createBusinessAccount(req, abstractUser.uid)
                })
                .then((businessAccount) => {
                    const user = {
                        ...abstractUserObj,
                        ...businessAccount
                    };

                    return done(null, user.dataValues);
                })
                .catch(error => {
                    return done(null, false, { message: error.message || "Error creating business user"});
                });
        }
    ));

    // TODO: add strategy for member user

    //LOCAL SIGNIN
    passport.use('local-signin', new LocalStrategy(
        {
            usernameField: 'username',
            passwordField: 'password',
            passReqToCallback: true // allows us to pass back the entire request to the callback
        },

        function (req, username, password, done) {

            const isValidPassword = function (savedPassword, salt, passwordAttempt) {
                return savedPassword === PasswordService.getHashedPassword(passwordAttempt, salt);
            }
            AbstractUser.findOne({
                where: {
                    username: username
                }
            }).then(function (user) {
                if (!user) {
                    return done(null, false, {
                        message: 'Username does not exist'
                    });
                }

                if (!isValidPassword(user.password, user.salt, password)) {
                    return done(null, false, {
                        message: 'Incorrect password.'
                    });
                }

                const userinfo = user.get();
                return done(null, userinfo);

            }).catch(function (err) {
                return done(null, false, {
                    message: 'Something went wrong with your Signin ' + err.message
                });
            });
        }
    ));

    //serialize
    passport.serializeUser(function (user, done) {
        done(null, user.uid);
    });

    // deserialize user
    passport.deserializeUser(function (id, done) {
        abstractUserController.findAbstractUser(id).then(user => {
            if (user) {
                done(null, user.get());
            } else {
                done(user.errors, null);
            }
        });
    });
}
