/**
 * @Author:     Rachelle Gelden
 * @Created:    2020.11.09
 *
 * @Description: mock http request used to create an abstract user
 * Note: this will probably be change because abstract user will be created with the business/member account
 *
 */

const req = {
    body: {
        addressLine1: "2 Luigi's mansion",
        addressLine2: null,
        city: "St Johns",
        province: "Newfoundland and Labradour",
        postalCode: "R9Q 3X8",
        hasDifferentMailingAddress: true,
        mailingAddressLine1: "1 Rainbow Road",
        mailingAddressLine2: "Unit 404",
        mailingCity: "Yellowknife",
        mailingProvince: "Northwest Territories",
        mailingPostalCode: "E7I 0Z2"
    }
};

module.exports = {
    req
}