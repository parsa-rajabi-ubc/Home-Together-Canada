/**
 * @Author:     Jeff Hatton
 * @Created:    2020.01.11
 *
 * @Description: Member account summary editable component Form
 *
 */
import React, {useState, useEffect} from 'react';
import PropTypes from "prop-types";
import TextArea from "../../common/forms/TextArea";
import LabelAsterisk from "../../common/forms/LabelAsterisk";
import RadioButton from "../../common/forms/RadioButton";
import Tooltip from "../../common/forms/Tooltip";
import Status from "../../common/forms/Status";
import WorkStatus from "../../common/forms/WorkStatus";
import ShareLimit from "../../common/forms/ShareLimits";
import InterestedArea from "../../common/forms/InterestedArea";
import YNButton from "../../common/forms/YNButtons";
import LargeTextArea from "../../common/forms/LargeTextArea";
import SubmitButton from "../../common/forms/SubmitButton";
import {dropdownDefaultCSS, dropdownErrorCSS} from "../../css/dropdownCSSUtil";
import BirthYear from "../../common/forms/BirthYear";
import get from 'lodash/get';
import {resolveBooleanToYesNo} from "../../common/utils/generalUtils";
import {MEMBER_PROFILE_INFO_TEXT} from "../../common/constants/TooltipText";
import {
    checkIfErrorsExistInMapping, getConcatenatedErrorMessage,
    validateInput,
} from "../../registration/registrationUtils";
import Asterisk from "../../common/forms/Asterisk";
import {memberHasCoupleStatus, memberHasExistingGroupStatus} from "./memberAccountSummaryUtils";
import {STATUSES} from "../../common/constants/memberConstants";
import MemberService from '../../services/MemberService';
import {setAccountType, setAuthenticated, setIsAdmin} from "../../redux/slices/userPrivileges";
import {USER_TYPES} from "../../common/constants/users";
import { useHistory } from "react-router-dom";
import {connect} from "react-redux";

const mapDispatch = {setIsAdmin, setAccountType, setAuthenticated};

const UPDATE_STATES = {
    SUCCESS: 'SUCCESS',
    VALIDATION_ERROR: 'VALIDATION_ERROR',
    UNAUTHENTICATED: 'UNAUTHENTICATED',
    ERROR: 'ERROR'
};

