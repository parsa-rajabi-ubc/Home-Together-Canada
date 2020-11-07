module.exports = {
    development: {
        HOST: "127.0.0.1",
        USER: "root",
        PASSWORD: "m/A38-m[hL?5eST^",
        DB: "hometogethercanadadatabase",
        dialect: "mysql",
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    },
    test: {
        HOST: "127.0.0.1",
        USER: "root",
        PASSWORD: "m/A38-m[hL?5eST^",
        DB: "hometogethercanadadatabase_test",
        dialect: "mysql",
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    },
    production: {
        HOST: "us-cdbr-east-02.cleardb.com",
        USER: "b78602ef23aff8",
        PASSWORD: "32764ac4",
        DB: "heroku_a2e066b08e4b1b7",
        dialect: "mysql",
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    }
};