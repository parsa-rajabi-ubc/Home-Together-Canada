/**
 * @Author:     Rachelle Gelden
 * @Created:    2021.05.17
 *
 * @Description: model for review table. This table contains all members' reviews left on all other users (businesses
 * and members)
 *
 */

module.exports = (DataTypes, sequelize) => {
    return sequelize.define('Review',
        {
            reviewerUid: {
                type: DataTypes.INTEGER,
                allowNull: false,
                unique: true
            },
            revieweeUid: {
                type: DataTypes.INTEGER,
                allowNull: false,
                unique: true
            },
            rating: {
                type: DataTypes.DOUBLE,
                allowNull: false
            },
            comment: {
                type: DataTypes.STRING(1024)
            },
            isEnabled: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                default: true
        }
        }, {
            createdAt: 'dateReviewed'
        }
    );
}
