/**
 * @Author:     Jeff Hatton
 * @Created:    2020.03.03
 *
 * @Description: Const array of mock messages - includes multiple conversations, most between messageMember and other members with differing timestamps
 *
 */

export const mockMessages = [
    {
        id: 1,
        content: "message content 1 all on different days and times",
        senderId: 1,
        senderUsername: "member1",
        receiverId: 2,
        receiverUsername: "member2",
        createdAt: "2021-01-12T02:42:39.005Z"
    },
    {
        id: 2,
        content: "message content 2",
        senderId: 1,
        senderUsername: "member1",
        receiverId: 2,
        receiverUsername: "member2",
        createdAt: "2021-01-01T02:42:39.005Z"
    },
    {
        id: 3,
        content: "message content 3",
        senderId: 1,
        senderUsername: "member1",
        receiverId: 2,
        receiverUsername: "member2",
        createdAt: "2021-02-14T08:42:39.005Z"
    },
    {
        id: 4,
        content: "message content 4",
        senderId: 1,
        senderUsername: "member1",
        receiverId: 2,
        receiverUsername: "member2",
        createdAt: "2021-01-12T02:42:39.005Z"
    },
    {
        id: 5,
        content: "message content 5",
        senderId: 2,
        senderUsername: "member2",
        receiverId: 1,
        receiverUsername: "member1",
        createdAt: "2020-03-13T02:42:39.075Z"
    },
    {
        id: 6,
        content: "message content 6",
        senderId: 1,
        senderUsername: "member1",
        receiverId: 2,
        receiverUsername: "member2",
        createdAt: "2021-02-17T02:43:39.005Z"
    },
    {
        id: 7,
        content: "message content 7",
        senderId: 2,
        senderUsername: "member2",
        receiverId: 1,
        receiverUsername: "member1",
        createdAt: "2021-01-19T09:42:39.005Z"
    },
    {
        id: 8,
        content: "message content 8",
        senderId: 2,
        senderUsername: "member2",
        receiverId: 1,
        receiverUsername: "member1",
        createdAt: "2021-01-11T02:42:39.005Z"
    },
    {
        id: 9,
        content: "message content 9 has timestamp before a smaller message id",
        senderId: 1,
        senderUsername: "member1",
        receiverId: 2,
        receiverUsername: "member2",
        createdAt: "2021-01-10T02:42:39.005Z"
    },
    {
        id: 10,
        content: "message content 10",
        senderId: 2,
        senderUsername: "member2",
        receiverId: 1,
        receiverUsername: "member1",
        createdAt: "2021-02-10T02:42:39.005Z"
    }
];