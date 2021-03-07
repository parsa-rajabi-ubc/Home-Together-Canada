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
import ConversationList from "./ConversationList";

const MESSAGE = {
    NO_RESULTS: "No results found"
}

function ConversationListContainer(props){
    const {messageData, messageUser} = props;
    return (
        <div className={"m-6"}>
            {(!messageData.length) ? <Confirmation displayButton={false} errorColor={true} message={MESSAGE.NO_RESULTS}/>
                : <ConversationList messageUser={messageUser} messageData={messageData}/>}
        </div>
    );
}

ConversationListContainer.propTypes = {
    messageUser: PropTypes.string.isRequired,
    messageData: PropTypes.array.isRequired,
};

export default ConversationListContainer;