/**
 * @Author:     Rachelle Gelden
 * @Created:    2020.11.22
 *
 * @Description: model for Lives With table. This table is used for the recursive relationship
 * between members to represent roommates and couples
 *
 */

module.exports = (DataTypes, sequelize) => {
    return sequelize.define("LivesWith", {
        relationship: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })
}