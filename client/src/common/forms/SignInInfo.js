/**
 * @Author:     Jeff Hatton
 * @Created:    2020.11.05
 *
 * @Description: Sign in input Form Component
 *
 */

import React from "react";
import PropTypes from "prop-types";
import Asterisk from "./Asterisk";
import Tooltip from "./Tooltip";
import LabelAsterisk from "./LabelAsterisk";

const INFO_TEXT = {
    USERNAME: "Your username should be unique and meaningful. Avoid using numbers in your username!",
    PASSWORD: "Your password must be at least 8 characters long and contain a mix of numeric digits, upper and lower case letters!",
    CONFIRM_PASSWORD: "This password must match the password you entered above!"
};

function SignInInfo(props){
    const { onChangeUsername, onChangePassword, onChangePasswordCheck } = props;
    return(
        <div>
            <label>
                <LabelAsterisk label={"Username"}/>
                <Tooltip text={INFO_TEXT["USERNAME"]} toolTipID="username"/>
                <input className={"input"} type="text" placeholder="" onChange= {onChangeUsername}/>
            </label>
            <label>
            <LabelAsterisk label={"Password"}/>
                <Tooltip text={INFO_TEXT["PASSWORD"]} toolTipID="password"/>
                <input className={"input"} type="password" placeholder="" onChange= {onChangePassword}/>
            </label>
            <label>
                <LabelAsterisk label={"Confirm Password"}/>
                <Tooltip text={INFO_TEXT["CONFIRM_PASSWORD"]} toolTipID="confirmPassword"/>
                <input className={"input"} type="password" placeholder="" onChange= {onChangePasswordCheck}/>
            </label>
        </div>
    );
}

SignInInfo.propTypes = {
    onChangeUsername: PropTypes.func.isRequired,
    onChangePassword: PropTypes.func.isRequired,
    onChangePasswordCheck: PropTypes.func.isRequired
};

export default SignInInfo;