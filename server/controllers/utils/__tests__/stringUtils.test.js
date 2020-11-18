const { removeAllWhiteSpace } = require('../stringUtils');

describe('stringUtils', () => {
    describe('removeAllWhiteSpace', () => {
        it('should remove all whitespace from a string', () => {
            // expected result
            const expectedString = 'somewordswithallthespacesremoved';

            // given
            const str = 'some words with all the spaces removed';

            // when
            const normalizedStr = removeAllWhiteSpace(str);

            // then
            expect(normalizedStr).toBe(expectedString);
        });

        it('should return undefined when undefined is passed into function', () => {
            // expected result
            const expectedString = undefined;

            // given
            const str = undefined;

            // when
            const normalizedStr = removeAllWhiteSpace(str);

            // then
            expect(normalizedStr).toBe(expectedString);
        });

        it('should return null when null is passed into function', () => {
            // expected result
            const expectedString = null;

            // given
            const str = null;

            // when
            const normalizedStr = removeAllWhiteSpace(str);

            // then
            expect(normalizedStr).toBe(expectedString);
        });
    });
});