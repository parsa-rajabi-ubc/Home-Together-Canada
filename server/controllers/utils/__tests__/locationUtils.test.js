/**
 * @Author:     Rachelle Gelden
 * @Created:    2021.01.20
 *
 * @Description: utility with functions for locations
 *
 */

const locationUtils = require('../locationUtils');

describe('locationUtils', () => {
    describe('isCanadianPostalCode', () => {
        it('should return true if a valid postal code is given', () => {
            // given
            const postalCode = 'T1V1S4';

            // when
            const result = locationUtils.isCanadianPostalCode(postalCode);

            // then
            expect(result).toBe(true);
        });
        it('should return false if a numbers & letters are not correctly positioned in postal code', () => {
            // given
            const postalCode = '1S4T1V';

            // when
            const result = locationUtils.isCanadianPostalCode(postalCode);

            // then
            expect(result).toBe(false);
        });
        it('should return false if postal code is incorrect length', () => {
            // given
            const postalCode = 'T1V1S';

            // when
            const result = locationUtils.isCanadianPostalCode(postalCode);

            // then
            expect(result).toBe(false);
        });
    });
});
