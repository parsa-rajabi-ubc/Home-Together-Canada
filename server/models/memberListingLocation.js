/**
 * @Author:     Rachelle Gelden
 * @Created:    2021.02.18
 *
 * @Description: model for member listing locations used in searching service listings
 *
 */
// id and createdAt fields automatically added by sequelize
module.exports = (DataTypes, sequelize) => {
    return sequelize.define('MemberListingLocation', {
        latitude: {
            type: DataTypes.DECIMAL(10,7)   // 10 total digits, 7 digit decimal accuracy
        },
        longitude: {
            type: DataTypes.DECIMAL(10,7)
        },
    });
}
