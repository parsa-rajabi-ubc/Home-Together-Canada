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
import MockProfileCardData from "../../mockData/MockProfileCardData";

describe('MemberSearchResults', () => {
    describe('Container test', () => {
        it('should match snapshot test with an array or profile cards', () => {
            //given
            const data = MockProfileCardData;
            //when
            const component = renderer.create(<MemberSearchResults ProfileData={data}/>);
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
            const component = renderer.create(<MemberSearchResults ProfileData={data}/>);
            const tree = component.toJSON();
            //then
            expect(tree).toMatchSnapshot();
        });
    });
});