//Returns a summary Form with fields filled
function MemberProfileSummary(props) {
    const {
        profile,
        areasOfInterestList,
        roommates,
        setAccountType,
        setAuthenticated,
        setIsAdmin
    } = props;

    const history = useHistory();

    const [gender, setGender] = useState(profile.gender);
    const [genderDescription, setGenderDescription] = useState(get(profile, 'genderDescription', ""));

    const [yearOfBirth, setYearOfBirth] = useState(profile.birthYear);

    const [petFriendly, setPetFriendly] = useState(resolveBooleanToYesNo(profile.hasPets));
    const [petDescription, setPetDescription] = useState(get(profile, 'petsDescription', ""));

    const [smoking, setSmoking] = useState(resolveBooleanToYesNo(profile.isSmoker));
    const [smokingDescription, setSmokingDescription] = useState(get(profile, 'smokingDescription', ""));

    const [mobilityIssues, setMobilityIssues] = useState(resolveBooleanToYesNo(profile.hasHealthMobilityIssues));
    const [mobilityIssuesDescription, setMobilityIssuesDescription] = useState(
        get(profile, 'healthMobilityIssuesDescription', "")
    );

    const [hasAllergies, setHasAllergies] = useState(resolveBooleanToYesNo(profile.hasAllergies));
    const [allergiesDescription, setAllergiesDescription] = useState(get(profile, 'allergiesDescription', ""));

    const [religious, setReligious] = useState(resolveBooleanToYesNo(profile.isReligionImportant));
    const [religionDescription, setReligionDescription] = useState(get(profile, 'religionDescription', ""));

    const [hasDiet, setHasDiet] = useState(resolveBooleanToYesNo(profile.isDietImportant));
    const [dietDescription, setDietDescription] = useState(get(profile, 'dietDescription', ""));

    const [hasHome, setHasHome] = useState(resolveBooleanToYesNo(profile.hasHomeToShare));
    const [homeDescription, setHomeDescription] = useState(get(profile, 'hasHomeToShareDescription', ""));

    const [interestInBuyingHome, setInterestInBuyingHome] = useState(resolveBooleanToYesNo(profile.isInterestedInBuyingHome));
    const [interestDescription, setInterestDescription] = useState(get(profile, 'interestInBuyingHomeDescription', ""));

    const [minRent, setMinRent] = useState(profile.minMonthlyBudget);
    const [maxRent, setMaxRent] = useState(profile.maxMonthlyBudget);

    const [aboutSelf, setAboutSelf] = useState(profile.bio);

    const [selectedLimit, setsSelectedLimit] = useState(profile.numRoommates);

    const [selectedFamilyStatus, setsSelectedFamilyStatus] = useState(profile.status);
    const [selectedWorkStatus, setsSelectedWorkStatus] = useState(profile.workStatus);

    const [partner, setPartner] = useState(
        memberHasCoupleStatus(profile.status)
            ? roommates.toString()
            : ''
    );
    const [groupMembers, setGroupMembers] = useState(
        memberHasExistingGroupStatus(profile.status)
            ? roommates.toString()
            : ''
    );

    const [areasOfInterest, setAreasOfInterest] = useState(areasOfInterestList);

    // Profile Details Start
    const [genderError, setGenderError] = useState(undefined);
    const [yearOfBirthError, setYearOfBirthError] = useState(undefined);
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

    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [validationErrors, setValidationErrors] = useState([]);

    // Profile
    useEffect(() => {
        minRent !== undefined && validateInput(minRent, setMinRentError);
    }, [minRent]);
    useEffect(() => {
        maxRent !== undefined && validateInput(maxRent, setMaxRentError);
    }, [maxRent]);

    const handleYearChange = e => {
        setYearOfBirth(e.value);
    }

    function checkStatus(selectedFamilyStatus) {
        if (selectedFamilyStatus === STATUSES.COUPLE) {
            return <TextArea
                className={"input"}
                labelClassName={"label"}
                placeholder={"Partner's username"}
                onChange={(e) => setPartner(e.target.value)}
                value={partner}
            />
        } else if (selectedFamilyStatus === STATUSES.COUPLE_WITH_CHILDREN) {
            return <TextArea
                className={"input"}
                labelClassName={"label"}
                placeholder={"Partner's username"}
                onChange={(e) => setPartner(e.target.value)}
                value={partner}
            />
        } else if (selectedFamilyStatus === STATUSES.EXISTING_GROUP) {
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

    const isFormValid = () => {

        const profileInfoErrors = {
            errorGender: false,
            errorYearOfBirth: false,
            errorFamilyStatus: false,
            errorWorkStatus: false,
            errorLimit: false,
            errorRent: {
                min: false,
                max: false,
            },
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

        // Profile Validation
        profileInfoErrors.errorGender = validateInput(gender, setGenderError);
        profileInfoErrors.errorYearOfBirth = validateInput(yearOfBirth, setYearOfBirthError);
        profileInfoErrors.errorFamilyStatus = validateInput(selectedFamilyStatus, setFamilyStatusError);
        profileInfoErrors.errorWorkStatus = validateInput(selectedWorkStatus, setWorkStatusError);
        profileInfoErrors.errorLimit = validateInput(selectedLimit, setLimitError);
        profileInfoErrors.errorRent.min = validateInput(minRent, setMinRentError);
        profileInfoErrors.errorRent.max = validateInput(maxRent, setMaxRentError);

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

        // check personal information for errors
        return !checkIfErrorsExistInMapping(profileInfoErrors);

    }

    function resolveUpdateState (data) {
        if (data && data.errors && Array.isArray(data.errors)) {
            setValidationErrors(data.errors);
            throw new Error(UPDATE_STATES.VALIDATION_ERROR);
        }
        else if (data && (!data.authenticated && !data.success)) {
            throw new Error(UPDATE_STATES.UNAUTHENTICATED);
        }
        else if (data && data.success) {
            return UPDATE_STATES.SUCCESS;
        }
        else {
            throw new Error(UPDATE_STATES.ERROR);
        }
    }

    function dispatchActionOnUpdateState (updateState) {
        switch (updateState) {
            case UPDATE_STATES.SUCCESS:
                setShowSuccessMessage(true);
                break;
            case UPDATE_STATES.VALIDATION_ERROR:
                alert(getConcatenatedErrorMessage(validationErrors));
                setShowSuccessMessage(false);
                break;
            case UPDATE_STATES.UNAUTHENTICATED:
                setIsAdmin({isAdmin: false});
                setAccountType({accountType: USER_TYPES.UNREGISTERED});
                setAuthenticated({authenticated: false});

                alert('There was an error with your session. Please try to login again.');

                // redirect to home page
                history.push('/');
                break;
            default:
                alert('There was an error when updating your profile. Please try again and contact Home Together ' +
                    'if the issue persists');
                setShowSuccessMessage(false);
                break;
        }
    }

    function onSubmit(event) {
        if (!isFormValid()) {
            event.preventDefault();
            return;
        }

        const memberProfile = {
            gender: gender,
            genderDescription: (gender === 'Other') ? genderDescription : undefined,
            birthYear: yearOfBirth,
            status: selectedFamilyStatus,
            partnerUsername: memberHasCoupleStatus(selectedFamilyStatus) ? partner : undefined,
            existingGroupUsernames: memberHasExistingGroupStatus(selectedFamilyStatus) ? groupMembers : undefined,
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
            areasOfInterest: areasOfInterest
        };

        MemberService.updateMemberProfile(memberProfile)
            .then(res => res.json())
            .then(data => {
                resolveUpdateState(data);
                const roommates = {
                    partnerUsername: memberHasCoupleStatus(selectedFamilyStatus) && partner ? partner : undefined,
                    existingGroupUsernames: memberHasExistingGroupStatus(selectedFamilyStatus) && groupMembers
                        ? groupMembers.split(',').map(item => item.trim())
                        : undefined
                }
                return MemberService.updateMemberStatus(selectedFamilyStatus, roommates);
            })
            .then(res => res.json())
            .then(data => {
                resolveUpdateState(data);
                return MemberService.updateMemberAreasOfInterest(areasOfInterest);
            })
            .then(res => res.json())
            .then(data => {
                const updateState = resolveUpdateState(data);
                dispatchActionOnUpdateState(updateState);
            })
            .catch(err => {
                dispatchActionOnUpdateState(err.message);
            });
    }

    return (
        <div>
            <h3 className="account-summary-info-header">Profile Details</h3>
            <p className="account-summary-info-text">
                This information is about your home-sharing preferences and will be accessible by other
                members on the website. All fields with a <Asterisk/> are required!
            </p>
            {/*Profile*/}
            <div className="selected-component-grid-outer">
                <div className="selected-component-grid-inner">
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
                                    {(gender === "Other") &&
                                    <TextArea
                                        className="input"
                                        labelClassName={"label mt-5"}
                                        placeholder="What gender do you identify as? (optional)"
                                        value={genderDescription}
                                        onChange={(e) => setGenderDescription(e.target.value)}
                                    />}
                                </div>
                            </section>
                            <LabelAsterisk label={"Year of Birth"}/>
                            <Tooltip text={MEMBER_PROFILE_INFO_TEXT.YEAR_OF_BIRTH} toolTipID="yearOfBirth"/>
                            <BirthYear label={"Year of Birth"} givenYear={yearOfBirth} onChange={handleYearChange}
                                       dropdownCSS={yearOfBirthError ? dropdownErrorCSS : dropdownDefaultCSS}/>
                            <LabelAsterisk label={"Family Status"}/>
                            <Tooltip text={MEMBER_PROFILE_INFO_TEXT.FAMILY_STATUS} toolTipID="familyStatus"/>
                            <Status givenSelection={selectedFamilyStatus} onChange={handleFamilyStatusChange}
                                    dropdownCSS={familyStatusError ? dropdownErrorCSS : dropdownDefaultCSS}/>
                            {checkStatus(selectedFamilyStatus)}

                            <LabelAsterisk label={"Work Status"}/>
                            <WorkStatus givenSelection={selectedWorkStatus} onChange={handleWorkStatusChange}
                                        dropdownCSS={workStatusError ? dropdownErrorCSS : dropdownDefaultCSS}/>

                            <LabelAsterisk label={"Open to Sharing With"}/>
                            <Tooltip text={MEMBER_PROFILE_INFO_TEXT.NUM_PEOPLE_SHARE} toolTipID="numPeopleToShare"/>
                            <ShareLimit currentSelectedValue={selectedLimit} onChange={handleLimitChange}
                                        dropdownCSS={limitError ? dropdownErrorCSS : dropdownDefaultCSS}/>
                            <LabelAsterisk label={"Monthly Rent"}/>
                            <Tooltip text={MEMBER_PROFILE_INFO_TEXT.RENT} toolTipID="rent"/>
                            <div className="grid grid-cols-6 gap-x-6">
                                <div className="column-span-6-layout">
                                    <input
                                        className={`${minRentError && "border-red-500"} input`}
                                        type="number"
                                        min="0"
                                        step="1"
                                        placeholder="MIN $ CAD"
                                        value={minRent}
                                        onChange={(e) => setMinRent(e.target.value)}
                                    />
                                </div>
                                <div className="column-span-6-layout">
                                    <input
                                        className={`${maxRentError && "border-red-500"} input`}
                                        type="number"
                                        min={minRent}
                                        step="1"
                                        placeholder=" MAX $ CAD"
                                        value={maxRent}
                                        onChange={(e) => setMaxRent(e.target.value)}
                                    />
                                </div>
                            </div>
                            <LabelAsterisk label={"Preferred Living Location(s)"}/>
                            <Tooltip text={MEMBER_PROFILE_INFO_TEXT.INTERESTED_AREA} toolTipID="interestedArea"/>
                            <InterestedArea givenAreasOfInterest={areasOfInterest} onChange={setAreasOfInterest}
                                            areasOfInterestError={areasOfInterestError}/>
                            <div className="grid grid-cols-6 gap-x-6 mt-8">
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
                                        {(petFriendly === "yes" || petFriendly === true) &&
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
                                        {(smoking === "yes" || smoking === true) &&
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
                                        {(mobilityIssues === "yes" || mobilityIssues === true) &&
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
                                        {(hasAllergies === "yes" || hasAllergies === true) &&
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
                                        {(religious === "yes" || religious === true) &&
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
                                        {(hasDiet === "yes" || hasDiet === true) &&
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
                                        {(hasHome === "yes" || hasHome === true)
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
                                        {(interestInBuyingHome === "yes" || interestInBuyingHome === true) &&
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
                                    required={false}
                                    name="aboutSelf"
                                    value={aboutSelf || ''}
                                    rows={'5'}
                                    placeholder="Let others know more about your lifestyle, values and why you want to home share"
                                    onChange={(e) => setAboutSelf(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {showSuccessMessage &&
                <section className={'success-msg mb-4 justify-center'}>Account info successfully updated!</section>
            }
            <SubmitButton
                inputValue={"Save"}
                className="btn btn-green form-btn w-1/2"
                onClick={onSubmit}
            />
        </div>
    );

}

MemberProfileSummary.propTypes = {
    profile: PropTypes.shape({
        gender: PropTypes.string.isRequired,
        genderDescription: PropTypes.string,
        birthYear: PropTypes.number.isRequired,
        status: PropTypes.string.isRequired,
        workStatus: PropTypes.string.isRequired,
        minMonthlyBudget: PropTypes.number.isRequired,
        maxMonthlyBudget: PropTypes.number.isRequired,
        numRoommates: PropTypes.number.isRequired,
        bio: PropTypes.string,
        isSmoker: PropTypes.bool.isRequired,
        smokingDescription: PropTypes.string,
        hasAllergies: PropTypes.bool.isRequired,
        allergiesDescription: PropTypes.string,
        hasHealthMobilityIssues: PropTypes.bool.isRequired,
        healthMobilityIssuesDescription: PropTypes.string,
        hasHomeToShare: PropTypes.bool.isRequired,
        homeToShareDescription: PropTypes.string,
        isReligionImportant: PropTypes.bool.isRequired,
        religionDescription: PropTypes.string,
        isInterestedInBuyingHome: PropTypes.bool.isRequired,
        interestInBuyingHomeDescription: PropTypes.string,
        hasPets: PropTypes.bool.isRequired,
        petsDescription: PropTypes.string,
        isDietImportant: PropTypes.bool.isRequired,
        dietDescription: PropTypes.string

    }).isRequired,
    areasOfInterestList: PropTypes.array.isRequired,
    roommates: PropTypes.array.isRequired,
    setAccountType: PropTypes.func.isRequired,
    setAuthenticated: PropTypes.func.isRequired,
    setIsAdmin: PropTypes.func.isRequired
}

export default connect(null, mapDispatch)(MemberProfileSummary);
