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
        messageContent: "message content 1 all on different days and times",
        senderId: 1,
        senderUsername: "member1",
        receiverId: 2,
        receiverUsername: "member2",
        dateSent: "2021-01-12T02:42:39.005Z"
    },
    {
        id: 2,
        messageContent: "message content 2",
        senderId: 1,
        senderUsername: "member1",
        receiverId: 2,
        receiverUsername: "member2",
        dateSent: "2021-01-01T02:42:39.005Z"
    },
    {
        id: 3,
        messageContent: "message content 3",
        senderId: 1,
        senderUsername: "member1",
        receiverId: 2,
        receiverUsername: "member2",
        dateSent: "2021-02-14T08:42:39.005Z"
    },
    {
        id: 4,
        messageContent: "message content 4",
        senderId: 1,
        senderUsername: "member1",
        receiverId: 2,
        receiverUsername: "member2",
        dateSent: "2021-01-12T02:42:39.005Z"
    },
    {
        id: 5,
        messageContent: "message content 5",
        senderId: 2,
        senderUsername: "member2",
        receiverId: 1,
        receiverUsername: "member1",
        dateSent: "2020-03-13T02:42:39.075Z"
    },
    {
        id: 6,
        messageContent: "message content 6",
        senderId: 1,
        senderUsername: "member1",
        receiverId: 2,
        receiverUsername: "member2",
        dateSent: "2021-02-17T02:43:39.005Z"
    },
    {
        id: 7,
        messageContent: "message content 7",
        senderId: 2,
        senderUsername: "member2",
        receiverId: 1,
        receiverUsername: "member1",
        dateSent: "2021-01-19T09:42:39.005Z"
    },
    {
        id: 8,
        messageContent: "message content 8",
        senderId: 2,
        senderUsername: "member2",
        receiverId: 1,
        receiverUsername: "member1",
        dateSent: "2021-01-11T02:42:39.005Z"
    },
    {
        id: 9,
        messageContent: "message content 9 has timestamp before a smaller message id",
        senderId: 1,
        senderUsername: "member1",
        receiverId: 2,
        receiverUsername: "member2",
        dateSent: "2021-01-10T02:42:39.005Z"
    },
    {
        id: 10,
        messageContent: "message content 10",
        senderId: 2,
        senderUsername: "member2",
        receiverId: 1,
        receiverUsername: "member1",
        dateSent: "2021-02-10T02:42:39.005Z"
    }
];