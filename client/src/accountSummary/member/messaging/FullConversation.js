/**
 *
 * @Author:     Alex Qin
 * @Created:    2021.3.04
 *
 * @Description: Member Messaging Full Conversation
 *
 */

import React,{useState} from 'react';
import PropTypes from "prop-types";
import LargeTextArea from "../../../common/forms/LargeTextArea";
import Button from "../../../common/forms/Button";
import ChatBoxContainer from "./ChatBoxContainer";
import {sortMessageByTimeIncreasing} from "./messageUtils";

function FullConversation(props) {
    const{senderId,myUserName,messageData} = props;
    // const [newMessage, setNewMessage] = useState('');
    const conversationData = [];

    // get all the messages between 2 users
    const myMessage = messageData.filter(messageData => (messageData.senderId === senderId && messageData.receiverId === myUserName) || (messageData.senderId === myUserName && messageData.receiverId === senderId));

    // sort the messages by time
    sortMessageByTimeIncreasing(myMessage);

    // By using "leftOrRight" to define messages to display either on left-side or right-side
    for(let i = 0; i < myMessage.length; i++){
        if (myMessage[i].senderId !== myUserName) {
            conversationData.push(<ChatBoxContainer key={i}
                                                    userName={myMessage[i].senderId}
                                                    messageContent={myMessage[i].messageContent}
                                                    datePosted={myMessage[i].dateSent}
                                                    leftOrRight={"left"}
            />);
        }
        else{
            conversationData.push(<ChatBoxContainer key={i}
                                                    userName={myMessage[i].senderId}
                                                    messageContent={myMessage[i].messageContent}
                                                    datePosted={myMessage[i].dateSent}
                                                    leftOrRight={"right"}
            />);
        }
    }

    return (
        <div>
            <h1>{senderId}</h1> <br/>

            {conversationData} <br/>

            <LargeTextArea placeholder={"type a message..."} label={""}/> <br/>
            <Button className={"btn btn-green mb-6 w-1/2 text-base py-2"} value={"Send"}/>
        </div>
    );
}

FullConversation.propTypes = {
    senderId:PropTypes.string.isRequired,
    myUserName:PropTypes.string.isRequired,
    messageData: PropTypes.array.isRequired
}

export default FullConversation