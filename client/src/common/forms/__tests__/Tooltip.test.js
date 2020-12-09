/**
 * @Author:     Parsa Rajabi
 * @Created:    2020.12.08
 *
 * @Description: Tooltip Component Snapshot test
 *
 */

import React from 'react';
import renderer from  'react-test-renderer'
import Tooltip from "../Tooltip";

describe('Tooltip', () => {
    describe('Snapshot test', () => {
        it("should render correctly regardless of properties", () => {
            // given
            const text = "helpful text";
            const toolTipID = "randomID"
            //when
            const component = renderer.create(<Tooltip text={text} toolTipID={toolTipID} />).toJSON();
            //then
            expect(component).toMatchSnapshot();
        });
    })
})