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
import React, {useEffect, useState} from 'react'
import TextArea from '../common/forms/TextArea';
import SubmitButton from '../common/forms/SubmitButton';
import TypingPicture from '../images/typing.jpg';
import GenericInput from '../common/forms/GenericInput';
import {Link, useNavigate} from 'react-router-dom';
import LoginService from '../services/LoginService';
import {
    checkIfErrorsExistInMapping,
    getConcatenatedErrorMessage,
    validateInput
} from "../registration/registrationUtils";
import PropTypes from "prop-types";
import {connect} from 'react-redux';
import {setIsAdmin, setAccountType, setAuthenticated} from "../redux/slices/userPrivileges";
import {setActive, setMemberSearchFilters} from "../redux/slices/memberPrivileges";
import {USER_TYPES} from "../common/constants/users";
import {resolveBooleanToYesNo} from "../common/utils/generalUtils";
import {toast} from "react-toastify";
import {HOME_TOGETHER_EMAIL} from "../common/constants/homeTogetherContstants";

const mapDispatch = {setIsAdmin, setAccountType, setAuthenticated, setActive, setMemberSearchFilters};

function LoginForm(props) {
    const {history, setIsAdmin, setAccountType, setAuthenticated, setActive, setMemberSearchFilters} = props;

    const [username, setUsername] = useState(undefined);
    const [password, setPassword] = useState(undefined);

    const [usernameError, setUsernameError] = useState(undefined);
    const [passwordError, setPasswordError] = useState(undefined);

    let navigate = useNavigate()

    // Account Details
    useEffect(() => {
        username !== undefined && validateInput(username, setUsernameError);
    }, [username]);
    useEffect(() => {
        password !== undefined && validateInput(password, setPasswordError);
    }, [password]);

    const isFormValid = () => {
        const loginErrors = {
            username: false,
            password: false,
        }
        loginErrors.username = validateInput(username, setUsernameError);
        loginErrors.password = validateInput(password, setPasswordError);

        // check personal information for errors
        return !checkIfErrorsExistInMapping(loginErrors);
    }

    const onKeyPress = (event) => {
        // checking if they pressed enter (ASCII Code)
        if (event.which === 13) {
            onSubmit(event);
        }
    }

    const forgetPasswordAlert = () => {
        toast.info(`Password recovery is still under construction! Please contact ${HOME_TOGETHER_EMAIL} to ` +
            `reset your password. Please include your username and use the email you registered with to confirm  ` +
            `your identity. Your password will be reset and you will be notified via email.`,
            {
                autoClose: false
            });
    }

    const onSubmit = (event) => {
        if (!isFormValid()) {
            event.preventDefault();
            return;
        }
        const loginData = {
            username: username,
            password: password
        }

        LoginService.loginUser(loginData)
            .then(res => res.json())
            .then(data => {
                if (data && data.authenticated) {
                    // dispatch action to set isAdmin
                    setIsAdmin({isAdmin: data.member ? data.member.isAdmin : false});

                    // dispatch action to set accountType
                    let accountType = null;
                    if (data.member) {
                        accountType = USER_TYPES.MEMBER;
                    } else if (data.business) {
                        accountType = USER_TYPES.BUSINESS;
                    }
                    setAccountType({accountType});

                    // dispatch action to set active
                    setActive({active: data.member ? data.member.active : null});

                    // dispatch action to set authenticated
                    setAuthenticated({authenticated: data.authenticated});

                    // dispatch action to set member search filters
                    if (data.member) {
                        setMemberSearchFilters({
                            memberSearchFilters: {
                                searchArea: {
                                    province: '',
                                    city: '',
                                    radius: undefined
                                },
                                genderPreference: JSON.parse(data.member.genderPreference),
                                statusPreference: JSON.parse(data.member.statusPreference),
                                minAgePreference:data.member.minAgePreference,
                                maxAgePreference: data.member.maxAgePreference,
                                numRoommatesPreference: JSON.parse(data.member.numRoommatesPreference),
                                minBudgetPreference: data.member.minBudgetPreference,
                                maxBudgetPreference: data.member.maxBudgetPreference,
                                religionPreference: resolveBooleanToYesNo(data.member.religionPreference),
                                dietPreference: resolveBooleanToYesNo(data.member.dietPreference),
                                othersWithHomeToSharePreference: resolveBooleanToYesNo(
                                      data.member.othersWithHomeToSharePreference),
                                petsPreference: resolveBooleanToYesNo(data.member.petsPreference),
                                smokingPreference: resolveBooleanToYesNo(data.member.smokingPreference)
                            }
                        });
                    }

                    // user is authenticated, redirect to home screen
                    return navigate('/');
                } else if (data && data.errors && data.errors.length) {
                    const errorMessage = getConcatenatedErrorMessage(data.errors);
                    // show list of all errors
                    alert(errorMessage);
                } else if (data && !data.authenticated) {
                    // something went wrong with authentication
                    alert('Login failed. Please try again and contact Home Together if the issue persists.');
                }
            })
            .catch((error) => {
                alert('Something went wrong with login. Please try again. Error: ' + error);
            });
    }

    return (
        <div className="flex items-center min-h-screen p-6 bg-off_white">
            <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden rounded-lg shadow-2xl ">
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
                            <TextArea
                                className={`${usernameError && "border-red-500"} input`}
                                inputType="text"
                                placeholder="Username"
                                onKeyDown={onKeyPress}
                                onChange={input => setUsername(input.target.value)}
                            />

                            <GenericInput
                                className={`${passwordError && "border-red-500"} input`}
                                inputType="password"
                                placeholder="Password"
                                onKeyDown={onKeyPress}
                                onChange={input => setPassword(input.target.value)}
                            />

                            <SubmitButton
                                inputValue={"Login"}
                                className="btn btn-green form-btn py-2 w-3/4 mt-6"
                                onClick={onSubmit}
                            />

                            <hr className="my-8"/>

                            <p onClick={forgetPasswordAlert} className="link"> Forgot your password? </p>
                            <Link to={'/registration'} className="link"> Create an account </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

LoginForm.propTypes = {
    setAccountType: PropTypes.func.isRequired,
    setIsAdmin: PropTypes.func.isRequired,
    setAuthenticated: PropTypes.func.isRequired,
    setActive: PropTypes.func.isRequired,
    setMemberSearchFilters: PropTypes.func.isRequired,
    history: PropTypes.shape({
        push: PropTypes.func
    })
}

export default connect(null, mapDispatch)(LoginForm);
