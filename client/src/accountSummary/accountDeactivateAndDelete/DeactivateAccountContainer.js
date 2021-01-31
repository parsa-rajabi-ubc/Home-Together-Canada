/**
 * @Author:     Alex Qin
 * @Created:    2021.01.26
 *
 * @Description: Deactivate Account Container
 *
 */
import React, {useState} from "react";
import get from 'lodash/get';
import DeactivateAccount from "./DeactivateAccount";
import PropTypes from "prop-types";
const DeactivateAccountContainer = (props)=>{
    const activateStatus = props;
    const [reasons, setReasons] = useState("");
    const [activate, setActivate] = useState(activateStatus);
    const [isSelectReason, setIsSelectReason] = useState(false);

    function handleReasonsChange(e) {
        setReasons(e.value);
        setIsSelectReason(true);
    }

    function activateAccount(){
        setActivate(true);
        setIsSelectReason(false);
        alert("Your account is activated!");
    }

    function deactivateActivatedAccount(){
        if(!isSelectReason){
            alert("Please select a reason!");
        }else{
            setActivate(false);
            alert("Your account is de-activated!");
        }
    }

    // this will be used to hook on DB in the future
    const deactivateAccount = ()  => {
        const deactivateData = {
            activate,
            reasons
        }
    }

    return(
        <DeactivateAccount
            activateStatus={activateStatus}
            activate={activate}
            isSelectReason ={isSelectReason}
            reasons = {reasons}
            deactivateActivatedAccount = {deactivateActivatedAccount}
            activateAccount = {activateAccount}
            handleReasonsChange = {handleReasonsChange}
        />
    )


}
DeactivateAccountContainer.propTypes = {
    activateStatus: PropTypes.bool.isRequired
}

export default DeactivateAccountContainer