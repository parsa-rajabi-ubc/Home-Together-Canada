/**
 * @Author:     Rachelle Gelden
 * @Created:    2021.02.13
 *
 * @Description: tests for SearchFilterContainer component
 *
 */

import React from 'react';
import renderer from "react-test-renderer";
import SearchFilterContainer from "../SearchFilterContainer";
import {memberSearchCriteriaMock} from "../../accountSummary/member/MockData";

jest.mock('react-redux', () => ({
    connect: () => {
        return (component) => {
            return component
        };
    }
}));

describe('SearchFilterContainer', () => {
    const setMemberSearchFilters = jest.fn();
    const memberSearchFilters = {
        ...memberSearchCriteriaMock
    }

    it("should render correctly regardless of properties", () => {
        // given
        const props = {
            setMemberSearchFilters,
            memberSearchFilters
        };
        //when
        const component = renderer.create(<SearchFilterContainer {...props}/>);
        const tree = component.toJSON();
        //then
        expect(tree).toMatchSnapshot();
    });
});
