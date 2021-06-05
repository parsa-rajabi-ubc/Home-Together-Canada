/**
 * @Author:     Rachelle Gelden
 * @Created:    2021.05.29
 *
 * @Description: InterestedArea unit tests
 *
 */

import React from 'react';
import renderer from  'react-test-renderer'
import InterestedArea from "../InterestedArea";
import Button from "../Button";

describe('InterestedArea component', () => {
    describe('Snapshot test', () => {
        it("should render correctly regardless of properties", () => {
            // given
            const onChange = jest.fn();
            const givenAreasOfInterest = [
                { province: 'AB', city: 'Calgary', radius: 50 },
                { province: 'AB', city: 'Drumheller', radius: 60 }
            ];
            const areasOfInterestError = undefined;
            const max = 5;

            // when
            const component = renderer.create(
                    <InterestedArea
                        onChange={onChange}
                        givenAreasOfInterest={givenAreasOfInterest}
                        areasOfInterestError={areasOfInterestError}
                        max={max}
                    />
                ).toJSON();

            // then
            expect(component).toMatchSnapshot();
        });
    });

    describe('Add Another Location button', () => {
        it('should show the Add Location button when there are less areas of interest than the max', () => {
            // given
            const onChange = jest.fn();
            const givenAreasOfInterest = [
                { province: 'AB', city: 'Calgary', radius: 50 },
                { province: 'AB', city: 'Drumheller', radius: 60 }
            ];
            const areasOfInterestError = undefined;
            const max = 5;

            // when
            const testInstance = renderer.create(
                <InterestedArea
                    onChange={onChange}
                    givenAreasOfInterest={givenAreasOfInterest}
                    areasOfInterestError={areasOfInterestError}
                    max={max}
                />
            ).root;
            const addLocationButtonText = testInstance.findByType(Button).props.value;

            // then
            expect(addLocationButtonText).toBe('Add Another Location');
        });
        it('should not show the Add Location button when the number of areas of interest is equal to the max', () => {
            // given
            const onChange = jest.fn();
            const givenAreasOfInterest = [
                { province: 'AB', city: 'Calgary', radius: 50 },
                { province: 'AB', city: 'Drumheller', radius: 60 },
                { province: 'AB', city: 'Edmonton', radius: 70 },
                { province: 'AB', city: 'Milk River', radius: 80 },
                { province: 'AB', city: 'Lethbridge', radius: 90 }
            ];
            const areasOfInterestError = undefined;
            const max = 5;

            // when
            const testInstance = renderer.create(
                <InterestedArea
                    onChange={onChange}
                    givenAreasOfInterest={givenAreasOfInterest}
                    areasOfInterestError={areasOfInterestError}
                    max={max}
                />
            ).root;
            const addLocationButtonText = testInstance.findAllByType(Button);

            // then
            expect(addLocationButtonText.length).toBe(0);
        });
    });
});
