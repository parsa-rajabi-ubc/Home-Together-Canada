/**
 *
 * @Author:     Alex Qin
 * @Created:    2021.3.04
 *
 * @Description: Member Messaging Full Conversation
 *
 */

import React from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import FullConversation from "./FullConversation";

const LeftRightContainer = props => {
    const{senderId,myUserName,messageData} = props.location.state;

    return (
        <div>
            <FullConversation myUserName={myUserName} senderId={senderId} messageData={messageData}/>
        </div>
    );
}

LeftRightContainer.propTypes = {
    location: PropTypes.shape({
        pathname: PropTypes.string,
        state: PropTypes.object
    })
}

export default connect(null) (LeftRightContainer)