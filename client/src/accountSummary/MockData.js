/**
 * @Author:     Jeff Hatton
 * @Created:    2020.11.30
 *
 * @Description: mock history data.
 *
 */

const history = {
    //account
    firstName: "mockFN",
    lastName: "mockLN",
    yearOfBirth: 1984,
    email: "mock@email.com",
    phoneNumber: {
        first: "123",
        middle: "456",
        last: "9999"
    },
    useDifferentMailingAddress: false,
    address: {
        street: "123 45 street",
        aptNum: "",
        city: "Kelowna",
        province: "BC",
        postalCode: "Y4K 2N5"
    },
    mailingAddress: {
        street: "123 45 street",
        aptNum: "",
        city: "Kelowna",
        province: "BC",
        postalCode: "Y4K 2N5"
    },

    //profile
    gender: "Female",
    genderDescription: "",
    petFriendly: "yes",
    petDescription: "have dogs",
    smoking: "yes",
    smokingDescription: "tobacco only",
    mobilityIssues: "no",
    mobilityIssuesDescription: "",
    hasAllergies: "yes",
    allergiesDescription: "peanuts",
    religious: "yes",
    religionDescription: "Roman Catholic",
    hasDiet: "no",
    dietDescription: "",
    hasHome: "no",
    homeDescription: "",
    interestInBuyingHome: "false",
    interestDescription: "",
    minRent: "800",
    maxRent: "1700",
    aboutSelf: "I like to type as little as possible",
    selectedLimit: 3,
    selectedFamilyStatus: "Couple",
    selectedWorkStatus: "Retired",
    partner: "John123",
    groupMembers: "",
    areasOfInterest: [{
        province: "AB",
        city: "Edmonton",
        radius: "50km"
    }]
}
export default history