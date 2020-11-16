/**
 * @Author:     Alex Qin
 * @Created:    2020.11.15
 *
 * @Description: User Login Form with Validation:
 *
 */
import React, {useState} from 'react'
import Checkbox from './common/forms/Checkbox';
import TextArea from './common/forms/TextArea';
import SubmitButton from './common/forms/SubmitButton';
import isStringEmpty from './common/utils/isStringEmpty';

export function LoginForm(){

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    return (

        <div>
            {/*title of the business*/}
            Home-Together-Canada Login: <br/>

            {/*input user name*/}
            <TextArea label="Username: " onChange= {(e) => {setUsername(e.target.value)}}/> <br/>

            {/*input user password*/}
            Password:
            <TextArea label="Password: " onChange = {(e) =>setPassword(e.target.value)} /> <br/>

            {/*remember me feature, using the checkbox function*/}
            <Checkbox label="Remember me."/> <br/>

            {/*login button*/}
            <SubmitButton label={''} value='Login' onClick={() => {
                if(isStringEmpty(username) === true) alert("Username Required.");
                if(isStringEmpty(password) === true) alert("password Required.");
            }}/> <br/>

            {/*link to PasswordRecovery page*/}
            <a href="">Forgot your password?</a> <br/>

            {/*link to SignIn page*/}
            <a href="">Do not have an account? Create one now.</a>
        </div>

    );
}
