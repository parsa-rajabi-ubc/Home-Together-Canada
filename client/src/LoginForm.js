import React from "react";
import Checkbox from './common/forms/Checkbox';
import TextArea from './common/forms/TextArea';

export function LoginForm(){

    return (
        <div>
            {/*title of the business*/}
            Home-Together-Canada Login: <br/>

            {/*input user name*/}
            <TextArea label="Username: " placeholder=""/> <br/>

            {/*input user password*/}
            <TextArea label="Password: " placeholder=""/> <br/>

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
