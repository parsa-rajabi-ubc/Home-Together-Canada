const db = require('../models');
const ListingSubcategory = db.listingSubcategory;
const {
    CO_HOUSING_SUBCATEGORIES,
    SHARED_HOME_SERVICES_SUBCATEGORIES,
    SHARED_BUSINESS_SERVICES_SUBCATEGORIES,
    GOVERNMENT_SERVICES_SUBCATEGORIES,
    RENTALS_SUBCATEGORIES,
    HOUSE_YARD_SERVICES_SUBCATEGORIES,
    LEGAL_SALES_AGENCIES_SUBCATEGORIES,
    CLASSES_CLUBS_EVENTS_SUBCATEGORIES
} = require('../constants/listingConstants');

const findAllListingSubcategories = (req, res) => {
    ListingSubcategory.findAll()
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

const findListingSubcategoryIds = (subcategoryNamesList, categoryId) => {
    return ListingSubcategory.findAll({
        attributes: ['id'],
        where: {
            name: subcategoryNamesList,
            ListingCategoryId: categoryId
        }
    });
}

const populateDBWithSubcategories = () => {
    return ListingSubcategory.bulkCreate([
        { name: CO_HOUSING_SUBCATEGORIES.CO_HOUSING, ListingCategoryId: 1 },
        { name: CO_HOUSING_SUBCATEGORIES.CO_OP, ListingCategoryId: 1 },
        { name: CO_HOUSING_SUBCATEGORIES.COMMUNAL, ListingCategoryId: 1 },
        { name: CO_HOUSING_SUBCATEGORIES.ECO, ListingCategoryId: 1 },
        { name: CO_HOUSING_SUBCATEGORIES.INTER_GEN, ListingCategoryId: 1 },
        { name: CO_HOUSING_SUBCATEGORIES.SHARED_LIVING, ListingCategoryId: 1 },
        { name: CO_HOUSING_SUBCATEGORIES.OTHER, ListingCategoryId: 1 },
        { name: SHARED_HOME_SERVICES_SUBCATEGORIES.MEET_UPS, ListingCategoryId: 2 },
        { name: SHARED_HOME_SERVICES_SUBCATEGORIES.WORKSHOPS, ListingCategoryId: 2 },
        { name: SHARED_HOME_SERVICES_SUBCATEGORIES.CLASSES, ListingCategoryId: 2 },
        { name: SHARED_HOME_SERVICES_SUBCATEGORIES.OTHER, ListingCategoryId: 2 },
        { name: SHARED_BUSINESS_SERVICES_SUBCATEGORIES.GROUPS_ORG, ListingCategoryId: 3 },
        { name: SHARED_BUSINESS_SERVICES_SUBCATEGORIES.COMPANION_FINDING, ListingCategoryId: 3 },
        { name: SHARED_BUSINESS_SERVICES_SUBCATEGORIES.DATING, ListingCategoryId: 3 },
        { name: SHARED_BUSINESS_SERVICES_SUBCATEGORIES.DATING_ED, ListingCategoryId: 3 },
        { name: SHARED_BUSINESS_SERVICES_SUBCATEGORIES.OTHER, ListingCategoryId: 3 },
        { name: GOVERNMENT_SERVICES_SUBCATEGORIES.SENIORS, ListingCategoryId: 4 },
        { name: GOVERNMENT_SERVICES_SUBCATEGORIES.LOW_INCOME, ListingCategoryId: 4 },
        { name: GOVERNMENT_SERVICES_SUBCATEGORIES.YOUTHS, ListingCategoryId: 4 },
        { name: GOVERNMENT_SERVICES_SUBCATEGORIES.HOMELESS, ListingCategoryId: 4 },
        { name: GOVERNMENT_SERVICES_SUBCATEGORIES.INDIVIDUALS_GROUPS, ListingCategoryId: 4 },
        { name: GOVERNMENT_SERVICES_SUBCATEGORIES.HOME_CARE, ListingCategoryId: 4 },
        { name: GOVERNMENT_SERVICES_SUBCATEGORIES.OTHER, ListingCategoryId: 4 },
        { name: RENTALS_SUBCATEGORIES.HOUSE, ListingCategoryId: 6 },
        { name: RENTALS_SUBCATEGORIES.PARTIAL_HOUSE, ListingCategoryId: 6 },
        { name: RENTALS_SUBCATEGORIES.DUPLEX, ListingCategoryId: 6 },
        { name: RENTALS_SUBCATEGORIES.APART, ListingCategoryId: 6 },
        { name: RENTALS_SUBCATEGORIES.CONDO, ListingCategoryId: 6 },
        { name: RENTALS_SUBCATEGORIES.RURAL, ListingCategoryId: 6 },
        { name: RENTALS_SUBCATEGORIES.COUNTRY, ListingCategoryId: 6 },
        { name: RENTALS_SUBCATEGORIES.OTHER, ListingCategoryId: 6 },
        { name: RENTALS_SUBCATEGORIES.OTHER, ListingCategoryId: 6 },
        { name: HOUSE_YARD_SERVICES_SUBCATEGORIES.CLEAN_CARPET, ListingCategoryId: 7 },
        { name: HOUSE_YARD_SERVICES_SUBCATEGORIES.COMPUTER_TECH, ListingCategoryId: 7 },
        { name: HOUSE_YARD_SERVICES_SUBCATEGORIES.DELIVERY, ListingCategoryId: 7 },
        { name: HOUSE_YARD_SERVICES_SUBCATEGORIES.DUCT_CLEANING, ListingCategoryId: 7 },
        { name: HOUSE_YARD_SERVICES_SUBCATEGORIES.GARDENING, ListingCategoryId: 7 },
        { name: HOUSE_YARD_SERVICES_SUBCATEGORIES.HANDYMAN, ListingCategoryId: 7 },
        { name: HOUSE_YARD_SERVICES_SUBCATEGORIES.HOUSE_KEEPER, ListingCategoryId: 7 },
        { name: HOUSE_YARD_SERVICES_SUBCATEGORIES.HOME_CARE, ListingCategoryId: 7 },
        { name: HOUSE_YARD_SERVICES_SUBCATEGORIES.HOUSE_MAINTENANCE, ListingCategoryId: 7 },
        { name: HOUSE_YARD_SERVICES_SUBCATEGORIES.MEAL_SERVICE, ListingCategoryId: 7 },
        { name: HOUSE_YARD_SERVICES_SUBCATEGORIES.MOVING, ListingCategoryId: 7 },
        { name: HOUSE_YARD_SERVICES_SUBCATEGORIES.ORGANIZING, ListingCategoryId: 7 },
        { name: HOUSE_YARD_SERVICES_SUBCATEGORIES.PET, ListingCategoryId: 7 },
        { name: HOUSE_YARD_SERVICES_SUBCATEGORIES.RIDE, ListingCategoryId: 7 },
        { name: HOUSE_YARD_SERVICES_SUBCATEGORIES.CLEAN_WINDOW, ListingCategoryId: 7 },
        { name: HOUSE_YARD_SERVICES_SUBCATEGORIES.OTHER, ListingCategoryId: 7 },
        { name: LEGAL_SALES_AGENCIES_SUBCATEGORIES.LEGALITIES, ListingCategoryId: 8 },
        { name: LEGAL_SALES_AGENCIES_SUBCATEGORIES.REALTORS, ListingCategoryId: 8 },
        { name: LEGAL_SALES_AGENCIES_SUBCATEGORIES.MULTI_SHARE_HOME, ListingCategoryId: 8 },
        { name: LEGAL_SALES_AGENCIES_SUBCATEGORIES.SHARE_CARE, ListingCategoryId: 8 },
        { name: LEGAL_SALES_AGENCIES_SUBCATEGORIES.TAX, ListingCategoryId: 8 },
        { name: LEGAL_SALES_AGENCIES_SUBCATEGORIES.MULTI_TENANT, ListingCategoryId: 8 },
        { name: LEGAL_SALES_AGENCIES_SUBCATEGORIES.SHARED_HOME, ListingCategoryId: 8 },
        { name: LEGAL_SALES_AGENCIES_SUBCATEGORIES.OTHER, ListingCategoryId: 8 },
        { name: CLASSES_CLUBS_EVENTS_SUBCATEGORIES.CLASSES, ListingCategoryId: 9 },
        { name: CLASSES_CLUBS_EVENTS_SUBCATEGORIES.EVENTS, ListingCategoryId: 9 },
        { name: CLASSES_CLUBS_EVENTS_SUBCATEGORIES.EXERCISE, ListingCategoryId: 9 },
        { name: CLASSES_CLUBS_EVENTS_SUBCATEGORIES.CLUBS, ListingCategoryId: 9 },
        { name: CLASSES_CLUBS_EVENTS_SUBCATEGORIES.OTHER, ListingCategoryId: 9 },
    ]);
}

module.exports = {
    populateDBWithSubcategories,
    findAllListingSubcategories,
    findListingSubcategoryIds
}
