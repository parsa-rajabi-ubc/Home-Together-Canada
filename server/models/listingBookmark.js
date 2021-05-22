/**
 * @Author:     Rachelle Gelden
 * @Created:    2021.05.17
 *
 * @Description: model for ListingBookmark table. This table contains all users' bookmarked listings
 *
 */

module.exports = (DataTypes, sequelize) => {
    return sequelize.define('ListingBookmark',
        {
            bookmarkerUid: {
                type: DataTypes.INTEGER,
                allowNull: false,
                unique: true
            },
            bookmarkedListingId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                unique: true
            }
        }, {
            createdAt: 'dateBookmarked'
        }
    );
}
