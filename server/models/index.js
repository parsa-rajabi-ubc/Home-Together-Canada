const { DataTypes, Sequelize } = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const dbConfig = require(__dirname + '/../db.config.js')[env];

const sequelize = new Sequelize({
    database: dbConfig.DB,
    username: dbConfig.USER,
    password: dbConfig.PASSWORD,
    host: dbConfig.HOST,
    port: dbConfig.port,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    },
    dialect: dbConfig.dialect
})

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.abstractUser = require('./abstractUser.js')(DataTypes, sequelize);

module.exports = db;