/**
 * @Author:     Rachelle Gelden
 * @Created:    2020.11.21
 *
 * @Description: strategies for passport to register and login users
 *
 */

const abstractUserController = require('../controllers/abstractUserController');
const businessAccountController = require('../controllers/businessAccountController');
const memberAccountController = require('../controllers/memberAccountController');
const areaOfInterstController = require('../controllers/areaOfInterestController');
const db = require('../models')
const AbstractUser = db.abstractUser;
const PasswordService = require('../services/PasswordService');

// https://medium.com/@saranyamohandas2/passportjs-with-mysql-sequelize-and-expressjs-56fb903aaf8f
module.exports = function (passport) {
    const LocalStrategy = require('passport-local').Strategy;

    passport.use('local-signup-business', new LocalStrategy(
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
                        ...abstractUserObj.dataValues,
                        ...businessAccount.dataValues
                    };

                    return done(null, user);
                })
                .catch(error => {
                    return done(null, false, { message: error.message || "Error creating business user"});
                });
        }
    ));

    // TODO: add strategy for member user
    passport.use('local-signup-member', new LocalStrategy(
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
                    return memberAccountController.createMemberAccount(req, abstractUser.uid)
                })
                .then(memberAccount => {
                    const user = {
                        ...abstractUserObj.dataValues,
                        ...memberAccount.dataValues
                    };

                    // add entries to roommates table
                    // find other user(s) and make sure they exist
                    if (req.body.partnerUsername) {
                        abstractUserController.findUserByUsername(req.body.partnerUsername)
                            .then(partnerUser => {
                                if (partnerUser) {
                                    memberAccount.addRoommate(partnerUser.uid,
                                        {
                                            through: {
                                                relationship: req.body.status
                                            }
                                        });
                                }
                            });

                    } else if (req.body.existingGroupUsernames) {
                        req.body.existingGroupUsernames.forEach(username => {
                            abstractUserController.findUserByUsername(username)
                                .then(roommate => {
                                    memberAccount.addRoommate(roommate.uid,
                                        {
                                            through: {
                                                relationship: req.body.status
                                            }
                                        });
                                });
                        });
                    }

                    // add entries to area of interest table
                    if (req.body.areasOfInterest && req.body.areasOfInterest.length) {
                        req.body.areasOfInterest.forEach(areaOfInterest => {
                            areaOfInterstController.createAreaOfInterest(areaOfInterest, user.uid)
                                // TODO: handle this better (ideally add logging)
                                .then((areaOfInterest) => {
                                    console.log('Area of interest created: ', areaOfInterest);
                                })
                                .catch(err => {
                                    console.log('An error occurred adding an area of interest: ', err.message);
                                });
                        });
                    }

                    return done(null, user);
                })
                .catch(error => {
                    return done(null, false, { message: error.message || "Error creating member"});
                });
        }
    ));

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

                if (user.isBanned) {
                    return done(null, false, {
                        message: 'Account is frozen. Please contact Home Together Canada for more information.'
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
