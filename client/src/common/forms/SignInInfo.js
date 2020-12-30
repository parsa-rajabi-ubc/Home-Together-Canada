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

function SignInInfo(props) {
    const {
        onChangeUsername,
        onChangePassword,
        onChangePasswordCheck,
        usernameClassName,
        passwordClassName,
        passwordConfirmClassName,
        usernameErrorMsg,
        passwordErrorMsg,
        passwordConfirmErrorMsg
    } = props;
    return (
        <div>
            <label>
                <LabelAsterisk label={"Username"}/>
                <Tooltip text={INFO_TEXT.USERNAME} toolTipID="username"/>
                <input className={usernameClassName} type="text" placeholder="" onChange={onChangeUsername}/>
                <label className={"error-msg"}>{usernameErrorMsg}</label>
            </label>
            <label>
                <LabelAsterisk label={"Password"}/>
                <Tooltip text={INFO_TEXT.PASSWORD} toolTipID="password"/>
                <input className={passwordClassName} type="password" placeholder="" onChange={onChangePassword}/>
                <label className={"error-msg"}>{passwordErrorMsg}</label>
            </label>
            <label>
                <LabelAsterisk label={"Confirm Password"}/>
                <input className={passwordConfirmClassName} type="password" placeholder=""
                       onChange={onChangePasswordCheck}/>
                <label className={"error-msg"}>{passwordConfirmErrorMsg}</label>
            </label>
        </div>
    );
}

SignInInfo.propTypes = {
    onChangeUsername: PropTypes.func.isRequired,
    onChangePassword: PropTypes.func.isRequired,
    onChangePasswordCheck: PropTypes.func.isRequired,
    usernameClassName: PropTypes.string,
    passwordClassName: PropTypes.string,
    passwordConfirmClassName: PropTypes.string,
    usernameErrorMsg: PropTypes.string,
    passwordErrorMsg: PropTypes.string,
    passwordConfirmErrorMsg: PropTypes.string,
};

export default SignInInfo;