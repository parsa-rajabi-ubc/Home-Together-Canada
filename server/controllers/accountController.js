/**
 * @Author:     Rachelle Gelden
 * @Created:    2020.11.09
 *
 * @Description: controllers to interact with the different account models
 *
 */

const db = require("../models");
const accountControllerUtils = require("./accountControllerUtils");

const AbstractUser = db.abstractUser;
const BusinessAccount = db.businessAccount;

const getMailingAddress = accountControllerUtils.getMailingAddress;

// Create and save abstract user
const createAbstractUser = (req, res) => {
    // TODO add validation here
    if (!req.body) {
        res.status(400).send({
            message: "Body cannot be empty"
        });
    }
    const salt = 'xxxx';    // TODO generate salt

    // create abstract user object
    const abstractUser = {
        username: req.body.username,
        password: req.body.password, // TODO hash password
        salt: salt,
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phoneNumber: req.body.phoneNumber,
        addressLine1: req.body.addressLine1,
        addressLine2: req.body.addressLine2 ? req.body.addressLine2 : null,
        city: req.body.city,
        province: req.body.province,
        postalCode: req.body.postalCode,
        hasDifferentMailingAddress: req.body.hasDifferentMailingAddress,
        ...getMailingAddress(req.body)
    }

    AbstractUser.create(abstractUser)
        .then(data => {
            res.status(201).send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "An error occurred when creating the abstract user"
            });
        });
}

const findAbstractUser = (req, res) => {
    const uid = req.params.id;

    AbstractUser.findByPk(uid)
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error retrieving user with id=" + uid
            });
        });
}

const findAllAbstractUsers = (req, res) => {
    AbstractUser.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tutorials."
            });
        });
}

const createBusinessAccount = (req, res) => {
    // TODO add validation here
    if (!req.body) {
        res.status(400).send({
            message: "Body cannot be empty"
        });
    }

    const businessAccount = {
        uid: req.body.uid,  // TODO: update uid to be passed in as an argument when
        businessName: req.body.businessName,
        logo: req.body.logo,
        isIncorporated: req.body.isIncorporated,
        incorporatedOwnersNames: req.body.incorporatedOwnersNames,
        businessPhoneNumber: req.body.businessPhoneNumber,
        businessCellPhoneNumber: req.body.businessCellPhoneNumber,
        isNationWide: req.body.isNationWide,
        mapAddressLine1: req.body.mapAddressLine1,
        mapAddressLine2: req.body.mapAddressLine2,
        mapCity: req.body.mapCity,
        mapProvince: req.body.mapProvince,
        mapPostalCode: req.body.mapPostalCode,
        mapLatitude: req.body.mapLatitude,
        mapLongitude: req.body.mapLongitude,
        website: req.body.website
    }

    BusinessAccount.create(businessAccount)
        .then(data => {
            res.status(201).send(data);
        })
        .catch(err => {
            console.log('error: ', err);
            res.status(500).send({
                message: err.message || "An error occurred when creating the business account"
            })
        })
}

module.exports = {
    createAbstractUser,
    findAbstractUser,
    findAllAbstractUsers,
    createBusinessAccount
}