/**
 * @Author:     Jeff Hatton
 * @Created:    2020.11.19
 *
 * @Description: Change Password input component - returns 3 password text area inputs and a submit button.
 *
 */
import React, {useState} from 'react';
import PropTypes from "prop-types";
import GenericInput from "./GenericInput";

function ChangePassword(props) {
    const {className, onChange, oldPassword, label} = props;
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    return (
        <label>
            {label}
            <GenericInput className={className} label="Old Password: " type="password" placeholder={oldPassword}/>
            <GenericInput className={className} label="New Password: " inputType="password" onChange={(e)=>{setNewPassword(e.target.value)}}/>
            <GenericInput className={className} label="Confirm New Password: " inputType="password" onChange={(e)=>{setConfirmNewPassword(e.target.value)}}/>
            <GenericInput className={className} label="Submit: " inputType="submit" onClick={onChange}/>
        </label>
    );
}
ChangePassword.propTypes = {
    label: PropTypes.string.isRequired,
    oldPassword: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    className: PropTypes.string
};
export default ChangePassword;