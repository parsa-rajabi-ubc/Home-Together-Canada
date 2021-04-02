/**
 *
 * @Author:     Alex Qin
 * @Created:    2021.3.04
 *
 * @Description: Member Messaging MessageBox
 *
 */
import React,{useState} from 'react';
import PropTypes from "prop-types";
import Moment from 'react-moment';

function MessageBox(props) {
    const {userId, messageContent, datePosted,leftOrRight} = props;

    const [userName,setUserName] = useState("");

    return (
        <div>
            <p>{leftOrRight}</p>
            <p><Moment format="MMM D, YYYY">{datePosted}</Moment></p>
            <p>{userName}: {messageContent}</p>
            <hr/>
        </div>
    );
}

MessageBox.propTypes = {
    userId: PropTypes.number.isRequired,
    messageContent: PropTypes.string.isRequired,
    datePosted: PropTypes.string.isRequired,
    leftOrRight: PropTypes.string.isRequired,
}


export default MessageBox;