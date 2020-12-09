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

const infoText = {
    username: "Your username should be unique and meaningful. Avoid using numbers in your username!",
    password: "Your password must be at least 8 characters long and contain a mix of numeric digits, upper and lower case letters!",
    confirmPassword: "This password must match the password you entered above!"
};


function SignInInfo(props){
    const { onChangeUsername, onChangePassword, onChangePasswordCheck } = props;
    return(
        <div>
            <label>
                <span className={"label"}>Username</span>
                <Tooltip text={infoText["username"]} toolTipID="username"/>
                <input className={"input"} type="text" placeholder="" onChange= {onChangeUsername}/>
            </label>
            <label>
                <span className={"label"}>Password</span>
                <Tooltip text={infoText["password"]} toolTipID="password"/>
                <input className={"input"} type="password" placeholder="" onChange= {onChangePassword}/>
            </label>
            <label>
                <span className={"label"}>Confirm Password</span>
                <Tooltip text={infoText["confirmPassword"]} toolTipID="confirmPassword"/>
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