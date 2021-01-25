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
    checkIfErrorsExistInMapping,
    validateInput,
} from "../../registration/registrationUtils";



//Returns a summary Form with fields filled
function MemberProfileSummary(props) {
    const { memberAccountInfo  } = props;
    const [gender, setGender] = useState(get(memberAccountInfo , 'gender', ""));
    const [genderDescription, setGenderDescription] = useState(get(memberAccountInfo , 'genderDescription', ""));
    const [yearOfBirth, setYearOfBirth] = useState(get(memberAccountInfo , 'birthYear', undefined));

    const petFriendlyBoolean = get(memberAccountInfo , 'petFriendly', "");
    const [petFriendly, setPetFriendly] = useState(resolveBooleanToYesNo(petFriendlyBoolean));
    const [petDescription, setPetDescription] = useState(get(memberAccountInfo , 'petDescription', ""));

    const smokingBoolean = get(memberAccountInfo , 'smoking', "");
    const [smoking, setSmoking] = useState(resolveBooleanToYesNo(smokingBoolean));
    const [smokingDescription, setSmokingDescription] = useState(get(memberAccountInfo , 'smokingDescription', ""));

    const mobilityIssuesBoolean = get(memberAccountInfo , 'hasHealthMobilityIssues', "");
    const [mobilityIssues, setMobilityIssues] = useState(resolveBooleanToYesNo(mobilityIssuesBoolean));
    const [mobilityIssuesDescription, setMobilityIssuesDescription] = useState(get(memberAccountInfo , 'healthMobilityIssuesDescription', ""));

    const hasAllergiesBoolean = get(memberAccountInfo , 'hasAllergies', "");
    const [hasAllergies, setHasAllergies] = useState(resolveBooleanToYesNo(hasAllergiesBoolean));
    const [allergiesDescription, setAllergiesDescription] = useState(get(memberAccountInfo , 'allergiesDescription', ""));

    const religiousBoolean = get(memberAccountInfo , 'isReligionImportant', "");
    const [religious, setReligious] = useState(resolveBooleanToYesNo(religiousBoolean));
    const [religionDescription, setReligionDescription] = useState(get(memberAccountInfo , 'religionDescription', ""));

    const hasDietBoolean = get(memberAccountInfo , 'isDietImportant', "");
    const [hasDiet, setHasDiet] = useState(resolveBooleanToYesNo(hasDietBoolean));
    const [dietDescription, setDietDescription] = useState(get(memberAccountInfo , 'dietDescription', ""));

    const hasHomeBoolean = get(memberAccountInfo , 'hasHomeToShare', "");
    const [hasHome, setHasHome] = useState(resolveBooleanToYesNo(hasHomeBoolean));
    const [homeDescription, setHomeDescription] = useState(get(memberAccountInfo , 'hasHomeToShareDescription', ""));

    const interestInBuyingHomeBoolean = get(memberAccountInfo, 'interestInBuyingHome', "")
    const [interestInBuyingHome, setInterestInBuyingHome] = useState(resolveBooleanToYesNo(interestInBuyingHomeBoolean));
    const [interestDescription, setInterestDescription] = useState(get(memberAccountInfo, 'interestDescription', ""));

    const [minRent, setMinRent] = useState(get(memberAccountInfo, 'minRent', undefined));
    const [maxRent, setMaxRent] = useState(get(memberAccountInfo, 'maxRent', undefined));

    const [aboutSelf, setAboutSelf] = useState(get(memberAccountInfo, 'aboutSelf', ""));

    const [selectedLimit, setsSelectedLimit] = useState(get(memberAccountInfo, 'selectedLimit', ""));

    const [selectedFamilyStatus, setsSelectedFamilyStatus] = useState(get(memberAccountInfo, 'selectedFamilyStatus', ""));
    const [selectedWorkStatus, setsSelectedWorkStatus] = useState(get(memberAccountInfo, 'selectedWorkStatus', ""));

    const [partner, setPartner] = useState(get(memberAccountInfo, 'partner', ""));
    const [groupMembers, setGroupMembers] = useState(get(memberAccountInfo, 'groupMembers', ""));

    const [areasOfInterest, setAreasOfInterest] = useState(get(memberAccountInfo, 'areasOfInterest', [{
        province: "",
        city: "",
        radius: ""
    }]));



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
        if (checkIfErrorsExistInMapping(profileInfoErrors)) {
            return false;
        } else {
            return true;
        }

    }
    function onSubmit(event) {
        if (!isFormValid()) {
            event.preventDefault();
            return;
        }
        alert("Profile information saved");
    }

    return(
        <div>
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
                                                className="input mt-0"
                                                labelClassName={"label mt-5"}
                                                placeholder="What gender do you identify as? (optional)"
                                                value={genderDescription}
                                                required={true}
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
                                    <ShareLimit givenSelection={selectedLimit} onChange={handleLimitChange}
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
                                    <div className="grid grid-cols-6 gap-x-6">
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
                                                {(petFriendly === "yes" || petFriendly===true) &&
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
                                                {(smoking === "yes" || smoking===true) &&
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
                                                {(mobilityIssues === "yes" || mobilityIssues===true) &&
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
                                                {(hasAllergies === "yes" || hasAllergies===true) &&
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
                                                {(religious === "yes" || religious===true) &&
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
                                                {(hasDiet === "yes" || hasDiet===true) &&
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
                                                {(hasHome === "yes" || hasHome===true)
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
                                                {(interestInBuyingHome === "yes" || interestInBuyingHome===true) &&
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
                                            value={aboutSelf}
                                            placeholder="Let others know more about your lifestyle, values and why you want to home share"
                                            onChange={(e) => setAboutSelf(e.target.value)}
                                        />
                                    </div>
                                    <div className="px-4 pt-4 mt-4 text-center bg-gray-50 sm:px-6">
                                        <SubmitButton
                                            inputValue={"Save"}
                                            className="text-base btn btn-green"
                                            onClick={onSubmit}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
    );

}
MemberProfileSummary.propTypes = {
    memberAccountInfo: PropTypes.object.isRequired

}

export default MemberProfileSummary