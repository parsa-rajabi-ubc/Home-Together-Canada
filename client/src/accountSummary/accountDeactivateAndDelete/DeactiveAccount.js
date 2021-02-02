/**
 * @Author:     Alex Qin
 * @Created:    2021.01.21
 *
 * @Description: Deactivate Account
 *
 */

import React from "react";
import DeactiveAccountDropdown from "./DeactiveAccountDropdown";
import PropTypes from "prop-types";
import Button from "../../common/forms/Button";

function DeactiveAccount(props) {

    const{active,handleReasonsChange,activeAccount,deactiveActivedAccount} = props;

    return(
        <div>
            {active?
                <div>
                    <DeactiveAccountDropdown label={"De-activate Account: "} onChange={handleReasonsChange} />
                    <Button label={"De-activate Account: "} value={"Deactivate"} onClick={deactiveActivedAccount} />
                </div>:
                    <Button label={"Activate Account: "} value={"Activate"} onClick={activeAccount}/>
            }
        </div>
    );
}
DeactiveAccount.propTypes = {
    active: PropTypes.bool,
    handleReasonsChange: PropTypes.func,
    activeAccount: PropTypes.func,
    deactiveActivedAccount: PropTypes.func
}

export default DeactiveAccount