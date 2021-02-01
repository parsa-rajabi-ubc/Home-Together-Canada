/**
 * @Author:     Alex Qin
 * @Created:    2021.01.26
 *
 * @Description: Deactivate Account Container
 *
 */
import React, {useState} from "react";
import DeactiveAccount from "./DeactiveAccount";
import PropTypes from "prop-types";
const DeactiveAccountContainer = (props)=>{
    const activeStatus = props;
    const [reasons, setReasons] = useState("");
    const [active, setActive] = useState(activeStatus);
    const [isSelectReason, setIsSelectReason] = useState(false);

    function handleReasonsChange(e) {
        setReasons(e.value);
        setIsSelectReason(true);
    }

    function activeAccount(){
        setActive(true);
        setIsSelectReason(false);
        alert("Your account is activated!");
    }

    function deactiveActivedAccount(){
        if(!isSelectReason){
            alert("Please select a reason!");
        }else{
            setActive(false);
            alert("Your account is de-activated!");
        }
    }

    return(
        <DeactiveAccount
            activeStatus={activeStatus}
            active={active}
            isSelectReason ={isSelectReason}
            reasons = {reasons}
            deactiveActivedAccount = {deactiveActivedAccount}
            activeAccount = {activeAccount}
            handleReasonsChange = {handleReasonsChange}
        />
    )


}
DeactiveAccountContainer.propTypes = {
    activeStatus: PropTypes.bool.isRequired
}

export default DeactiveAccountContainer