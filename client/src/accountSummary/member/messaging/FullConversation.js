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
import TextArea from "../../../common/forms/TextArea";
import Button from "../../../common/forms/Button";
import ChatBoxContainer from "./ChatBoxContainer";

function FullConversation(props) {
    const{senderId,myUserName,messageData} = props;
    // const [newMessage, setNewMessage] = useState('');
    const conversationData = [];

    // get all the messages between 2 users
    const myMessage = messageData.filter(messageData => (messageData.senderId === senderId && messageData.receiverId === myUserName) || (messageData.senderId === myUserName && messageData.receiverId === senderId));

    // sort the messages by time
    for(let i = 0; i < myMessage.length; i++){
        for(let j = i + 1; j<myMessage.length; j++){
            if(myMessage[i].dateSent > myMessage[j].dateSent){
                let temp = myMessage[i];
                myMessage[i] = myMessage[j];
                myMessage[j] = temp;
            }
        }
    }

    // By using "leftOrRight" to define messages to display either on left-side or right-side
    for(let i = 0; i < myMessage.length; i++){
        if (myMessage[i].senderId !== myUserName) {
            conversationData.push(<ChatBoxContainer key={i}
                                                    userName={myMessage[i].senderId}
                                                    messageContent={myMessage[i].messageContent}
                                                    datePosted={myMessage[i].dateSent}
                                                    leftOrRight={"Left"}
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

            <TextArea placeholder={"type a message..."}/> <br/>
            <Button value={"Send"}/>
        </div>
    );
}

FullConversation.propTypes = {
    senderId:PropTypes.string.isRequired,
    myUserName:PropTypes.string.isRequired,
    messageData: PropTypes.array.isRequired
}

export default FullConversation