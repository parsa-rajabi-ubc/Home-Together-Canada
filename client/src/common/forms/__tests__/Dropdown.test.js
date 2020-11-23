/**
 * @Author:     Parsa Rajabi
 * @Created:    2020.11.23
 *
 * @Description: Testing Dropdown Component
 *
 */
import React from 'react';
import renderer from  'react-test-renderer'
import Dropdown from "../Dropdown";

describe('Dropdown', () => {
    describe('Snapshot test', () => {
        it("should render correctly regardless of properties", () => {
            // given
            const className = 'CSS';
            const isSearchable = true;
            const onChange = jest.fn();
            const placeholder = 'placeholders';
            const options = [
                { value: 'chocolate', label: 'Chocolate' },
                { value: 'strawberry', label: 'Strawberry' },
                { value: 'vanilla', label: 'Vanilla' },
            ];
            // when
            const component = renderer.create(<Dropdown className={className} isSearchable={isSearchable} options={options} placeholder={placeholder}  onChange={onChange}/>).toJSON();

            // then
            expect(component).toMatchSnapshot();
        });
    })
})