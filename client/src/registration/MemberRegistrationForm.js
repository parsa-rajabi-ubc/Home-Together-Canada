/**
 * @Author:     Alex Qin
 * @Created:    2020.11.10
 *
 * @Description: Member Registration Component
 *
 */

import React, {useState, useEffect} from 'react';
import TextArea from '../common/forms/TextArea';
import Checkbox from "../common/forms/Checkbox";
import SubmitButton from '../common/forms/SubmitButton';
import Address from "../common/forms/Address";
import SignInInfo from "../common/forms/SignInInfo";
import PhoneNumInput from "../common/forms/PhoneNumInput";
import BirthYear from "../common/forms/BirthYear";
import {isStringEmpty} from "../common/utils/stringUtils";
import {isValueInArray} from "../common/utils/generalUtils";
import {
    getConcatenatedErrorMessage,
    getPhoneNumberFromStrings,
    validateInput,
    checkIfErrorsExistInMapping,
    validatePhoneNumber,
    validatePasswordConfirmationMismatch,
    validatePasswordConfirmationEmpty,
    validateEmail,
    validatePassword,
    resolveYesNoToBoolean,
    validateArrayInput,
    validateMinMax,
    validateCheckbox
} from "./registrationUtils";
import RegistrationService from "../services/RegistrationService";
import RadioButton from "../common/forms/RadioButton";
import Status from "../common/forms/Status";
import ShareLimit from "../common/forms/ShareLimits";
import InterestedArea from "../common/forms/InterestedArea";
import YNButton from "../common/forms/YNButtons";
import LargeTextArea from "../common/forms/LargeTextArea";
import PropTypes from "prop-types";
import WorkStatus from "../common/forms/WorkStatus";
import Asterisk from "../common/forms/Asterisk";
import LabelAsterisk from "../common/forms/LabelAsterisk";
import {connect} from 'react-redux';
import {setIsAdmin, setAccountType, setAuthenticated} from '../redux/slices/userPrivileges';
import {setActive, setMemberSearchFilters} from "../redux/slices/memberPrivileges";
import Tooltip from "../common/forms/Tooltip";
import {USER_TYPES} from "../common/constants/users";
import {MEMBER_PROFILE_INFO_TEXT} from "../common/constants/TooltipText";
import {dropdownDefaultCSS, dropdownErrorCSS} from "../css/dropdownCSSUtil"
import {Link} from "react-router-dom";
import indexOf from 'lodash/indexOf';
import {TERMS_OF_SERVICE_TEXT} from "../common/constants/termsOfServiceText";
import {PRIVACY_POLICY_TEXT} from "../common/constants/privacyPolicyText";
import {toast, Flip} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import {REGISTRATION_TOAST} from "../common/constants/ToastText";
import {MAX_AREAS_OF_INTEREST} from "../common/constants/memberConstants";

toast.configure()

const mapDispatch = {setIsAdmin, setAccountType, setAuthenticated, setActive, setMemberSearchFilters};

