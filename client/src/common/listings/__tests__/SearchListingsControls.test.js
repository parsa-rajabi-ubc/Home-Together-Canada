/**
 * @Author:     Jeff Hatton
 * @Created:    2020.02.04
 *
 * @Description: SearchListingsControls component Snapshot test
 *
 */
import React from 'react';
import renderer from  'react-test-renderer'
import {BrowserRouter} from "react-router-dom";
import SearchListingsControls from "../SearchListingsControls";

jest.mock('react-redux', () => ({
    connect: () => {
        return (component) => {
            return component
        };
    }
}));

describe('SearchListingsControls', () => {
    describe('Component Snapshot test', () => {
        it("should render correctly regardless of properties", () => {
            //given
            const startIndex = 0;
            const numResults = 5;
            const numOfAvailableResults = 12;
            const changeStart = jest.fn();
            const changeNumResults = jest.fn();
            //when
            const component = renderer.create(<BrowserRouter><SearchListingsControls totalNumResults={numOfAvailableResults} currentNumResults={numResults} currentFirstResult={startIndex} onChangeStartIndex={changeStart} onChangeNumResults={changeNumResults}/></BrowserRouter>).toJSON();
            //then
            expect(component).toMatchSnapshot();
        });
    })
})