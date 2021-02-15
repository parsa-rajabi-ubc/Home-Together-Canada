/**
 * @Author:     Parsa Rajabi
 * @Created:    2021.01.28
 *
 * @Description: container for Search Filter. Container is a "smart" component and handles all of the logic
 *
 */

import React, {useState, useEffect} from 'react';
import SearchFilter from "./SearchFilter";
import {isValueInArray} from "../common/utils/generalUtils";
import {checkIfErrorsExistInMapping, validateMinMaxFilter} from "../registration/registrationUtils";
import indexOf from "lodash/indexOf";
import { setMemberSearchFilters } from "../redux/slices/memberPrivileges";
import {connect} from "react-redux";
import PropTypes from "prop-types";

const mapDispatchToProps = {
    setMemberSearchFilters
}

const SearchFilterContainer = props => {
    const { setMemberSearchFilters, memberSearchFilters } = props;

    const [searchArea, setSearchArea]  = useState({
        province: memberSearchFilters.searchArea.province,
        city: memberSearchFilters.searchArea.city,
        radius: memberSearchFilters.searchArea.radius
    });

    // Gender and Family Status
    const [genderPreference, setGenderPreference] = useState(memberSearchFilters.genderPreference);
    const [familyStatusPreference, setFamilyStatusPreference] = useState(memberSearchFilters.statusPreference);

    // Age
    const [minAgePreference, setMinAgePreference] = useState(memberSearchFilters.minAgePreference);
    const [maxAgePreference, setMaxAgePreference] = useState(memberSearchFilters.maxAgePreference);

    // Number of Roommates
    const [selectedLimitPreference, setSelectedLimitPreference] = useState(memberSearchFilters.numRoommatesPreference);

    // Budget
    const [minBudgetPreference, setMinBudgetPreference] = useState(memberSearchFilters.minBudgetPreference);
    const [maxBudgetPreference, setMaxBudgetPreference] = useState(memberSearchFilters.maxBudgetPreference);

    // Yes/No Question
    const [religionPreference, setReligionPreference] = useState(memberSearchFilters.religionPreference);
    const [dietPreference, setDietPreference] = useState(memberSearchFilters.dietPreference);
    const [homeToSharePreference, setHomeToSharePreference] = useState(memberSearchFilters.othersWithHomeToSharePreference);
    const [petPreference, setPetPreference] = useState(memberSearchFilters.petsPreference);
    const [smokingPreference, setSmokingPreference] = useState(memberSearchFilters.smokingPreference);

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
            setMemberSearchFilters({
                memberSearchFilters: {
                    searchArea: {
                        province: searchArea.province,
                        city: searchArea.city,
                        radius: searchArea.radius
                    },
                    genderPreference,
                    statusPreference: familyStatusPreference,
                    minAgePreference,
                    maxAgePreference,
                    numRoommatesPreference: selectedLimitPreference,
                    minBudgetPreference,
                    maxBudgetPreference,
                    petsPreference: petPreference,
                    smokingPreference: smokingPreference,
                    religionPreference: religionPreference,
                    dietPreference: dietPreference,
                    othersWithHomeToSharePreference: homeToSharePreference
                }
            })

            // else form is valid and proceed to make request

            //TODO: Update Filter Based on Results
            const filteringData = {
                // member search preferences
                searchArea: searchArea,

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
    }

    return (
        <SearchFilter
            handleSearchAreaChange={setSearchArea}

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
    );
}

const mapStateToProps = state => ({
    memberSearchFilters: state.memberPrivileges.memberSearchFilters
});

SearchFilterContainer.propTypes = {
    memberSearchFilters: PropTypes.shape({
        searchArea: PropTypes.shape({
            province: PropTypes.string,
            city: PropTypes.string,
            radius: PropTypes.string
        }).isRequired,
        genderPreference: PropTypes.array.isRequired,
        statusPreference: PropTypes.array.isRequired,
        minAgePreference: PropTypes.number.isRequired,
        maxAgePreference: PropTypes.number.isRequired,
        numRoommatesPreference: PropTypes.array.isRequired,
        minBudgetPreference: PropTypes.number.isRequired,
        maxBudgetPreference: PropTypes.number.isRequired,
        religionPreference: PropTypes.string.isRequired,
        dietPreference: PropTypes.string.isRequired,
        othersWithHomeToSharePreference: PropTypes.string.isRequired,
        petsPreference: PropTypes.string.isRequired,
        smokingPreference: PropTypes.string.isRequired

    }).isRequired,
    setMemberSearchFilters: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchFilterContainer);