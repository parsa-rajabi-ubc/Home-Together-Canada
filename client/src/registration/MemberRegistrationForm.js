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

    const [minRent, setMinRent] = useState("00.00");
    const [maxRent, setMaxRent] = useState("00.00");

    const [aboutSelf, setAboutSelf] = useState("");

    const [selectedLimit, setsSelectedLimit] = useState(null);

    const [selectedFamilyStatus, setsSelectedFamilyStatus] = useState();
    const [selectedWorkStatus, setsSelectedWorkStatus] = useState();

    const [partner, setPartner] = useState("");
    const [groupMembers, setGroupMembers] = useState("");

    const [areasOfInterest, setAreasOfInterest] = useState([{
        province: "",
        city: "",
        radius: ""
    }]);

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

    // TODO: convert this into an array of errors
    const isFormValid = () => {
        if (isStringEmpty(firstName)) {
            alert("First Name Required");
            return false;
        }
        if (isStringEmpty(lastName)) {
            alert("Last Name Required");
            return false;
        }
        if (isStringEmpty(yearOfBirth)) {
            alert("Year of Birth not set");
            return false;
        }
        if (isStringEmpty(phoneNumber.first) || isStringEmpty(phoneNumber.middle) || isStringEmpty(phoneNumber.last)) {
            alert("Phone Number missing parts");
            return false;
        } else {
            if (!isStringNumeralsOnly(phoneNumber.first) || !isStringNumeralsOnly(phoneNumber.middle) || !isStringNumeralsOnly(phoneNumber.last)) {
                alert("Phone Number has invalid characters");
                return false;
            }
            if (!(phoneNumber.first.length === 3) || !(phoneNumber.middle.length === 3) || !(phoneNumber.last.length === 4)) {
                alert("Phone Number has invalid number of characters");
                return false;
            }
        }
        if (isStringEmpty(address.street)) {
            alert("Street Address missing");
            return false;
        }
        if (isStringEmpty(address.city)) {
            alert("City missing");
            return false;
        }
        if (isStringEmpty(address.province)) {
            alert("Province not selected");
            return false
        }
        if (isStringEmpty(address.postalCode)) {
            alert("Postal Code missing");
            return false;
        }
        if (useDifferentMailingAddress) {
            if (isStringEmpty(mailingAddress.street)) {
                alert("Mailing Address Street missing");
                return false;
            }
            if (isStringEmpty(mailingAddress.city)) {
                alert("Mailing Address City missing");
                return false;
            }
            if (isStringEmpty(mailingAddress.province)) {
                alert("Business Mailing Address Province not selected");
                return false;
            }
            if (isStringEmpty(mailingAddress.postalCode)) {
                alert("Mailing Address Postal Code missing");
                return false;
            }
        }

        // TODO: when client-side validation to an array, abstract the validation of the username and
        //  password to a function so that it can be use here and in business registration
        if (isStringEmpty(username)) {
            alert("username Required");
            return false;
        }
        if (isStringEmpty(password)) {
            alert("Password Required");
            return false;
        }
        if (isStringEmpty(passwordCheck)) {
            alert("Password confirmation Required");
            return false;
        }
        if (!isStringEmpty(password) && !isStringEmpty(passwordCheck)) {
            if (!isStringSame(password, passwordCheck)) {
                alert("Passwords do NOT match");
                return false;
            }
        }
        return true;
    }

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
                                className={"input"}
                                labelClassName={"label"}
                                label="First Name"
                                autoComplete={"given-name"}
                                required={true}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                            <TextArea
                                className={"input"}
                                labelClassName={"label"}
                                label="Last Name"
                                autoComplete={"family-name"}
                                required={true}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                            <TextArea
                                className="input"
                                placeholder="personal@email.ca"
                                label="Email"
                                autoComplete={"email"}
                                labelClassName={"label"}
                                required={true}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <LabelAsterisk label={"Year of Birth"}/>
                            <Tooltip text={INFO_TEXT.YEAR_OF_BIRTH} toolTipID="yearOfBirth"/>
                            <BirthYear label={"Year of Birth"} onChange={handleYearChange}/>
                            <PhoneNumInput
                                className="phone"
                                labelClassName={"label"}
                                required={true}
                                label="Phone Number" onChange={handlePhoneChange}/>
                            <Address
                                label="Address"
                                cityClassName="city-postal"
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
                                This information is about your home-sharing preferences and will be accessible by other
                                members on the website.
                            </p>
                        </div>
                    </div>
                    <div className="mt-5 md:mt-0 md:col-span-2">
                        <div className="overflow-hidden shadow sm:rounded-md">
                            <div className="px-4 py-6 bg-white sm:p-5">
                                <div className="grid grid-cols-2 gap-6 ">
                                    <div className="col-span-3 sm:col-span-2">
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
                                            {(gender === "Other") &&
                                            <TextArea
                                                className="input mt-0"
                                                labelClassName={"label mt-5"}
                                                placeholder="What gender do you identify as? (optional)"
                                                value={genderDescription}
                                                required={true}
                                                onChange={(e) => setGenderDescription(e.target.value)}
                                            />}
                                        </div>
                                        <LabelAsterisk label={"Family Status"}/>
                                        <Tooltip text={INFO_TEXT.FAMILY_STATUS} toolTipID="familyStatus"/>
                                        <Status onChange={handleFamilyStatusChange}/>
                                        {checkStatus(selectedFamilyStatus)}

                                        <LabelAsterisk label={"Work Status"}/>
                                        <WorkStatus onChange={handleWorkStatusChange}/>

                                        <LabelAsterisk label={"Open to Sharing With"}/>
                                        <Tooltip text={INFO_TEXT.NUM_PEOPLE_SHARE} toolTipID="numPeopleToShare"/>
                                        <ShareLimit onChange={handleLimitChange}/>
                                        <LabelAsterisk label={"Monthly Rent"}/>
                                        <Tooltip text={INFO_TEXT.RENT} toolTipID="rent"/>
                                        <div className="grid grid-cols-6 gap-x-6">
                                            <div className="column-span-6-layout">
                                                <input
                                                    className={"input label font-normal "}
                                                    type="number"
                                                    min="0"
                                                    step="1"
                                                    placeholder="MIN $ CAD"
                                                    onChange={(e) => setMinRent(e.target.value)}
                                                />
                                            </div>
                                            <div className="column-span-6-layout">
                                                <input
                                                    className={"input label font-normal "}
                                                    type="number"
                                                    min={minRent}
                                                    step="1"
                                                    placeholder=" MAX $ CAD"
                                                    onChange={(e) => setMaxRent(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <LabelAsterisk label={"Preferred Living Location(s)"}/>
                                        <Tooltip text={INFO_TEXT.INTERESTED_AREA} toolTipID="interestedArea"/>
                                        <InterestedArea onChange={setAreasOfInterest}/>
                                        <div className="grid grid-cols-6 gap-x-6">
                                            <div className="column-span-6-layout">
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
                                            </div>
                                            <div className="column-span-6-layout">
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
                                            </div>
                                            <div className="column-span-6-layout">
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
                                            </div>
                                            <div className="column-span-6-layout">
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
                                            </div>
                                            <div className="column-span-6-layout">
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
                                            </div>
                                            <div className="column-span-6-layout">
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
                                            </div>
                                            <div className="column-span-6-layout">
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
                                                />
                                                }
                                            </div>
                                            <div className="column-span-6-layout">
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