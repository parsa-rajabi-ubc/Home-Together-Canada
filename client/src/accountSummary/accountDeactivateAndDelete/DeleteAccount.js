/**
 * @Author:     Alex Qin
 * @Created:    2021.01.21
 *
 * @Description: Delete Account
 *
 */
import React from "react";
import Checkbox from "../../common/forms/Checkbox";
import PropTypes from "prop-types";
import Button from "../../common/forms/Button";

function DeleteAccount(props) {

    const {confirm, setConfirm, handleDeleteAccount} = props

    return (
        <div>
            <h3 className="account-summary-info-header">Delete Account</h3>
            <p className="account-summary-info-text">
                To delete your account, please confirm using the checkbox below and then select Delete Account.
            </p>

            <div className={"m-auto w-1/2"}>
                <Checkbox
                    label={"Are you sure you'd like to delete your account?"}
                    checked={confirm}
                    fontNormal={true}
                    className={"mr-2 my-16"}
                    onChange={() => setConfirm(!confirm)}
                />
            </div>

            {confirm &&
            <div className={"my-6"}>
                <Button className={"btn btn-red m-auto w-1/2"} value={"Delete Account"} onClick={handleDeleteAccount}/>
            </div>}

        </div>
    );
}

DeleteAccount.propTypes = {
    confirm: PropTypes.bool.isRequired,
    setConfirm: PropTypes.func.isRequired,
    handleDeleteAccount: PropTypes.func.isRequired
}

export default DeleteAccount