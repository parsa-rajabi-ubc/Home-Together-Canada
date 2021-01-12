/**
 * @Author:     Jeff Hatton
 * @Created:    2020.01.11
 *
 * @Description: Member account summary editable component Form
 *
 */
import React, {useState} from 'react';
import PropTypes from "prop-types";
import MemberAccountSummary from "./MemberAccountSummary";
import TextArea from "../common/forms/TextArea";
import LabelAsterisk from "../common/forms/LabelAsterisk";
import RadioButton from "../common/forms/RadioButton";
import Tooltip from "../common/forms/Tooltip";
import Status from "../common/forms/Status";
import WorkStatus from "../common/forms/WorkStatus";
import ShareLimit from "../common/forms/ShareLimits";
import InterestedArea from "../common/forms/InterestedArea";
import YNButton from "../common/forms/YNButtons";
import LargeTextArea from "../common/forms/LargeTextArea";
import SubmitButton from "../common/forms/SubmitButton";



//Returns a summary Form with fields filled
function MemberProfileSummary(props) {
    const { history } = props;
    const [gender, setGender] = useState(history && history.gender || "");
    const [genderDescription, setGenderDescription] = useState(history && history.genderDescription || "");

    const [petFriendly, setPetFriendly] = useState(history && history.petFriendly || "");
    const [petDescription, setPetDescription] = useState(history && history.petDescription || "");

    const [smoking, setSmoking] = useState(history && history.smoking || "");
    const [smokingDescription, setSmokingDescription] = useState(history && history.smokingDescription || "");

    const [mobilityIssues, setMobilityIssues] = useState(history && history.mobilityIssues || "");
    const [mobilityIssuesDescription, setMobilityIssuesDescription] = useState(history && history.mobilityIssuesDescription || "");

    const [hasAllergies, setHasAllergies] = useState(history && history.hasAllergies || "");
    const [allergiesDescription, setAllergiesDescription] = useState(history && history.allergiesDescription || "");

    const [religious, setReligious] = useState(history && history.religious || "");
    const [religionDescription, setReligionDescription] = useState(history && history.religionDescription || "");

    const [hasDiet, setHasDiet] = useState(history && history.hasDiet || "");
    const [dietDescription, setDietDescription] = useState(history && history.dietDescription || "");

    const [hasHome, setHasHome] = useState(history && history.hasHome || "");
    const [homeDescription, setHomeDescription] = useState(history && history.homeDescription || "");

    const [interestInBuyingHome, setInterestInBuyingHome] = useState(history && history.interestInBuyingHome || "");
    const [interestDescription, setInterestDescription] = useState(history && history.interestDescription || "");

    const [minRent, setMinRent] = useState(history && history.minRent || "00.00");
    const [maxRent, setMaxRent] = useState(history && history.maxRent || "00.00");

    const [aboutSelf, setAboutSelf] = useState(history && history.aboutSelf || "");

    const [selectedLimit, setsSelectedLimit] = useState(history && history.selectedLimit || null);

    const [selectedFamilyStatus, setsSelectedFamilyStatus] = useState(history && history.selectedFamilyStatus || null);
    const [selectedWorkStatus, setsSelectedWorkStatus] = useState(history && history.selectedWorkStatus || null);

    const [partner, setPartner] = useState(history && history.partner || "");
    const [groupMembers, setGroupMembers] = useState(history && history.groupMembers || "");

    const [areasOfInterest, setAreasOfInterest] = useState(history && history.areasOfInterest || [{
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

    const isFormValid = () => {

    }
    function onSubmit(event) {
        if (!isFormValid()) {
            event.preventDefault();
            return;
        }
        alert("Profile information saved");
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
                                    <Status givenSelection={selectedFamilyStatus} onChange={handleFamilyStatusChange}/>
                                    {checkStatus(selectedFamilyStatus)}

                                    <LabelAsterisk label={"Work Status"}/>
                                    <WorkStatus givenSelection={selectedWorkStatus} onChange={handleWorkStatusChange}/>

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
    history: PropTypes.object.isRequired

}

export default MemberProfileSummary