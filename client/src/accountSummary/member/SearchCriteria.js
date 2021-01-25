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

        onSubmit,
    } = props;
    return (
        <div>
            <div className="mt-10 sm:mt-0">
                <div className="m-10 md:grid md:grid-cols-4 md:gap-6">
                    <div className="px-4 md:col-span-1 sm:px-0">
                        <h3 className="info-header">Search Criteria</h3>
                        <p className="info-text">
                            This information be used to find other compatible members on Home Together Canada
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
                                            id={"Male"}
                                            className={"align-middle mt-0 mr-1 mb-0 h-4 w-4 border-gray-300 rounded-lg"}
                                            fontNormal={true}
                                            checked={isValueInArray(genderPreference, "Male")}
                                            onChange={handleGenderPrefChange}
                                        />

                                        <Checkbox
                                            label="Female"
                                            id={"Female"}
                                            className={"align-middle mt-0 mr-1 mb-0 text-gray-700 focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded-lg"}
                                            fontNormal={true}
                                            checked={isValueInArray(genderPreference, "Female")}
                                            onChange={handleGenderPrefChange}
                                        />
                                        <Checkbox
                                            label="Other"
                                            id={"Other"}
                                            className={"align-middle mt-0 mr-1 mb-0 text-gray-700 focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded-lg"}
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
                                            value={maxAgePreference}
                                            onChange={(e) => setMaxAgePreference(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <LabelAsterisk label={"I'm looking for member(s) who are looking to live with the following number of people"}/>
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
                                <LabelAsterisk label={"I am looking for member(s) whose budget range overlaps with the following"}/>
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
                                            value={maxBudgetPreference}
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
    );

}

SearchCriteria.propTypes = {
    genderPreference: PropTypes.array,
    handleGenderPrefChange: PropTypes.func,
    genderPreferenceError: PropTypes.bool,

    familyStatusPreference: PropTypes.array,
    setFamilyStatusPreference: PropTypes.func,
    familyStatusPreferenceError: PropTypes.bool,

    minAgePreference: PropTypes.number,
    setMinAgePreference: PropTypes.func,
    minAgePreferenceError: PropTypes.bool,

    maxAgePreference: PropTypes.number,
    setMaxAgePreference: PropTypes.func,
    maxAgePreferenceError: PropTypes.bool,

    selectedLimitPreference: PropTypes.array,
    handleSelectedLimitPreferenceChange: PropTypes.func,
    selectedLimitPreferenceError: PropTypes.bool,

    minBudgetPreference: PropTypes.number,
    setMinBudgetPreference: PropTypes.func,
    minBudgetPreferenceError: PropTypes.bool,

    maxBudgetPreference: PropTypes.number,
    setMaxBudgetPreference: PropTypes.func,
    maxBudgetPreferenceError: PropTypes.bool,

    petPreference: PropTypes.string,
    setPetPreference: PropTypes.func,
    petPreferenceError: PropTypes.bool,

    smokingPreference: PropTypes.string,
    setSmokingPreference: PropTypes.func,
    smokingPreferenceError: PropTypes.bool,

    religionPreference: PropTypes.string,
    setReligionPreference: PropTypes.func,
    religionPreferenceError: PropTypes.bool,

    dietPreference: PropTypes.string,
    setDietPreference: PropTypes.func,
    dietPreferenceError: PropTypes.bool,

    homeToSharePreference: PropTypes.string,
    setHomeToSharePreference: PropTypes.func,
    homeToSharePreferenceError: PropTypes.bool,

    onSubmit: PropTypes.func,
};

export default SearchCriteria;