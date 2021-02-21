/**
 * @Author:     Alex Qin
 * @Created:    2021.02.21
 *
 * @Description: EventsCustomFields snapshot test. Returns a snapshot.
 *
 */
import React from 'react';
import renderer from  'react-test-renderer'
import {BrowserRouter as Router} from "react-router-dom";
import {eventsMockCustomFields} from "../../../../mockData/MockClassifiedsCustomFields";
import EventsCustomFields from "../EventsCustomFields";

describe('EventsCustomFields', () => {
    it("should render correctly regardless of properties", () => {
        // given
        const props = {
            ...eventsMockCustomFields,
        };
        //when
        const component = renderer.create(<Router><EventsCustomFields {...props}/></Router>);
        const tree = component.toJSON();
        //then
        expect(tree).toMatchSnapshot();
    });
});