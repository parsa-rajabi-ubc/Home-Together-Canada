/**
 *
 * @Author:     Jeff Hatton
 * @Created:    2021.3.04
 *
 * @Description: Member Messaging Conversation Card
 *
 */
import React from 'react';
import PropTypes from "prop-types";
import Moment from 'react-moment';

function ConversationCard(props) {
    const {userName, messageContent, datePosted} = props;

    return (
        <section className={"card-container mt-0"}>
            <div className={"inline ml-6 align-middle "}>
                <label className={"font-semibold justify-between"}> {userName}</label>

                <section className={"inline float-right pr-6 justify-end"}>
                    <Moment format="MMM D, YYYY">{datePosted}</Moment>
                </section>
            </div>
            <div className={"ml-6 mt-4 flex"}>
                <label className={"w-full font-light"}> {messageContent} </label>
            </div>
        </section>
    );
}

ConversationCard.propTypes = {
    userName: PropTypes.string.isRequired,
    messageContent: PropTypes.string.isRequired,
    datePosted: PropTypes.string.isRequired,
}


export default ConversationCard;