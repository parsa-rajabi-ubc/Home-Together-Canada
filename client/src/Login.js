import React from 'react'

export function LogIn(){
    return (
        <div>
            Home-Together-Canada Login: <br/>
            Username:
            <input type="text" placeholder="alexqin" id="username"/> <br/>

            Password:
            <input type="password" placeholder="Password" id="password"/> <br/>

            <input type = "checkbox"/>
            Remember me. <br/>

            <button>Sign In</button> <br/>

            <a href="">Forgot your password?</a> <br/>
            <a href="">Do not have an account? Create one now.</a>
        </div>
    );
}