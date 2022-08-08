/**
 * @Author:     Parsa Rajabi
 * @Created:    June 2022
 *
 * @Description: Mock Member data for automated testing
 *
 */
const {faker} = require("@faker-js/faker");

const MOCK_MEMBER_DATA = {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: 'tech@hometogether.ca',
    phoneNumber: {
        areaCode: faker.random.numeric(3),
        prefix: faker.random.numeric(3),
        suffix: faker.random.numeric(4)
    },
    address: {
        street: faker.address.streetAddress(),
        apt: faker.address.buildingNumber(),
        city: faker.address.city(),
        province: "Alberta",
        postCode: "T3T1T3"
    },
    monthlyRent: {
        min: Math.floor(Math.random() * 999) + 500,
        max: Math.floor(Math.random() * 2500) + 1000,
    },
    preferences:{
        petFriendly: faker.datatype.boolean(),
        smoking: faker.datatype.boolean(),
        mobile: faker.datatype.boolean(),
        allergies: faker.datatype.boolean(),
        religion: faker.datatype.boolean(),
        diet: faker.datatype.boolean(),
        hasHome: faker.datatype.boolean(),
        interestInBuyingHome: faker.datatype.boolean(),
    },
    aboutSelf: faker.random.words(2),

    sharingPreferences:{
        genders: ["Male", "Female", "Other"],
        age:{
            min: Math.floor(Math.random() * 29) + 18,
            max: Math.floor(Math.random() * 60) + 30,
        },
        overlapBudget:{
            min: Math.floor(Math.random() * 999) + 500,
            max: Math.floor(Math.random() * 2500) + 1000,
        }
    },
    accountDetails:{
        username: "TestAccount"+faker.random.numeric(2),
        password: "Bose1234"
    }

}

module.exports = {MOCK_MEMBER_DATA}