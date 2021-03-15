/**
 *
 * @Author:     Jeff Hatton
 * @Created:    2021.3.04
 *
 * @Description: Member Messaging Conversation Card List
 *
 */
import React from 'react';
import PropTypes from "prop-types";
import Paginate from "../../../common/forms/Paginate";
import ConversationCard from "./ConversationCard";
import {Link} from "react-router-dom";
import {mostRecentMessages} from "./messageUtils";
import Confirmation from "../../../common/listings/Confirmation";

const NUM_RESULTS = 7;
const MESSAGE = {
    NO_RESULTS: "No results found"
}


function ConversationList(props) {
    const {messageData, messageUser} = props;
    const recentMessages = mostRecentMessages(messageData);
    const cardData = [];

    for (let i = 0; i < recentMessages.length; i++) {
        if (recentMessages[i].senderId===messageUser) {
            cardData.push(
                <Link
                    to={{
                        pathname: `/message`,
                        state: {
                            senderId: recentMessages[i].receiverId,
                            myUserName: messageUser,
                            messageData: messageData
                        }
                    }}
                    key={i}
                >
                    <ConversationCard key={i}
                                      userName={recentMessages[i].receiverId}
                                      messageContent={recentMessages[i].messageContent}
                                      datePosted={recentMessages[i].dateSent}
                    />
                </Link>
            );
        }
        else if (recentMessages[i].receiverId===messageUser) {
            cardData.push(
                <Link
                    to={{
                        pathname: `/message`,
                        state: {
                            senderId: recentMessages[i].senderId,
                            myUserName: messageUser,
                            messageData: messageData
                        }
                    }}
                    key={i}
                >
                    <ConversationCard key={i}
                                      userName={recentMessages[i].senderId}
                                      messageContent={recentMessages[i].messageContent}
                                      datePosted={recentMessages[i].dateSent}
                    />
                </Link>
            );
        }
    }

    return (
        <div>
            {(!cardData.length) ? <Confirmation displayButton={false} errorColor={true} message={MESSAGE.NO_RESULTS}/>
                : <Paginate data={cardData} resultsPerPage={NUM_RESULTS}/>}
        </div>
    );
}

ConversationList.propTypes = {
    messageUser: PropTypes.string.isRequired,
    messageData: PropTypes.array.isRequired,
};

export default ConversationList;