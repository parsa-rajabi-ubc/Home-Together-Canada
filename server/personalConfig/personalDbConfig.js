module.exports = {
    development: {
        HOST: "127.0.0.1",
        USER: "root",
        PASSWORD: "qin1123.",
        DB: "alex",
        DIALECT: "mysql",
        POOL: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        },
        PORT: 3306
    },
    test: {
        HOST: "127.0.0.1",
        USER: "root",
        PASSWORD: "qin1123.",
        DB: "hometogethercanadadatabase_test",
        DIALECT: "mysql",
        POOL: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        },
        PORT: 3306
    }
}
