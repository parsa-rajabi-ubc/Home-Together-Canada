/**
 * @Author:     Alex Qin
 * @Created:    2021.01.21
 *
 * @Description: Deactivate Account
 *
 */

import React, {useState} from "react";
import DeactivateReasons from "./DeactivateReasons";
import get from 'lodash/get';
import PropTypes from "prop-types";
import Button from "../../common/forms/Button";

function DeactivateAccount(props) {

    const {memberAccountInfo} = props;

    const [reasons, setReasons] = useState("")
    const [activate, setActivate] = useState(get(memberAccountInfo,'activate',false))
    const [isSelectReason, setisSelectReason] = useState(false)

    function handleReasonsChange(e) {
        setReasons(e.value);
        setisSelectReason(e.value = true)
    }

    function activateAccount(e){
        setActivate(e.value = true);
        setisSelectReason(e.value = false)
        alert("Your account is activated!");
    }

    function deactivateAccount(e){
        if(isSelectReason === false){
            alert("Please select a reason!");
        }else{
            setActivate(e.value = false);
            alert("Your account is de-activated!");
        }
    }

    function checkStatus() {
        if (activate === true){
            return(
                <div>
                <DeactivateReasons label={"De-activate Account: "} onChange={handleReasonsChange}/>
                <Button label={"De-activate Account: "} value={"Deactivate"} onClick={deactivateAccount} />
                </div>
            )
        } else {
            return <Button label={"Activate Account: "} value={"Activate"} onClick={activateAccount}/>
        }
    }

    return(
        <div>
            {checkStatus()}
        </div>
    );
}
DeactivateAccount.propTypes = {
    memberAccountInfo: PropTypes.object.isRequired
}

export default DeactivateAccount