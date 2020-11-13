import React, {useState} from 'react'
import Checkbox from './common/forms/Checkbox';
import TextArea from './common/forms/TextArea';
import LoginButton from './common/forms/LoginButton';

export function LoginForm(){

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    return (

        <div>
            {/*title of the business*/}
            Home-Together-Canada Login: <br/>

            {/*input user name*/}
            <TextArea label="Username: "
                      placeholder=""
                      onChange= {(e) => {setUsername(e.target.value)}}
            /> <br/>

            {/*input user password*/}
            Password:
            <input type="password" onChange = {(e) =>setPassword(e.target.value)} /> <br/>

            {/*remember me feature, using the checkbox function*/}
            <Checkbox label="Remember me."/> <br/>

            {/*login button*/}
            <LoginButton onClick={() => {
                if(username.toString().trim() === "") alert ('Username required.');
                if(password.toString().trim() === "") alert ('Password required.');
            }}/> <br/>

            {/*link to PasswordRecovery page*/}
            <a href="">Forgot your password?</a> <br/>

            {/*link to SignIn page*/}
            <a href="">Do not have an account? Create one now.</a>
        </div>

    );
}
