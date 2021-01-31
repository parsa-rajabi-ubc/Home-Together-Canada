/**
 * @Author:     Rachelle Gelden
 * @Created:    2021.01.29
 *
 * @Description: tests for areas of interest utils
 *
 */


const { getListOfAreaOfInterestObjects, areasOfInterestHaveChanged } = require('../areaOfInterestUtils');

describe('areaOfInterestUtils', () => {
    describe('getListOfAreaOfInterestObjects', () => {
        it('given a list of areas of interest, it should return a new list of objects with only the province, ' +
            'city and radius properties', () => {
            // expected result
            const expectedAreasOfInterestObjects = [
                {
                    province: "AB",
                    city: "Calgary",
                    radius: 25
                },
                {
                    province: "MB",
                    city: "Winnipeg",
                    radius: 50
                },
                {
                    province: "SK",
                    city: "Saskatoon",
                    radius: 75
                }
            ];

            // given
            const mockAreasOfInterest = [
                {
                    id: 1,
                    uid: 1,
                    province: "AB",
                    city: "Calgary",
                    radius: 25
                },
                {
                    id: 2,
                    uid: 1,
                    province: "MB",
                    city: "Winnipeg",
                    radius: 50
                },
                {
                    id: 3,
                    uid: 2,
                    province: "SK",
                    city: "Saskatoon",
                    radius: 75
                }
            ];

            // when
            const areasOfInterestObjects = getListOfAreaOfInterestObjects(mockAreasOfInterest);

            // then
            expect(areasOfInterestObjects).toEqual(expectedAreasOfInterestObjects);
        });
        it('should return an empty array if areasOfInterest is undefined', () => {
            // expected result
            const expectedAreasOfInterestObjects = [];

            // given
            const mockAreasOfInterest = undefined;

            // when
            const areasOfInterestObjects = getListOfAreaOfInterestObjects(mockAreasOfInterest);

            // then
            expect(areasOfInterestObjects).toEqual(expectedAreasOfInterestObjects);
        });
    });

    describe('areasOfInterestHaveChanged', () => {
        it('should return true when there are items in the old areas of interest that are not in the new areas ' +
            'of interest', () => {
            // given
            const oldAreasOfInterest = [
                {
                    province: "AB",
                    city: "Calgary",
                    radius: 25
                },
                {
                    province: "MB",
                    city: "Winnipeg",
                    radius: 50
                },
                {
                    province: "SK",
                    city: "Saskatoon",
                    radius: 75
                }
            ];

            const newAreasOfInterest = [
                {
                    province: "AB",
                    city: "Calgary",
                    radius: 25
                },
                {
                    province: "MB",
                    city: "Winnipeg",
                    radius: 50
                }
            ];

            // when
            const hasChanged = areasOfInterestHaveChanged(oldAreasOfInterest, newAreasOfInterest);

            // then
            expect(hasChanged).toBe(true);
        });
        it('should return true when there are items in the new areas of interest that are not in the old areas ' +
            'of interest', () => {
            // given
            const newAreasOfInterest = [
                {
                    province: "AB",
                    city: "Calgary",
                    radius: 25
                },
                {
                    province: "MB",
                    city: "Winnipeg",
                    radius: 50
                },
                {
                    province: "SK",
                    city: "Saskatoon",
                    radius: 75
                }
            ];

            const oldAreasOfInterest = [
                {
                    province: "AB",
                    city: "Calgary",
                    radius: 25
                },
                {
                    province: "MB",
                    city: "Winnipeg",
                    radius: 50
                }
            ];

            // when
            const hasChanged = areasOfInterestHaveChanged(oldAreasOfInterest, newAreasOfInterest);

            // then
            expect(hasChanged).toBe(true);
        });
        it('should return false when there is no difference in the items that are in the new areas of interest ' +
            'and old areas of interest', () => {
            // given
            const newAreasOfInterest = [
                {
                    province: "AB",
                    city: "Calgary",
                    radius: 25
                },
                {
                    province: "MB",
                    city: "Winnipeg",
                    radius: 50
                },
                {
                    province: "SK",
                    city: "Saskatoon",
                    radius: 75
                }
            ];

            const oldAreasOfInterest = [
                {
                    province: "AB",
                    city: "Calgary",
                    radius: 25
                },
                {
                    province: "MB",
                    city: "Winnipeg",
                    radius: 50
                },
                {
                    province: "SK",
                    city: "Saskatoon",
                    radius: 75
                }
            ];

            // when
            const hasChanged = areasOfInterestHaveChanged(oldAreasOfInterest, newAreasOfInterest);

            // then
            expect(hasChanged).toBe(false);
        });
    });
});