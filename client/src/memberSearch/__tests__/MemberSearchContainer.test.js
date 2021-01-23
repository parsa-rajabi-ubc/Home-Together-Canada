import React from 'react';
import renderer from  'react-test-renderer'
import MemberSearchContainer from "../MemberSearchContainer";

jest.mock("react-tooltip/node_modules/uuid", () => ({
            v4: () => "00000000-0000-0000-0000-000000000000"}
    )
);

describe('MemberSearchContainer', () => {
    describe('Container test', () => {
        it('should match snapshot test', () => {
            // given
            const props = {
                src:{
                   test: "GoogleMapsPlaceholder"
                }
            };
            //when
            const component = renderer.create(<MemberSearchContainer {...props}/>);
            const tree = component.toJSON();
            //then
            expect(tree).toMatchSnapshot();
        });
    });
});