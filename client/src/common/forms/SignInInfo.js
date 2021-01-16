/**
 * @Author:     Jeff Hatton
 * @Created:    2020.11.05
 *
 * @Description: Sign in input Form Component
 *
 */

import React from "react";
import PropTypes from "prop-types";
import Tooltip from "./Tooltip";
import LabelAsterisk from "./LabelAsterisk";

const INFO_TEXT = {
    USERNAME: "Your username should be unique and meaningful.",
    PASSWORD: "Your password must be at least 8 characters long and contain a mix of numeric digits, upper and lower case letters!",
};

const ERROR_TEXT = {
    PASSWORD: {
        CONFIRM_EMPTY: "Password confirmation can not be empty",
        MIS_MATCH: "Passwords do not match",
        INVALID: "Password must be at least 8 characters long and contain numbers, upper and lower case letters"
    }
}

function SignInInfo(props) {
    const {
        onChangeUsername,
        onChangePassword,
        onChangePasswordCheck,
        usernameError,
        passwordError,
        passwordConfirmError,
        passwordConfirmErrorMsg
    } = props;
    
    const passwordErrorText = (passwordConfirmErrorMsg === "empty") ? ERROR_TEXT.PASSWORD.CONFIRM_EMPTY :
        (passwordConfirmErrorMsg === "mismatch" ? ERROR_TEXT.PASSWORD.MIS_MATCH : "");

    return (
        <div>
            <label>
                <LabelAsterisk label={"Username"}/>
                <Tooltip
                    text={INFO_TEXT.USERNAME}
                    toolTipID="username"
                />
                <input
                    className={`${usernameError && "border-red-500"} input`}
                    type="text"
                    onChange={onChangeUsername}
                />
            </label>
            <label>
                <LabelAsterisk label={"Password"}/>
                <Tooltip
                    text={INFO_TEXT.PASSWORD}
                    toolTipID="password"
                />
                <input
                    className={`${(passwordError) && "border-red-500"} input`}
                    type={"password"}
                    onChange={onChangePassword}
                />
                {passwordError && <label className={'error-msg'}>{ERROR_TEXT.PASSWORD.INVALID}</label>}
            </label>
            <label>
                <LabelAsterisk label={"Confirm Password"}/>
                <input
                    className={`${passwordConfirmError && "border-red-500 mb-0"} input`}
                    type={"password"}
                    onChange={onChangePasswordCheck}
                />
                {passwordConfirmErrorMsg && <label className={"error-msg"}>{passwordErrorText}</label>}
            </label>
        </div>
    );
}

SignInInfo.propTypes = {
    onChangeUsername: PropTypes.func.isRequired,
    onChangePassword: PropTypes.func.isRequired,
    onChangePasswordCheck: PropTypes.func.isRequired,
    usernameError: PropTypes.bool,
    passwordError: PropTypes.bool,
    passwordConfirmError: PropTypes.string,
    passwordConfirmErrorMsg: PropTypes.string,
};

export default SignInInfo;