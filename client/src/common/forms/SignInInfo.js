import React from "react";
import PropTypes from "prop-types";
/**
 * @Author:     Jeff Hatton
 * @Created:    2020.11.05
 *
 * @Description: Sign in input Form Component
 *
 */
function SignInInfo(props){
    const { onChangeUsername, onChangePassword, onChangePasswordCheck } = props;
    return(
        <div>
            <label>
                Username:
                <input type="text" placeholder="" onChange= {onChangeUsername}/>
            </label>
            <label>
                Password:
                <input type="password" placeholder="" onChange= {onChangePassword}/>
            </label>
            <label>
                Confirm Password:
                <input type="password" placeholder="" onChange= {onChangePasswordCheck}/>
            </label>
        </div>
    );
}

SignInInfo.propTypes = {
    onChangeUsername: PropTypes.func.isRequired,
    onChangePassword: PropTypes.func.isRequired,
    onChangePasswordCheck: PropTypes.func.isRequired
}

export default SignInInfo;