/**
 * @Author:     Parsa Rajabi
 * @Created:    2021.01.24
 *
 * @Description: container for SearchCriteria. Container is a "smart" component and handles all of the logic
 *
 */

import React, {useState, useEffect} from 'react';
import indexOf from "lodash/indexOf";

import SearchCriteria from "./SearchCriteria";
import * as MemberService from '../../services/MemberService';
import {isValueInArray, resolveBooleanToYesNo} from "../../common/utils/generalUtils";
import {
    checkIfErrorsExistInMapping,
    getConcatenatedErrorMessage,
    validateArrayInput,
    validateInput,
    validateMinMax,
    resolveYesNoToBoolean
} from "../../registration/registrationUtils";
import {USER_TYPES} from "../../common/constants/users";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import { useHistory } from "react-router-dom";
import {setAccountType, setAuthenticated, setIsAdmin} from "../../redux/slices/userPrivileges";

const mapDispatch = {setIsAdmin, setAccountType, setAuthenticated};

const SearchCriteriaContainer = (props) => {
    const {setIsAdmin, setAccountType, setAuthenticated} = props;
    const history = useHistory();
    // Gender and Family Status
    const [genderPreference, setGenderPreference] = useState();
    const [familyStatusPreference, setFamilyStatusPreference] = useState();

    // Age
    const [minAgePreference, setMinAgePreference] = useState();
    const [maxAgePreference, setMaxAgePreference] = useState();

    // Number of Roommates
    const [selectedLimitPreference, setSelectedLimitPreference] = useState([]);

    // Budget
    const [minBudgetPreference, setMinBudgetPreference] = useState();
    const [maxBudgetPreference, setMaxBudgetPreference] = useState();

    // Yes/No Question
    const [religionPreference, setReligionPreference] = useState(undefined);
    // const [religionPreference, setReligionPreference] = useState(resolveBooleanToYesNo(hasReligionPreferenceBoolean));

    const [dietPreference, setDietPreference] = useState(undefined);

    const [homeToSharePreference, setHomeToSharePreference] = useState(undefined);

    const [petPreference, setPetPreference] = useState(undefined);

    const [smokingPreference, setSmokingPreference] = useState(undefined);

    const [loading, setLoading] = useState(true);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    useEffect(() => {
        MemberService.getMemberSearchFilters()
            .then(res => res.json())
            .then(data => {
                setGenderPreference(JSON.parse(data.genderPreference));
                setFamilyStatusPreference(JSON.parse(data.statusPreference));
                setMinAgePreference(data.minAgePreference);
                setMaxAgePreference(data.maxAgePreference);
                setSelectedLimitPreference(JSON.parse(data.numRoommatesPreference));
                setMinBudgetPreference(data.minBudgetPreference);
                setMaxBudgetPreference(data.maxBudgetPreference);
                setReligionPreference(resolveBooleanToYesNo(data.religionPreference));
                setDietPreference(resolveBooleanToYesNo(data.dietPreference));
                setHomeToSharePreference(resolveBooleanToYesNo(data.othersWithHomeToSharePreference));
                setPetPreference(resolveBooleanToYesNo(data.petsPreference));
                setSmokingPreference(resolveBooleanToYesNo(data.smokingPreference));
                setLoading(false);
            });
    }, []);


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
        MemberService.updateMemberSearchFilters({
            genderPreference,
            statusPreference: familyStatusPreference,
            minAgePreference,
            maxAgePreference,
            numRoommatesPreference: selectedLimitPreference,
            minBudgetPreference,
            maxBudgetPreference,
            petsPreference: resolveYesNoToBoolean(petPreference),
            smokingPreference: resolveYesNoToBoolean(smokingPreference),
            religionPreference: resolveYesNoToBoolean(religionPreference),
            dietPreference: resolveYesNoToBoolean(dietPreference),
            othersWithHomeToSharePreference: resolveYesNoToBoolean(homeToSharePreference)
        })
            .then(res => res.json())
            .then(data => {
                if (data && data.success) {
                    setShowSuccessMessage(true);
                }
                else if (data && data.errors && Array.isArray(data.errors)) {
                    const errorMessage = getConcatenatedErrorMessage(data.errors);
                    alert(errorMessage);
                    setShowSuccessMessage(false);
                }
                else if (data && (!data.authenticated || !data.success)) {
                    setIsAdmin({isAdmin: false});
                    setAccountType({accountType: USER_TYPES.UNREGISTERED});
                    setAuthenticated({authenticated: false});

                    alert('There was an error with your session. Please try to login again.');

                    // redirect to home page
                    history.push('/');
                } else {
                    alert('There was an error when updating your profile. Please try again and contact Home Together ' +
                        'if the issue persists');
                    setShowSuccessMessage(false);
                }
            })
    }

    return (
        <div>
            {!loading &&
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

                    showSuccessMessage={showSuccessMessage}

                    onSubmit={onSubmit}
                />
            }
        </div>

    )
}

SearchCriteriaContainer.propTypes = {
    setAccountType: PropTypes.func.isRequired,
    setAuthenticated: PropTypes.func.isRequired,
    setIsAdmin: PropTypes.func.isRequired
}

export default connect(null, mapDispatch)(SearchCriteriaContainer);
