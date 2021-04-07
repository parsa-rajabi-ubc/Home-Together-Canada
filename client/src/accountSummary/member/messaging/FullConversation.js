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
    const{otherId,isDeletedUser,myUserId,messageData} = props;
    const [otherName,setOtherName] = useState("");
    const conversationData = [];

    // get all the messages between 2 users
    const myMessage = messageData.filter(messageData => (messageData.senderId === otherId && messageData.receiverId === myUserId) || (messageData.senderId === myUserId && messageData.receiverId === otherId));

    // sort the messages by time
    sortMessageByTimeIncreasing(myMessage);

    // By using "leftOrRight" to define messages to display either on left-side or right-side
    for(let i = 0; i < myMessage.length; i++){
        if (myMessage[i].senderId !== myUserId) {
            conversationData.push(<MessageBox key={i}
                                              userName={myMessage[i].senderUsername}
                                              messageContent={myMessage[i].content}
                                              datePosted={myMessage[i].createdAt}
                                              leftOrRight={"left"}
            />);
        }
        else{
            conversationData.push(<MessageBox key={i}
                                              userName={myMessage[i].senderUsername}
                                              messageContent={myMessage[i].content}
                                              datePosted={myMessage[i].createdAt}
                                              leftOrRight={"right"}
            />);
        }
    }

    useEffect(() => {
        if (myMessage[0].senderId !== myUserId) setOtherName(myMessage[0].senderUsername);
        else setOtherName(myMessage[0].receiverUsername);
    }, [otherId]);

    return (
        <div>
                <div>
                    {(isDeletedUser) ?
                        (<div>
                            <h1>{otherName + " (Deleted User)"}</h1> <br/>
                            {conversationData}
                            <h1>Sorry, the person you are trying to reach has deleted their account.</h1>
                        </div>) :
                        (<div>
                            <h1>{otherName}</h1> <br/>
                            {conversationData}
                            <SendMessage receiverId={otherId} receiverUsername={otherName}/>
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
    messageData: PropTypes.array.isRequired
}

export default FullConversation