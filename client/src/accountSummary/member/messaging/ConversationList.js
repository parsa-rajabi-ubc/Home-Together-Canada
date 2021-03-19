/**
 *
 * @Author:     Jeff Hatton
 * @Created:    2021.3.04
 *
 * @Description: Member Messaging Conversation Card List
 *
 */
import React, {useState}from 'react';
import PropTypes from "prop-types";
import Paginate from "../../../common/forms/Paginate";
import ConversationCard from "./ConversationCard";
import {mostRecentMessages,sortMessageByTimeDecreasing} from "./messageUtils";
import Confirmation from "../../../common/listings/Confirmation";
import EmptySelection from "./EmptySelection";
import FullConversation from "./FullConversation";

const NUM_RESULTS = 7;
const MESSAGE = {
    NO_RESULTS: "No results found"
}

function ConversationList(props) {
    const {messageData, messageUser} = props;
    const recentMessages = mostRecentMessages(messageData);
    sortMessageByTimeDecreasing(recentMessages);
    const cardData = [];
    const [isSelect,setIsSelect] = useState(false);
    const [senderId,setSenderId] = useState("");

    for (let i = 0; i < recentMessages.length; i++) {
        if (recentMessages[i].senderId===messageUser) {
            cardData.push(
                    <ConversationCard key={i}
                                      onClick={()=>{setIsSelect(true);setSenderId(recentMessages[i].receiverId)}}
                                      userName={recentMessages[i].receiverId}
                                      messageContent={recentMessages[i].messageContent}
                                      datePosted={recentMessages[i].dateSent}
                    />
            );
        }
        else if (recentMessages[i].receiverId===messageUser) {
            cardData.push(
                    <ConversationCard key={i}
                                      onClick={()=>{setIsSelect(true);setSenderId(recentMessages[i].senderId)}}
                                      userName={recentMessages[i].senderId}
                                      messageContent={recentMessages[i].messageContent}
                                      datePosted={recentMessages[i].dateSent}
                    />
            );
        }
    }

    return (
        <div>
            {(!cardData.length) ? <Confirmation displayButton={false} errorColor={true} message={MESSAGE.NO_RESULTS}/>
                : <Paginate data={cardData} resultsPerPage={NUM_RESULTS}/>}
            {(!isSelect || senderId ==="") ? <EmptySelection/>:<FullConversation messageData={messageData} myUserName={messageUser} senderId={senderId}/>}
        </div>
    );
}

ConversationList.propTypes = {
    messageUser: PropTypes.string.isRequired,
    messageData: PropTypes.array.isRequired,
};

export default ConversationList;