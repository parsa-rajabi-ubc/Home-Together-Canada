/**
 *
 * @Author:     Alex Qin
 * @Created:    2021.3.04
 *
 * @Description: Member Messaging Full Conversation
 *
 */

import React, {useEffect, useState} from 'react';
import PropTypes from "prop-types";
import MessageBox from "./MessageBox";
import {sortMessageByTimeIncreasing} from "./messageUtils";
import SendMessage from "./SendMessage";

function FullConversation(props) {
    const{otherId,isDeletedUser,myUserId,messageData, newMessageAddedCallback} = props;
    const [otherUsername,setOtherUsername] = useState("");
    const [myUsername,setMyUsername] = useState("")
    const conversationData = [];


    // get all the messages between 2 users
    const myMessage = messageData.filter(messageData => (messageData.senderId === otherId && messageData.receiverId === myUserId) || (messageData.senderId === myUserId && messageData.receiverId === otherId));

    // sort the messages by time
    sortMessageByTimeIncreasing(myMessage);

    // By using "leftOrRight" to define messages to display either on left-side or right-side
    for(let i = 0; i < myMessage.length; i++){
        if (myMessage[i].senderId !== myUserId) {
            conversationData.push(
                <MessageBox
                    key={i}
                    messageContent={myMessage[i].content}
                    datePosted={myMessage[i].createdAt}
                    leftOrRight={"left"}
                />
            );
        }
        else{
            conversationData.push(
                <MessageBox
                    key={i}
                    messageContent={myMessage[i].content}
                    datePosted={myMessage[i].createdAt}
                    leftOrRight={"right"}
                />
            );
        }
    }

    useEffect(() => {
        if (myMessage[0].senderId !== myUserId) {
            setOtherUsername(myMessage[0].senderUsername);
            setMyUsername(myMessage[0].receiverUsername);
        } else{
            setOtherUsername(myMessage[0].receiverUsername);
            setMyUsername(myMessage[0].senderUsername);
        }
    }, [otherId]);

    return (
        <div>
                <div>
                    {(isDeletedUser) ?
                        (<div>
                            <h1 style={{fontWeight:"bold",float:"left"}}>{otherUsername + " (Deleted User)"}</h1>
                            <h1 style={{fontWeight:"bold",float:"right", textAlign: 'right', alignSelf: 'stretch'}}>{myUsername}</h1> <br/> <br/>
                            {conversationData}
                            <br/><h1 style={{fontWeight:"bold"}}>* Sorry, the person you are trying to reach has deleted their account.</h1>
                        </div>) :
                        (<div>
                            <h1 style={{fontWeight:"bold",float:"left"}}>{otherUsername}</h1>
                            <h1 style={{fontWeight:"bold", float:"right",textAlign: 'right', alignSelf: 'stretch'}}>{myUsername}</h1> <br/> <br/>
                            {conversationData}
                            <SendMessage
                                receiverId={otherId}
                                receiverUsername={otherUsername}
                                newMessageAddedCallback={newMessageAddedCallback}
                            />
                        </div>)
                    }
                </div>
        </div>
    )
}

FullConversation.propTypes = {
    isDeletedUser:PropTypes.bool.isRequired,
    otherId:PropTypes.number.isRequired,
    myUserId:PropTypes.number.isRequired,
    messageData: PropTypes.array.isRequired,
    newMessageAddedCallback: PropTypes.func
}

export default FullConversation