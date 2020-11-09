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

module.exports = db;