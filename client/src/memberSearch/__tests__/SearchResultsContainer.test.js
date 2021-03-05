/**
 * @Author:     Jeff Hatton
 * @Created:    2021.1.23
 *
 * @Description: Snapshot test for search results container should render properly
 *
 */

import React from 'react';
import renderer from  'react-test-renderer'
import SearchResultsContainer from "../SearchResultsContainer";
import MockProfileCardData from "../../mockData/MockProfileCardData";
import {BrowserRouter as Router} from "react-router-dom";

jest.mock('react-redux', () => ({
    connect: () => {
        return (component) => {
            return component
        };
    }
}));

jest.mock("react-tooltip/node_modules/uuid", () => ({
            v4: () => "00000000-0000-0000-0000-000000000000"}
    )
);

describe('SearchResultsContainer', () => {
    describe('Container test', () => {
        it('should match snapshot test for data greater than limit', () => {
            //given
            const data = MockProfileCardData;
            //when
            const component = renderer.create(<Router><SearchResultsContainer profileData={data}/></Router>);
            const tree = component.toJSON();
            //then
            expect(tree).toMatchSnapshot();
        });
    });
    describe('Container test', () => {
        it('should match snapshot test for existing data less than limit', () => {
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
                }
            ];
            //when
            const component = renderer.create(<Router><SearchResultsContainer profileData={data}/></Router>);
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
            const component = renderer.create(<Router><SearchResultsContainer profileData={data}/></Router>);
            const tree = component.toJSON();
            //then
            expect(tree).toMatchSnapshot();
        });
    });
});