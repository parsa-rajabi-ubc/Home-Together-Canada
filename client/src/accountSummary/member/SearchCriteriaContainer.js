/**
 * @Author:     Parsa Rajabi
 * @Created:    2021.01.24
 *
 * @Description: container for SearchCriteria. Container is a "smart" component and handles all of the logic
 *
 */

import React, {useState, useEffect} from 'react';
import SearchCriteria from "./SearchCriteria";
import {isValueInArray, resolveBooleanToYesNo} from "../../common/utils/generalUtils";
import get from "lodash/get";
import {
    checkIfErrorsExistInMapping,
    validateArrayInput,
    validateInput,
    validateMinMax
} from "../../registration/registrationUtils";
import {memberSearchCriteriaMock} from "./MockData";
import indexOf from "lodash/indexOf";


const SearchCriteriaContainer = () => {
    // Gender and Family Status
    const [genderPreference, setGenderPreference] = useState(get(memberSearchCriteriaMock, "genderPreference", ""));
    const [familyStatusPreference, setFamilyStatusPreference] = useState(get(memberSearchCriteriaMock, "statusPreference", ""));

    // Age
    const [minAgePreference, setMinAgePreference] = useState(get(memberSearchCriteriaMock, "minAgePreference", ""));
    const [maxAgePreference, setMaxAgePreference] = useState(get(memberSearchCriteriaMock, "maxAgePreference", ""));

    // Number of Roommates
    const [selectedLimitPreference, setSelectedLimitPreference] = useState(get(memberSearchCriteriaMock, "numRoommatesPreference", ""));

    // Budget
    const [minBudgetPreference, setMinBudgetPreference] = useState(get(memberSearchCriteriaMock, "minBudgetPreference", ""));
    const [maxBudgetPreference, setMaxBudgetPreference] = useState(get(memberSearchCriteriaMock, "maxBudgetPreference", ""));

    // Yes/No Question
    const hasReligionPreferenceBoolean = get(memberSearchCriteriaMock, "religionPreference", "");
    const [religionPreference, setReligionPreference] = useState(resolveBooleanToYesNo(hasReligionPreferenceBoolean));

    const hasDietPreferenceBoolean = get(memberSearchCriteriaMock, "dietPreference", "");
    const [dietPreference, setDietPreference] = useState(resolveBooleanToYesNo(hasDietPreferenceBoolean));

    const hasPreferenceForOthersWithHome = get(memberSearchCriteriaMock, "othersWithHomeToSharePreference", "");
    const [homeToSharePreference, setHomeToSharePreference] = useState(resolveBooleanToYesNo(hasPreferenceForOthersWithHome));

    const petFriendlyPreferenceBoolean = get(memberSearchCriteriaMock, "petsPreference", "");
    const [petPreference, setPetPreference] = useState(resolveBooleanToYesNo(petFriendlyPreferenceBoolean));

    const smokeFriendlyPreferenceBoolean = get(memberSearchCriteriaMock, "smokingPreference", "");
    const [smokingPreference, setSmokingPreference] = useState(resolveBooleanToYesNo(smokeFriendlyPreferenceBoolean));


    // Search Criteria Errors
    const [genderPreferenceError, setGenderPreferenceError] = useState(undefined);
    const [familyStatusPreferenceError, setFamilyStatusPreferenceError] = useState(undefined);
    // Age
    const [minAgePreferenceError, setMinAgePreferenceError] = useState(undefined);
    const [maxAgePreferenceError, setMaxAgePreferenceError] = useState(undefined);
    const [selectedLimitPreferenceError, setSelectedLimitPreferenceError] = useState(undefined);
    // Budget
    const [minBudgetPreferenceError, setMinBudgetPreferenceError] = useState(undefined);
    const [maxBudgetPreferenceError, setMaxBudgetPreferenceError] = useState(undefined);
    // Yes/No
    const [petPreferenceError, setPetPreferenceError] = useState(undefined);
    const [smokingPreferenceError, setSmokingPreferenceError] = useState(undefined);
    const [religionPreferenceError, setReligionPreferenceError] = useState(undefined);
    const [dietPreferenceError, setDietPreferenceError] = useState(undefined);
    const [homeToSharePreferenceError, setHomeToSharePreferenceError] = useState(undefined);

    // UseEffects
    useEffect(() => {
        genderPreference !== undefined && validateInput(genderPreference, setGenderPreferenceError);
    }, [genderPreference]);
    useEffect(() => {
        selectedLimitPreference !== undefined && validateInput(selectedLimitPreference, setSelectedLimitPreferenceError);
    }, [selectedLimitPreference]);
    useEffect(() => {
        minAgePreference !== undefined && validateInput(minAgePreference, setMinAgePreferenceError);
    }, [minAgePreference]);
    useEffect(() => {
        maxAgePreference !== undefined && validateInput(maxAgePreference, setMaxAgePreferenceError);
    }, [maxAgePreference]);
    useEffect(() => {
        familyStatusPreference !== undefined && validateInput(familyStatusPreference, setFamilyStatusPreferenceError);
    }, [familyStatusPreference]);
    useEffect(() => {
        minBudgetPreference !== undefined && validateInput(minBudgetPreference, setMinBudgetPreferenceError);
    }, [minBudgetPreference]);
    useEffect(() => {
        maxBudgetPreference !== undefined && validateInput(maxBudgetPreference, setMaxBudgetPreferenceError);
    }, [maxBudgetPreference]);

    function handleGenderPrefChange(e) {
        const list = [...genderPreference];
        const value = e.target.id;
        // check if the value select already exists in the list
        if (!isValueInArray(list, value)) {
            // if not, add the value
            list.push(value);
        } else {
            // if it does, remove it from the array
            list.splice(list.indexOf(value), 1);
        }
        setGenderPreference(list);
    }

    function handleSelectedLimitPreferenceChange(selected) {
        if (indexOf(selected, -1) !== -1) {
            setSelectedLimitPreference([-1]);
        } else {
            setSelectedLimitPreference(selected);
        }
    }

    const isFormValid = () => {

        const searchErrors = {
            errorGenderPref: false,
            errorAgePref: false,
            errorFamilyStatusPref: false,
            errorNumRoommate: false,
            errorBudgetPref: false,
            errorPetPref: false,
            errorSmokingPref: false,
            errorReligionPref: false,
            errorDietPref: false,
            errorHomeToSharePref: false,

        }

        // Search Criteria Validation
        searchErrors.errorGenderPref = validateArrayInput(genderPreference, setGenderPreferenceError);
        searchErrors.errorAgePref = validateMinMax(
            minAgePreference,
            maxAgePreference,
            setMinAgePreferenceError,
            setMaxAgePreferenceError
        );
        searchErrors.errorFamilyStatusPref = validateArrayInput(familyStatusPreference, setFamilyStatusPreferenceError);
        searchErrors.errorNumRoommate = validateArrayInput(selectedLimitPreference, setSelectedLimitPreferenceError);
        searchErrors.errorBudgetPref = validateMinMax(
            minBudgetPreference,
            maxBudgetPreference,
            setMinBudgetPreferenceError,
            setMaxBudgetPreferenceError
        );
        searchErrors.errorPetPref = validateInput(petPreference, setPetPreferenceError);
        searchErrors.errorSmokingPref = validateInput(smokingPreference, setSmokingPreferenceError);
        searchErrors.errorReligionPref = validateInput(religionPreference, setReligionPreferenceError);
        searchErrors.errorDietPref = validateInput(dietPreference, setDietPreferenceError);
        searchErrors.errorHomeToSharePref = validateInput(homeToSharePreference, setHomeToSharePreferenceError);

        // check search criteria for errors
        return !checkIfErrorsExistInMapping(searchErrors);

    }

    function onSubmit(event) {
        if (!isFormValid()) {
            event.preventDefault();
            return;
        }
        alert("Search Criteria Saved");
    }
    return (
        <SearchCriteria
            genderPreference={genderPreference}
            handleGenderPrefChange={handleGenderPrefChange}
            genderPreferenceError={genderPreferenceError}

            familyStatusPreference={familyStatusPreference}
            setFamilyStatusPreference={setFamilyStatusPreference}
            familyStatusPreferenceError={familyStatusPreferenceError}

            minAgePreference={minAgePreference}
            setMinAgePreference={setMinAgePreference}
            minAgePreferenceError={minAgePreferenceError}

            maxAgePreference={maxAgePreference}
            setMaxAgePreference={setMaxAgePreference}
            maxAgePreferenceError={maxAgePreferenceError}

            selectedLimitPreference={selectedLimitPreference}
            handleSelectedLimitPreferenceChange={handleSelectedLimitPreferenceChange}
            selectedLimitPreferenceError={selectedLimitPreferenceError}

            minBudgetPreference={minBudgetPreference}
            setMinBudgetPreference={setMinBudgetPreference}
            minBudgetPreferenceError={minBudgetPreferenceError}

            maxBudgetPreference={maxBudgetPreference}
            setMaxBudgetPreference={setMaxBudgetPreference}
            maxBudgetPreferenceError={maxBudgetPreferenceError}

            petPreference={petPreference}
            setPetPreference={setPetPreference}
            petPreferenceError={petPreferenceError}

            smokingPreference={smokingPreference}
            setSmokingPreference={setSmokingPreference}
            smokingPreferenceError={smokingPreferenceError}

            religionPreference={religionPreference}
            setReligionPreference={setReligionPreference}
            religionPreferenceError={religionPreferenceError}

            dietPreference={dietPreference}
            setDietPreference={setDietPreference}
            dietPreferenceError={dietPreferenceError}

            homeToSharePreference={homeToSharePreference}
            setHomeToSharePreference={setHomeToSharePreference}
            homeToSharePreferenceError={homeToSharePreferenceError}

            onSubmit={onSubmit}
        />
    )
}

export default SearchCriteriaContainer;