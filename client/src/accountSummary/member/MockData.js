/**
 * @Author:     Jeff Hatton
 * @Created:    2020.11.30
 *
 * @Description: mock history data.
 *
 */

const memberAccountInfo = {
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
    gender: "Other",
    genderDescription: "I am potato",
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
    hasHomeToShareDescription: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
    interestInBuyingHome: false,
    interestDescription: "",
    minRent: "800",
    maxRent: "1700",
    aboutSelf: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
    selectedLimit: 3,
    selectedFamilyStatus: "Couple",
    selectedWorkStatus: "Retired",
    partner: "Babar",
    roommates: ["DonaldDuck", "EusticeOfNarnia"],
    areasOfInterest: [
        {
            province: "AB",
            city: "Edmonton",
            radius: 50
        },
        {
            province: "BC",
            city: "Kelowna",
            radius: 50
        }
    ],

    // Search Criteria
    minAgePreference: 20,
    maxAgePreference: 29,
    minBudgetPreference: 700,
    maxBudgetPreference: 1200,
    statusPreference: ["Single", "Couple", "Single Parent"],
    numRoommatesPreference: [1, 2, 3],
    dietPreference: true,
    petsPreference: false,
    smokingPreference: true,
    genderPreference: ["Male", "Other"],
    religionPreference: true,
    othersWithHomeToSharePreference: false

}

export default memberAccountInfo;
