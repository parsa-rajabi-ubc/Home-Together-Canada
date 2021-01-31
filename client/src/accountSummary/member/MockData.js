/**
 * @Author:     Jeff Hatton
 * @Created:    2020.11.30
 *
 * @Description: mock history data.
 *
 */

 export const memberAccountInfo  = {
    //account
    activate: false,
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
    petFriendly: true,
    petDescription: "have dogs",
    smoking: true,
    smokingDescription: "tobacco only",
    hasHealthMobilityIssues: false,
    healthMobilityIssuesDescription: "",
    hasAllergies: true,
    allergiesDescription: "peanuts",
    isReligionImportant: true,
    religionDescription: "Roman Catholic",
    isDietImportant: false,
    dietDescription: "",
    hasHomeToShare: false,
    hasHomeToShareDescription: "",
    interestInBuyingHome: false,
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
        radius: 50
    }],

    // Search Criteria
    minAgePreference: 20,
    maxAgePreference: 29,
    minBudgetPreference: 700,
    maxBudgetPreference: 1200,
    statusPreference: ["Single", "Couple", "Single Parent"],
    numRoommatesPreference: [1,2,3],
    dietPreference: true,
    petsPreference: false,
    smokingPreference: true,
    genderPreference: ["Male", "Other"],
    religionPreference: true,
    othersWithHomeToSharePreference: false

}

export default memberAccountInfo;
