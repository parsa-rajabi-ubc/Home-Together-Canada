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
import { BrowserRouter as Router } from 'react-router-dom';

jest.mock("uuid", () => ({
            v4: () => "00000000-0000-0000-0000-000000000000"}
    )
);

describe('SearchCriteria', () => {
    describe('Snapshot test', () => {
        it("should render correctly regardless of properties", () => {
            // given
            const props = {
                genderPreference: ["Male", "Female"],
                handleGenderPrefChange: jest.fn(),
                genderPreferenceError: true,

                familyStatusPreference: ["Single", "Couple"],
                setFamilyStatusPreference: jest.fn(),
                familyStatusPreferenceError: false,

                minAgePreference: 20,
                setMinAgePreference: jest.fn(),
                minAgePreferenceError: true,

                maxAgePreference: 25,
                setMaxAgePreference: jest.fn(),
                maxAgePreferenceError: false,

                selectedLimitPreference: [1,3],
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

                showSuccessMessage: false,

                onSubmit: jest.fn(),
            }

            // when
            const component = renderer.create(<Router><SearchCriteria {...props} /></Router>).toJSON();

            // then
            expect(component).toMatchSnapshot();
        });
    })
})