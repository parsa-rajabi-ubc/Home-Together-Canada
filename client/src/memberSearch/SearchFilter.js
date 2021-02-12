/**
 * @Author:     Parsa Rajabi
 * @Created:    2021.1.28
 *
 * @Description: Search Filter Component
 *
 */

import React from 'react';
import PropTypes from "prop-types";
import Checkbox from "../common/forms/Checkbox";
import {isValueInArray} from "../common/utils/generalUtils";
import Status from "../common/forms/Status";
import {dropdownDefaultCSS} from "../css/dropdownCSSUtil";
import ShareLimit from "../common/forms/ShareLimits";
import SubmitButton from "../common/forms/SubmitButton";
import SearchArea from "../common/listings/SearchArea";

function SearchFilter(props) {
    const {
        handleSearchAreaChange,

        genderPreference,
        handleGenderPrefChange,

        familyStatusPreference,
        setFamilyStatusPreference,

        minAgePreference,
        setMinAgePreference,
        minAgePreferenceError,

        maxAgePreference,
        setMaxAgePreference,
        maxAgePreferenceError,

        selectedLimitPreference,
        handleSelectedLimitPreferenceChange,


        minBudgetPreference,
        setMinBudgetPreference,
        minBudgetPreferenceError,

        maxBudgetPreference,
        setMaxBudgetPreference,
        maxBudgetPreferenceError,

        petPreference,
        setPetPreference,

        smokingPreference,
        setSmokingPreference,

        religionPreference,
        setReligionPreference,

        dietPreference,
        setDietPreference,

        homeToSharePreference,
        setHomeToSharePreference,

        onSubmit,
    } = props;
    return (
        <div className="col-start-1 col-end-7 py-5 px-5 m-6 bg-white shadow-lg rounded-xl">
            <div className="grid grid-cols-2 gap-6">
                <div className="col-span-3 sm:col-span-2">
                    <label className="text-2xl font-medium">Search Filtering</label>
                    <SubmitButton
                        inputValue={"Search"}
                        className="btn btn-green w-1/4 float-right py-2"
                        onClick={onSubmit}
                    />
                    <label className="label block">Search Area</label>
                    <SearchArea onChange={handleSearchAreaChange}/>

                    <label className={"label block"}>I am open to sharing with </label>
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

                    <div className="grid grid-cols-2 gap-x-6">
                        <div className="column-span-3-layout">
                            <div className={""}>
                                <label className={"label text-center block mt-0"}> Minimum Age </label>
                            </div>
                            <input
                                className={`${minAgePreferenceError && "border-red-500"} input text-center`}
                                type="number"
                                min="16"
                                step="1"
                                placeholder="Min Age"
                                value={minAgePreference}
                                onChange={(e) => setMinAgePreference(e.target.value)}
                            />
                        </div>
                        <div className="column-span-2-layout">
                            <label className={"label block text-center mt-0"}> Maximum Age </label>
                            <input
                                className={`${maxAgePreferenceError && "border-red-500"} input text-center`}
                                type="number"
                                min={minAgePreference}
                                step="1"
                                placeholder="Max Age"
                                value={maxAgePreference}
                                onChange={(e) => setMaxAgePreference(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-x-6">
                        <div className="column-span-3-layout">
                            <label className={"label block text-center mt-0"}> Minimum Rent </label>
                            <input
                                className={`${minBudgetPreferenceError && "border-red-500"} input text-center`}
                                type="number"
                                min="0"
                                step="1"
                                placeholder="Min $ CAD"
                                value={minBudgetPreference}
                                onChange={(e) => setMinBudgetPreference(e.target.value)}
                            />
                        </div>
                        <div className="column-span-3-layout">
                            <label className={"label block text-center mt-0"}> Maximum Rent </label>
                            <input
                                className={`${maxBudgetPreferenceError && "border-red-500"} input text-center`}
                                type="number"
                                min={minBudgetPreference}
                                step="1"
                                placeholder=" Max $ CAD"
                                value={maxBudgetPreference}
                                onChange={(e) => setMaxBudgetPreference(e.target.value)}
                            />
                        </div>
                    </div>
                    <label className={"label block text-center"}> I am open to sharing with </label>
                    <Status
                        currentSelectedValue={familyStatusPreference}
                        onChange={setFamilyStatusPreference}
                        dropdownCSS={dropdownDefaultCSS}
                        isDropdownMulti={true}
                    />
                    <label className={"label block text-center"}> Number of Roommates </label>
                    <div className="col-span-3 sm:col-span-2">
                        <div className="column-span-6-layout">
                            <ShareLimit
                                onChange={handleSelectedLimitPreferenceChange}
                                dropdownCSS={dropdownDefaultCSS}
                                isMulti={true}
                                currentSelectedValue={selectedLimitPreference}
                            />
                        </div>
                    </div>
                    <label className={"label block my-4"}>I am looking for others who have similar values</label>
                    <Checkbox
                        label="Pet friendly"
                        id={"PetFriendly"}
                        checked={petPreference}
                        onChange={() => setPetPreference(!petPreference)}

                    />
                    <Checkbox
                        label="Smoke friendly"
                        id={"SmokeFriendly"}
                        checked={smokingPreference}
                        onChange={() => setSmokingPreference(!smokingPreference)}
                    />
                    <Checkbox
                        label="Religion is important"
                        id={"religionPref"}
                        checked={religionPreference}
                        onChange={() => setReligionPreference(!religionPreference)}
                    />
                    <Checkbox
                        label="Diet is important"
                        id={"dietPref"}
                        checked={dietPreference}
                        onChange={() => setDietPreference(!dietPreference)}
                    />
                    <Checkbox
                        label="Others with a home to share"
                        id={"homeToSharePref"}
                        checked={homeToSharePreference}
                        onChange={() => setHomeToSharePreference(!homeToSharePreference)}
                    />

                </div>
            </div>
        </div>
    );

}

SearchFilter.propTypes = {
    handleSearchAreaChange: PropTypes.func.isRequired,

    genderPreference: PropTypes.array.isRequired,
    handleGenderPrefChange: PropTypes.func.isRequired,

    familyStatusPreference: PropTypes.array.isRequired,
    setFamilyStatusPreference: PropTypes.func.isRequired,

    minAgePreference: PropTypes.number.isRequired,
    setMinAgePreference: PropTypes.func.isRequired,
    minAgePreferenceError: PropTypes.bool,

    maxAgePreference: PropTypes.number.isRequired,
    setMaxAgePreference: PropTypes.func.isRequired,
    maxAgePreferenceError: PropTypes.bool,

    selectedLimitPreference: PropTypes.array.isRequired,
    handleSelectedLimitPreferenceChange: PropTypes.func.isRequired,

    minBudgetPreference: PropTypes.number.isRequired,
    setMinBudgetPreference: PropTypes.func.isRequired,
    minBudgetPreferenceError: PropTypes.bool,

    maxBudgetPreference: PropTypes.number.isRequired,
    setMaxBudgetPreference: PropTypes.func.isRequired,
    maxBudgetPreferenceError: PropTypes.bool,

    petPreference: PropTypes.bool.isRequired,
    setPetPreference: PropTypes.func.isRequired,

    smokingPreference: PropTypes.bool.isRequired,
    setSmokingPreference: PropTypes.func.isRequired,

    religionPreference: PropTypes.bool.isRequired,
    setReligionPreference: PropTypes.func.isRequired,

    dietPreference: PropTypes.bool.isRequired,
    setDietPreference: PropTypes.func.isRequired,

    homeToSharePreference: PropTypes.bool.isRequired,
    setHomeToSharePreference: PropTypes.func.isRequired,

    onSubmit: PropTypes.func.isRequired,
};

export default SearchFilter;