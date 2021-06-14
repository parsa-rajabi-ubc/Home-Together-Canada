/**
 * @Author:     Parsa Rajabi
 * @Created:    2021.06.13
 *
 * @Description: Manage Listing Test
 *
 */
import React from 'react';
import renderer from  'react-test-renderer'
import ManageListing from "../ManageListing";

describe('ManageListing', () => {
    describe('Snapshot test', () => {
        it("should render correctly regardless of properties", () => {
            // given
            const props = {
                onSubmit: jest.fn(),
                listingData: [{
                    "id": 51,
                    "uid": 5,
                    "title": "Empty Room in Condo 7",
                    "shortDescription": "Looking for an easy going roommate",
                    "fullDescription": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                    "monthlyCost": 600,
                    "numBed": 2,
                    "numBath": 1,
                    "petFriendly": true,
                    "smokeFriendly": false,
                    "utilitiesIncluded": true,
                    "addressLine1": "2271 Harvey Ave",
                    "city": "Kelowna",
                    "province": "BC",
                    "postalCode": "V1Y6H2",
                    "isClassified": false,
                    "createdAt": "2021-06-14T00:42:47.000Z",
                    "updatedAt": "2021-06-14T00:42:47.000Z",
                    "categoryName": "Members with Homes to Share",
                    "images": []
                }],
                activeTab: "Live"
            }

            // when
            const component = renderer.create(<ManageListing {...props} />).toJSON();

            // then
            expect(component).toMatchSnapshot();
        });
    })
})