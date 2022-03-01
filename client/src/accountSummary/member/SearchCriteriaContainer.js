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
import {isValueInArray} from "../../common/utils/generalUtils";
import {
    checkIfErrorsExistInMapping,
    getConcatenatedErrorMessage,
    validateArrayInput,
    validateInput,
    validateMinMax,
    resolveYesNoToBoolean
} from "../../registration/registrationUtils";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import { useNavigate } from "react-router-dom";
import {setMemberSearchFilters} from "../../redux/slices/memberPrivileges";
import {SESSION_ERR} from "../../common/constants/errors";
import {reset} from "../../redux/actionCreators";
import {resolveBooleanToYesNo} from "../../common/utils/generalUtils";

const mapDispatchToProps = {
    reset,
    setMemberSearchFilters
}

const SearchCriteriaContainer = (props) => {
    const {memberSearchFilters, setMemberSearchFilters, reset} = props;
    const navigate = useNavigate();
    // Gender and Family Status
    const [genderPreference, setGenderPreference] = useState([]);
    const [familyStatusPreference, setFamilyStatusPreference] = useState([]);

    // Age
    const [minAgePreference, setMinAgePreference] = useState();
    const [maxAgePreference, setMaxAgePreference] = useState();

    // Number of Roommates
    const [selectedLimitPreference, setSelectedLimitPreference] = useState([]);

    // Budget
    const [minBudgetPreference, setMinBudgetPreference] = useState();
    const [maxBudgetPreference, setMaxBudgetPreference] = useState();

    // Yes/No Question
    const [religionPreference, setReligionPreference] = useState("");

    const [dietPreference, setDietPreference] = useState("");

    const [homeToSharePreference, setHomeToSharePreference] = useState("");

    const [petPreference, setPetPreference] = useState("");

    const [smokingPreference, setSmokingPreference] = useState("");

    const [loading, setLoading] = useState(true);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

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
    //populate values from server
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
                setHomeToSharePreference(resolveBooleanToYesNo(data.homeToSharePreference));
                setPetPreference(resolveBooleanToYesNo(data.petsPreference));
                setSmokingPreference(resolveBooleanToYesNo(data.smokingPreference));

                setLoading(false);
            });
    }, []);


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
                    setMemberSearchFilters({
                        memberSearchFilters: {
                            ...memberSearchFilters,
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
                    setShowSuccessMessage(true);
                }
                else if (data && data.errors && Array.isArray(data.errors)) {
                    const errorMessage = getConcatenatedErrorMessage(data.errors);
                    alert(errorMessage);
                    setShowSuccessMessage(false);
                }
                else if (data && (!data.authenticated || !data.success)) {
                    reset();

                    alert(SESSION_ERR);

                    // redirect to home page
                    navigate('/');
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

const mapStateToProps = state => ({
    memberSearchFilters: state.memberPrivileges.memberSearchFilters
});


SearchCriteriaContainer.propTypes = {
    memberSearchFilters: PropTypes.shape({
        searchArea: PropTypes.shape({
            province: PropTypes.string,
            city: PropTypes.string,
            radius: PropTypes.string
        }).isRequired,
        genderPreference: PropTypes.oneOfType([PropTypes.string, PropTypes.array]).isRequired,
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
    setMemberSearchFilters: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchCriteriaContainer);
