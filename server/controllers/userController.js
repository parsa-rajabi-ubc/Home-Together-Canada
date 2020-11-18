/**
 * @Author:     Rachelle Gelden
 * @Created:    2020.11.15
 *
 * @Description: controller functions to create business and member users
 *
 */

const { validationResult } = require('express-validator/check');

const abstractUserController = require('./abstractUserController');
const businessAccountController = require('./businessAccountController');

const createBusinessUser = (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        res.status(202).json({ errors: errors.array() });
        return;
    }

    let abstractUserObj;
    abstractUserController.createAbstractUser(req, res)
        .then((abstractUser) => {
            abstractUserObj = {abstractUser};
            return businessAccountController.createBusinessAccount(req, res, abstractUser.uid)
        })
        .then((businessAccount) => {
            // TODO: a different JSON should maybe be sent back after this is hooked up to the react app
            res.status(201).send({
                abstractUserObj,
                businessAccount
            });
        })
        .catch(error => {
            res.status(500).send({
                message: error.message || "Error creating business user"
            });
        });
}

module.exports = {
    createBusinessUser
}