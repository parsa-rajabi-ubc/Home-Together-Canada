/**
 * @Author:     Parsa Rajabi
 * @Created:    2021.1.22
 *
 * @Description: Test for profile card
 *
 */

import React from 'react';
import renderer from  'react-test-renderer'
import ProfileCard from "../ProfileCard";

jest.mock("uuid", () => ({
            v4: () => "00000000-0000-0000-0000-000000000000"}
    )
);

describe('ProfileCard', () => {
    describe('Snapshot test', () => {
        it("should render correctly regardless of properties", () => {
            // given
            const props = {
                username:"jack",
                age: 20,
                familyStatus: "Single",
                minBudget: 400,
                maxBudget: 600,
                pet: true,
                smoke: true,
                religion: true,
                diet: true,
                hasHome: true
            };
            //when
            const component = renderer.create(<ProfileCard {...props}/>).toJSON();
            //then
            expect(component).toMatchSnapshot();
        });
    })
})