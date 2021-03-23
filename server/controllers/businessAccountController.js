/**
 * @Author:     Rachelle Gelden
 * @Created:    2020.11.15
 *
 * @Description: controller functions for BusinessAccount model
 *
 */
const db = require("../models");
const { formatPhoneNumber } = require('./utils/accountControllerUtils');
const { getGeographicalCoordinatesFromAddress } = require('./utils/locationUtils');
const BusinessAccount = db.businessAccount;
const AbstractUser = db.abstractUser;

const createBusinessAccount = async (req, uid) => {
    const fullSearchableAddress = `${req.body.mapAddressLine1} ${req.body.mapCity} ${req.body.mapProvince}`;
    const coordinates = await getGeographicalCoordinatesFromAddress(fullSearchableAddress);

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
        mapLatitude: coordinates.latitude,
        mapLongitude: coordinates.longitude,
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

const getLogo = (uid) =>
    BusinessAccount.findAll({
        attributes: ['logo'],
        where: {
            uid: uid
        }
    });


const updateBusiness = req => {
    const fullSearchableAddress = `${req.body.mapAddressLine1} ${req.body.mapCity} ${req.body.mapProvince}`;
    const coordinates = getGeographicalCoordinatesFromAddress(fullSearchableAddress);
    return BusinessAccount.update({
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
        mapLatitude: coordinates.latitude,
        mapLongitude: coordinates.longitude,
        website: req.body.website
    }, {
        where: {
            uid: req.user.uid
        }
    })
}

const getAllBusinessData = () => {
    return BusinessAccount.findAll({
        include: [
            {
                model: AbstractUser
            }
        ]
    });
}

module.exports = {
    createBusinessAccount,
    findAllBusinessAccounts,
    findBusinessByUid,
    updateLogo,
    removeLogo,
    updateBusiness,
    getLogo,
    getAllBusinessData
}
