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
    const {userName, messageContent, datePosted,onClick,isDeletedUser} = props;

    return (
        <div>
        <section className={"card-container mt-0"} onClick={onClick}>
            <div className={"inline ml-6 align-middle "}>
                {(isDeletedUser) ?
                    (
                        <label className={"font-semibold justify-between"}> {userName + " (Deleted user)"}</label>
                    ) :
                    (
                        <label className={"font-semibold justify-between"}> {userName}</label>
                    )
                }

                <section className={"inline float-right pr-6 justify-end"}>
                    <Moment format="MMM D, YYYY">{datePosted}</Moment>
                </section>
            </div>
            <div className={"ml-6 mt-4 flex"}>
                <label className={"w-full font-light"}> {messageContent} </label>
            </div>
        </section>
        </div>
    );
}

ConversationCard.propTypes = {
    userName: PropTypes.string.isRequired,
    messageContent: PropTypes.string.isRequired,
    datePosted: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    isDeletedUser:PropTypes.bool.isRequired
}

export default ConversationCard;