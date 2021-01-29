/**
 * @Author:     Rachelle Gelden
 * @Created:    2021.01.29
 *
 * @Description: tests for areas of interest utils
 *
 */

const {
    isStatusWithRoommates,
    hasPartnerChanged,
    haveGroupMembersChanged,
    getRoommatesUsernames,
    memberHasCoupleStatus,
    memberHasExistingGroupStatus
} = require('../statusUtils');

describe('statusUtils', () => {
    describe('isStatusWithRoommates', () => {
        it.each`
            status                      | expected
            ${'Single'}                 | ${false}
            ${'Couple'}                 | ${true}
            ${'Couple With Children'}   | ${true}
            ${'Single Parent'}          | ${false}
            ${'Existing Group'}         | ${true}
        `('returns $expected when status is $status',
            ({ status, expected }) => {
                expect(isStatusWithRoommates(status)).toBe(expected);
            });
    });

   describe('hasPartnerChanged', () => {
       it('returns false if member has a partner and the partner has not changed', () => {
           // given
           const memberRoommates = [
                {
                    MemberAccountUid: 2,
                    RoommateUid: 1,
                    roommateUsername: 'member1'
                }
            ];

           const partnerUsername = 'member1';

           // when
           const hasPartnerChangedBool = hasPartnerChanged(partnerUsername, memberRoommates);

           // then
           expect(hasPartnerChangedBool).toBe(false);
       });
       it('returns true if member has a partner saved as a roommate but the partner username provided is different', () => {
           // given
           const memberRoommates = [
               {
                   MemberAccountUid: 2,
                   RoommateUid: 1,
                   roommateUsername: 'member1'
               }
           ];

           const partnerUsername = 'memberA';

           // when
           const hasPartnerChangedBool = hasPartnerChanged(partnerUsername, memberRoommates);

           // then
           expect(hasPartnerChangedBool).toBe(true);
       });
       it('returns true if member has no partners saved as a roommate and a partner username has been provided', () => {
           // given
           const memberRoommates = [];

           const partnerUsername = 'memberA';

           // when
           const hasPartnerChangedBool = hasPartnerChanged(partnerUsername, memberRoommates);

           // then
           expect(hasPartnerChangedBool).toBe(true);
       });
       it('returns true if member has a partner saved as a roommate and a partner username has not been provided', () => {
           // given
           const memberRoommates = [
               {
                   MemberAccountUid: 2,
                   RoommateUid: 1,
                   roommateUsername: 'member1'
               }
           ];

           const partnerUsername = undefined;

           // when
           const hasPartnerChangedBool = hasPartnerChanged(partnerUsername, memberRoommates);

           // then
           expect(hasPartnerChangedBool).toBe(true);
       });
       it('returns false if member has no partners saved as a roommate and a partner username has not been provided', () => {
           // given
           const memberRoommates = [];

           const partnerUsername = undefined;

           // when
           const hasPartnerChangedBool = hasPartnerChanged(partnerUsername, memberRoommates);

           // then
           expect(hasPartnerChangedBool).toBe(false);
       });
   });

   describe('haveGroupMembersChanged', () => {
       it('returns false if member has a roommates and the roommates have not changed', () => {
           // given
           const memberRoommates = [
               {
                   MemberAccountUid: 2,
                   RoommateUid: 1,
                   roommateUsername: 'member1'
               },
               {
                   MemberAccountUid: 2,
                   RoommateUid: 3,
                   roommateUsername: 'member3'
               },
               {
                   MemberAccountUid: 2,
                   RoommateUid: 4,
                   roommateUsername: 'member4'
               }
           ];

           const groupMembersUsernames = ['member1', 'member3', 'member4'];

           // when
           const hasGroupMemberChangedBool = haveGroupMembersChanged(groupMembersUsernames, memberRoommates);

           // then
            expect(hasGroupMemberChangedBool).toBe(false);
       });
        it('returns true if member has roommates saved but the roommates usernames provided are different', () => {
            // given
            const memberRoommates = [
                {
                    MemberAccountUid: 2,
                    RoommateUid: 1,
                    roommateUsername: 'member1'
                },
                {
                    MemberAccountUid: 2,
                    RoommateUid: 3,
                    roommateUsername: 'member3'
                },
                {
                    MemberAccountUid: 2,
                    RoommateUid: 4,
                    roommateUsername: 'member4'
                }
            ];

            const groupMembersUsernames = ['memberA', 'memberB', 'memberC'];

            // when
            const haveGroupMembersChangedBool = haveGroupMembersChanged(groupMembersUsernames, memberRoommates);

            // then
            expect(haveGroupMembersChangedBool).toBe(true);
        });
        it('returns true if member has no roommates saved and a group members username have been provided', () => {
            // given
            const memberRoommates = [];

            const groupMembersUsernames = ['memberA', 'memberB', 'memberC'];

            // when
            const haveGroupMembersChangedBool = haveGroupMembersChanged(groupMembersUsernames, memberRoommates);

            // then
            expect(haveGroupMembersChangedBool).toBe(true);
        });
        it('returns true if member has roommates saved and a group members usernames have not been provided', () => {
            // given
            const memberRoommates = [
                {
                    MemberAccountUid: 2,
                    RoommateUid: 1,
                    roommateUsername: 'member1'
                },
                {
                    MemberAccountUid: 2,
                    RoommateUid: 3,
                    roommateUsername: 'member3'
                },
                {
                    MemberAccountUid: 2,
                    RoommateUid: 4,
                    roommateUsername: 'member4'
                }
            ];

            const groupMembersUsernames = undefined;

            // when
            const haveGroupMembersChangedBool = haveGroupMembersChanged(groupMembersUsernames, memberRoommates);

            // then
            expect(haveGroupMembersChangedBool).toBe(true);
        });
        it('returns false if member has no partners saved as a roommate and a partner username has not been provided', () => {
            // given
            const memberRoommates = [];

            const groupMembersUsernames = undefined;

            // when
            const haveGroupMembersChangedBool = haveGroupMembersChanged(groupMembersUsernames, memberRoommates);

            // then
            expect(haveGroupMembersChangedBool).toBe(false);
        });
   });

   describe('getRoommatesUsernames', () => {
       it('should return a list of roommates usernames given a list of roommates', () => {
           // expected result
           const expectedUsernames = ['member1', 'member3', 'member4'];

           // given
           const memberRoommates = [
               {
                   MemberAccountUid: 2,
                   RoommateUid: 1,
                   roommateUsername: 'member1'
               },
               {
                   MemberAccountUid: 2,
                   RoommateUid: 3,
                   roommateUsername: 'member3'
               },
               {
                   MemberAccountUid: 2,
                   RoommateUid: 4,
                   roommateUsername: 'member4'
               }
           ];

           // when
           const usernamesList = getRoommatesUsernames(memberRoommates);

           // then
           expect(usernamesList).toEqual(expectedUsernames);
       });
       it('should return an empty list if list of roommates is undefined', () => {
           // expected result
           const expectedUsernames = [];

           // given
           const memberRoommates = undefined;

           // when
           const usernamesList = getRoommatesUsernames(memberRoommates);

           // then
           expect(usernamesList).toEqual(expectedUsernames);
       });
   });

    describe('memberHasCoupleStatus', () => {
        it.each`
            status                      | expected
            ${'Single'}                 | ${false}
            ${'Couple'}                 | ${true}
            ${'Couple With Children'}   | ${true}
            ${'Single Parent'}          | ${false}
            ${'Existing Group'}         | ${false}
        `('returns $expected when status is $status',
            ({ status, expected }) => {
                expect(memberHasCoupleStatus(status)).toBe(expected);
            });
    });

    describe('memberHasExistingGroupStatus', () => {
        it.each`
            status                      | expected
            ${'Single'}                 | ${false}
            ${'Couple'}                 | ${false}
            ${'Couple With Children'}   | ${false}
            ${'Single Parent'}          | ${false}
            ${'Existing Group'}         | ${true}
        `('returns $expected when status is $status',
            ({ status, expected }) => {
                expect(memberHasExistingGroupStatus(status)).toBe(expected);
            });
    });


});