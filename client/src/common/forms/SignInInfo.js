import React from "react";
/**
 * @Author:     Jeff Hatton
 * @Created:    2020.11.05
 *
 * @Description: Sign in input Form Component
 *
 */
function SignInInfo(){
    return(
        <div>
            <label>
                Username:
                <input type="text" placeholder="" />
            </label>
            <label>
                Password:
                <input type="text" placeholder="" />
            </label>
            <label>
                Confirm Password:
                <input type="text" placeholder="" />
            </label>
        </div>
    );
}

export default SignInInfo;