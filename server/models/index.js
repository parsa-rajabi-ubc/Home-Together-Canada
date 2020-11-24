/**
 * @Author:     Rachelle Gelden
 * @Created:    2020.11.09
 *
 * @Description: initial setup required for express app to interact with the database
 *
 */

const { DataTypes, Sequelize } = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const dbConfig = require(__dirname + '/../db.config.js')[env];

const sequelize = new Sequelize({
    database: dbConfig.DB,
    username: dbConfig.USER,
    password: dbConfig.PASSWORD,
    host: dbConfig.HOST,
    port: dbConfig.PORT,
    pool: dbConfig.POOL,
    dialect: dbConfig.DIALECT
})

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.abstractUser = require('./abstractUser.js')(DataTypes, sequelize);
db.businessAccount = require('./businessAccount.js')(DataTypes, sequelize);
db.memberAccount = require('./memberAccount.js')(DataTypes, sequelize);
db.livesWith = require('./livesWith.js')(DataTypes, sequelize);
db.areaOfInterest = require('./areaOfInterest')(DataTypes, sequelize);

db.businessAccount.belongsTo(db.abstractUser, {
    foreignKey: {
        name: 'uid'
    },
    onDelete: 'RESTRICT'
});
db.memberAccount.belongsTo(db.abstractUser, {
    foreignKey: {
        name: 'uid'
    },
    onDelete: 'RESTRICT'
});

db.memberAccount.belongsToMany(db.memberAccount, { as: "Roommates", through: db.livesWith });

db.memberAccount.hasMany(db.areaOfInterest, {
    foreignKey: {
        name: 'uid'
    },
    onDelete: 'RESTRICT'
});

module.exports = db;