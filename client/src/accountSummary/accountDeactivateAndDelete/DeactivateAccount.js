/**
 * @Author:     Alex Qin
 * @Created:    2021.01.21
 *
 * @Description: Deactivate Account
 *
 */

import React from "react";
import DeactivateReasons from "./DeactivateReasons";
import PropTypes from "prop-types";
import Button from "../../common/forms/Button";

function DeactivateAccount(props) {

    const{activateStatus, reasons, activate, isSelectReason,handleReasonsChange,activateAccount,deactivateActivatedAccount} = props;

    return(
        <div>
            {activate?
                <div>
                    <DeactivateReasons label={"De-activate Account: "} onChange={handleReasonsChange}/>
                    <Button label={"De-activate Account: "} value={"Deactivate"} onClick={deactivateActivatedAccount} />
                </div>:
                    <Button label={"Activate Account: "} value={"Activate"} onClick={activateAccount}/>
            }
        </div>
    );
}
DeactivateAccount.propTypes = {
    activateStatus: PropTypes.bool.isRequired,
    reasons: PropTypes.string,
    activate: PropTypes.bool,
    isSelectReason: PropTypes.bool,
    handleReasonsChange: PropTypes.func,
    activateAccount: PropTypes.func,
    deactivateActivatedAccount: PropTypes.func
}

export default DeactivateAccount