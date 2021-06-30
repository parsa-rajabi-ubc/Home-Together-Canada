/**
 *
 * @Author:     Jeff Hatton
 * @Created:    2021.3.04
 *
 * @Description: Member Messaging Conversation Card List
 *
 */
import React, {useState,useEffect}from 'react';
import PropTypes from "prop-types";
import Paginate from "../../../common/forms/Paginate";
import ConversationCard from "./ConversationCard";
import {mostRecentMessages,sortMessageByTimeDecreasing} from "./messageUtils";
import Confirmation from "../../../common/listings/Confirmation";
import EmptySelection from "./EmptySelection";
import FullConversation from "./FullConversation";
import MessageService from "../../../services/MessageService";

const NUM_RESULTS = 7;
const MESSAGE = {
    NO_RESULTS: "No results found"
}

function SelectConversation(props) {
    const {messageData, myUserId} = props;
    const recentMessages = mostRecentMessages(messageData);
    sortMessageByTimeDecreasing(recentMessages);
    const cardData = [];
    const [isSelect,setIsSelect] = useState(false);
    const [senderId,setSenderId] = useState("");
    const [allUsers,setAllUsers] = useState([]);

    useEffect(() => {
        MessageService.findAllMembers()
            .then(res => res.json())
            .then(data => {
                setAllUsers(data);
            })
            .catch(err => {
                alert('error getting message: ' + err.message);
            });
    }, [])

    function isDeletedUser(userId){
        for(let i = 0; i < allUsers.length; i++){
            if(allUsers[i].uid ===userId) return false;
        }
        return true;
    }

    for (let i = 0; i < recentMessages.length; i++) {
        if (recentMessages[i].senderId===myUserId) {
            cardData.push(
                    <ConversationCard key={i}
                                      onClick={()=>{setIsSelect(true);setSenderId(recentMessages[i].receiverId)}}
                                      userName={recentMessages[i].receiverUsername}
                                      messageContent={recentMessages[i].content}
                                      datePosted={recentMessages[i].createdAt}
                                      isDeletedUser={isDeletedUser(recentMessages[i].receiverId)}
                    />
            );
        }
        else if (recentMessages[i].receiverId===myUserId) {
            cardData.push(
                    <ConversationCard key={i}
                                      onClick={()=>{setIsSelect(true);setSenderId(recentMessages[i].senderId)}}
                                      userName={recentMessages[i].senderUsername}
                                      messageContent={recentMessages[i].content}
                                      datePosted={recentMessages[i].createdAt}
                                      isDeletedUser={isDeletedUser(recentMessages[i].senderId)}
                    />
            );
        }
    }

    return (
        <div>
            <div style={{width:"37%",display: "inline-block",verticalAlign:"top"}}>
                {(!cardData.length) ? <Confirmation displayButton={false} errorColor={true} message={MESSAGE.NO_RESULTS}/>
                : <Paginate data={cardData} resultsPerPage={NUM_RESULTS}/>}
            </div>
            <div style={{width:"60%",display: "inline-block",verticalAlign:"top"}}>
                {(!isSelect || senderId ==="") ? <EmptySelection/>:<FullConversation messageData={messageData} myUserId={myUserId} otherId={senderId} isDeletedUser={isDeletedUser(senderId)}/>}
            </div>
        </div>
    );
}

SelectConversation.propTypes = {
    myUserId: PropTypes.number.isRequired,
    messageData: PropTypes.array.isRequired,
};

export default SelectConversation;