function MemberRegistrationForm(props) {
    const {history, setIsAdmin, setAccountType, setAuthenticated, setActive, setMemberSearchFilters} = props;
    const [firstName, setFirstName] = useState(undefined);
    const [lastName, setLastName] = useState(undefined);
    const [yearOfBirth, setYearOfBirth] = useState(undefined);
    const [email, setEmail] = useState(undefined);
    const [phoneNumber, setPhoneNumber] = useState({
        first: undefined,
        middle: undefined,
        last: undefined
    });
    const [useDifferentMailingAddress, setUseDifferentMailingAddress] = useState(false);
    const [address, setAddress] = useState({
        street: undefined,
        aptNum: undefined,
        city: undefined,
        province: undefined,
        postalCode: undefined
    });
    const [mailingAddress, setMailingAddress] = useState({
        street: undefined,
        aptNum: undefined,
        city: undefined,
        province: undefined,
        postalCode: undefined
    });
    const [username, setUsername] = useState(undefined);
    const [password, setPassword] = useState(undefined);
    const [passwordCheck, setPasswordCheck] = useState(undefined);
    const [gender, setGender] = useState("");
    const [genderDescription, setGenderDescription] = useState("");

    const [petFriendly, setPetFriendly] = useState("");
    const [petDescription, setPetDescription] = useState("");

    const [smoking, setSmoking] = useState("");
    const [smokingDescription, setSmokingDescription] = useState("");

    const [mobilityIssues, setMobilityIssues] = useState("");
    const [mobilityIssuesDescription, setMobilityIssuesDescription] = useState("");

    const [hasAllergies, setHasAllergies] = useState("");
    const [allergiesDescription, setAllergiesDescription] = useState("");

    const [religious, setReligious] = useState("");
    const [religionDescription, setReligionDescription] = useState("");

    const [hasDiet, setHasDiet] = useState("");
    const [dietDescription, setDietDescription] = useState("");

    const [hasHome, setHasHome] = useState("");
    const [homeDescription, setHomeDescription] = useState("");

    const [interestInBuyingHome, setInterestInBuyingHome] = useState("");
    const [interestDescription, setInterestDescription] = useState("");

    const [minRent, setMinRent] = useState(undefined);
    const [maxRent, setMaxRent] = useState(undefined);

    const [areasOfInterest, setAreasOfInterest] = useState([{
        province: "",
        city: "",
        radius: ""
    }]);

    const [aboutSelf, setAboutSelf] = useState("");

    const [selectedLimit, setSelectedLimit] = useState("");

    const [selectedFamilyStatus, setsSelectedFamilyStatus] = useState();
    const [partner, setPartner] = useState("");
    const [groupMembers, setGroupMembers] = useState("");

    const [selectedWorkStatus, setsSelectedWorkStatus] = useState();

    const [minAgePreference, setMinAgePreference] = useState("");
    const [maxAgePreference, setMaxAgePreference] = useState("");
    const [genderPreference, setGenderPreference] = useState([]);
    const [familyStatusPreference, setFamilyStatusPreference] = useState([]);
    const [selectedLimitPreference, setSelectedLimitPreference] = useState([]);
    const [religionPreference, setReligionPreference] = useState("");
    const [dietPreference, setDietPreference] = useState("");
    const [homeToSharePreference, setHomeToSharePreference] = useState("");
    const [minBudgetPreference, setMinBudgetPreference] = useState("");
    const [maxBudgetPreference, setMaxBudgetPreference] = useState("");
    const [petPreference, setPetPreference] = useState("");
    const [smokingPreference, setSmokingPreference] = useState("");

    const [termsOfServiceAgreed, setTermsOfServiceAgreed] = useState(false);
    const [privacyPolicyAgreed, setPrivacyPolicyAgreed] = useState(false);

    // Error state variables
    // Personal Information Start
    const [firstNameError, setFirstNameError] = useState(undefined);
    const [lastNameError, setLastNameError] = useState(undefined);
    const [emailError, setEmailError] = useState(undefined);
    const [yearOfBirthError, setYearOfBirthError] = useState(undefined);
    const [phoneNumberError, setPhoneNumberError] = useState(undefined);

    //Address
    const [streetAddressError, setStreetAddressError] = useState(undefined);
    const [cityAddressError, setCityAddressError] = useState(undefined);
    const [provinceAddressError, setProvinceAddressError] = useState(undefined);
    const [postalCodeError, setPostalCodeError] = useState(undefined);

    // Mailing Address
    const [streetMailingAddressError, setStreetMailingAddressError] = useState(undefined);
    const [cityMailingAddressError, setCityMailingAddressError] = useState(undefined);
    const [provinceMailingAddressError, setProvinceMailingAddressError] = useState(undefined);
    const [postalCodeMailingError, setPostalCodeMailingError] = useState(undefined);
    // Personal Information End


    // Profile Details Start
    const [genderError, setGenderError] = useState(undefined);
    const [familyStatusError, setFamilyStatusError] = useState(undefined);
    const [workStatusError, setWorkStatusError] = useState(undefined);
    const [limitError, setLimitError] = useState(undefined);
    const [minRentError, setMinRentError] = useState(undefined);
    const [maxRentError, setMaxRentError] = useState(undefined);
    const [areasOfInterestError, setAreasOfInterestError] = useState(undefined);
    const [petFriendlyError, setPetFriendlyError] = useState(undefined);
    const [smokingError, setSmokingError] = useState(undefined);
    const [mobilityIssuesError, setMobilityIssuesError] = useState(undefined);
    const [allergiesError, setAllergiesError] = useState(undefined);
    const [religionError, setReligionError] = useState(undefined);
    const [dietError, setDietError] = useState(undefined);
    const [homeError, setHomeError] = useState(undefined);
    const [interestInBuyingError, setInterestInBuyingError] = useState(undefined);
    // Profile Details End

    // Search Criteria
    const [minAgePreferenceError, setMinAgePreferenceError] = useState(undefined);
    const [maxAgePreferenceError, setMaxAgePreferenceError] = useState(undefined);
    const [genderPreferenceError, setGenderPreferenceError] = useState(undefined);
    const [familyStatusPreferenceError, setFamilyStatusPreferenceError] = useState(undefined);
    const [selectedLimitPreferenceError, setSelectedLimitPreferenceError] = useState(undefined);
    const [religionPreferenceError, setReligionPreferenceError] = useState(undefined);
    const [dietPreferenceError, setDietPreferenceError] = useState(undefined);
    const [homeToSharePreferenceError, setHomeToSharePreferenceError] = useState(undefined);
    const [minBudgetPreferenceError, setMinBudgetPreferenceError] = useState(undefined);
    const [maxBudgetPreferenceError, setMaxBudgetPreferenceError] = useState(undefined);
    const [petPreferenceError, setPetPreferenceError] = useState(undefined);
    const [smokingPreferenceError, setSmokingPreferenceError] = useState(undefined);

    // TOS
    const [termsOfServiceError, setTermsOfServiceError] = useState(undefined);
    const [privacyPolicyError, setPrivacyPolicyError] = useState(undefined);

    // Account Details Start
    const [usernameError, setUsernameError] = useState(undefined);
    const [passwordError, setPasswordError] = useState(undefined);
    const [passwordConfirmError, setPasswordConfirmError] = useState(undefined);
    // Account Details End

    // useEffects
    useEffect(() => {
        firstName !== undefined && validateInput(firstName, setFirstNameError);
    }, [firstName]);
    useEffect(() => {
        lastName !== undefined && validateInput(lastName, setLastNameError);
    }, [lastName]);
    useEffect(() => {
        email !== undefined && validateEmail(email, setEmailError);
    }, [email]);
    useEffect(() => {
        if (phoneNumber.first !== undefined || phoneNumber.middle !== undefined || phoneNumber.last !== undefined) {
            validatePhoneNumber(phoneNumber, setPhoneNumberError);
        }
    }, [phoneNumber]);

    // Address
    useEffect(() => {
        address.street !== undefined && validateInput(address.street, setStreetAddressError);
    }, [address.street]);
    useEffect(() => {
        address.city !== undefined && validateInput(address.city, setCityAddressError);
    }, [address.city]);
    useEffect(() => {
        address.postalCode !== undefined && validateInput(address.postalCode, setPostalCodeError);
    }, [address.postalCode]);

    // Mailing Address
    useEffect(() => {
        if (useDifferentMailingAddress) {
            mailingAddress.street !== undefined && validateInput(mailingAddress.street, setStreetMailingAddressError);
        }
    }, [mailingAddress.street, useDifferentMailingAddress]);
    useEffect(() => {
        if (useDifferentMailingAddress) {
            mailingAddress.city !== undefined && validateInput(mailingAddress.city, setCityMailingAddressError);
        }
    }, [mailingAddress.city, useDifferentMailingAddress]);
    useEffect(() => {
        if (useDifferentMailingAddress) {
            mailingAddress.postalCode !== undefined && validateInput(mailingAddress.postalCode, setPostalCodeMailingError);
        }
    }, [mailingAddress.postalCode, useDifferentMailingAddress]);


    // Profile
    useEffect(() => {
        minRent !== undefined && validateInput(minRent, setMinRentError);
    }, [minRent]);
    useEffect(() => {
        maxRent !== undefined && validateInput(maxRent, setMaxRentError);
    }, [maxRent]);


    // Account Details
    useEffect(() => {
        username !== undefined && validateInput(username, setUsernameError);
    }, [username]);
    useEffect(() => {
        password !== undefined && validatePassword(password, setPasswordError);
    }, [password]);
    useEffect(() => {
        passwordCheck !== undefined && validatePasswordConfirmationEmpty(passwordCheck, setPasswordConfirmError);
    }, [passwordCheck]);
    useEffect(() => {
        if (password !== undefined && passwordCheck !== undefined) {
            validatePasswordConfirmationMismatch(password, passwordCheck, setPasswordConfirmError);
        }
    }, [password, passwordCheck]);


    function checkStatus(selectedFamilyStatus) {
        if (selectedFamilyStatus === "Couple") {
            return <TextArea
                className={"input"}
                labelClassName={"label"}
                placeholder={"Partner's username"}
                onChange={(e) => setPartner(e.target.value)}
                value={partner}
            />
        } else if (selectedFamilyStatus === "Couple With Children") {
            return <TextArea
                className={"input"}
                labelClassName={"label"}
                placeholder={"Partner's username"}
                onChange={(e) => setPartner(e.target.value)}
                value={partner}
            />

        } else if (selectedFamilyStatus === "Existing Group") {
            return <TextArea
                className={"input"}
                labelClassName={"label"}
                placeholder={"Member's username(s) - divided by commas"}
                onChange={(e) => setGroupMembers(e.target.value)}
                value={groupMembers}
            />
        }

    }


    const handleFamilyStatusChange = e => {
        setsSelectedFamilyStatus(e.value);
    }

    const handleWorkStatusChange = e => {
        setsSelectedWorkStatus(e.value);
    }

    const handleLimitChange = e => {
        setSelectedLimit(e.value);
    }

    function handlePhoneChange(e) {
        const value = e.target.value;
        setPhoneNumber({
            ...phoneNumber,
            [e.target.name]: value
        });
    }

    const handleYearChange = e => {
        setYearOfBirth(e.value);
    }

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

        const personalInfoErrors = {
            errorFirstName: false,
            errorLastName: false,
            errorEmail: false,
            errorPhoneNumber: false,
            errorAddress: {
                street: false,
                city: false,
                province: false,
                postalCode: false,
            },
            errorMailingAddress: {
                street: false,
                city: false,
                province: false,
                postalCode: false,
            }
        }

        const profileInfoErrors = {
            errorGender: false,
            errorYearOfBirth: false,
            errorFamilyStatus: false,
            errorWorkStatus: false,
            errorLimit: false,
            errorRent: false,
            errorInterestedArea: false,
            errorPet: false,
            errorSmoking: false,
            errorHealth: false,
            errorAllergies: false,
            errorReligion: false,
            errorDiet: false,
            errorHomeToShare: false,
            errorBuyingHome: false,
        }

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

        const tosErrors = {
            errorTOS: false,
            errorPrivacy: false
        }

        const accountDetailsErrors = {
            errorUsername: false,
            errorPassword: {
                password: false,
                passwordConfirmationEmpty: false,
                passwordConfirmationMismatch: false,
            }

        }

        // Personal Information Validation
        personalInfoErrors.errorFirstName = validateInput(firstName, setFirstNameError);
        personalInfoErrors.errorLastName = validateInput(lastName, setLastNameError);
        personalInfoErrors.errorEmail = validateEmail(email, setEmailError);
        personalInfoErrors.errorPhoneNumber = validatePhoneNumber(phoneNumber, setPhoneNumberError);
        personalInfoErrors.errorAddress.street = validateInput(address.street, setStreetAddressError);
        personalInfoErrors.errorAddress.city = validateInput(address.city, setCityAddressError);
        personalInfoErrors.errorAddress.province = validateInput(address.province, setProvinceAddressError);
        personalInfoErrors.errorAddress.postalCode = validateInput(address.postalCode, setPostalCodeError);
        if (useDifferentMailingAddress) {
            personalInfoErrors.errorMailingAddress.street = validateInput(mailingAddress.street, setStreetMailingAddressError);
            personalInfoErrors.errorMailingAddress.city = validateInput(mailingAddress.city, setCityMailingAddressError);
            personalInfoErrors.errorMailingAddress.province = validateInput(mailingAddress.province, setProvinceMailingAddressError);
            personalInfoErrors.errorMailingAddress.postalCode = validateInput(mailingAddress.postalCode, setPostalCodeMailingError);
        }
        // Profile Validation
        profileInfoErrors.errorGender = validateInput(gender, setGenderError);
        profileInfoErrors.errorYearOfBirth = validateInput(yearOfBirth, setYearOfBirthError);
        profileInfoErrors.errorFamilyStatus = validateInput(selectedFamilyStatus, setFamilyStatusError);
        profileInfoErrors.errorWorkStatus = validateInput(selectedWorkStatus, setWorkStatusError);
        profileInfoErrors.errorLimit = validateInput(selectedLimit, setLimitError);
        profileInfoErrors.errorRent = validateMinMax(minRent, maxRent, setMinRentError, setMaxRentError);

        for (let i = 0; i <= areasOfInterest.length - 1; i++) {
            if (!areasOfInterest[i].province || !areasOfInterest[i].city || !areasOfInterest[i].radius) {
                setAreasOfInterestError(true);
                profileInfoErrors.errorInterestedArea = true;
                break;
            } else {
                setAreasOfInterestError(false);
                profileInfoErrors.errorInterestedArea = false;
            }
        }
        // Yes/No Validation
        profileInfoErrors.errorPet = validateInput(petFriendly, setPetFriendlyError);
        profileInfoErrors.errorSmoking = validateInput(smoking, setSmokingError);
        profileInfoErrors.errorHealth = validateInput(mobilityIssues, setMobilityIssuesError);
        profileInfoErrors.errorAllergies = validateInput(hasAllergies, setAllergiesError);
        profileInfoErrors.errorReligion = validateInput(religious, setReligionError);
        profileInfoErrors.errorDiet = validateInput(hasDiet, setDietError);
        profileInfoErrors.errorHomeToShare = validateInput(hasHome, setHomeError);
        profileInfoErrors.errorBuyingHome = validateInput(interestInBuyingHome, setInterestInBuyingError);

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

        // TOS Validation
        tosErrors.errorTOS = validateCheckbox(termsOfServiceAgreed, setTermsOfServiceError);
        tosErrors.errorPrivacy = validateCheckbox(privacyPolicyAgreed, setPrivacyPolicyError);

        // Account Details Validation
        accountDetailsErrors.errorUsername = validateInput(username, setUsernameError);
        accountDetailsErrors.errorPassword.password = validatePassword(password, setPasswordError);
        accountDetailsErrors.errorPassword.passwordConfirmationEmpty = validatePasswordConfirmationEmpty(passwordCheck, setPasswordConfirmError);
        accountDetailsErrors.errorPassword.passwordConfirmationMismatch = validatePasswordConfirmationMismatch(password, passwordCheck, setPasswordConfirmError);


        // check personal information for errors
        if (checkIfErrorsExistInMapping(personalInfoErrors)
            || checkIfErrorsExistInMapping(personalInfoErrors.errorAddress)
            || checkIfErrorsExistInMapping(personalInfoErrors.errorMailingAddress)
        ) {
            return false;
            // check profile for errors
        } else if (checkIfErrorsExistInMapping(profileInfoErrors)) {
            return false;
        //    check search criteria for errors
        } else if (checkIfErrorsExistInMapping(searchErrors)) {
            return false;
            //    check TOS for errors
        } else if (checkIfErrorsExistInMapping(tosErrors)) {
            return false;
            // check account details for errors
        } else return !(checkIfErrorsExistInMapping(accountDetailsErrors)
            || checkIfErrorsExistInMapping(accountDetailsErrors.errorPassword));

    }

    //function for input checks on submit
    function onSubmit(event) {

        if (!isFormValid()) {
            // form is invalid
            toast.error(REGISTRATION_TOAST.ERROR, {
                toastId: "errorToast",
                position: "bottom-center",
                autoClose: 10000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: false,
                transition: Flip
            });
            event.preventDefault();
            return;
        }
        // else form is valid and proceed to make request
        const registrationData = {
            // abstract user
            username: username,
            password: password,
            email: email,
            firstName: firstName,
            lastName: lastName,
            phoneNumber: getPhoneNumberFromStrings(phoneNumber.first, phoneNumber.middle, phoneNumber.last),
            addressLine1: address.street,
            addressLine2: address.aptNum,
            city: address.city,
            province: address.province,
            postalCode: address.postalCode,
            hasDifferentMailingAddress: !!useDifferentMailingAddress,
            ...(useDifferentMailingAddress) && {mailingAddressLine1: mailingAddress.street},
            ...(useDifferentMailingAddress) && {mailingAddressLine2: mailingAddress.aptNum},
            ...(useDifferentMailingAddress) && {mailingCity: mailingAddress.city},
            ...(useDifferentMailingAddress) && {mailingProvince: mailingAddress.province},
            ...(useDifferentMailingAddress) && {mailingPostalCode: mailingAddress.postalCode},

            // member account
            gender: gender,
            ...(gender === 'Other') && {genderDescription: genderDescription},
            birthYear: yearOfBirth,
            status: selectedFamilyStatus,
            ...((selectedFamilyStatus === 'Couple' || selectedFamilyStatus === 'Couple With Children') && !isStringEmpty(partner))
            && {partnerUsername: partner},
            ...(selectedFamilyStatus === 'Existing Group' && !isStringEmpty(groupMembers))
            && {existingGroupUsernames: groupMembers.split(',').map(item => item.trim())},
            workStatus: selectedWorkStatus,
            minMonthlyBudget: Number(minRent),
            maxMonthlyBudget: Number(maxRent),
            hasHomeToShare: (hasHome === 'yes'),
            ...(hasHome === 'yes') && {hasHomeToShareDescription: homeDescription},
            isReligionImportant: (religious === 'yes'),
            ...(religious === 'yes') && {religionDescription: religionDescription},
            isDietImportant: (hasDiet === 'yes'),
            ...(hasDiet === 'yes') && {dietDescription: dietDescription},
            hasHealthMobilityIssues: (mobilityIssues === 'yes'),
            ...(mobilityIssues === 'yes') && {healthMobilityIssuesDescription: mobilityIssuesDescription},
            hasAllergies: (hasAllergies === 'yes'),
            ...(hasAllergies === 'yes') && {allergiesDescription: allergiesDescription},
            hasPets: (petFriendly === 'yes'),
            ...(petFriendly === 'yes') && {petsDescription: petDescription},
            isSmoker: (smoking === 'yes'),
            ...(smoking === 'yes') && {smokingDescription: smokingDescription},
            isInterestedInBuyingHome: (interestInBuyingHome === 'yes'),
            ...(interestInBuyingHome === 'yes') && {interestInBuyingHomeDescription: interestDescription},
            numRoommates: selectedLimit,
            bio: aboutSelf,
            areasOfInterest: areasOfInterest,

            // member search preferences
            minAgePreference: parseInt(minAgePreference),
            maxAgePreference: parseInt(maxAgePreference),
            statusPreference: familyStatusPreference,
            minBudgetPreference: parseInt(minBudgetPreference),
            maxBudgetPreference: parseInt(maxBudgetPreference),
            dietPreference: resolveYesNoToBoolean(dietPreference),
            petsPreference: resolveYesNoToBoolean(petPreference),
            smokingPreference: resolveYesNoToBoolean(smokingPreference),
            genderPreference: genderPreference,
            religionPreference: resolveYesNoToBoolean(religionPreference),
            othersWithHomeToSharePreference: resolveYesNoToBoolean(homeToSharePreference),
            numRoommatesPreference: selectedLimitPreference
        }

        RegistrationService.registerMemberUser(registrationData)
            .then(res => res.json())
            .then(data => {
                if (data && data.authenticated) {
                    // dispatch action to set isAdmin
                    setIsAdmin({isAdmin: data.member ? data.member.isAdmin : false});

                    // dispatch action to set accountType
                    if (data.member) {
                        setAccountType({accountType: USER_TYPES.MEMBER});
                    }

                    // dispatch action to set active
                    setActive({active: data.member.active});

                    // dispatch action to set authenticated
                    setAuthenticated({authenticated: data.authenticated});

                    // dispatch action to set search filters
                    setMemberSearchFilters({
                        memberSearchFilters: {
                            searchArea: {
                                province: '',
                                city: '',
                                radius: undefined
                            },
                            minAgePreference: parseInt(minAgePreference),
                            maxAgePreference: parseInt(maxAgePreference),
                            statusPreference: familyStatusPreference,
                            minBudgetPreference: parseInt(minBudgetPreference),
                            maxBudgetPreference: parseInt(maxBudgetPreference),
                            dietPreference: dietPreference,
                            petsPreference: petPreference,
                            smokingPreference: smokingPreference,
                            genderPreference: genderPreference,
                            religionPreference: religionPreference,
                            othersWithHomeToSharePreference: homeToSharePreference,
                            numRoommatesPreference: selectedLimitPreference
                        }
                    });

                    toast.success(REGISTRATION_TOAST.SUCCESS, {
                        toastId: "successToast",
                        position: "bottom-center",
                        autoClose: 10000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: false,
                        transition: Flip
                    });

                    // user is authenticated, redirect to home screen
                    return history.push('/');
                } else if (data && data.errors && data.errors.length) {
                    const errorMessage = getConcatenatedErrorMessage(data.errors);
                    // show list of all errors
                    alert(errorMessage);
                } else if (data && !data.authenticated) {
                    // something went wrong with the AUTHENTICATION (not the user creation)
                    alert('Registration failed');
                }
            })
            .catch((error) => {
                alert('Something went wrong creating your member. Please try again. Error: ' + error);
            });
    }

    return (
        <div>
            <div className="m-10 md:grid md:grid-cols-4 md:gap-0">
                <div className="md:col-span-1">
                    <div className="px-4 sm:px-0">
                        <h3 className="info-header">Personal Information</h3>
                        <p className="mr-10 info-text">
                            This information is about you and is private. Home Together Canada uses it for verification purposes only and does not not share this
                            information. Please see
                            <Link to={'/faq'} className={"label"}> FAQs</Link> for more information.
                        </p>
                        <p className="mr-10 info-text">
                            <Asterisk/>Required Field
                        </p>
                    </div>
                </div>
                <div
                    className="py-5 px-4 mt-5 space-y-1 bg-white shadow md:mt-0 md:col-span-2 sm:rounded-md sm:overflow-hidden sm:p-6">
                    <div className="grid grid-cols-2 gap-6">
                        <div className="col-span-3 sm:col-span-2">
                            <TextArea
                                className={`${firstNameError && "border-red-500"} input`}
                                labelClassName={"label"}
                                label="First Name"
                                autoComplete={"given-name"}
                                required={true}
                                onChange={(e) => {
                                    setFirstName(e.target.value)
                                }}
                            />
                            <TextArea
                                className={`${lastNameError && "border-red-500"} input`}
                                labelClassName={"label"}
                                label="Last Name"
                                autoComplete={"family-name"}
                                required={true}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                            <TextArea
                                className={`${emailError && "border-red-500"} input`}
                                placeholder="personal@email.ca"
                                label="Email"
                                autoComplete={"email"}
                                labelClassName={"label"}
                                required={true}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <PhoneNumInput
                                className={`${phoneNumberError && "border-red-500"} phone`}
                                labelClassName={"label"}
                                required={true}
                                label="Phone Number" onChange={handlePhoneChange}/>

                            <Address
                                label="Address"
                                required={true}
                                onChange={setAddress}
                                streetAddressError={streetAddressError}
                                cityAddressError={cityAddressError}
                                provinceAddressError={provinceAddressError}
                                postalCodeError={postalCodeError}
                            />
                            <Checkbox
                                label="Different Mailing Address"
                                toolTipText={MEMBER_PROFILE_INFO_TEXT.DIFF_MAILING_ADDRESS}
                                toolTipID="differentMailingAddress"
                                onChange={() => setUseDifferentMailingAddress(!useDifferentMailingAddress)}
                            />
                            {useDifferentMailingAddress &&
                            <Address
                                label="Mailing Address"
                                streetAddressError={streetMailingAddressError}
                                cityAddressError={cityMailingAddressError}
                                provinceAddressError={provinceMailingAddressError}
                                postalCodeError={postalCodeMailingError}
                                required={true}
                                onChange={setMailingAddress}
                            />}
                        </div>
                    </div>
                </div>
            </div>

            {/*Divided*/}
            <div className="border-divider"/>

            {/*Profile*/}
            <div className="mt-10 sm:mt-0">
                <div className="m-10 md:grid md:grid-cols-4 md:gap-6">
                    <div className="md:col-span-1">
                        <div className="px-4 sm:px-0">
                            <h3 className="info-header">Profile Details</h3>
                            <p className="info-text">
                                This information is about your home-sharing preferences and will be accessible by
                                other registered members with profiles on the website.
                            </p>
                        </div>
                    </div>
                    <div className="mt-5 md:mt-0 md:col-span-2">
                        <div className="overflow-hidden shadow sm:rounded-md">
                            <div className="py-6 px-4 bg-white sm:p-5">
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="col-span-3 sm:col-span-2">
                                        <section
                                            className={`${genderError && "pl-1 border rounded-lg border-red-500 mr-52"}`}>
                                            <LabelAsterisk label={"Gender"}/>
                                            <div className={"my-2"}>
                                                <RadioButton
                                                    label="Male"
                                                    name="gender" value="Male"
                                                    checked={gender === "Male"}
                                                    onChange={(e) => setGender(e.target.value)}
                                                />
                                                <RadioButton
                                                    label="Female"
                                                    name="gender"
                                                    value="Female"
                                                    checked={gender === "Female"}
                                                    onChange={(e) => setGender(e.target.value)}
                                                />
                                                <RadioButton
                                                    label="Other "
                                                    name="gender"
                                                    value="Other"
                                                    checked={gender === "Other"}
                                                    onChange={(e) => setGender(e.target.value)}
                                                />
                                            </div>
                                        </section>
                                        {(gender === "Other") &&
                                        <TextArea
                                            className="input"
                                            labelClassName={"label mt-5"}
                                            placeholder="What gender do you identify as? (optional)"
                                            value={genderDescription}
                                            onChange={(e) => setGenderDescription(e.target.value)}
                                        />}
                                        <LabelAsterisk label={"Year of Birth"}/>
                                        <Tooltip text={MEMBER_PROFILE_INFO_TEXT.YEAR_OF_BIRTH} toolTipID="yearOfBirth"/>
                                        <BirthYear label={"Year of Birth"} onChange={handleYearChange}
                                                   dropdownCSS={yearOfBirthError ? dropdownErrorCSS : dropdownDefaultCSS}/>
                                        <LabelAsterisk label={"Family Status"}/>
                                        <Tooltip text={MEMBER_PROFILE_INFO_TEXT.FAMILY_STATUS}
                                                 toolTipID="familyStatus"/>
                                        <Status
                                            onChange={handleFamilyStatusChange}
                                            dropdownCSS={familyStatusError ? dropdownErrorCSS : dropdownDefaultCSS}
                                        />
                                        {checkStatus(selectedFamilyStatus)}
                                        <LabelAsterisk label={"Work Status"}/>
                                        <WorkStatus onChange={handleWorkStatusChange}
                                                    dropdownCSS={workStatusError ? dropdownErrorCSS : dropdownDefaultCSS}/>
                                        <LabelAsterisk label={"Open to Sharing With"}/>
                                        <Tooltip text={MEMBER_PROFILE_INFO_TEXT.NUM_PEOPLE_SHARE}
                                                 toolTipID="numPeopleToShare"/>
                                        <ShareLimit
                                            onChange={handleLimitChange}
                                            dropdownCSS={limitError ? dropdownErrorCSS : dropdownDefaultCSS}
                                        />

                                        <LabelAsterisk label={"Monthly Rent"}/>
                                        <Tooltip text={MEMBER_PROFILE_INFO_TEXT.RENT} toolTipID="rent"/>
                                        <div className="grid grid-cols-6 gap-x-6">
                                            <div className="column-span-6-layout">
                                                <input
                                                    className={`${minRentError && "border-red-500"} input`}
                                                    type="number"
                                                    min="0"
                                                    step="1"
                                                    placeholder="Min $ CAD"
                                                    onChange={(e) => setMinRent(e.target.value)}
                                                />
                                            </div>
                                            <div className="column-span-6-layout">
                                                <input
                                                    className={`${maxRentError && "border-red-500"} input`}
                                                    type="number"
                                                    min={minRent}
                                                    step="1"
                                                    placeholder="Max $ CAD"
                                                    onChange={(e) => setMaxRent(e.target.value)}
                                                />

                                            </div>
                                        </div>
                                        <LabelAsterisk label={"Preferred Living Location(s)"}/>
                                        <Tooltip
                                            text={MEMBER_PROFILE_INFO_TEXT.INTERESTED_AREA}
                                             toolTipID="interestedArea"
                                        />
                                        <InterestedArea
                                            onChange={setAreasOfInterest}
                                            areasOfInterestError={areasOfInterestError}
                                            max={MAX_AREAS_OF_INTEREST}
                                        />
                                        <div className="grid grid-cols-6 gap-x-6 mt-5">
                                            <div className="column-span-6-layout">
                                                <section
                                                    className={`${petFriendlyError && "pl-1 border rounded-lg border-red-500"} my-2`}>
                                                    <YNButton
                                                        label={"Pet friendly?"}
                                                        toolTipText={MEMBER_PROFILE_INFO_TEXT.PET}
                                                        toolTipID="pet"
                                                        name="petFriendly"
                                                        required={true}
                                                        value={petFriendly}
                                                        onChange={(e) => setPetFriendly(e.target.value)}
                                                    />
                                                    {(petFriendly === "yes") &&
                                                    <TextArea
                                                        className={"input"}
                                                        placeholder="Elaborate (optional)"
                                                        onChange={e => setPetDescription(e.target.value)}
                                                        value={petDescription}
                                                    />}
                                                </section>
                                            </div>
                                            <div className="column-span-6-layout">
                                                <section
                                                    className={`${smokingError && "pl-1 border rounded-lg border-red-500"} my-2`}>
                                                    <YNButton
                                                        label={"Smoke friendly?"}
                                                        toolTipText={MEMBER_PROFILE_INFO_TEXT.SMOKE}
                                                        toolTipID="smoke"
                                                        name="smoking"
                                                        required={true}
                                                        value={smoking}
                                                        onChange={(e) => setSmoking(e.target.value)}
                                                    />
                                                    {(smoking === "yes") &&
                                                    <TextArea
                                                        className={"input"}
                                                        placeholder="Elaborate (optional)"
                                                        onChange={e => setSmokingDescription(e.target.value)}
                                                        value={smokingDescription}
                                                    />}
                                                </section>
                                            </div>
                                            <div className="column-span-6-layout">
                                                <section
                                                    className={`${mobilityIssuesError && "pl-1 border rounded-lg border-red-500"} my-2`}>
                                                    <YNButton
                                                        label={"Health / mobility issues?"}
                                                        toolTipText={MEMBER_PROFILE_INFO_TEXT.HEALTH}
                                                        toolTipID="health"
                                                        name="mobile"
                                                        required={true}
                                                        value={mobilityIssues}
                                                        onChange={(e) => setMobilityIssues(e.target.value)}
                                                    />
                                                    {(mobilityIssues === "yes") &&
                                                    <TextArea
                                                        className={"input"}
                                                        placeholder="Elaborate (optional)"
                                                        onChange={e => setMobilityIssuesDescription(e.target.value)}
                                                        value={mobilityIssuesDescription}
                                                    />}
                                                </section>
                                            </div>
                                            <div className="column-span-6-layout">
                                                <section
                                                    className={`${allergiesError && "pl-1 border rounded-lg border-red-500"} my-2`}>
                                                    <YNButton
                                                        label={"Allergies?"}
                                                        name="allergies"
                                                        required={true}
                                                        value={hasAllergies}
                                                        onChange={(e) => setHasAllergies(e.target.value)}
                                                    />
                                                    {(hasAllergies === "yes") &&
                                                    <TextArea
                                                        className={"input"}
                                                        placeholder="Elaborate (optional)"
                                                        onChange={e => setAllergiesDescription(e.target.value)}
                                                        value={allergiesDescription}
                                                    />}
                                                </section>
                                            </div>
                                            <div className="column-span-6-layout">
                                                <section
                                                    className={`${religionError && "pl-1 border rounded-lg border-red-500"} my-2`}>
                                                    <YNButton
                                                        label={"Is religion important?"}
                                                        toolTipText={MEMBER_PROFILE_INFO_TEXT.RELIGION}
                                                        toolTipID="religion"
                                                        name="religion"
                                                        required={true}
                                                        value={religious}
                                                        onChange={(e) => setReligious(e.target.value)}
                                                    />
                                                    {(religious === "yes") &&
                                                    <TextArea
                                                        className={"input"}
                                                        placeholder="Elaborate (optional)"
                                                        onChange={e => setReligionDescription(e.target.value)}
                                                        value={religionDescription}
                                                    />}
                                                </section>
                                            </div>
                                            <div className="column-span-6-layout">
                                                <section
                                                    className={`${dietError && "pl-1 border rounded-lg border-red-500"} my-2`}>
                                                    <YNButton
                                                        label={"Is diet of others important?"}
                                                        toolTipText={MEMBER_PROFILE_INFO_TEXT.DIET}
                                                        toolTipID="diet"
                                                        name="diet"
                                                        required={true}
                                                        value={hasDiet}
                                                        onChange={(e) => setHasDiet(e.target.value)}
                                                    />
                                                    {(hasDiet === "yes") &&
                                                    <TextArea
                                                        className={"input"}
                                                        placeholder="Elaborate (optional)"
                                                        onChange={e => setDietDescription(e.target.value)}
                                                        value={dietDescription}
                                                    />}
                                                </section>
                                            </div>
                                            <div className="column-span-6-layout">
                                                <section
                                                    className={`${homeError && "pl-1 border rounded-lg border-red-500"} my-2`}>
                                                    <YNButton
                                                        label={"Have a home to share?"}
                                                        toolTipText={MEMBER_PROFILE_INFO_TEXT.HOME_TO_SHARE}
                                                        toolTipID="homeToShare"
                                                        name="hasHome"
                                                        required={true}
                                                        value={hasHome}
                                                        onChange={(e) => setHasHome(e.target.value)}
                                                    />
                                                    {(hasHome === "yes")
                                                    && <TextArea
                                                        className={"input inline w-11/12 "}
                                                        placeholder="Elaborate (optional)"
                                                        onChange={e => setHomeDescription(e.target.value)}
                                                        value={homeDescription}
                                                    />}
                                                </section>
                                            </div>
                                            <div className="column-span-6-layout">
                                                <section
                                                    className={`${interestInBuyingError && "pl-1 border rounded-lg border-red-500"} my-2`}>
                                                    <YNButton
                                                        label="Interested in buying a home with others?"
                                                        name="interestInBuyingHome"
                                                        required={true}
                                                        value={interestInBuyingHome}
                                                        onChange={(e) => setInterestInBuyingHome(e.target.value)}
                                                    />
                                                    {(interestInBuyingHome === "yes") &&
                                                    <TextArea
                                                        className={"input"}
                                                        placeholder="Elaborate (optional)"
                                                        onChange={e => setInterestDescription(e.target.value)}
                                                        value={interestDescription}
                                                    />}
                                                </section>
                                            </div>
                                        </div>
                                        <div className={"mt-4"}>
                                            <LargeTextArea
                                                label={"Tell others about yourself"}
                                                toolTipText={MEMBER_PROFILE_INFO_TEXT.ABOUT}
                                                toolTipID="about"
                                                rows={"5"}
                                                required={false}
                                                name="aboutSelf"
                                                placeholder="Let others know more about your lifestyle, values and why you want to home share"
                                                onChange={(e) => setAboutSelf(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            {/*Divided*/}
            <div className="border-divider"/>
            {/*Search Criteria*/}
            <div className="mt-10 sm:mt-0">
                <div className="m-10 md:grid md:grid-cols-4 md:gap-6">
                    <div className="px-4 md:col-span-1 sm:px-0">
                        <h3 className="info-header">Search Criteria</h3>
                        <p className="info-text">
                            This information is used to search for other compatible members on Home Together Canada. Please read
                            <Link to={'/faq'} className={"label"}> FAQs</Link>.
                        </p>
                    </div>

                    <div
                        className="overflow-hidden py-6 px-4 mt-5 bg-white shadow md:mt-0 md:col-span-2 sm:rounded-md sm:p-5">
                        <div className="grid grid-cols-2 gap-6">
                            <div className="col-span-3 sm:col-span-2">
                                <section
                                    className={`${genderPreferenceError && "pl-1 border rounded-lg border-red-500 mr-52"}`}>
                                    <LabelAsterisk label={"I am open to sharing with "}/>
                                    <Tooltip text={MEMBER_PROFILE_INFO_TEXT.PREF.GENDER} toolTipID="genderPref"/>
                                    <div className={"my-2"}>
                                        <Checkbox
                                            label="Male"
                                            id="Male"
                                            className={"align-middle mt-0 mr-1 mb-0 h-4 w-4 border-gray-300 rounded-lg"}
                                            fontNormal={true}
                                            onChange={handleGenderPrefChange}
                                        />
                                        <Checkbox
                                            label="Female"
                                            id={"Female"}
                                            className={"align-middle mt-0 mr-1 mb-0 text-gray-700 focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded-lg"}
                                            fontNormal={true}
                                            onChange={handleGenderPrefChange}
                                        />
                                        <Checkbox
                                            label="Other"
                                            id={"Other"}
                                            className={"align-middle mt-0 mr-1 mb-0 text-gray-700 focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded-lg"}
                                            fontNormal={true}
                                            onChange={handleGenderPrefChange}
                                        />
                                    </div>
                                </section>
                                <LabelAsterisk label={"I am open to sharing with"}/>
                                <Tooltip
                                    text={MEMBER_PROFILE_INFO_TEXT.FAMILY_STATUS}
                                    toolTipID="familyStatusPref"
                                />
                                <Status
                                    onChange={setFamilyStatusPreference}
                                    dropdownCSS={familyStatusPreferenceError ? dropdownErrorCSS : dropdownDefaultCSS}
                                    isDropdownMulti={true}
                                />
                                <LabelAsterisk label={"Age range of person(s) I would like to share with"}/>
                                <Tooltip text={MEMBER_PROFILE_INFO_TEXT.PREF.AGE} toolTipID="agePref"/>
                                <div className="grid grid-cols-6 gap-x-6">
                                    <div className="column-span-6-layout">
                                        <input
                                            className={`${minAgePreferenceError && "border-red-500"} input`}
                                            type="number"
                                            min="16"
                                            step="1"
                                            placeholder="Min Age"
                                            onChange={(e) => setMinAgePreference(e.target.value)}
                                        />
                                    </div>
                                    <div className="column-span-6-layout">
                                        <input
                                            className={`${maxAgePreferenceError && "border-red-500"} input`}
                                            type="number"
                                            min={minAgePreference}
                                            step="1"
                                            placeholder="Max Age"
                                            onChange={(e) => setMaxAgePreference(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <LabelAsterisk
                                    label={"I'm looking for member(s) who are looking to live with the following number of people"}/>
                                <Tooltip text={MEMBER_PROFILE_INFO_TEXT.NUM_PEOPLE_SHARE}
                                         toolTipID="numPeopleToSharePref"/>
                                <div className="col-span-3 sm:col-span-2">
                                    <div className="column-span-6-layout">
                                        <ShareLimit
                                            onChange={handleSelectedLimitPreferenceChange}
                                            dropdownCSS={selectedLimitPreferenceError ? dropdownErrorCSS : dropdownDefaultCSS}
                                            isMulti={true}
                                            currentSelectedValue={selectedLimitPreference}
                                        />
                                    </div>
                                </div>
                                <LabelAsterisk
                                    label={"I am looking for member(s) whose budget range overlaps with the following"}/>
                                <Tooltip text={MEMBER_PROFILE_INFO_TEXT.RENT} toolTipID="rentPref"/>
                                <div className="grid grid-cols-6 gap-x-6">
                                    <div className="column-span-6-layout">
                                        <input
                                            className={`${minBudgetPreferenceError && "border-red-500"} input`}
                                            type="number"
                                            min="0"
                                            step="1"
                                            placeholder="Min $ CAD"
                                            onChange={(e) => setMinBudgetPreference(e.target.value)}
                                        />
                                    </div>
                                    <div className="column-span-6-layout">
                                        <input
                                            className={`${maxBudgetPreferenceError && "border-red-500"} input`}
                                            type="number"
                                            min={minBudgetPreference}
                                            step="1"
                                            placeholder=" Max $ CAD"
                                            onChange={(e) => setMaxBudgetPreference(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <label className={"label"}>I am looking for others who are/find:</label>
                                <div className="grid grid-cols-6 gap-x-6">
                                    <div className="column-span-6-layout">
                                        <section
                                            className={`${petPreferenceError && "pl-1 border rounded-lg border-red-500"} my-2`}>
                                            <YNButton
                                                label={"Pet friendly?"}
                                                toolTipText={MEMBER_PROFILE_INFO_TEXT.PET}
                                                toolTipID="pet"
                                                name="petFriendlyPref"
                                                required={true}
                                                value={petPreference}
                                                onChange={(e) => setPetPreference(e.target.value)}
                                            />
                                        </section>
                                    </div>
                                    <div className="column-span-6-layout">
                                        <section
                                            className={`${smokingPreferenceError && "pl-1 border rounded-lg border-red-500"} my-2`}>
                                            <YNButton
                                                label={"Smoke friendly?"}
                                                toolTipText={MEMBER_PROFILE_INFO_TEXT.SMOKE}
                                                toolTipID="smoke"
                                                name="smokingPref"
                                                required={true}
                                                value={smokingPreference}
                                                onChange={(e) => setSmokingPreference(e.target.value)}
                                            />
                                        </section>
                                    </div>
                                    <div className="column-span-6-layout">
                                        <section
                                            className={`${religionPreferenceError && "pl-1 border rounded-lg border-red-500"} my-2`}>
                                            <YNButton
                                                label={"Is religion important?"}
                                                toolTipText={MEMBER_PROFILE_INFO_TEXT.RELIGION}
                                                toolTipID="religion"
                                                name="religionPref"
                                                required={true}
                                                value={religionPreference}
                                                onChange={(e) => setReligionPreference(e.target.value)}
                                            />
                                        </section>
                                    </div>
                                    <div className="column-span-6-layout">
                                        <section
                                            className={`${dietPreferenceError && "pl-1 border rounded-lg border-red-500"} my-2`}>
                                            <YNButton
                                                label={"Is diet of others important?"}
                                                toolTipText={MEMBER_PROFILE_INFO_TEXT.DIET}
                                                toolTipID="diet"
                                                name="dietPref"
                                                required={true}
                                                value={dietPreference}
                                                onChange={(e) => setDietPreference(e.target.value)}
                                            />
                                        </section>
                                    </div>
                                    <div className="column-span-6-layout">
                                        <section
                                            className={`${homeToSharePreferenceError && "pl-1 border rounded-lg border-red-500"} my-2`}>
                                            <YNButton
                                                label={"Others with a home to share?"}
                                                toolTipText={MEMBER_PROFILE_INFO_TEXT.HOME_TO_SHARE}
                                                toolTipID="homeToShare"
                                                name="homeToSharePref"
                                                required={true}
                                                value={homeToSharePreference}
                                                onChange={(e) => setHomeToSharePreference(e.target.value)}
                                            />
                                        </section>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/*Divided*/}
            <div className="border-divider"/>

            {/*Account Details*/}
            <div className="mt-10 sm:mt-0">
                <div className="m-10 md:grid md:grid-cols-4 md:gap-6">
                    <div className="md:col-span-1">
                        <div className="px-4 sm:px-0">
                            <h3 className="info-header">Sign In Details</h3>
                            <p className="info-text">
                                The user name you choose is how you will be
                                identified by others on the site.
                                <b> Do NOT use your real name. Usernames are permanent and cannot be changed at a later time!</b> <br/>
                                 We recommend you take your time and choose something you will remember and not tire of. User names are extremely important and are
                                for the protection of you and all of the users of this site. Please read
                                <Link to={'/faq'} className={"label"}> FAQs</Link>.
                            </p>
                        </div>
                    </div>

                    <div className="mt-5 md:mt-0 md:col-span-2">
                        <div className="overflow-hidden shadow sm:rounded-md">
                            <div className="py-6 px-4 bg-white sm:p-5">
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="col-span-3 sm:col-span-2">
                                        <SignInInfo
                                            onChangeUsername={(e) => setUsername(e.target.value)}
                                            onChangePassword={(e) => setPassword(e.target.value)}
                                            onChangePasswordCheck={(e) => setPasswordCheck(e.target.value)}
                                            usernameError={usernameError}
                                            passwordError={passwordError}
                                            passwordConfirmError={passwordConfirmError ? "error" : null}
                                            passwordConfirmErrorMsg={(passwordConfirmError === "empty") ? "empty" : (passwordConfirmError === "mismatch" ? "mismatch" : "")}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/*Divided*/}
            <div className="border-divider"/>

            {/*Terms and Condition*/}
            <div className="mt-10 sm:mt-0">
                <div className="m-10 md:grid md:grid-cols-4 md:gap-6">
                    <div className="md:col-span-1">
                        <div className="px-4 sm:px-0">
                            <h3 className="info-header">Terms and Condition</h3>
                            <p className="info-text">
                                All users must read and accept the Terms of Service and Privacy Policy of Home Together
                                Canada. For more information please read
                                <Link to={'/faq'} className={"label"}> FAQs</Link>.
                            </p>
                        </div>
                    </div>

                    <div className="mt-5 md:mt-0 md:col-span-2">
                        <div className="overflow-hidden shadow sm:rounded-md">
                            <div className="py-6 px-4 bg-white sm:p-5">
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="col-span-3 sm:col-span-2">
                                        <div
                                            className={`${termsOfServiceError && "pl-1 border rounded-lg border-red-500"} mt-4`}>
                                            <LargeTextArea
                                                label={"Terms of Service"}
                                                toolTipText={MEMBER_PROFILE_INFO_TEXT.TOS.TERMS_OF_SERVICE}
                                                toolTipID={"termsOfService"}
                                                required={true}
                                                rows={"7"}
                                                name={"termsOfService"}
                                                value={TERMS_OF_SERVICE_TEXT}
                                                disabled={true}
                                                customDisabled={true}
                                            />
                                            <Checkbox
                                                label={"I have read and agreed to the Terms of Service"}
                                                checked={termsOfServiceAgreed}
                                                onChange={() => setTermsOfServiceAgreed(!termsOfServiceAgreed)}
                                            />
                                        </div>
                                        <div
                                            className={`${privacyPolicyError && "pl-1 border rounded-lg border-red-500"} mt-4`}>

                                            <LargeTextArea
                                                label={"Privacy Policy"}
                                                toolTipText={MEMBER_PROFILE_INFO_TEXT.TOS.PRIVACY_POLICY}
                                                toolTipID={"privacyPolicy"}
                                                required={true}
                                                rows={"7"}
                                                name={"privacyPolicy"}
                                                value={PRIVACY_POLICY_TEXT}
                                                disabled={true}
                                                customDisabled={true}
                                            />
                                            <Checkbox
                                                label={"I have read and agreed to the Privacy Policy"}
                                                checked={privacyPolicyAgreed}
                                                onChange={() => setPrivacyPolicyAgreed(!privacyPolicyAgreed)}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <SubmitButton
                            inputValue={"Create Account"}
                            className="btn btn-green form-btn w-3/4"
                            onClick={onSubmit}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

MemberRegistrationForm.propTypes = {
    setAccountType: PropTypes.func.isRequired,
    setIsAdmin: PropTypes.func.isRequired,
    setAuthenticated: PropTypes.func.isRequired,
    setActive: PropTypes.func.isRequired,
    setMemberSearchFilters: PropTypes.func.isRequired,
    history: PropTypes.shape({
        push: PropTypes.func
    })
}

export default connect(null, mapDispatch)(MemberRegistrationForm);