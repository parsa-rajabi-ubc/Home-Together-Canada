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
    birthYear: 1984,
    email: "mock@email.com",
    phoneNumber: "123-456-9999",
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
    hasHealthMobilityIssues: "no",
    healthMobilityIssuesDescription: "",
    hasAllergies: "yes",
    allergiesDescription: "peanuts",
    isReligionImportant: "yes",
    religionDescription: "Roman Catholic",
    isDietImportant: "no",
    dietDescription: "",
    hasHomeToShare: "no",
    hasHomeToShareDescription: "",
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