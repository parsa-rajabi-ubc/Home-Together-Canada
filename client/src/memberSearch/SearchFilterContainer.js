/**
 * @Author:     Parsa Rajabi
 * @Created:    2021.01.28
 *
 * @Description: container for Search Filter. Container is a "smart" component and handles all of the logic
 *
 */

import React, {useState, useEffect} from 'react';
import PropTypes from "prop-types";
import SearchFilter from "./SearchFilter";
import {isValueInArray} from "../common/utils/generalUtils";
import get from "lodash/get";
import {checkIfErrorsExistInMapping, validateMinMaxFilter} from "../registration/registrationUtils";
import memberAccountInfo from "../accountSummary/member/MockData";
import indexOf from "lodash/indexOf";


const SearchFilterContainer = (props) => {
    const {toggleSidebar} = props;
    // Gender and Family Status
    const [genderPreference, setGenderPreference] = useState(get(memberAccountInfo, "genderPreference", ""));
    const [familyStatusPreference, setFamilyStatusPreference] = useState(get(memberAccountInfo, "statusPreference", ""));

    // Age
    const [minAgePreference, setMinAgePreference] = useState(get(memberAccountInfo, "minAgePreference", ""));
    const [maxAgePreference, setMaxAgePreference] = useState(get(memberAccountInfo, "maxAgePreference", ""));

    // Number of Roommates
    const [selectedLimitPreference, setSelectedLimitPreference] = useState(get(memberAccountInfo, "numRoommatesPreference", ""));

    // Budget
    const [minBudgetPreference, setMinBudgetPreference] = useState(get(memberAccountInfo, "minBudgetPreference", ""));
    const [maxBudgetPreference, setMaxBudgetPreference] = useState(get(memberAccountInfo, "maxBudgetPreference", ""));

    // Yes/No Question
    const [religionPreference, setReligionPreference] = useState(get(memberAccountInfo, "religionPreference", ""));
    const [dietPreference, setDietPreference] = useState(get(memberAccountInfo, "dietPreference", ""));
    const [homeToSharePreference, setHomeToSharePreference] = useState(get(memberAccountInfo, "othersWithHomeToSharePreference", ""));
    const [petPreference, setPetPreference] = useState(get(memberAccountInfo, "petsPreference", ""));
    const [smokingPreference, setSmokingPreference] = useState(get(memberAccountInfo, "smokingPreference", ""));


    // Search Criteria Errors
    // Age
    const [minAgePreferenceError, setMinAgePreferenceError] = useState(undefined);
    const [maxAgePreferenceError, setMaxAgePreferenceError] = useState(undefined);
    // Budget
    const [minBudgetPreferenceError, setMinBudgetPreferenceError] = useState(undefined);
    const [maxBudgetPreferenceError, setMaxBudgetPreferenceError] = useState(undefined);


    useEffect(() => {
        if (minAgePreference !== undefined && maxAgePreference !== undefined) {
            validateMinMaxFilter(
                minAgePreference, maxAgePreference, setMinAgePreferenceError, setMaxAgePreferenceError
            );
        }
    }, [minAgePreference, maxAgePreference]);

    useEffect(() => {
        if (minBudgetPreference !== undefined && maxBudgetPreference !== undefined) {
            validateMinMaxFilter(
                minBudgetPreference, maxBudgetPreference, setMinBudgetPreferenceError, setMaxBudgetPreferenceError
            );
        }
    }, [minBudgetPreference, maxBudgetPreference]);

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
            errorAgePref: false,
            errorBudgetPref: false,
        }

        // Search Criteria Validation
        searchErrors.errorAgePref = validateMinMaxFilter(
            minAgePreference,
            maxAgePreference,
            setMinAgePreferenceError,
            setMaxAgePreferenceError
        );
        searchErrors.errorBudgetPref = validateMinMaxFilter(
            minBudgetPreference,
            maxBudgetPreference,
            setMinBudgetPreferenceError,
            setMaxBudgetPreferenceError
        );

        // check search criteria for errors
        return !checkIfErrorsExistInMapping(searchErrors);

    }

    function onSubmit() {
        if (isFormValid()) {
            toggleSidebar();
        }
        // else form is valid and proceed to make request

        //TODO: Update Filter Based on Results
        const filteringData = {
            // member search preferences
            minAgePreference: minAgePreference,
            maxAgePreference: maxAgePreference,

            minBudgetPreference: minBudgetPreference,
            maxBudgetPreference: maxBudgetPreference,

            statusPreference: familyStatusPreference,
            numRoommatesPreference: selectedLimitPreference,

            dietPreference: dietPreference,
            petsPreference: petPreference,
            smokingPreference: smokingPreference,
            genderPreference: genderPreference,
            religionPreference: religionPreference,
            othersWithHomeToSharePreference: homeToSharePreference,

        }
    }

    return (
        <SearchFilter
            genderPreference={genderPreference}
            handleGenderPrefChange={handleGenderPrefChange}

            familyStatusPreference={familyStatusPreference}
            setFamilyStatusPreference={setFamilyStatusPreference}

            minAgePreference={minAgePreference}
            setMinAgePreference={setMinAgePreference}
            minAgePreferenceError={minAgePreferenceError}

            maxAgePreference={maxAgePreference}
            setMaxAgePreference={setMaxAgePreference}
            maxAgePreferenceError={maxAgePreferenceError}

            selectedLimitPreference={selectedLimitPreference}
            handleSelectedLimitPreferenceChange={handleSelectedLimitPreferenceChange}

            minBudgetPreference={minBudgetPreference}
            setMinBudgetPreference={setMinBudgetPreference}
            minBudgetPreferenceError={minBudgetPreferenceError}

            maxBudgetPreference={maxBudgetPreference}
            setMaxBudgetPreference={setMaxBudgetPreference}
            maxBudgetPreferenceError={maxBudgetPreferenceError}

            petPreference={petPreference}
            setPetPreference={setPetPreference}

            smokingPreference={smokingPreference}
            setSmokingPreference={setSmokingPreference}

            religionPreference={religionPreference}
            setReligionPreference={setReligionPreference}

            dietPreference={dietPreference}
            setDietPreference={setDietPreference}

            homeToSharePreference={homeToSharePreference}
            setHomeToSharePreference={setHomeToSharePreference}

            onSubmit={onSubmit}
        />
    )
}

SearchFilterContainer.propTypes = {
    toggleSidebar: PropTypes.func.isRequired,
};
export default SearchFilterContainer;