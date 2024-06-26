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

const findAbstractUser = (id) => AbstractUser.findByPk(id);

const findUsersByUsernames = (usernames) =>
    AbstractUser.findAll({
        where: {
            username: usernames
        }
    });

const findUserByUsername = username =>
    AbstractUser.findOne({
        where: {
            username: username
        }
    })

const findUserByEmail = (email) =>
    AbstractUser.findAll({
        where: {
            email: email
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

const changeOwnPassword = (req, res) => {
    AbstractUser.update({ password: PasswordService.getHashedPassword(req.body.newPassword, req.user.salt) }, {
        where: {
            uid: req.user.uid
        }
    })
        .then(data => {
            res.status(200).send({ success: true });
        })
        .catch(err => res.status(500).send({ success: false, message: err.message }));
}

const changeUserPassword = async (username, password) => {
    const user = await findUserByUsername(username);

    return AbstractUser.update({ password: PasswordService.getHashedPassword(password, user.salt) }, {
        where: {
            uid: user.uid
        }
    });
}

const deleteAccount = uid =>
    AbstractUser.destroy({
        where: {
            uid: uid
        }
    });

const updateAbstractUser = (req, res) => {
    return AbstractUser.update({
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
    }, {
        where: {
            uid: req.user.uid
        }
    });
}

const banUser = uid => {
    return AbstractUser.update({
        isBanned: true
    }, {
        where: {
            uid: uid
        }
    });
}

const listBannedUsers = () => {
    return AbstractUser.findAll({
        attributes: ['username'],
        where: {
            isBanned: true
        }
    });
}

const exportAllUserData = () => {
    return AbstractUser.findAll({
        include: { all: true }
    });
}

module.exports = {
    createAbstractUser,
    findAllAbstractUsers,
    findAbstractUser,
    findUserByUsername,
    findUsersByUsernames,
    findUserByEmail,
    changeOwnPassword,
    changeUserPassword,
    updateAbstractUser,
    deleteAccount,
    banUser,
    listBannedUsers,
    exportAllUserData
}
