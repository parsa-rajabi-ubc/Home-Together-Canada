/**
 * @Author:     Rachelle Gelden
 * @Created:    2020.11.09
 *
 * @Description: database configuration for the different databases we use
 *
 */

const personalConfig = require('./personalConfig/personalDbConfig');
module.exports = {
    development: personalConfig.development,
    test: personalConfig.test,
    staging: {
        DB: "heroku_a2e066b08e4b1b7",
        USER: "b78602ef23aff8",
        PASSWORD: "32764ac4",
        HOST: "us-cdbr-east-02.cleardb.com",
        POOL: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        },
        DIALECT: "mysql",
        PORT: 3306
    },
    production: {
        HOST: "hometogethercanadadatabase-do-user-9184613-0.b.db.ondigitalocean.com",
        PORT: 25060,
        USER: "doadmin",
        PASSWORD: "juo9lp23ov55astq",
        DB: "defaultdb",
        DIALECT: "mysql",
    },
};