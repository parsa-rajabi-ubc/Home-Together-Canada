/**
 * @Author:     Jeff Hatton
 * @Created:    2020.11.19
 *
 * @Description: Change Password input component - returns 3 password text area inputs and a submit button.
 *
 */
import React from 'react';
import PropTypes from "prop-types";
import GenericInput from "./GenericInput";

function ChangePassword(props) {
    const {
        className,
        oldPassword,
        onOldPasswordChange,
        newPassword,
        onNewPasswordChange,
        confirmedPassword,
        onConfirmedPasswordChange,
        onPasswordChangeSubmit,
        showError,
        errorMessage
    } = props;

    return (
        <div>
            Change Password
            <GenericInput
                className={className}
                label={"Old Password: "}
                inputType={"text"}
                value={oldPassword}
                onChange={e => onOldPasswordChange(e.target.value)}
            />
            <GenericInput
                className={className}
                label={"New Password: "}
                inputType={"text"}
                value={newPassword}
                onChange={(e)=>{onNewPasswordChange(e.target.value)}}
            />
            <GenericInput
                className={className}
                label={"Confirm New Password: "}
                inputType={"text"}
                value={confirmedPassword}
                onChange={(e)=>{onConfirmedPasswordChange(e.target.value)}}
            />
            <GenericInput
                className={className}
                label={"Update"}
                inputType={"button"}
                onClick={onPasswordChangeSubmit}
            />
            {showError && <p>{errorMessage}</p>}
        </div>
    );
}
ChangePassword.propTypes = {
    onPasswordChangeSubmit: PropTypes.func.isRequired,
    onOldPasswordChange: PropTypes.func.isRequired,
    onNewPasswordChange: PropTypes.func.isRequired,
    onConfirmedPasswordChange: PropTypes.func.isRequired,
    showError: PropTypes.bool.isRequired,
    errorMessage: PropTypes.string,
    oldPassword: PropTypes.string,
    newPassword: PropTypes.string,
    confirmedPassword: PropTypes.string,
    className: PropTypes.string
};
export default ChangePassword;
