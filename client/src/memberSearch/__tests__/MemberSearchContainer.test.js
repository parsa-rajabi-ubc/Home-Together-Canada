import React from 'react';
import renderer from  'react-test-renderer'
import MemberSearchContainer from "../MemberSearchContainer";

describe('MemberSearchContainer', () => {
    describe('Container test', () => {
        it('should match snapshot test', () => {
            // given
            const props = {};
            //when
            const component = renderer.create(<MemberSearchContainer {...props}/>);
            const tree = component.toJSON();
            //then
            expect(tree).toMatchSnapshot();
        });
    });
});