/**
 * @Author:     Jeff Hatton
 * @Created:    2021.03.10
 *
 * @Description: Member message sending component for profile page button
 *
 */

import React from 'react';
import PropTypes from "prop-types";
import LargeTextArea from "../../../common/forms/LargeTextArea";
import SubmitButton from "../../../common/forms/SubmitButton";

function SendMessage(props) {
    //username currently unused, but intended as component which will handle post request to add message to database
    const {username, otherUser} = props;
    function onSubmit(){
        return;
    }
    return(
        <div>
            <p>To {otherUser}: </p>
            <LargeTextArea label={"What would you like to contact this member about? "} />
            <SubmitButton className={"btn btn-green mb-6 w-1/2 text-base py-2"} onClick={onSubmit}/>
        </div>
    )
}

SendMessage.propTypes = {
    username: PropTypes.string.isRequired,
    otherUser: PropTypes.string.isRequired
};

export default SendMessage;