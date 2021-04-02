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

function SelectConversation(props) {
    const {messageData, myUserId} = props;

    // console.log(messageData);

    const recentMessages = mostRecentMessages(messageData);

    // console.log(recentMessages);



    sortMessageByTimeDecreasing(recentMessages);
    const cardData = [];
    const [isSelect,setIsSelect] = useState(false);
    const [senderId,setSenderId] = useState("");

    for (let i = 0; i < recentMessages.length; i++) {
        if (recentMessages[i].senderId===myUserId) {
            cardData.push(
                    <ConversationCard key={i}
                                      onClick={()=>{setIsSelect(true);setSenderId(recentMessages[i].receiverId)}}
                                      userId={recentMessages[i].receiverId}
                                      messageContent={recentMessages[i].messageContent}
                                      datePosted={recentMessages[i].dateSent}
                    />
            );
        }
        else if (recentMessages[i].receiverId===myUserId) {
            cardData.push(
                    <ConversationCard key={i}
                                      onClick={()=>{setIsSelect(true);setSenderId(recentMessages[i].senderId)}}
                                      userId={recentMessages[i].senderId}
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
            {(!isSelect || senderId ==="") ? <EmptySelection/>:<FullConversation messageData={messageData} myUserId={myUserId} senderId={senderId}/>}
        </div>
    );
}

SelectConversation.propTypes = {
    myUserId: PropTypes.number.isRequired,
    messageData: PropTypes.array.isRequired,
};

export default SelectConversation;