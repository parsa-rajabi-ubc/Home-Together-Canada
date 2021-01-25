/**
 * @Author:     Parsa Rajabi
 * @Created:    2021.01.24
 *
 * @Description: Search Criteria Snapshot Test
 *
 */
import React from 'react';
import renderer from  'react-test-renderer'
import PropTypes from "prop-types";
import SearchCriteria from "../SearchCriteria";

describe('SearchCriteria', () => {
    describe('Snapshot test', () => {
        it("should render correctly regardless of properties", () => {
            // given
            const props = {
                genderPreference: PropTypes.array,
                handleGenderPrefChange: jest.fn(),
                genderPreferenceError: true,

                familyStatusPreference: PropTypes.array,
                setFamilyStatusPreference: jest.fn(),
                familyStatusPreferenceError: false,

                minAgePreference: 20,
                setMinAgePreference: jest.fn(),
                minAgePreferenceError: true,

                maxAgePreference: 25,
                setMaxAgePreference: jest.fn(),
                maxAgePreferenceError: false,

                selectedLimitPreference: PropTypes.array,
                handleSelectedLimitPreferenceChange: jest.fn(),
                selectedLimitPreferenceError: true,

                minBudgetPreference: 200,
                setMinBudgetPreference: jest.fn(),
                minBudgetPreferenceError: false,

                maxBudgetPreference: 250,
                setMaxBudgetPreference: jest.fn(),
                maxBudgetPreferenceError: true,

                petPreference: "yes",
                setPetPreference: jest.fn(),
                petPreferenceError: false,

                smokingPreference: "no",
                setSmokingPreference: jest.fn(),
                smokingPreferenceError: true,

                religionPreference: "yes",
                setReligionPreference: jest.fn(),
                religionPreferenceError: false,

                dietPreference: "no",
                setDietPreference: jest.fn(),
                dietPreferenceError: false,

                homeToSharePreference: "yes",
                setHomeToSharePreference: jest.fn(),
                homeToSharePreferenceError: true,

                onSubmit: jest.fn(),
            }

            // when
            const component = renderer.create(<SearchCriteria {...props} />).toJSON();

            // then
            expect(component).toMatchSnapshot();
        });
    })
})