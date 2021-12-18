/**
 * Instructions to get started
 * 1. Run a local web server. i.e. MAMMP
 * 2. Create a DB based on the name below
 * 3. Update the User/Pass based on your server. MAMP is root/root
 * 4. Update the port. MAMP uses 8889
 * 5. Run npm start in root folder of this project
 */
module.exports = {
    development: {
        HOST: "127.0.0.1",
        USER: "root",
        PASSWORD: "m/A38-m[hL?5eST^",
        DB: "hometogethercanadadatabase",
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
        PASSWORD: "m/A38-m[hL?5eST^",
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