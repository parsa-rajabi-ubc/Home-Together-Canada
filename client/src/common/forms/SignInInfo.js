/**
 * @Author:     Jeff Hatton
 * @Created:    2020.11.05
 *
 * @Description: Sign in input Form Component
 *
 */

import React from "react";
import PropTypes from "prop-types";

function SignInInfo(props){
    const { onChangeUsername, onChangePassword, onChangePasswordCheck } = props;
    return(
        <div>
            <label className={"label"}>
                Username:
                <input className={"input"} type="text" placeholder="" onChange= {onChangeUsername}/>
            </label>
            <label className={"label"}>
                Password:
                <input className={"input"} type="password" placeholder="" onChange= {onChangePassword}/>
            </label>
            <label className={"label"}>
                Confirm Password:
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