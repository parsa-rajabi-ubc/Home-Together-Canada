/**
 * @Author:     Rachelle Gelden
 * @Created:    2021.02.13
 *
 * @Description: tests for SearchCriteriaContainer component
 *
 */

import React from 'react';
import renderer from "react-test-renderer";
import SearchCriteriaContainer from "../SearchCriteriaContainer";
import {memberSearchCriteriaMock} from "../MockData";
import {BrowserRouter} from "react-router-dom";

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

describe('SearchCriteriaContainer', () => {
    const reset = jest.fn();
    const setMemberSearchFilters = jest.fn();
    const memberSearchFilters = {
        ...memberSearchCriteriaMock
    }
    it("should render correctly regardless of properties", () => {
        // given
        const props = {
            setMemberSearchFilters,
            memberSearchFilters,
            reset
        };
        //when
        const component = renderer.create(<BrowserRouter><SearchCriteriaContainer {...props}/></BrowserRouter>);
        const tree = component.toJSON();
        //then
        expect(tree).toMatchSnapshot();
    });
});
