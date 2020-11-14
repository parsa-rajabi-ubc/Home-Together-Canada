import React from "react";

//returns generic Sign in form fields
export function SignInInfo(){
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