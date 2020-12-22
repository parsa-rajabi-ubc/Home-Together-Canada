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
    const {className, onChange, oldPassword} = props;
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    return (
        <label>
            Change Password
            <GenericInput className={className} label="Old Password: " inputType="password" placeholder={oldPassword}/>
            <GenericInput className={className} label="New Password: " inputType="password" onChange={(e)=>{setNewPassword(e.target.value)}}/>
            <GenericInput className={className} label="Confirm New Password: " inputType="password" onChange={(e)=>{setConfirmNewPassword(e.target.value)}}/>
            <GenericInput className={className} label="Submit: " inputType="submit" onClick={onChange}/>
        </label>
    );
}
ChangePassword.propTypes = {
    onChange: PropTypes.func.isRequired,
    oldPassword: PropTypes.string,
    className: PropTypes.string
};
export default ChangePassword;
