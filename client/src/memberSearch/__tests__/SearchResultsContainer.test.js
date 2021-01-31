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
            const component = renderer.create(<SearchResultsContainer profileData={data}/>);
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
                    age: 13,
                    status: "Single",
                    minRent: 200,
                    maxRent: 550,
                    pet: false,
                    smoke: false,
                    religion: false,
                    diet: false,
                },
                {
                    username: "Babar",
                    gender: "Male",
                    age: 30,
                    status: "Couple With Children",
                    minRent: 2000,
                    maxRent: 5500,
                    pet: true,
                    smoke: true,
                    religion: true,
                    diet: true,
                },
                {
                    username: "CREATINE",
                    gender: "Other",
                    age: 20,
                    status: "Single",
                    minRent: 800,
                    maxRent: 1200,
                    pet: false,
                    smoke: true,
                    religion: true,
                    diet: true
                }
            ];
            //when
            const component = renderer.create(<SearchResultsContainer profileData={data}/>);
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
            const component = renderer.create(<SearchResultsContainer profileData={data}/>);
            const tree = component.toJSON();
            //then
            expect(tree).toMatchSnapshot();
        });
    });
});