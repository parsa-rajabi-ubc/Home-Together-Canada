/**
 * @Author:     Rachelle Gelden
 * @Created:    2020.11.15
 *
 * @Description: controller functions for BusinessAccount model
 *
 */

const db = require("../models");
const { formatPhoneNumber } = require('./utils/accountControllerUtils');
const BusinessAccount = db.businessAccount;

const createBusinessAccount = (req, uid) => {
    const businessAccount = {
        uid: uid,
        businessName: req.body.businessName,
        isIncorporated: req.body.isIncorporated,
        incorporatedOwnersNames: req.body.incorporatedOwnersNames,
        businessPhoneNumber: formatPhoneNumber(req.body.businessPhoneNumber),
        businessCellPhoneNumber: formatPhoneNumber(req.body.businessCellPhoneNumber),
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

const findBusinessByUid = (uid) => {
    return BusinessAccount.findByPk(uid);
}

const updateLogo = (uid, logoAddress) =>
    BusinessAccount.update({ logo: logoAddress }, {
        where: {
            uid: uid
        }
    });

const removeLogo = (uid) =>
    BusinessAccount.update({ logo: null }, {
        where: {
            uid: uid
        }
    });

module.exports = {
    createBusinessAccount,
    findAllBusinessAccounts,
    findBusinessByUid,
    updateLogo,
    removeLogo
}
