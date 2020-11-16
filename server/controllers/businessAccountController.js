/**
 * @Author:     Rachelle Gelden
 * @Created:    2020.11.15
 *
 * @Description: controller functions for BusinessAccount model
 *
 */

const db = require("../models");
const BusinessAccount = db.businessAccount;

const createBusinessAccount = (req, res, uid) => {
    // TODO add validation here
    if (!req.body) {
        res.status(400).send({
            message: "Body cannot be empty"
        });
    }

    const businessAccount = {
        uid: uid,
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

    return BusinessAccount.create(businessAccount);
}

const findAllBusinessAccounts = (req, res) => {
    BusinessAccount.findAll()
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
    createBusinessAccount,
    findAllBusinessAccounts
}
