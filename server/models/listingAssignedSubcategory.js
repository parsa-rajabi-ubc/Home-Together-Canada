/**
 * @Author:     Rachelle Gelden
 * @Created:    2021.02.21
 *
 * @Description: model for ListingAssignedSubcategory which is a join table that stores each listings
 * assigned subcategories
 *
 */

module.exports = (DataTypes, sequelize) => {
    return sequelize.define('ListingAssignedSubcategory', {});
}
