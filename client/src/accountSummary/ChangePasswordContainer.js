/**
 * @Author:     Rachelle Gelden
 * @Created:    2021.01.04
 *
 * @Description: container for ChangePassword. Container is a "smart" component and handles all of the logic for change
 * password where ChangePassword is the presentational component
 *
 */

import React, {useState} from 'react';
import AccountService from '../services/AccountService';
import ChangePassword from "./ChangePassword";
import {getFirstErrorMessage} from "../registration/registrationUtils";

const ChangePasswordContainer = () => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmedPassword, setConfirmedPassword] = useState('');
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [showSuccess, setShowSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    const changePassword = ()  => {
        const passwordData = {
            oldPassword,
            newPassword,
            confirmedPassword
        }

        if (newPassword !== confirmedPassword) {
            setErrorMessage('New password and confirmed password do not match');
            setShowError(true);
        } else {
            AccountService.changePassword(passwordData)
                .then(res => res.json())
                .then(data => {
                    if (data && data.success) {
                        setShowError(false);
                        setShowSuccess(true);
                        setErrorMessage('');
                        setSuccessMessage('Password successfully changed!')
                        setOldPassword('');
                        setNewPassword('');
                        setConfirmedPassword('');
                    } else if (data && (!data.success || data.message)) {
                        setErrorMessage('Error: ' + getFirstErrorMessage(data.errors));
                        setShowError(true);
                    } else {
                        setErrorMessage('An error occurred');
                        setShowError(true);
                    }
                })
                .catch(error => {
                    setErrorMessage('Error: ' + error.message);
                    setShowError(true);
                });
        }
    }

    return (
        <ChangePassword
            onPasswordChangeSubmit={changePassword}
            onOldPasswordChange={setOldPassword}
            onNewPasswordChange={setNewPassword}
            onConfirmedPasswordChange={setConfirmedPassword}
            oldPassword={oldPassword}
            newPassword={newPassword}
            confirmedPassword={confirmedPassword}
            showError={showError}
            errorMessage={errorMessage}
            showSuccess={showSuccess}
            successMessage={successMessage}
        />
    );
}

export default ChangePasswordContainer;