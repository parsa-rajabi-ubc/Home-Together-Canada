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
    const {memberAccountInfo} = props;
    const [reasons, setReasons] = useState("");
    const [activate, setActivate] = useState(get(memberAccountInfo,'activate',false));
    const [isSelectReason, setisSelectReason] = useState(false);

    function handleReasonsChange(e) {
        setReasons(e.value);
        setisSelectReason(true);
    }

    function activateAccount(){
        setActivate(true);
        setisSelectReason(false);
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
            memberAccountInfo={memberAccountInfo}
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
    memberAccountInfo: PropTypes.object.isRequired
}

export default DeactivateAccountContainer