/**
 * @Author:     Jeff Hatton
 * @Created:    2021.1.23
 *
 * @Description: Snapshot test for member search results should render properly;
 *
 */

import React from 'react';
import renderer from  'react-test-renderer'
import MemberSearchResults from "../MemberSearchResults";
import {BrowserRouter as Router} from "react-router-dom";


jest.mock('react-redux', () => ({
    connect: () => {
        return (component) => {
            return component
        };
    }
}));

jest.mock("uuid", () => ({
            v4: () => "00000000-0000-0000-0000-000000000000"}
    )
);

describe('MemberSearchResults', () => {
    describe('Container test', () => {
        it('should match snapshot test with an array of profile cards', () => {
            //given
            const data = [
                {
                    username: "AliceinWonderLand",
                    gender: "Female",
                    birthYear: 1985,
                    status: "Single",
                    minMonthlyBudget: 200,
                    maxMonthlyBudget: 550,
                    hasPets: false,
                    isSmoker: false,
                    isReligionImportant: false,
                    isDietImportant: false,
                    hasHomeToShare: false
                },
                {
                    username: "Babar",
                    gender: "Male",
                    birthYear: 1990,
                    status: "Couple With Children",
                    minMonthlyBudget: 2000,
                    maxMonthlyBudget: 5500,
                    hasPets: true,
                    isSmoker: true,
                    isReligionImportant: true,
                    isDietImportant: true,
                    hasHomeToShare: true
                },
                {
                    username: "CREATINE",
                    gender: "Other",
                    birthYear: 1995,
                    status: "Single",
                    minMonthlyBudget: 800,
                    maxMonthlyBudget: 1200,
                    hasPets: false,
                    isSmoker: true,
                    isReligionImportant: true,
                    isDietImportant: true,
                    hasHomeToShare: true
                },
                {
                    username: "DonaldDuck",
                    gender: "Male",
                    birthYear: 1970,
                    status: "Single Parent",
                    minMonthlyBudget: 500,
                    maxMonthlyBudget: 600,
                    hasPets: false,
                    isSmoker: false,
                    isReligionImportant: true,
                    isDietImportant: true,
                    hasHomeToShare: true
                },
                {
                    username: "EusticeOfNarnia",
                    gender: "Male",
                    birthYear: 1950,
                    status: "Single",
                    minMonthlyBudget: 1300,
                    maxMonthlyBudget: 2300,
                    hasPets: false,
                    isSmoker: false,
                    isReligionImportant: false,
                    isDietImportant: true,
                    hasHomeToShare: false
                }
            ]
            //when
            const component = renderer.create(<Router><MemberSearchResults profileData={data}/></Router>);
            const tree = component.toJSON();
            //then
            expect(tree).toMatchSnapshot();
        });
    });
    describe('Container test', () => {
        it('should match snapshot test with an empty array', () => {
            //given
            const data = [];
            //when
            const component = renderer.create(<Router><MemberSearchResults profileData={data}/></Router>);
            const tree = component.toJSON();
            //then
            expect(tree).toMatchSnapshot();
        });
    });
});