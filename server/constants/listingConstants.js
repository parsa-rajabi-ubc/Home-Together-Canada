/**
 * @Author:     Rachelle Gelden
 * @Created:    2021.02.20
 *
 * @Description: constants for service and classified categories and subcategories
 *
 */

const BUSINESS_SERVICES_CATEGORIES = {
    CO_HOUSING: 'Co-housing, Co-ops, Intergenerational & Planned Neighbourhoods',
    SHARED_HOME_SERVICES: "Home Share Facilitation & Supporting Services",
    SHARED_BUSINESS_SERVICES: "Home Sharing Businesses, Groups and Organizations",
    GOVERNMENT_SERVICES: "Government & Human Service Agencies Offering Shared Living & Support Services"
}

const MEMBER_SERVICE_CATEGORIES = {
    MEMBER_HOME: "Members with Homes to Share",
}

const CO_HOUSING_SUBCATEGORIES = {
    CO_HOUSING: "Co-housing Groups & Communities",
    CO_OP: "Cooperatives",
    COMMUNAL: "Communal Living",
    ECO: "Eco villages",
    INTER_GEN: "Intergenerational Living",
    SHARED_LIVING: "Shared Living First Step Homes",
    OTHER: "Other"
}

const SHARED_HOME_SERVICES_SUBCATEGORIES = {
    MEET_UPS: "Home Share Meet-ups & Get-togethers",
    WORKSHOPS: "Seminars and Workshops: (Shared and Companion Living)",
    CLASSES: "Home Share Classes: contracts, agreements, negotiation etc.",
    OTHER: "Other"
}

const SHARED_BUSINESS_SERVICES_SUBCATEGORIES = {
    GROUPS_ORG: "Home Sharing Groups and Organizations",
    COMPANION_FINDING: "Home & Companion Finding/Matching Businesses",
    DATING: "Home & Companion Matching Businesses",
    DATING_ED: "Home & Companion Educational Program Providers",
    OTHER: "Other"
}

const GOVERNMENT_SERVICES_SUBCATEGORIES = {
    SENIORS: "Agencies serving Seniors",
    LOW_INCOME: "Agencies Addressing Low Income Housing",
    YOUTHS: "Agencies Serving Youth",
    HOMELESS: "Agencies Serving the Homeless",
    INDIVIDUALS_GROUPS: "Agencies Serving Other Individuals and Groups",
    HOME_CARE: "Home Care Agencies",
    OTHER: "Other"
}

const BUSINESS_CLASSIFIEDS_CATEGORIES = {
    RENTALS: "Rentals",
    HOUSE_YARD: "House & Yard Services",
    LEGAL_SALES: "Legal & Sales",
    CLASSES_CLUBS: "Classes, Clubs & Events",
}

const RENTALS_SUBCATEGORIES = {
    HOUSE: "House",
    PARTIAL_HOUSE: "Partial house / suite up or down",
    DUPLEX: "Duplex / triplex",
    APART: "Apartment",
    CONDO: "Condo/townhouse",
    RURAL: "Rural",
    COUNTRY: "Country",
    OTHER: "Other"
}

const HOUSE_YARD_SERVICES_SUBCATEGORIES = {
    CLEAN_CARPET: "Carpet Cleaning",
    COMPUTER_TECH: "Computer & Technical Services",
    DELIVERY: "Delivery Services",
    DUCT_CLEANING: "Duct Cleaning",
    GARDENING: "Gardening, Yard Work & Yard Maintenance",
    HANDYMAN: "Handyman Services",
    HOUSE_KEEPER: "Housekeeper/Cleaner",
    HOME_CARE: "Home Care Services",
    HOUSE_MAINTENANCE: "House Maintenance & Repair",
    MEAL_SERVICE: "Meal Services",
    MOVING: "Moving & Storage",
    ORGANIZING: "Organizing/De-cluttering",
    PET: "Pet Services",
    RIDE: "Ride Sharing & Transportation",
    CLEAN_WINDOW: "Window Cleaning",
    OTHER: "Other"
}

const LEGAL_SALES_AGENCIES_SUBCATEGORIES = {
    LEGALITIES: "Multi-Ownership Purchasing: Legalities",
    REALTORS: "Multi-Ownership Purchasing: Realtors",
    MULTI_SHARE_HOME: "Multi-Ownership/Tenant/Shared Home Insurance",
    SHARE_CARE: "Shared Vehicle Insurance & Legalities",
    TAX: "Understanding Home Sharing & Taxes",
    MULTI_TENANT: "Multi-Tenant Rentals and Leases",
    SHARED_HOME: "Shared Homes A-Z",
    OTHER: "Other"
}

const CLASSES_CLUBS_EVENTS_SUBCATEGORIES = {
    CLASSES: "Classes & Lessons (Art, Music, Computer, Cooking, Language, etc)",
    EVENTS: "Events & Activities (Paint-night, Art Show, Wine Tasting, Concert, etc)",
    EXERCISE: "Exercise Classes (Yoga, Pilates, Walking, Running, etc.)",
    CLUBS: "Groups & Clubs (Computer, Bird Watching, Book Club, Singing, etc)",
    OTHER: "Other"
}

const LISTING_CATEGORY_SUBCATEGORY_MAP = new Map([
    [BUSINESS_SERVICES_CATEGORIES.CO_HOUSING, CO_HOUSING_SUBCATEGORIES],
    [BUSINESS_SERVICES_CATEGORIES.SHARED_HOME_SERVICES, SHARED_HOME_SERVICES_SUBCATEGORIES],
    [BUSINESS_SERVICES_CATEGORIES.SHARED_BUSINESS_SERVICES, SHARED_BUSINESS_SERVICES_SUBCATEGORIES],
    [BUSINESS_SERVICES_CATEGORIES.GOVERNMENT_SERVICES, GOVERNMENT_SERVICES_SUBCATEGORIES],
    [BUSINESS_CLASSIFIEDS_CATEGORIES.RENTALS, RENTALS_SUBCATEGORIES],
    [BUSINESS_CLASSIFIEDS_CATEGORIES.HOUSE_YARD, HOUSE_YARD_SERVICES_SUBCATEGORIES],
    [BUSINESS_CLASSIFIEDS_CATEGORIES.LEGAL_SALES, LEGAL_SALES_AGENCIES_SUBCATEGORIES],
    [BUSINESS_CLASSIFIEDS_CATEGORIES.CLASSES_CLUBS, CLASSES_CLUBS_EVENTS_SUBCATEGORIES]
]);

module.exports = {
    BUSINESS_SERVICES_CATEGORIES,
    MEMBER_SERVICE_CATEGORIES,
    BUSINESS_CLASSIFIEDS_CATEGORIES,
    LISTING_CATEGORY_SUBCATEGORY_MAP,
    CO_HOUSING_SUBCATEGORIES,
    SHARED_HOME_SERVICES_SUBCATEGORIES,
    SHARED_BUSINESS_SERVICES_SUBCATEGORIES,
    GOVERNMENT_SERVICES_SUBCATEGORIES,
    RENTALS_SUBCATEGORIES,
    HOUSE_YARD_SERVICES_SUBCATEGORIES,
    LEGAL_SALES_AGENCIES_SUBCATEGORIES,
    CLASSES_CLUBS_EVENTS_SUBCATEGORIES
}
