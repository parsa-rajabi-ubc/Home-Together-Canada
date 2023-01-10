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
    // replace heroku db connection with digitalocean db in Jan 2023, switched from heroku to railway.app for hosting staging env
    staging: {
        HOST: "hometogethercanadadatabase-do-user-9184613-0.b.db.ondigitalocean.com",
        PORT: 25060,
        USER: "dev",
        PASSWORD: "AVNS_W8FXyq8eBs98G9xZBYk",
        DB: "dev",
        DIALECT: "mysql",
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