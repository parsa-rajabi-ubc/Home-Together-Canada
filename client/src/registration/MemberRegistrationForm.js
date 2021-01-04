/**
 * @Author:     Alex Qin
 * @Created:    2020.11.10
 *
 * @Description: Member Registration Component
 *
 */

import React, {useState} from 'react';
import TextArea from '../common/forms/TextArea';
import Checkbox from "../common/forms/Checkbox";
import SubmitButton from '../common/forms/SubmitButton';
import Address from "../common/forms/Address";
import SignInInfo from "../common/forms/SignInInfo";
import PhoneNumInput from "../common/forms/PhoneNumInput";
import BirthYear from "../common/forms/BirthYear";
import {isStringEmpty, isStringNumeralsOnly, isStringSame} from "../common/utils/stringUtils";
import {getConcatenatedErrorMessage, getPhoneNumberFromStrings} from "./registrationUtils";
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
import Tooltip from "../common/forms/Tooltip";
import {USER_TYPES} from "../common/constants/users";

const mapDispatch = {setIsAdmin, setAccountType, setAuthenticated};

//Returns a Form with fields
function MemberRegistrationForm(props) {
    const {history, setIsAdmin, setAccountType, setAuthenticated} = props;
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [yearOfBirth, setYearOfBirth] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState({
        first: "",
        middle: "",
        last: ""
    });
    const [useDifferentMailingAddress, setUseDifferentMailingAddress] = useState(false);
    const [address, setAddress] = useState({
        street: "",
        aptNum: "",
        city: "",
        province: "",
        postalCode: ""
    });
    const [mailingAddress, setMailingAddress] = useState({
        street: "",
        aptNum: "",
        city: "",
        province: "",
        postalCode: ""
    });
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordCheck, setPasswordCheck] = useState("");

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

    const [minRent, setMinRent] = useState("");
    const [maxRent, setMaxRent] = useState("");

    const [areasOfInterest, setAreasOfInterest] = useState([{
        province: "",
        city: "",
        radius: ""
    }]);

    const [aboutSelf, setAboutSelf] = useState("");

    const [selectedLimit, setsSelectedLimit] = useState("");

    const [selectedFamilyStatus, setsSelectedFamilyStatus] = useState();
    const [partner, setPartner] = useState("");
    const [groupMembers, setGroupMembers] = useState("");

    const [selectedWorkStatus, setsSelectedWorkStatus] = useState();

    // Error state variables 
    // Personal Information Start  
    const [firstNameError, setFirstNameError] = useState(false);
    const [lastNameError, setLastNameError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [yearOfBirthError, setYearOfBirthError] = useState(false);
    const [phoneNumberError, setPhoneNumberError] = useState("");

    //Address
    const [streetAddressError, setStreetAddressError] = useState(false);
    const [cityAddressError, setCityAddressError] = useState(false);
    const [provinceAddressError, setProvinceAddressError] = useState(false);
    const [postalCodeError, setPostalCodeError] = useState(false);

    // Mailing Address
    const [streetMailingAddressError, setStreetMailingAddressError] = useState(false);
    const [cityMailingAddressError, setCityMailingAddressError] = useState(false);
    const [provinceMailingAddressError, setProvinceMailingAddressError] = useState(false);
    const [postalCodeMailingError, setPostalCodeMailingError] = useState(false);
    // Personal Information End


    // Profile Details Start
    const [genderError, setGenderError] = useState(false);
    const [familyStatusError, setFamilyStatusError] = useState(false);
    const [coupleError, setCoupleError] = useState(false);
    const [groupError, setGroupError] = useState(false);
    const [workStatusError, setWorkStatusError] = useState(false);
    const [limitError, setLimitError] = useState(false);
    const [minRentError, setMinRentError] = useState(false);
    const [maxRentError, setMaxRentError] = useState(false);
    const [areasOfInterestError, setAreasOfInterestError] = useState(false);
    const [petFriendlyError, setPetFriendlyError] = useState(false);
    const [smokingError, setSmokingError] = useState(false);
    const [mobilityIssuesError, setMobilityIssuesError] = useState(false);
    const [allergiesError, setAllergiesError] = useState(false);
    const [religionError, setReligionError] = useState(false);
    const [dietError, setDietError] = useState(false);
    const [homeError, setHomeError] = useState(false);
    const [interestInBuyingError, setInterestInBuyingError] = useState(false);
    // Profile Details End

    // Account Details Start
    const [usernameError, setUsernameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [passwordConfirmError, setPasswordConfirmError] = useState("");

    // Account Details End


    function checkStatus(selectedFamilyStatus) {
        if (selectedFamilyStatus === "Couple") {
            return <section>
                <TextArea
                    className={`${coupleError && "border-red-500 mb-0"} input`}
                    labelClassName={"label"}
                    placeholder={"Partner's username"}
                    onChange={(e) => setPartner(e.target.value)}
                    value={partner}
                />
                {coupleError && <label className={"error-msg"}>{ERROR_TEXT.FAMILY_STATUS.PARTNER}</label>}
            </section>
        } else if (selectedFamilyStatus === "Couple With Children") {
            return <section>
                <TextArea
                    className={`${coupleError && "border-red-500 mb-0"} input`}
                    labelClassName={"label"}
                    placeholder={"Partner's username"}
                    onChange={(e) => setPartner(e.target.value)}
                    value={partner}
                />
                {coupleError && <label className={"error-msg"}>{ERROR_TEXT.FAMILY_STATUS.PARTNER}</label>}
            </section>
        } else if (selectedFamilyStatus === "Existing Group") {
            return <section><TextArea
                className={`${groupError && "border-red-500 mb-0"} input`}
                labelClassName={"label"}
                placeholder={"Member's username(s) - divided by commas"}
                onChange={(e) => setGroupMembers(e.target.value)}
                value={groupMembers}
            />
                {groupError && <label className={"error-msg"}>{ERROR_TEXT.FAMILY_STATUS.GROUP}</label>}
            </section>
        }

    }

    const handleFamilyStatusChange = e => {
        setsSelectedFamilyStatus(e.value);
    }

    const handleWorkStatusChange = e => {
        setsSelectedWorkStatus(e.value);
    }

    const handleLimitChange = e => {
        setsSelectedLimit(parseInt(e.value));
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


    const dropdownErrorCSS = {
        control: base => ({
                ...base,
                marginTop: 4,
                borderColor: 'red',
                marginBottom: 0,
                paddingTop: 2,
                paddingBottom: 2,
                ':hover': {
                    borderColor: 'red'
                }
            }
        ),
        menuPortal: base => ({...base, zIndex: 9999}),
    }

    const dropdownDefaultCSS = {
        control: base => ({
                ...base,
                marginTop: 4,
                borderColor: "#e2e8f0",
                marginBottom: 16,
                paddingTop: 2,
                paddingBottom: 2,
            }
        ),
        menuPortal: base => ({...base, zIndex: 9999}),
    }

    const isFormValid = () => {
        // Personal Information Validation
        (isStringEmpty(firstName) ? setFirstNameError(true) : setFirstNameError(false));
        (isStringEmpty(lastName) ? setLastNameError(true) : setLastNameError(false));
        (isStringEmpty(email) ? setEmailError(true) : setEmailError(false));
        (isStringEmpty(yearOfBirth) ? setYearOfBirthError(true) : setYearOfBirthError(false));
        if (isStringEmpty(phoneNumber.first) || isStringEmpty(phoneNumber.middle) || isStringEmpty(phoneNumber.last)) {
            setPhoneNumberError("empty");
        } else {
            if (!isStringNumeralsOnly(phoneNumber.first) || !isStringNumeralsOnly(phoneNumber.middle) || !isStringNumeralsOnly(phoneNumber.last)) {
                setPhoneNumberError("invalidChar");
            } else {
                if (!(phoneNumber.first.length === 3) || !(phoneNumber.middle.length === 3) || !(phoneNumber.last.length === 4)) {
                    setPhoneNumberError("invalidNum");
                } else {
                    setPhoneNumberError(false);
                }
            }
        }
        (isStringEmpty(address.street) ? setStreetAddressError(true) : setStreetAddressError(false));
        (isStringEmpty(address.city) ? setCityAddressError(true) : setCityAddressError(false));
        (isStringEmpty(address.province) ? setProvinceAddressError(true) : setProvinceAddressError(false));
        (isStringEmpty(address.postalCode) ? setPostalCodeError(true) : setPostalCodeError(false));
        if (useDifferentMailingAddress) {
            (isStringEmpty(mailingAddress.street) ? setStreetMailingAddressError(true) : setStreetMailingAddressError(false));
            (isStringEmpty(mailingAddress.city) ? setCityMailingAddressError(true) : setCityMailingAddressError(false));
            (isStringEmpty(mailingAddress.province) ? setProvinceMailingAddressError(true) : setProvinceMailingAddressError(false));
            (isStringEmpty(mailingAddress.postalCode) ? setPostalCodeMailingError(true) : setPostalCodeMailingError(false));
        }

        // Profile Validation
        (isStringEmpty(gender) ? setGenderError(true) : setGenderError(false));
        (isStringEmpty(selectedFamilyStatus) ? setFamilyStatusError(true) : setFamilyStatusError(false));
        if (selectedFamilyStatus === "Couple" || selectedFamilyStatus === "Couple With Children") {
            (isStringEmpty(partner) ? setCoupleError(true) : setCoupleError(false));
        } else if (selectedFamilyStatus === "Existing Group") {
            (isStringEmpty(groupMembers) ? setGroupError(true) : setGroupError(false));
        }
        (isStringEmpty(selectedWorkStatus) ? setWorkStatusError(true) : setWorkStatusError(false));
        (isStringEmpty(selectedLimit) ? setLimitError(true) : setLimitError(false));
        (isStringEmpty(minRent) ? setMinRentError(true) : setMinRentError(false));
        (isStringEmpty(maxRent) ? setMaxRentError(true) : setMaxRentError(false));

        for (let i = 0; i <= areasOfInterest.length - 1; i++) {
            if (areasOfInterest[i].province === undefined) {
                setAreasOfInterestError(true);
                break;
            } else if (areasOfInterest[i].city === undefined) {
                setAreasOfInterestError(true);
                break;
            } else if (areasOfInterest[i].radius === undefined) {
                setAreasOfInterestError(true);
                break;
            } else
                setAreasOfInterestError(false);
        }
        // Yes/No Validation
        (isStringEmpty(petFriendly) ? setPetFriendlyError(true) : setPetFriendlyError(false));
        (isStringEmpty(smoking) ? setSmokingError(true) : setSmokingError(false));
        (isStringEmpty(mobilityIssues) ? setMobilityIssuesError(true) : setMobilityIssuesError(false));
        (isStringEmpty(hasAllergies) ? setAllergiesError(true) : setAllergiesError(false));
        (isStringEmpty(religious) ? setReligionError(true) : setReligionError(false));
        (isStringEmpty(hasDiet) ? setDietError(true) : setDietError(false));
        (isStringEmpty(hasHome) ? setHomeError(true) : setHomeError(false));
        (isStringEmpty(interestInBuyingHome) ? setInterestInBuyingError(true) : setInterestInBuyingError(false));

        // Account Details Validation
        (isStringEmpty(username) ? setUsernameError(true) : setUsernameError(false));
        (isStringEmpty(password) ? setPasswordError(true) : setPasswordError(false));
        (isStringEmpty(passwordCheck) ? setPasswordConfirmError("empty") : setPasswordConfirmError(false));
        if (!isStringEmpty(password) && !isStringEmpty(passwordCheck)) {
            (!isStringSame(password, passwordCheck) ? setPasswordConfirmError("mismatch") : setPasswordConfirmError(false));
        }

        // check personal information for errors
        if (firstNameError || lastNameError || emailError || yearOfBirthError || !isStringEmpty(phoneNumberError) ||
            streetAddressError || cityAddressError || provinceAddressError || postalCodeError) {
            console.log("Error in personal information");
            return false;
            // check mailing address for errors
        } else if (useDifferentMailingAddress) {
            if (streetMailingAddressError || cityMailingAddressError || provinceMailingAddressError || postalCodeMailingError) {
                console.log("Error in mailing");
                return false;
            }
            // check profile for errors
        } else if (genderError || familyStatusError || workStatusError || limitError || minRentError || maxRentError ||
            areasOfInterestError || petFriendlyError || smokingError || mobilityIssuesError || allergiesError
            || religionError || dietError || homeError || interestInBuyingError) {
            console.log("Error in profile");
            return false;
            // check to ensure partner and group are set
        } else if (selectedFamilyStatus === "Couple" || selectedFamilyStatus === "Couple With Children") {
            if (coupleError) {
                return false;
            }
        } else if (selectedFamilyStatus === "Existing Group") {
            if (groupError) {
                return false;
            }
            // check account details for errors
        } else if (usernameError || passwordError || !isStringEmpty(passwordConfirmError)) {
            console.log("Error in account details");
            return false;
        } else
            return true;
    }
    const ERROR_TEXT = {
        FIRST_NAME: "First name can not be empty",
        LAST_NAME: "Last name can not be empty",
        EMAIL: "Email can not be empty",
        YEAR_OF_BIRTH: "Year of birth has not been set",
        PHONE_NUMBER: {
            EMPTY: "Phone number can not be empty",
            INVALID_CHAR: "Phone number contains invalid characters",
            INVALID_NUM: "Phone number contains invalid number of characters",
        },
        ADDRESS: {
            STREET: "Street address can not be empty",
            CITY: "City can not be empty",
            PROVINCE: "Province has not been set",
            POSTAL_CODE: "Postal code can not be empty",
        },
        GENDER: "Gender has not been set",
        FAMILY_STATUS: {
            DROPDOWN: "Family status has not been set",
            PARTNER: "Partner username can not be empty",
            GROUP: "Group member username(s) can not be empty"
        },
        WORK_STATUS: "Work status has not been set",
        LIMIT: "Number of people to share with has not been set",
        MIN_RENT: "Minimum rent can not be empty",
        MAX_RENT: "Maximum rent can not be empty",
        AREA_OF_INTEREST: "Preferred living location(s) have not been set",
        PET: "Pet preference has not been set",
        SMOKING: "Smoking preference has not been set",
        MOBILITY: "Mobility issue has not been set",
        ALLERGIES: "Allergies has not been set",
        RELIGION: "Religion preference has not been set",
        DIET: "Diet preference has not been set",
        HOME: "Home to share has not been set",
        INTEREST_IN_BUYING: "Interest has not been set",
        USERNAME: "Username can not be empty",
        PASSWORD: {
            EMPTY: "Password can not be empty",
            CONFIRM_EMPTY: "Password confirmation can not be empty",
            MIS_MATCH: "Passwords do not match",
        }
    };

    const INFO_TEXT = {
        YEAR_OF_BIRTH: "Age is required in order to help members connect with others in their desired age range",
        DIFF_MAILING_ADDRESS: "Select this checkbox if your mailing address differs from the address above",
        FAMILY_STATUS: "Select the status that most accurately reflects your living arrangement that you would like to maintain while home-sharing",
        NUM_PEOPLE_SHARE: "This number of people does not include yourself",
        RENT: "This does NOT include utilities",
        INTERESTED_AREA: "Preferred living location(s) across Canada",
        PET: "You either have a pet or are open to living with pets",
        SMOKE: "You either smoke yourself or are open to living with people who smoke",
        HEALTH: "Health and mobility issues that are relevant to roommates",
        RELIGION: "Religious compatibility is important to you",
        DIET: "The diet of your roommate(s) is important to you",
        HOME_TO_SHARE: "If you have a home to share, we recommend that you also create a free listing in addition to providing a short description below",
        ABOUT: "Do not disclose any personal information as your profile is publicly viewable by all members on Home Together",
    };

    //function for input checks on submit
    function onSubmit(event) {
        if (!isFormValid()) {
            event.preventDefault();
            return;
        }
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
            hasDifferentMailingAddress: useDifferentMailingAddress,
            ...(useDifferentMailingAddress) && {mailingAddressLine1: mailingAddress.street},
            ...(useDifferentMailingAddress) && {mailingAddressLine2: mailingAddress.aptNum},
            ...(useDifferentMailingAddress) && {mailingCity: mailingAddress.city},
            ...(useDifferentMailingAddress) && {mailingProvince: mailingAddress.province},
            ...(useDifferentMailingAddress) && {mailingPostalCode: mailingAddress.postalCode},

            // member account
            gender: gender,
            ...(gender === 'Other') && {genderDescription: gender},
            birthYear: yearOfBirth,
            status: selectedFamilyStatus,
            ...((selectedFamilyStatus === 'Couple' || selectedFamilyStatus === 'Couple With Children') && !isStringEmpty(partner))
            && {partnerUsername: partner},
            ...(selectedFamilyStatus === 'Existing Group' && !isStringEmpty(groupMembers))
            && {existingGroupUsernames: groupMembers.split(',').map(item => item.trim())},
            minMonthlyBudget: minRent,
            maxMonthlyBudget: maxRent,
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
            numRoommates: selectedLimit,
            bio: aboutSelf,
            areasOfInterest: areasOfInterest,
        }

        RegistrationService.registerMemberUser(registrationData)
            .then(res => res.json())
            .then(data => {
                if (!!data && data.authenticated) {
                    // dispatch action to set isAdmin
                    setIsAdmin({isAdmin: data.member ? data.member.isAdmin : false});

                    // dispatch action to set accountType
                    if (data.member) {
                        setAccountType({accountType: USER_TYPES.MEMBER});
                    }

                    // dispatch action to set authenticated
                    setAuthenticated({authenticated: data.authenticated});

                    // user is authenticated, redirect to home screen
                    return history.push('/');
                } else if (!!data && data.errors && data.errors.length) {
                    const errorMessage = getConcatenatedErrorMessage(data.errors);
                    // show list of all errors
                    alert(errorMessage);
                } else if (!!data && !data.authenticated) {
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
                        <p className="info-text mr-10">
                            This information is about you and is private. Home Together Canada will not share this
                            information with anyone and will only be used for verification purposes.
                        </p>
                        <p className="info-text mr-10">
                            <Asterisk/> = Required Field
                        </p>
                    </div>
                </div>
                <div
                    className="mt-5 md:mt-0 md:col-span-2 shadow sm:rounded-md sm:overflow-hidden px-4 py-5 space-y-1 bg-white sm:p-6">
                    <div className="grid grid-cols-2 gap-6">
                        <div className="col-span-3 sm:col-span-2">
                            <TextArea
                                className={`${firstNameError && "border-red-500 mb-0"} input`}
                                labelClassName={"label"}
                                label="First Name"
                                autoComplete={"given-name"}
                                required={true}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                            {firstNameError && <label className={"error-msg"}>{ERROR_TEXT.FIRST_NAME}</label>}
                            {/*{errors && console.log("error outside is ", errors)}*/}
                            <TextArea
                                className={`${lastNameError && "border-red-500 mb-0"} input`}
                                labelClassName={"label"}
                                label="Last Name"
                                autoComplete={"family-name"}
                                required={true}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                            {lastNameError && <label className={"error-msg"}>{ERROR_TEXT.LAST_NAME}</label>}

                            <TextArea
                                className={`${emailError && "border-red-500 mb-0"} input`}
                                placeholder="personal@email.ca"
                                label="Email"
                                autoComplete={"email"}
                                labelClassName={"label"}
                                required={true}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            {emailError && <label className={"error-msg"}>{ERROR_TEXT.EMAIL}</label>}
                            <LabelAsterisk label={"Year of Birth"}/>
                            <Tooltip text={INFO_TEXT.YEAR_OF_BIRTH} toolTipID="yearOfBirth"/>
                            <BirthYear label={"Year of Birth"} onChange={handleYearChange}
                                       styling={yearOfBirthError ? dropdownErrorCSS : dropdownDefaultCSS}/>
                            {yearOfBirthError && <label className={"error-msg"}>{ERROR_TEXT.YEAR_OF_BIRTH}</label>}
                            <PhoneNumInput
                                className={`${phoneNumberError && "border-red-500 mb-0"} phone`}
                                labelClassName={"label"}
                                required={true}
                                label="Phone Number" onChange={handlePhoneChange}/>
                            {phoneNumberError && <label className={"error-msg"}>
                                {(phoneNumberError === "empty") ? ERROR_TEXT.PHONE_NUMBER.EMPTY : (phoneNumberError === "invalidChar") ? ERROR_TEXT.PHONE_NUMBER.INVALID_CHAR : (phoneNumberError === "invalidNum" ? ERROR_TEXT.PHONE_NUMBER.INVALID_NUM : "")}
                            </label>}

                            <Address
                                label="Address"
                                streetClassName={`${streetAddressError && "border-red-500 mb-0"} input`}
                                cityClassName={`${streetAddressError && "border-red-500 mb-0"} input`}
                                provinceClassName={provinceAddressError ? dropdownErrorCSS : dropdownDefaultCSS}
                                postalCodeClassName={`${postalCodeError && "border-red-500 mb-0"} input`}
                                streetErrorMsg={streetAddressError ? ERROR_TEXT.ADDRESS.STREET : ""}
                                cityErrorMsg={cityAddressError ? ERROR_TEXT.ADDRESS.CITY : ""}
                                provinceErrorMsg={provinceAddressError ? ERROR_TEXT.ADDRESS.PROVINCE : ""}
                                postalCodeErrorMsg={postalCodeError ? ERROR_TEXT.ADDRESS.POSTAL_CODE : ""}
                                required={true}
                                onChange={setAddress}
                            />
                            <Checkbox
                                label="Different Mailing Address"
                                toolTipText={INFO_TEXT.DIFF_MAILING_ADDRESS}
                                toolTipID="differentMailingAddress"
                                onChange={() => setUseDifferentMailingAddress(!useDifferentMailingAddress)}
                            />
                            {useDifferentMailingAddress &&
                            <Address
                                label="Mailing Address"
                                streetClassName={`${streetMailingAddressError && "border-red-500 mb-0"} input`}
                                cityClassName={`${cityMailingAddressError && "border-red-500 mb-0"} input`}
                                provinceClassName={provinceMailingAddressError ? dropdownErrorCSS : dropdownDefaultCSS}
                                postalCodeClassName={`${postalCodeMailingError && "border-red-500 mb-0"} input`}
                                streetErrorMsg={streetMailingAddressError ? ERROR_TEXT.ADDRESS.STREET : ""}
                                cityErrorMsg={cityMailingAddressError ? ERROR_TEXT.ADDRESS.CITY : ""}
                                provinceErrorMsg={provinceMailingAddressError ? ERROR_TEXT.ADDRESS.PROVINCE : ""}
                                postalCodeErrorMsg={postalCodeMailingError ? ERROR_TEXT.ADDRESS.POSTAL_CODE : ""}
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
                                other
                                members on the website.
                            </p>
                        </div>
                    </div>
                    <div className="mt-5 md:mt-0 md:col-span-2">
                        <div className="overflow-hidden shadow sm:rounded-md">
                            <div className="px-4 py-6 bg-white sm:p-5">
                                <div className="grid grid-cols-2 gap-6 ">
                                    <div className="col-span-3 sm:col-span-2">
                                        <section
                                            className={`${genderError && "mr-56 pl-1 border rounded-lg border-red-500"}`}>
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
                                            className="input mt-0"
                                            labelClassName={"label mt-5"}
                                            placeholder="What gender do you identify as? (optional)"
                                            value={genderDescription}
                                            onChange={(e) => setGenderDescription(e.target.value)}
                                        />}
                                        {genderError && <label className={"error-msg"}>{ERROR_TEXT.GENDER}</label>}
                                        <LabelAsterisk label={"Family Status"}/>
                                        <Tooltip text={INFO_TEXT.FAMILY_STATUS} toolTipID="familyStatus"/>
                                        <Status onChange={handleFamilyStatusChange}
                                                styling={familyStatusError ? dropdownErrorCSS : dropdownDefaultCSS}
                                        />
                                        {checkStatus(selectedFamilyStatus)}
                                        {familyStatusError &&
                                        <label className={"error-msg"}>{ERROR_TEXT.FAMILY_STATUS.DROPDOWN}</label>}

                                        <LabelAsterisk label={"Work Status"}/>
                                        <WorkStatus onChange={handleWorkStatusChange}
                                                    styling={workStatusError ? dropdownErrorCSS : dropdownDefaultCSS}/>
                                        {workStatusError &&
                                        <label className={"error-msg"}>{ERROR_TEXT.WORK_STATUS}</label>}

                                        <LabelAsterisk label={"Open to Sharing With"}/>
                                        <Tooltip text={INFO_TEXT.NUM_PEOPLE_SHARE} toolTipID="numPeopleToShare"/>
                                        <ShareLimit onChange={handleLimitChange}
                                                    styling={limitError ? dropdownErrorCSS : dropdownDefaultCSS}/>
                                        {limitError && <label className={"error-msg"}>{ERROR_TEXT.LIMIT}</label>}

                                        <LabelAsterisk label={"Monthly Rent"}/>
                                        <Tooltip text={INFO_TEXT.RENT} toolTipID="rent"/>
                                        <div className="grid grid-cols-6 gap-x-6">
                                            <div className="column-span-6-layout">
                                                <input
                                                    className={`${minRentError && "border-red-500 mb-0"} input`}
                                                    type="number"
                                                    min="0"
                                                    step="1"
                                                    placeholder="MIN $ CAD"
                                                    onChange={(e) => setMinRent(e.target.value)}
                                                />
                                                {minRentError &&
                                                <label className={"error-msg"}>{ERROR_TEXT.MIN_RENT}</label>}
                                            </div>
                                            <div className="column-span-6-layout">
                                                <input
                                                    className={`${maxRentError && "border-red-500 mb-0"} input`}
                                                    type="number"
                                                    min={minRent}
                                                    step="1"
                                                    placeholder=" MAX $ CAD"
                                                    onChange={(e) => setMaxRent(e.target.value)}
                                                />
                                                {maxRentError &&
                                                <label className={"error-msg"}>{ERROR_TEXT.MAX_RENT}</label>}

                                            </div>
                                        </div>
                                        <LabelAsterisk label={"Preferred Living Location(s)"}/>
                                        <Tooltip text={INFO_TEXT.INTERESTED_AREA} toolTipID="interestedArea"/>
                                        <InterestedArea onChange={setAreasOfInterest}
                                                        areasOfInterestError={areasOfInterestError}
                                                        areaOfInterestErrorMsg={areasOfInterestError ? ERROR_TEXT.AREA_OF_INTEREST : ""}
                                        />
                                        <div className="grid grid-cols-6 gap-x-6 mt-5">
                                            <div className="column-span-6-layout">
                                                <section
                                                    className={`${petFriendlyError && "pl-1 border rounded-lg border-red-500"} my-2`}>
                                                    <YNButton
                                                        label={"Pet friendly?"}
                                                        toolTipText={INFO_TEXT.PET}
                                                        toolTipID="pet"
                                                        name="petFriendly"
                                                        required={true}
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
                                                {petFriendlyError &&
                                                <label className={"error-msg"}>{ERROR_TEXT.PET}</label>}
                                            </div>
                                            <div className="column-span-6-layout">
                                                <section
                                                    className={`${smokingError && "pl-1 border rounded-lg border-red-500"} my-2`}>
                                                    <YNButton
                                                        label={"Smoke friendly?"}
                                                        toolTipText={INFO_TEXT.SMOKE}
                                                        toolTipID="smoke"
                                                        name="smoking"
                                                        required={true}
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
                                                {smokingError &&
                                                <label className={"error-msg"}>{ERROR_TEXT.SMOKING}</label>}
                                            </div>
                                            <div className="column-span-6-layout">
                                                <section
                                                    className={`${mobilityIssuesError && "pl-1 border rounded-lg border-red-500"} my-2`}>
                                                    <YNButton
                                                        label={"Health / mobility issues?"}
                                                        toolTipText={INFO_TEXT.HEALTH}
                                                        toolTipID="health"
                                                        name="mobile"
                                                        required={true}
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
                                                {mobilityIssuesError &&
                                                <label className={"error-msg"}>{ERROR_TEXT.MOBILITY}</label>}
                                            </div>
                                            <div className="column-span-6-layout">
                                                <section
                                                    className={`${allergiesError && "pl-1 border rounded-lg border-red-500"} my-2`}>
                                                    <YNButton
                                                        label={"Allergies?"}
                                                        name="allergies"
                                                        required={true}
                                                        checked={hasAllergies === "no"}
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
                                                {allergiesError &&
                                                <label className={"error-msg"}>{ERROR_TEXT.ALLERGIES}</label>}
                                            </div>
                                            <div className="column-span-6-layout">
                                                <section
                                                    className={`${religionError && "pl-1 border rounded-lg border-red-500"} my-2`}>
                                                    <YNButton
                                                        label={"Is religion important?"}
                                                        toolTipText={INFO_TEXT.RELIGION}
                                                        toolTipID="religion"
                                                        name="religion"
                                                        required={true}
                                                        checked={religious === "no"}
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
                                                {religionError &&
                                                <label className={"error-msg"}>{ERROR_TEXT.RELIGION}</label>}
                                            </div>
                                            <div className="column-span-6-layout">
                                                <section
                                                    className={`${dietError && "pl-1 border rounded-lg border-red-500"} my-2`}>
                                                    <YNButton
                                                        label={"Is diet of others important?"}
                                                        toolTipText={INFO_TEXT.DIET}
                                                        toolTipID="diet"
                                                        name="diet"
                                                        required={true}
                                                        checked={hasDiet === "no"}
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
                                                {dietError && <label className={"error-msg"}>{ERROR_TEXT.DIET}</label>}
                                            </div>
                                            <div className="column-span-6-layout">
                                                <section
                                                    className={`${homeError && "pl-1 border rounded-lg border-red-500"} my-2`}>
                                                    <YNButton
                                                        label={"Have a home to share?"}
                                                        toolTipText={INFO_TEXT.HOME_TO_SHARE}
                                                        toolTipID="homeToShare"
                                                        name="hasHome"
                                                        required={true}
                                                        checked={hasHome === "no"}
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
                                                {homeError && <label className={"error-msg"}>{ERROR_TEXT.HOME}</label>}
                                            </div>
                                            <div className="column-span-6-layout">
                                                <section
                                                    className={`${interestInBuyingError && "pl-1 border rounded-lg border-red-500"} my-2`}>
                                                    <YNButton
                                                        label="Interested in buying a home with others?"
                                                        name="interestInBuyingHome"
                                                        required={true}
                                                        checked={interestInBuyingHome === "no"}
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
                                                {interestInBuyingError &&
                                                <label className={"error-msg"}>{ERROR_TEXT.INTEREST_IN_BUYING}</label>}
                                            </div>
                                        </div>
                                        <div className={"mt-4"}>
                                            <LargeTextArea
                                                label={"Tell others about yourself"}
                                                toolTipText={INFO_TEXT.ABOUT}
                                                toolTipID="about"
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

            {/*Account Details*/}
            <div className="mt-10 sm:mt-0">
                <div className="m-10 md:grid md:grid-cols-4 md:gap-6">
                    <div className="md:col-span-1">
                        <div className="px-4 sm:px-0">
                            <h3 className="info-header">Account Details</h3>
                            <p className="info-text">
                                This information is to set up and access your account.
                            </p>
                        </div>
                    </div>

                    <div className="mt-5 md:mt-0 md:col-span-2">
                        <div className="overflow-hidden shadow sm:rounded-md">
                            <div className="px-4 py-6 bg-white sm:p-5">
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="col-span-3 sm:col-span-2">
                                        <SignInInfo
                                            onChangeUsername={(e) => setUsername(e.target.value)}
                                            onChangePassword={(e) => setPassword(e.target.value)}
                                            onChangePasswordCheck={(e) => setPasswordCheck(e.target.value)}
                                            usernameClassName={`${usernameError && "border-red-500 mb-0"} input`}
                                            passwordClassName={`${(passwordError || passwordConfirmError === "mismatch") && "border-red-500 mb-0"} input`}
                                            passwordConfirmClassName={`${passwordConfirmError && "border-red-500 mb-0"} input`}
                                            usernameErrorMsg={usernameError}
                                            passwordErrorMsg={passwordError}
                                            passwordConfirmErrorMsg={(passwordConfirmError === "empty") ? "empty" : (passwordConfirmError === "mismatch" ? "mismatch" : "")}
                                        />

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="px-4 pt-4 mt-4 text-center bg-gray-50 sm:px-6">
                            <SubmitButton
                                inputValue={"Create Account"}
                                className="text-base btn btn-green"
                                onClick={onSubmit}
                            />
                        </div>
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
    history: PropTypes.shape({
        push: PropTypes.func
    })
}

export default connect(null, mapDispatch)(MemberRegistrationForm);