/**
 *
 * @Author:     Jeff Hatton
 * @Created:    2021.3.04
 *
 * @Description: Member Messaging Conversation Card List Container
 *
 */

import React, {useEffect, useState} from 'react';
import Confirmation from "../../../common/listings/Confirmation";
import SelectConversation from "./SelectConversation";
import MessageService from "../../../services/MessageService";

const MESSAGE = {
    NO_RESULTS: "No results found"
}

function MessagingContainer(){
    const messageData = [];
    const [myUserId,setMyUserId] = useState(-1);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        MessageService.getAllMessagesForAllUser()
            .then(res => res.json())
            .then(data => {
                for(let i = 0; i < data.message.length; i++){
                    messageData.push( data.message[i] );
                }
                setLoading(false);
            })
            .catch(err => {
                alert('error getting message: ' + err.message);
                setLoading(false);
            });
    }, [])

    useEffect(() => {
        setLoading(true);
        MessageService.getCurrentRegisteredUId()
            .then(res => res.json())
            .then(data => {
                setMyUserId(data.uid);
                setLoading(false);
            })
            .catch(err => {
                alert('error getting message: ' + err.message);
                setLoading(false);
            });
    }, [])

    return (

        <div>
            {!loading &&
                <div className={"m-6"}>
                    {(!messageData.length) ?
                        <Confirmation displayButton={false} errorColor={true} message={MESSAGE.NO_RESULTS}/>
                        : <SelectConversation messageData={messageData} myUserId={myUserId}/>}
                </div>
            }
        </div>
    );
}

// MessagingContainer.propTypes = {
//     messageUser: PropTypes.string.isRequired,
//     messageData: PropTypes.array.isRequired,
// };

export default MessagingContainer;