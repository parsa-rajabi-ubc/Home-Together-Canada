/**
 * @Author:     Alex Qin
 * @Created:    2020.11.15
 *
 * @Updated-by: Parsa Rajabi
 * @Updated: 2020.11.19
 *
 * @Description: User Login Form with Validation:
 *
 */
import React, {useState} from 'react'
import TextArea from '../common/forms/TextArea';
import SubmitButton from '../common/forms/SubmitButton';
import {isStringEmpty} from '../common/utils/stringUtils';
import TypingPicture from '../images/typing.jpg';
import GenericInput from '../common/forms/GenericInput';
import {Link} from 'react-router-dom';

function LoginForm() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div>
            <div className="flex items-center min-h-screen p-6 bg-off_white">
                <div
                    className="flex-1 h-full max-w-4xl mx-auto overflow-hidden rounded-lg shadow-2xl ">
                    <div className="flex flex-col overflow-y-auto md:flex-row">
                        <div className="h-32 md:h-auto md:w-1/2">
                            <img
                                className="object-cover w-full h-full"
                                src={TypingPicture}
                                alt="Typing behind a computer"
                            />
                        </div>
                        <div className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
                            <div className="w-full">
                                <h1 className="h1">
                                    Login
                                </h1>
                                <TextArea className="input"
                                          inputType="text" placeholder="Username" onChange={(input) => {
                                    setUsername(input.target.value)
                                }}/>

                                <GenericInput className="input"
                                              inputType="password" placeholder="Password" onChange={(input) => {
                                    setUsername(input.target.value)
                                }}/>

                                {/* TODO: replace alerts with css warning i.e make the input box red and add a text:
                                 "Please enter a password / Password is invalid*/}

                                {/*TODO: do not redirect user to home page if there is a warning*/}
                                <Link to={'/'}>
                                    <SubmitButton
                                        className="block px-4 py-2 mt-4 text-sm font-medium text-center btn btn-green"
                                        label={''} inputValue='Login' onClick={() => {
                                        if (isStringEmpty(username)) {
                                            alert("Username Required.");
                                        }
                                        if (isStringEmpty(password)) {
                                            alert("password Required.");
                                        }

                                    }}/>
                                </Link>


                                {/* TODO: remember me feature, using the checkbox function*/}
                                {/*<Checkbox label="Remember me "/>*/}

                                <hr className="my-8"/>

                                <Link to={'/forgot-password'} className="link"> Forgot your password?
                                </Link>
                                <Link to={'/registration'} className="link"> Create an account
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default LoginForm;
