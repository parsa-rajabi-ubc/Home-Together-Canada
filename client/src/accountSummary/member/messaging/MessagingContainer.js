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
    const [loadingMessageData, setLoadingMessageData] = useState(true);
    const [loadingUid, seUidLoading] = useState(true);

    // TODO: Save the user's uid in the redux store.

    useEffect(() => {
        MessageService.getCurrentRegisteredUId()
            .then(res => res.json())
            .then(data => {
                setMyUserId(data.uid);
                seUidLoading(false);
            })
            .catch(err => {
                alert('error getting message: ' + err.message);
                seUidLoading(false);
            });
    }, [])

    useEffect(() => {
        MessageService.getAllMessagesForOneUser()
            .then(res => res.json())
            .then(data => {
                setMessageData(data.message);
                setLoadingMessageData(false);
            })
            .catch(err => {
                alert('error getting message: ' + err.message);
                setLoadingMessageData(false);
            });
    }, [])

    // TODO: refactor to use this function in the useEffect above
    const getAllMessagesForUser = () => {
            MessageService.getAllMessagesForOneUser()
                .then(res => res.json())
                .then(data => {
                    setMessageData(data.message);
                })
                .catch(err => {
                    alert('error getting message: ' + err.message);
                });
        };

    return (
        <div>
            {(!loadingMessageData && !loadingUid ) &&
                <div className={"m-6"}>
                    {(!messageData.length)
                        ? <Confirmation displayButton={false} errorColor={true} message={MESSAGE.NO_RESULTS}/>
                        : <SelectConversation
                            messageData={messageData}
                            myUserId={myUserId}
                            newMessageAddedCallback={getAllMessagesForUser}
                        />
                    }
                </div>
            }
        </div>
    );
}

export default MessagingContainer;