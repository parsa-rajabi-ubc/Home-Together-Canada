/**
 *
 * @Author:     Jeff Hatton
 * @Created:    2021.3.04
 *
 * @Description: Member Messaging Conversation Card
 *
 */
import React,{useState} from 'react';
import PropTypes from "prop-types";
import Moment from 'react-moment';

function ConversationCard(props) {
    const {userId, messageContent, datePosted,onClick} = props;

    const [userName,setUserName] = useState("");



    return (
        <section className={"card-container mt-0"} onClick={onClick}>
            <div className={"inline ml-6 align-middle "}>
                {/*need to be fix*/}
                <label className={"font-semibold justify-between"}> {userId}</label>

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
    userId: PropTypes.number.isRequired,
    messageContent: PropTypes.string.isRequired,
    datePosted: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
}


export default ConversationCard;