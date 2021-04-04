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
    const [messageData,setMessageData] = useState([]);
    const [myUserId,setMyUserId] = useState(-1);
    const [loading, setLoading] = useState(true);
    const [newLoading, setNewLoading] = useState(true);

    useEffect(() => {
        MessageService.getCurrentRegisteredUId()
            .then(res => res.json())
            .then(data => {
                setMyUserId(data.uid);
                setNewLoading(false);
            })
            .catch(err => {
                alert('error getting message: ' + err.message);
                setNewLoading(false);
            });
    }, [])

    useEffect(() => {
        MessageService.getAllMessagesForOneUser()
            .then(res => res.json())
            .then(data => {
                setMessageData(data.message);
                setLoading(false);
            })
            .catch(err => {
                alert('error getting message: ' + err.message);
                setLoading(false);
            });
    }, [])

    return (
        <div>
            {(!loading && !newLoading ) &&
                <div className={"m-6"}>
                    {(!messageData.length) ?
                        <Confirmation displayButton={false} errorColor={true} message={MESSAGE.NO_RESULTS}/>
                        : <SelectConversation messageData={messageData} myUserId={myUserId}/>}
                </div>
            }
        </div>
    );
}

export default MessagingContainer;