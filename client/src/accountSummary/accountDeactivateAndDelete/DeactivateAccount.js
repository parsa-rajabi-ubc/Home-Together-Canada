/**
 * @Author:     Alex Qin
 * @Created:    2021.01.21
 *
 * @Description: Deactivate Account
 *
 */

import React from "react";
import DeactivateAccountDropdown from "./DeactivateAccountDropdown";
import PropTypes from "prop-types";
import Button from "../../common/forms/Button";

function DeactivateAccount(props) {
    const {active, handleReasonsChange, activateAccount, deactivateAccount} = props;

    const TITLE = active ? "Deactivate Account" : "Re-Activate Account";
    const INFO_TEXT = active ? "deactivate your account. Make sure to select a reason using the dropdown" : "re-activate your account";

    return (
        <div>
            <h3 className="account-summary-info-header"> {TITLE} </h3>
            <p className="account-summary-info-text">
                Use the button below to {INFO_TEXT}.
            </p>
            {active ?
                // Deactivate Account
                <div>
                    <DeactivateAccountDropdown
                        onChange={handleReasonsChange}
                    />
                    <Button
                        className={"btn btn-red m-auto w-1/2"}
                        value={TITLE}
                        onClick={deactivateAccount}
                    />
                </div>

                // Activate Account
                : <div className={"my-20"}>
                    <Button
                        value={TITLE}
                        className={"btn btn-green m-auto w-1/2"}
                        onClick={activateAccount}
                    />
                </div>
            }
        </div>
    );
}

DeactivateAccount.propTypes = {
    active: PropTypes.bool.isRequired,
    handleReasonsChange: PropTypes.func.isRequired,
    activateAccount: PropTypes.func.isRequired,
    deactivateAccount: PropTypes.func.isRequired
}

export default DeactivateAccount
