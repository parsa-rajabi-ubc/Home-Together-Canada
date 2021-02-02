/**
 * @Author:     Jeff Hatton
 * @Created:    2020.11.30
 *
 * @Description: mock history data.
 *
 */
export const memberSearchCriteriaMock = {
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

export const memberAccountMock = {
    //account
    firstName: "mockFN",
    lastName: "mockLN",
    email: "mock@email.com",
    phoneNumber: "123-456-9999",
    hasDifferentMailingAddress: false,
    addressLine1: "123 45 street",
    addressLine2: "",
    city: "Kelowna",
    province: "BC",
    postalCode: "Y4K 2N5",
    mailingAddressLine1: "123 45 street",
    mailingAddressLine2: "",
    mailingCity: "Kelowna",
    mailingProvince: "BC",
    mailingPostalCode: "Y4K 2N5"
}

export const memberProfileMock = {
    gender: "Female",
    genderDescription: "",
    birthYear: 1984,
    hasPets: true,
    petsDescription: "have dogs",
    isSmoker: true,
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
    homeToShareDescription: "",
    isInterestedInBuyingHome: false,
    interestInBuyingHomeDescription: "",
    minMonthlyBudget: 800,
    maxMonthlyBudget: 1700,
    bio: "I like to type as little as possible",
    numRoommates: 3,
    status: "Existing Group",
    workStatus: "Retired",
}

export const roommatesMock = ["John123", "Jane123"];

export const interestedAreasMock = [{
    province: "AB",
    city: "Edmonton",
    radius: 50
}, {
    province: "AB",
    city: "Calgary",
    radius: 50
}];
