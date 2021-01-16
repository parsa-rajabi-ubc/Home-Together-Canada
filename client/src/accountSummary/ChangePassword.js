/**
 * @Author:     Jeff Hatton
 * @Created:    2020.11.19
 *
 * @Description: Change Password input component - returns 3 password text area inputs and a submit button.
 *
 */
import React from 'react';
import PropTypes from "prop-types";
import GenericInput from "../common/forms/GenericInput";

function ChangePassword(props) {
    const {
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
            <div className={"info-header mt-2 mb-6"}> Change Password </div>
            <GenericInput
                className={"input"}
                classNameLabel={"label"}
                label={"Old Password "}
                inputType={"password"}
                value={oldPassword}
                onChange={e => onOldPasswordChange(e.target.value)}
            />
            <GenericInput
                className={"input"}
                classNameLabel={"label"}
                label={"New Password "}
                inputType={"password"}
                value={newPassword}
                onChange={(e)=>{onNewPasswordChange(e.target.value)}}
            />
            <GenericInput
                className={"input"}
                classNameLabel={"label"}
                label={"Confirm New Password "}
                inputType={"password"}
                value={confirmedPassword}
                onChange={(e)=>{onConfirmedPasswordChange(e.target.value)}}
            />
            {showError && <section className={"error-msg mb-4"}>{errorMessage}</section>}

            <button
                className={"btn btn-green"}
                onClick={onPasswordChangeSubmit}>
                Update
            </button>
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
    confirmedPassword: PropTypes.string
};
export default ChangePassword;
