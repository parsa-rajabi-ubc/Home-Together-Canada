/**
 * @Author:     Rachelle Gelden
 * @Created:    2021.02.21
 *
 * @Description: controller functions for the the listingCategory model
 *
 */
const isEmpty = require('lodash/isEmpty');

const db = require('../models');
const { BUSINESS_SERVICES_CATEGORIES, MEMBER_SERVICE_CATEGORIES, BUSINESS_CLASSIFIEDS_CATEGORIES } = require('../constants/listingConstants');

const ListingCategory = db.listingCategory;

const createCategory = (category, isClassified) => {
    return ListingCategory.add({
        name: category,
        isClassified
    });
}

const findAllListingCategories = (req, res) => {
    ListingCategory.findAll()
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

const findCategoryIdByName = categoryName => {
    return ListingCategory.findOne({
        attributes: ['id'],
        where: {
            name: categoryName
        }
    });
}

const populateDBWithCategories = () => {
    return ListingCategory.findAll()
        .then(categories => {
            // only populate if DB has been cleared
            if (isEmpty(categories)) {
                // NOTE: IDs are auto-incremented by 10 on ClearDB, we are hard coding IDs here in order to establish correct
                // relation to subcategories
                return ListingCategory.bulkCreate([
                    { id: 1, name: BUSINESS_SERVICES_CATEGORIES.CO_HOUSING, isClassified: false },
                    { id: 2, name: BUSINESS_SERVICES_CATEGORIES.SHARED_HOME_SERVICES, isClassified: false },
                    { id: 3, name: BUSINESS_SERVICES_CATEGORIES.SHARED_BUSINESS_SERVICES, isClassified: false },
                    { id: 4, name: BUSINESS_SERVICES_CATEGORIES.GOVERNMENT_SERVICES, isClassified: false },
                    { id: 5, name: MEMBER_SERVICE_CATEGORIES.MEMBER_HOME, isClassified: false },
                    { id: 6, name: BUSINESS_CLASSIFIEDS_CATEGORIES.RENTALS, isClassified: true },
                    { id: 7, name: BUSINESS_CLASSIFIEDS_CATEGORIES.HOUSE_YARD, isClassified: true },
                    { id: 8, name: BUSINESS_CLASSIFIEDS_CATEGORIES.LEGAL_SALES, isClassified: true },
                    { id: 9, name: BUSINESS_CLASSIFIEDS_CATEGORIES.CLASSES_CLUBS, isClassified: true }
                ]);
            }
        });
}

module.exports = {
    findAllListingCategories,
    findCategoryIdByName,
    populateDBWithCategories
}
