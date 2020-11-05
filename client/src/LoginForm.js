import React from 'react'
import PropTypes from "prop-types";

export function LoginForm(){
    return (
        <div>
            {/*title of the business*/}
            Home-Together-Canada Login: <br/>

            {/*input user name*/}
            Username:
            <input type="text"/> <br/>

            {/*input user password*/}
            Password:
            <input type="password"/> <br/>

            {/*remember me feature, using the checkbox function*/}
            <Checkbox label="Remember me."/> <br/>

            {/*login button*/}
            <button>Login</button> <br/>

            {/*link to PasswordRecovery page*/}
            <a href="">Forgot your password?</a> <br/>

            {/*link to SignIn page*/}
            <a href="">Do not have an account? Create one now.</a>
        </div>
    );
}

function Checkbox(props){
    return(
        <label>
            {props.label}
            <input type="checkbox" value="1" />
        </label>
    );
}
Checkbox.propTypes = {
    label: PropTypes.string.isRequired
}
