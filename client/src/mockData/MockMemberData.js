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
        suffix: faker.random.numeric(3)
    },
    address: {
        street: faker.address.streetAddress(),
        apt: faker.address.buildingNumber(),
        city: faker.address.city(),
        province: "Alberta",
        postCode: "T3T 1T3"
    }

}

module.exports = {MOCK_MEMBER_DATA}