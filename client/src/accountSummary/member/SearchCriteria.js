/**
 * @Author:     Parsa Rajabi
 * @Created:    2021.1.23
 *
 * @Description: Search Criteria Component
 *
 */

import React from 'react';
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import LabelAsterisk from "../../common/forms/LabelAsterisk";
import Tooltip from "../../common/forms/Tooltip";
import {MEMBER_PROFILE_INFO_TEXT} from "../../common/constants/TooltipText";
import Checkbox from "../../common/forms/Checkbox";
import {isValueInArray} from "../../common/utils/generalUtils";
import Status from "../../common/forms/Status";
import {dropdownDefaultCSS, dropdownErrorCSS} from "../../css/dropdownCSSUtil";
import ShareLimit from "../../common/forms/ShareLimits";
import YNButton from "../../common/forms/YNButtons";
import SubmitButton from "../../common/forms/SubmitButton";

const SUCCESS_MESSAGE = 'Search criteria successfully updated!';

function SearchCriteria(props) {
    const {
        genderPreference,
        handleGenderPrefChange,
        genderPreferenceError,

        familyStatusPreference,
        setFamilyStatusPreference,
        familyStatusPreferenceError,

        minAgePreference,
        setMinAgePreference,
        minAgePreferenceError,

        maxAgePreference,
        setMaxAgePreference,
        maxAgePreferenceError,

        selectedLimitPreference,
        handleSelectedLimitPreferenceChange,
        selectedLimitPreferenceError,

        minBudgetPreference,
        setMinBudgetPreference,
        minBudgetPreferenceError,

        maxBudgetPreference,
        setMaxBudgetPreference,
        maxBudgetPreferenceError,

        petPreference,
        setPetPreference,
        petPreferenceError,

        smokingPreference,
        setSmokingPreference,
        smokingPreferenceError,

        religionPreference,
        setReligionPreference,
        religionPreferenceError,

        dietPreference,
        setDietPreference,
        dietPreferenceError,

        homeToSharePreference,
        setHomeToSharePreference,
        homeToSharePreferenceError,

        showSuccessMessage,

        onSubmit,
    } = props;
    return (
        <div>
            <h3 className="account-summary-info-header">Search Criteria</h3>
            <p className="account-summary-info-text">
                This information is used to find other compatible members on Home Together Canada
                <Link to={'/faq'} className={"label"}> FAQs</Link>.
            </p>
            <div className="selected-component-grid-outer">
                <div className="selected-component-grid-inner">
                    <div className="grid grid-cols-2 gap-6">
                        <div className="col-span-3 sm:col-span-2">
                            <section
                                className={`${genderPreferenceError && "pl-1 border rounded-lg border-red-500 mr-52"}`}>
                                <LabelAsterisk label={"I am open to sharing with "}/>
                                <Tooltip text={MEMBER_PROFILE_INFO_TEXT.PREF.GENDER} toolTipID="genderPref"/>
                                <div className={"my-2"}>
                                    <Checkbox
                                        label="Male"
                                        id={"Male"}
                                        fontNormal={true}
                                        checked={isValueInArray(genderPreference, "Male")}
                                        onChange={handleGenderPrefChange}
                                    />

                                    <Checkbox
                                        label="Female"
                                        id={"Female"}
                                        fontNormal={true}
                                        checked={isValueInArray(genderPreference, "Female")}
                                        onChange={handleGenderPrefChange}
                                    />
                                    <Checkbox
                                        label="Other"
                                        id={"Other"}
                                        fontNormal={true}
                                        checked={isValueInArray(genderPreference, "Other")}
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
                                currentSelectedValue={familyStatusPreference}
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
                                        value={minAgePreference}
                                        onChange={e => setMinAgePreference(parseInt(e.target.value))}
                                    />
                                </div>
                                <div className="column-span-6-layout">
                                    <input
                                        className={`${maxAgePreferenceError && "border-red-500"} input`}
                                        type="number"
                                        min={minAgePreference}
                                        step="1"
                                        placeholder="Max Age"
                                        value={maxAgePreference}
                                        onChange={e => setMaxAgePreference(parseInt(e.target.value))}
                                    />
                                </div>
                            </div>
                            <LabelAsterisk
                                label={"I'm looking for member(s) who are looking to live with the following number of people"}/>
                            <Tooltip text={MEMBER_PROFILE_INFO_TEXT.NUM_PEOPLE_SHARE} toolTipID="numPeopleToSharePref"/>
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
                                        value={minBudgetPreference}
                                        onChange={e => setMinBudgetPreference(parseInt(e.target.value))}
                                    />
                                </div>
                                <div className="column-span-6-layout">
                                    <input
                                        className={`${maxBudgetPreferenceError && "border-red-500"} input`}
                                        type="number"
                                        min={minBudgetPreference}
                                        step="1"
                                        placeholder=" Max $ CAD"
                                        value={maxBudgetPreference}
                                        onChange={e => setMaxBudgetPreference(parseInt(e.target.value))}
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
            {showSuccessMessage &&
                <section className={'success-msg mb-4 justify-center'}>{SUCCESS_MESSAGE}</section>
            }
            <SubmitButton
                inputValue={"Save"}
                className="btn btn-green form-btn w-1/2"
                onClick={onSubmit}
            />
        </div>
    );

}

SearchCriteria.propTypes = {
    genderPreference: PropTypes.array.isRequired,
    handleGenderPrefChange: PropTypes.func.isRequired,
    genderPreferenceError: PropTypes.bool,

    familyStatusPreference: PropTypes.array.isRequired,
    setFamilyStatusPreference: PropTypes.func.isRequired,
    familyStatusPreferenceError: PropTypes.bool,

    minAgePreference: PropTypes.number.isRequired,
    setMinAgePreference: PropTypes.func.isRequired,
    minAgePreferenceError: PropTypes.bool,

    maxAgePreference: PropTypes.number.isRequired,
    setMaxAgePreference: PropTypes.func.isRequired,
    maxAgePreferenceError: PropTypes.bool,

    selectedLimitPreference: PropTypes.array.isRequired,
    handleSelectedLimitPreferenceChange: PropTypes.func.isRequired,
    selectedLimitPreferenceError: PropTypes.bool,

    minBudgetPreference: PropTypes.number.isRequired,
    setMinBudgetPreference: PropTypes.func.isRequired,
    minBudgetPreferenceError: PropTypes.bool,

    maxBudgetPreference: PropTypes.number.isRequired,
    setMaxBudgetPreference: PropTypes.func.isRequired,
    maxBudgetPreferenceError: PropTypes.bool,

    petPreference: PropTypes.string.isRequired,
    setPetPreference: PropTypes.func.isRequired,
    petPreferenceError: PropTypes.bool,

    smokingPreference: PropTypes.string.isRequired,
    setSmokingPreference: PropTypes.func.isRequired,
    smokingPreferenceError: PropTypes.bool,

    religionPreference: PropTypes.string.isRequired,
    setReligionPreference: PropTypes.func.isRequired,
    religionPreferenceError: PropTypes.bool,

    dietPreference: PropTypes.string.isRequired,
    setDietPreference: PropTypes.func.isRequired,
    dietPreferenceError: PropTypes.bool,

    homeToSharePreference: PropTypes.string.isRequired,
    setHomeToSharePreference: PropTypes.func.isRequired,
    homeToSharePreferenceError: PropTypes.bool,

    showSuccessMessage: PropTypes.bool.isRequired,

    onSubmit: PropTypes.func,
};

export default SearchCriteria;