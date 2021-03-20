/**
 *
 * @Author:     Jeff Hatton
 * @Created:    2021.3.04
 *
 * @Description: Member Messaging Conversation Card List Container
 *
 */

import React from 'react';
import PropTypes from "prop-types";
import Confirmation from "../../../common/listings/Confirmation";
import SelectConversation from "./SelectConversation";

const MESSAGE = {
    NO_RESULTS: "No results found"
}

function MessagingContainer(props){
    const {messageData, messageUser} = props;
    return (
        <div className={"m-6"}>
            {(!messageData.length) ? <Confirmation displayButton={false} errorColor={true} message={MESSAGE.NO_RESULTS}/>
                : <SelectConversation messageUser={messageUser} messageData={messageData}/>}
        </div>
    );
}

MessagingContainer.propTypes = {
    messageUser: PropTypes.string.isRequired,
    messageData: PropTypes.array.isRequired,
};

export default MessagingContainer;