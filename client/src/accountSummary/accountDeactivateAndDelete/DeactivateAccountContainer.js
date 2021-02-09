/**
 * @Author:     Alex Qin
 * @Created:    2021.01.26
 *
 * @Description: Deactivate Account Container
 *
 */
import React, {useState} from "react";
import DeactivateAccount from "./DeactivateAccount";
import PropTypes from "prop-types";

const DeactivateAccountContainer = (props) => {
    const {activeStatus} = props;
    const [reasons, setReasons] = useState("");
    const [active, setActive] = useState(activeStatus);
    const [isSelectReason, setIsSelectReason] = useState(false);

    const handleReasonsChange = (e) => {
        setReasons(e.value);
        setIsSelectReason(true);
    }

    function activeAccount() {
        setActive(true);
        setIsSelectReason(false);
        alert("Your account is activated!");
    }

    function deactivateActiveAccount() {
        if (!isSelectReason) {
            alert("Please select a reason using the dropdown.");
        } else {
            setActive(false);
            alert("Your account is de-activated!");
        }
    }

    return (
        <DeactivateAccount
            active={active}
            deactivateActiveAccount={deactivateActiveAccount}
            activeAccount={activeAccount}
            handleReasonsChange={handleReasonsChange}
        />
    )

}
DeactivateAccountContainer.propTypes = {
    activeStatus: PropTypes.bool.isRequired
}

export default DeactivateAccountContainer