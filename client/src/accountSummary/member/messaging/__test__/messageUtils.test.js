/**
 * @Author:     Jeff Hatton
 * @Created:    2021.03.06
 *
 * @Description: tests for message utility functions
 *
 */

import {mostRecentMessages, isMoreRecentMessageTime, isSameConversation, sortMessageByTimeIncreasing,sortMessageByTimeDecreasing} from "../messageUtils";
import {
    isValueInArray,
    resolveBooleanToYesNo,
    toggleYesNo,
    validatePositiveNumber
} from "../../../../common/utils/generalUtils";

describe('messageUtils', () => {
    describe('isSameConversation', () => {
        it('should return true if same sender and receiver in same order', () => {
            // given
            const message1 = {
                id: 1,
                messageContent: "message content 1 all on different days and times",
                senderId: 1,
                senderUsername: "member1",
                receiverId: 2,
                receiverUsername: "member2",
                createdAt: "2021-01-13T02:42:39.005Z"
            };
            const message2 = {
                id: 21,
                messageContent: "message content 21",
                senderId: 1,
                senderUsername: "member1",
                receiverId: 2,
                receiverUsername: "member2",
                createdAt: "2021-01-15T03:42:39.005Z"
            };

            // when
            const result = isSameConversation(message1,message2);

            // then
            expect(result).toBe(true);
        });
        it('should return true when sender and receiver are the same but reversed', () => {
            // given
            const message1 = {
                id: 1,
                messageContent: "message content 1 all on different days and times",
                senderId: 1,
                senderUsername: "member1",
                receiverId: 2,
                receiverUsername: "member2",
                createdAt: "2021-01-13T02:42:39.005Z"
            };
            const message2 = {
                id: 21,
                messageContent: "message content 21",
                senderId: 2,
                senderUsername: "member2",
                receiverId: 1,
                receiverUsername: "member1",
                createdAt: "2021-01-15T03:42:39.005Z"
            };

            // when
            const result = isSameConversation(message1,message2);

            // then
            expect(result).toBe(true);
        });
        it('should return false if same sender and receiver are both different', () => {
            // given
            const message1 = {
                id: 1,
                messageContent: "message content 1 all on different days and times",
                senderId: 1,
                senderUsername: "member1",
                receiverId: 2,
                receiverUsername: "member2",
                createdAt: "2021-01-13T02:42:39.005Z"
            };
            const message2 = {
                id: 21,
                messageContent: "message content 21",
                senderId: 3,
                senderUsername: "member3",
                receiverId: 4,
                receiverUsername: "member4",
                createdAt: "2021-01-15T03:42:39.005Z"
            };

            // when
            const result = isSameConversation(message1,message2);

            // then
            expect(result).toBe(false);
        });
        it('should return true when one sender or receiver is same and one is different', () => {
            // given
            const message1 = {
                id: 1,
                messageContent: "message content 1 all on different days and times",
                senderId: 1,
                senderUsername: "member1",
                receiverId: 2,
                receiverUsername: "member2",
                createdAt: "2021-01-13T02:42:39.005Z"
            };
            const message2 = {
                id: 21,
                messageContent: "message content 21",
                senderId: 2,
                senderUsername: "member2",
                receiverId: 3,
                receiverUsername: "member3",
                createdAt: "2021-01-15T03:42:39.005Z"
            };

            // when
            const result = isSameConversation(message1,message2);

            // then
            expect(result).toBe(false);
        });
    });
    describe('isMoreRecentMessageTime', () => {
        it('should return true if time 2 is more recent', () => {
            // given
            const time1 = "2021-01-13T02:42:39.005Z";
            const time2 = "2021-01-15T03:42:39.005Z";
            // when
            const result = isMoreRecentMessageTime(time1,time2);

            // then
            expect(result).toBe(true);
        });
        it('should return false if time 1 is more recent', () => {
            // given
            const time2 = "2021-01-13T02:42:39.005Z";
            const time1 = "2021-01-15T03:42:39.005Z";
            // when
            const result = isMoreRecentMessageTime(time1,time2);

            // then
            expect(result).toBe(false);
        });
        it('should return false if both times are the same', () => {
            // given
            const time2 = "2021-01-13T02:42:39.005Z";
            const time1 = "2021-01-15T03:42:39.005Z";
            // when
            const result = isMoreRecentMessageTime(time1,time2);

            // then
            expect(result).toBe(false);
        });
    });


    describe('sortMessageByTimeIncreasing',() => {
        it('should return the message by the increasing time order', () => {
            // given
            const messageData =[
                {
                    id: 23,
                    messageContent: "message content 23",
                    senderId: 3,
                    senderUsername: "member3",
                    receiverId: 4,
                    receiverUsername: "member4",
                    createdAt: "2021-01-17T05:42:39.005Z"
                },
                {
                    id: 21,
                    messageContent: "message content 21",
                    senderId: 1,
                    senderUsername: "member1",
                    receiverId: 2,
                    receiverUsername: "member2",
                    createdAt: "2021-01-15T03:42:39.005Z"
                },
                {
                    id: 22,
                    messageContent: "message content 22",
                    senderId: 1,
                    senderUsername: "member1",
                    receiverId: 2,
                    receiverUsername: "member2",
                    createdAt: "2021-01-16T04:42:39.005Z"
                },
            ];

            // when
            const result = sortMessageByTimeIncreasing(messageData)

            // then
            expect(result).toStrictEqual([{
                id: 21,
                messageContent: "message content 21",
                senderId: 1,
                senderUsername: "member1",
                receiverId: 2,
                receiverUsername: "member2",
                createdAt: "2021-01-15T03:42:39.005Z"
            },{
                id: 22,
                messageContent: "message content 22",
                senderId: 1,
                senderUsername: "member1",
                receiverId: 2,
                receiverUsername: "member2",
                createdAt: "2021-01-16T04:42:39.005Z"
            },{
                id: 23,
                messageContent: "message content 23",
                senderId: 3,
                senderUsername: "member3",
                receiverId: 4,
                receiverUsername: "member4",
                createdAt: "2021-01-17T05:42:39.005Z"
            }]);
        });
    });

    describe('sortMessageByTimeDecreasing',() => {
        it('should return the message by the decreasing time order', () => {
            // given
            const messageData =[
                {
                    id: 21,
                    messageContent: "message content 21",
                    senderId: 1,
                    senderUsername: "member1",
                    receiverId: 2,
                    receiverUsername: "member2",
                    createdAt: "2021-01-15T03:42:39.005Z"
                },
                {
                    id: 23,
                    messageContent: "message content 23",
                    senderId: 3,
                    senderUsername: "member3",
                    receiverId: 4,
                    receiverUsername: "member4",
                    createdAt: "2021-01-17T05:42:39.005Z"
                },
                {
                    id: 22,
                    messageContent: "message content 22",
                    senderId: 1,
                    senderUsername: "member1",
                    receiverId: 2,
                    receiverUsername: "member2",
                    createdAt: "2021-01-16T04:42:39.005Z"
                },
            ];

            // when
            const result = sortMessageByTimeDecreasing(messageData)

            // then
            expect(result).toStrictEqual([{
                id: 23,
                messageContent: "message content 23",
                senderId: 3,
                senderUsername: "member3",
                receiverId: 4,
                receiverUsername: "member4",
                createdAt: "2021-01-17T05:42:39.005Z"
            },{
                id: 22,
                messageContent: "message content 22",
                senderId: 1,
                senderUsername: "member1",
                receiverId: 2,
                receiverUsername: "member2",
                createdAt: "2021-01-16T04:42:39.005Z"
            },{
                id: 21,
                messageContent: "message content 21",
                senderId: 1,
                senderUsername: "member1",
                receiverId: 2,
                receiverUsername: "member2",
                createdAt: "2021-01-15T03:42:39.005Z"
            }]);
        });
    });

    describe('mostRecentMessages', () => {
        it('should return one message when all messages are from same two people', () => {
            // given
            const messageData = [
                {
                    id: 21,
                    messageContent: "message content 21",
                    senderId: 1,
                    senderUsername: "member1",
                    receiverId: 2,
                    receiverUsername: "member2",
                    createdAt: "2021-01-15T03:42:39.005Z"
                },
                {
                    id: 22,
                    messageContent: "message content 22",
                    senderId: 1,
                    senderUsername: "member1",
                    receiverId: 2,
                    receiverUsername: "member2",
                    createdAt: "2021-01-16T04:42:39.005Z"
                },
                {
                    id: 23,
                    messageContent: "message content 23",
                    senderId: 2,
                    senderUsername: "member2",
                    receiverId: 1,
                    receiverUsername: "member1",
                    createdAt: "2021-01-17T05:42:39.005Z"
                },
                {
                    id: 24,
                    messageContent: "message content 24",
                    senderId: 1,
                    senderUsername: "member1",
                    receiverId: 2,
                    receiverUsername: "member2",
                    createdAt: "2021-01-18T06:42:39.005Z"
                },
                {
                    id: 25,
                    messageContent: "message content 25",
                    senderId: 2,
                    senderUsername: "member2",
                    receiverId: 1,
                    receiverUsername: "member1",
                    createdAt: "2021-01-19T07:42:39.005Z"
                },
                {
                    id: 26,
                    messageContent: "message content 26",
                    senderId: 1,
                    senderUsername: "member1",
                    receiverId: 2,
                    receiverUsername: "member2",
                    createdAt: "2021-01-20T08:42:39.005Z"
                },
                {
                    id: 27,
                    messageContent: "message content 27",
                    senderId: 1,
                    senderUsername: "member1",
                    receiverId: 2,
                    receiverUsername: "member2",
                    createdAt: "2021-01-21T09:42:39.005Z"
                }
            ];

            // when
            const result = mostRecentMessages(messageData)

            // then
            expect(result).toStrictEqual([{
                id: 27,
                messageContent: "message content 27",
                senderId: 1,
                senderUsername: "member1",
                receiverId: 2,
                receiverUsername: "member2",
                createdAt: "2021-01-21T09:42:39.005Z"
            }]);
        });
        it('should return all messages when no two messages are between the same pair of users', () => {
            // given
            const messageData =[{
                id: 21,
                messageContent: "message content 21",
                senderId: 1,
                senderUsername: "member1",
                receiverId: 2,
                receiverUsername: "member2",
                createdAt: "2021-01-15T03:42:39.005Z"
            },{
                id: 19,
                messageContent: "message content 19 other minute",
                senderId: 4,
                senderUsername: "member4",
                receiverId: 1,
                receiverUsername: "member1",
                createdAt: "2021-01-14T02:47:39.005Z"
            }, {
                id: 7,
                messageContent: "message content 7",
                senderId: 1,
                senderUsername: "member1",
                receiverId: 3,
                receiverUsername: "member3",
                createdAt: "2021-01-19T09:42:39.005Z"
            }];

            // when
            const result = mostRecentMessages(messageData)

            // then
            expect(result).toStrictEqual(messageData);
        });
        it('should return all most recent given multiple conversations with multiple messages', () => {
            // given
            const messageData =[
                {
                    id: 20,
                    messageContent: "message content 20 other second",
                    senderId: 3,
                    senderUsername: "member3",
                    receiverId: 1,
                    receiverUsername: "member1",
                    createdAt: "2021-01-14T02:42:55.005Z"
                },
                {
                    id: 21,
                    messageContent: "message content 21",
                    senderId: 1,
                    senderUsername: "member1",
                    receiverId: 2,
                    receiverUsername: "member2",
                    createdAt: "2021-01-15T03:42:39.005Z"
                },
                {
                    id: 24,
                    messageContent: "message content 24",
                    senderId: 1,
                    senderUsername: "member1",
                    receiverId: 3,
                    receiverUsername: "member3",
                    createdAt: "2021-01-17T05:42:39.005Z"
                },
                {
                    id: 22,
                    messageContent: "message content 22",
                    senderId: 1,
                    senderUsername: "member1",
                    receiverId: 2,
                    receiverUsername: "member2",
                    createdAt: "2021-01-16T04:42:39.005Z"
                },
                {
                    id: 23,
                    messageContent: "message content 23",
                    senderId: 2,
                    senderUsername: "member2",
                    receiverId: 1,
                    receiverUsername: "member1",
                    createdAt: "2021-01-17T05:42:39.005Z"
                },
            ];

            // when
            const result = mostRecentMessages(messageData)

            // then
            expect(result).toStrictEqual([{
                id: 24,
                messageContent: "message content 24",
                senderId: 1,
                senderUsername: "member1",
                receiverId: 3,
                receiverUsername: "member3",
                createdAt: "2021-01-17T05:42:39.005Z"
            },{
                id: 23,
                messageContent: "message content 23",
                senderId: 2,
                senderUsername: "member2",
                receiverId: 1,
                receiverUsername: "member1",
                createdAt: "2021-01-17T05:42:39.005Z"
            }]);
        });
    });
});