/**
 * @Author:     Jeff Hatton
 * @Created:    2021.03.10
 *
 * @Description: Member message sending component for profile page button
 *
 */

import React, {useState} from 'react';
import PropTypes from "prop-types";
import MessageService from "../../../services/MessageService"
import LargeTextArea from "../../../common/forms/LargeTextArea";
import SubmitButton from "../../../common/forms/SubmitButton";
import {useEffect} from "react";
import {checkIfErrorsExistInMapping, validateInput} from "../../../registration/registrationUtils";
import {MESSAGE_FIELD_LENGTHS} from "../../../common/constants/fieldLengths";

function SendMessage(props) {
    //username currently unused, but intended as component which will handle post request to add message to database
    const {receiverUsername, receiverId, newMessageAddedCallback} = props;
    const [content, setContent] = useState(undefined);
    const [contentError, setContentError] = useState(undefined);

    useEffect(() => {
        content !== undefined && validateInput(content, setContentError);
    }, [content]);

    const isFormValid = () => {
        const errors = {
            content: false,
        }
        errors.fullDes = validateInput(content, setContentError);
        return !(checkIfErrorsExistInMapping(errors));
    }

    //function for input checks on submit
    function onSubmitMessage(e) {
        e.preventDefault();
        if (isFormValid()) {
            const message = {
                receiverUsername: receiverUsername,
                receiverId: receiverId,
                content: content
            }
            MessageService.sendMessage(message)
                .then(res => res.json())
                .then(data => {
                    if (data.sent) {
                        alert("Message sent successfully");
                        setContent(undefined);
                        newMessageAddedCallback();
                    } else {
                        alert("Sorry, the person you are trying to reach has deleted their account.")
                    }
                })
                .catch(err => {
                    alert('error sending message: ' + err.message);
                });
        }
    }

    return(
        <div>
            <br/><p>To {receiverUsername}: </p>
            <LargeTextArea
                className={`${contentError && "border-red-500"} input`}
                label={"What would you like to contact this member about? "}
                onChange={(e) => setContent(e.target.value)}
                value={content || ''}
                charLimit={MESSAGE_FIELD_LENGTHS.CONTENT}
            />
            <SubmitButton
                className={"btn btn-green mb-6 w-1/2 text-base py-2"}
                onClick={onSubmitMessage}
                onSubmit={onSubmitMessage}
            />
        </div>
    )
}

SendMessage.propTypes = {
    receiverUsername: PropTypes.string.isRequired,
    receiverId: PropTypes.number.isRequired,
    newMessageAddedCallback: PropTypes.func
};

export default SendMessage;