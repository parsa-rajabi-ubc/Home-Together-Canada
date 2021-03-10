/**
 *
 * @Author:     Alex Qin
 * @Created:    2021.3.04
 *
 * @Description: Member Messaging ChatBoxContainer
 *
 */
import React from 'react';
import PropTypes from "prop-types";
import Moment from 'react-moment';

function ChatBoxContainer(props) {
    const {userName, messageContent, datePosted,leftOrRight} = props;

    return (
        <div>
            <p>{leftOrRight}</p>
            <p><Moment format="MMM D, YYYY">{datePosted}</Moment></p>
            <p>{userName}: {messageContent}</p>
            <hr/>
        </div>
    );
}

ChatBoxContainer.propTypes = {
    userName: PropTypes.string.isRequired,
    messageContent: PropTypes.string.isRequired,
    datePosted: PropTypes.string.isRequired,
    leftOrRight: PropTypes.string.isRequired,
}


export default ChatBoxContainer;