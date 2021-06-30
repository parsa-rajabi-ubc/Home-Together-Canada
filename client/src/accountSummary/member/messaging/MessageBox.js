/**
 *
 * @Author:     Alex Qin
 * @Created:    2021.3.04
 *
 * @Description: Member Messaging MessageBox
 *
 */
import React from 'react';
import PropTypes from "prop-types";
import Moment from 'react-moment';

function MessageBox(props) {
    const {messageContent, datePosted, leftOrRight} = props;

    return (
        <div>
            {(leftOrRight==="right")?
                (<div style={{textAlign: 'right', alignSelf: 'stretch'}}>
                        <p><Moment format="MMM D, YYYY">{datePosted}</Moment></p>
                        <p>{messageContent}</p>
                        <hr/>
                </div>) :
                (<div>
                        <p><Moment format="MMM D, YYYY">{datePosted}</Moment></p>
                        <p>{messageContent}</p>
                        <hr/>
                </div>)
            }
        </div>
    );
}

MessageBox.propTypes = {
    messageContent: PropTypes.string.isRequired,
    datePosted: PropTypes.string.isRequired,
    leftOrRight: PropTypes.string.isRequired,
}

export default MessageBox;