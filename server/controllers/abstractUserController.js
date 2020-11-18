/**
 * @Author:     Rachelle Gelden
 * @Created:    2020.11.15
 *
 * @Description: controller functions for the AbstractUser model
 *
 */
const db = require("../models");
const accountControllerUtils = require("./utils/accountControllerUtils");
const PasswordService = require('../services/PasswordService');

const AbstractUser = db.abstractUser;

const getMailingAddress = accountControllerUtils.getMailingAddress;

// Create and save abstract user
const createAbstractUser = (req, res) => {
    const salt = PasswordService.getSalt();

    // create abstract user object
    const abstractUser = {
        username: req.body.username,
        password: PasswordService.getHashedPassword(req.body.password, salt),
        salt: salt,
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phoneNumber: accountControllerUtils.formatPhoneNumber(req.body.phoneNumber),
        addressLine1: req.body.addressLine1,
        addressLine2: req.body.addressLine2 ? req.body.addressLine2 : null,
        city: req.body.city,
        province: req.body.province,
        postalCode: req.body.postalCode,
        hasDifferentMailingAddress: req.body.hasDifferentMailingAddress,
        ...getMailingAddress(req.body)
    }

    return AbstractUser.create(abstractUser);
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

const findUserByUsername = (username) =>
    AbstractUser.findAll({
        where: {
            username: username
        }
    });

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

module.exports = {
    createAbstractUser,
    findAllAbstractUsers,
    findAbstractUser,
    findUserByUsername
}
