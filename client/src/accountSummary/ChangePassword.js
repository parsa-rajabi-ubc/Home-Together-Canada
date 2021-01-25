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
        errorMessage,
        showSuccess,
        successMessage
    } = props;

    return (
        <div>
            <h3 className={"account-summary-info-header"}> Change Password</h3>
            <p className="account-summary-info-text">
                Remember, your password must be at least 8 characters long and contain a mix of numeric digits, upper
                and lower case letters!
            </p>
            <div className="selected-component-grid-outer">
                <div className="selected-component-grid-inner">
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
                        onChange={(e) => {
                            onNewPasswordChange(e.target.value)
                        }}
                    />
                    <GenericInput
                        className={"input"}
                        classNameLabel={"label"}
                        label={"Confirm New Password "}
                        inputType={"password"}
                        value={confirmedPassword}
                        onChange={(e) => {
                            onConfirmedPasswordChange(e.target.value)
                        }}
                    />
                    {showError && <section className={"error-msg mb-4"}>{errorMessage}</section>}
                    {showSuccess && <section className={"success-msg mb-4"}>{successMessage}</section>}
                </div>
            </div>
            <button
                className="btn btn-green form-btn w-1/2"
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
    showSuccess: PropTypes.bool,
    successMessage: PropTypes.string,
    oldPassword: PropTypes.string,
    newPassword: PropTypes.string,
    confirmedPassword: PropTypes.string
};
export default ChangePassword;
