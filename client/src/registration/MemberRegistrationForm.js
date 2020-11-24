/**
 * @Author:     Alex Qin
 * @Created:    2020.11.10
 *
 * @Description: MemberRegistration Static Form
 *
 */

import React, {useState} from 'react';
import TextArea from '../common/forms/TextArea';
import Checkbox from '../common/forms/Checkbox';
import SubmitButton from '../common/forms/SubmitButton';
import Address from "../common/forms/Address";
import SignInInfo from "../common/forms/SignInInfo";
import PhoneNumInput from "../common/forms/PhoneNumInput";
import BirthYear from "../common/forms/BirthYear";
import {isStringEmpty, isStringNumeralsOnly, isStringSame} from "../common/utils/stringUtils";
import {getConcatenatedErrorMessage, getPhoneNumberFromStrings} from "./registrationUtils";
import RegistrationService from "../services/RegistrationService";
import {Link} from "react-router-dom";

//Returns a Form with fields
function MemberRegistrationForm() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [yearOfBirth, setYearOfBirth] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState({
        first: "",
        middle: "",
        last: ""
    });
    const [isSameAddress, setIsSameAddress] = useState(false);
    const [useDifferentMailingAddress, setUseDifferentMailingAddress] = useState(false);
    const [address, setAddress] = useState({
        street: "",
        aptNum: "",
        city: "",
        province: "",
        postalCode: ""
    });
    const [mailingAddress, setMailingAddress] = useState({
        street: "",
        aptNum: "",
        city: "",
        province: "",
        postalCode: ""
    });
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordCheck, setPasswordCheck] = useState("");


    // TODO: convert this into an array of errors
    const isFormValid = () => {
        if (isStringEmpty(firstName)) {
            alert("First Name Required");
            return false;
        }
        if (isStringEmpty(lastName)) {
            alert("Last Name Required");
            return false;
        }
        if (isStringEmpty(yearOfBirth)) {
            alert("Year of Birth not set");
            return false;
        }
        if (isStringEmpty(phoneNumber.first) || isStringEmpty(phoneNumber.middle) || isStringEmpty(phoneNumber.last)) {
            alert("Phone Number missing parts");
            return false;
        } else {
            if (!isStringNumeralsOnly(phoneNumber.first) || !isStringNumeralsOnly(phoneNumber.middle) || !isStringNumeralsOnly(phoneNumber.last)) {
                alert("Phone Number has invalid characters");
                return false;
            }
            if (!(phoneNumber.first.length === 3) || !(phoneNumber.middle.length === 3) || !(phoneNumber.last.length === 4)) {
                alert("Phone Number has invalid number of characters");
                return false;
            }
        }
        if (isStringEmpty(address.street)) {
            alert("Street Address missing");
            return false;
        }
        if (isStringEmpty(address.city)) {
            alert("City missing");
            return false;
        }
        if (isStringEmpty(address.province)) {
            alert("Province not selected");
            return false
        }
        if (isStringEmpty(address.postalCode)) {
            alert("Postal Code missing");
            return false;
        }
        if (useDifferentMailingAddress) {
            if (isStringEmpty(mailingAddress.street)) {
                alert("Mailing Address Street missing");
                return false;
            }
            if (isStringEmpty(mailingAddress.city)) {
                alert("Mailing Address City missing");
                return false;
            }
            if (isStringEmpty(mailingAddress.province)) {
                alert("Business Mailing Address Province not selected");
                return false;
            }
            if (isStringEmpty(mailingAddress.postalCode)) {
                alert("Mailing Address Postal Code missing");
                return false;
            }
        }
        if (isStringEmpty(username)) {
            alert("username Required");
            return false;
        }
        if (isStringEmpty(password)) {
            alert("Password Required");
            return false;
        }
        if (isStringEmpty(passwordCheck)) {
            alert("Password confirmation Required");
            return false;
        }
        if (!isStringEmpty(password) && !isStringEmpty(passwordCheck)) {
            if (!isStringSame(password, passwordCheck)) {
                alert("Passwords do NOT match");
                return false;
            }
        }
        return true;
    }

    //function for input checks on submit
    function onSubmit(event) {
        if (!isFormValid()) {
            event.preventDefault();
            return;
        }
        const registrationData = {
            username: username,
            password: password,
            email: email,
            yearOfBirth: yearOfBirth,
            firstName: firstName,
            lastName: lastName,
            phoneNumber: getPhoneNumberFromStrings(phoneNumber.first, phoneNumber.middle, phoneNumber.last),
            addressLine1: address.street,
            addressLine2: address.aptNum,
            city: address.city,
            province: address.province[0],
            postalCode: address.postalCode,
            hasDifferentMailingAddress: useDifferentMailingAddress,
            ...(useDifferentMailingAddress) && {mailingAddressLine1: mailingAddress.street},
            ...(useDifferentMailingAddress) && {mailingAddressLine2: mailingAddress.aptNum},
            ...(useDifferentMailingAddress) && {mailingCity: mailingAddress.city},
            ...(useDifferentMailingAddress) && {mailingProvince: mailingAddress.province[0]},
            ...(useDifferentMailingAddress) && {mailingPostalCode: mailingAddress.postalCode},
        }

        //TODO: update this with MemberService.registerMemberUser(registrationData) after it has been implemented

        // RegistrationService.registerBusinessUser(registrationData)
        //     .then(res => res.json())
        //     .then(data => {
        //         if (!!data && data.authenticated) {
        //             // user is authenticated, redirect to home screen
        //             return history.push('/');
        //         } else if (!!data && !data.authenticated) {
        //             // something went wrong with the AUTHENTICATION (not the user creation)
        //             alert('Registration failed');
        //         } else if (!!data && data.errors && data.errors.length) {
        //             const errorMessage = getConcatenatedErrorMessage(data.errors);
        //             // show list of all errors
        //             alert(errorMessage);
        //         }
        //     })
        //     .catch((error) => {
        //         alert('Something went wrong creating your user. Please try again. Error: ' + error);
        //     });
    }

    function handlePhoneChange(e) {
        const value = e.target.value;
        setPhoneNumber({
            ...phoneNumber,
            [e.target.name]: value
        });
    }

    function handleAddressChange(address) {
        setAddress(address);
    }

    function handleMailingAddress(maillingAddress) {
        setMailingAddress(maillingAddress);
    }

    const handleYearChange = e => {
        setYearOfBirth(e.value);
    }

    return (
        <div>
            <div className="m-10 md:grid md:grid-cols-4 md:gap-0">
                <div className="md:col-span-1">
                    <div className="px-4 sm:px-0">
                        <h3 className="info-header">Personal Information</h3>
                        <p className="info-text">
                            This information is about you!
                        </p>
                    </div>
                </div>
                <div className="mt-5 md:mt-0 md:col-span-2 shadow sm:rounded-md sm:overflow-hidden px-4 py-5 space-y-1 bg-white sm:p-6">
                    <div className="grid grid-cols-3 gap-6">
                        <div className="col-span-3 sm:col-span-2">
                            <TextArea className={"input"} labelClassName={"label"} label="First Name"
                                      onChange={(e) => {
                                          setFirstName(e.target.value);
                                      }}/>
                            <TextArea className={"input"} labelClassName={"label"} label="Last Name"
                                      onChange={(e) => {
                                          setLastName(e.target.value)
                                      }}/>
                            <TextArea className="input" placeholder="personal@email.ca"
                                      label="Email" labelClassName={"label"} onChange={(e) => {
                                setEmail(e.target.value)
                            }}/>
                            <label className={"label"}>Year of Birth</label>
                            <BirthYear label={"Year of Birth"} onChange={handleYearChange}/>
                            <PhoneNumInput
                                className="w-1/4 phone"
                                labelClassName={"label"}
                                label="Phone Number" onChange={handlePhoneChange}/>
                            <Address label="Address"
                                     cityClassName="city-postal" onChange={handleAddressChange}/>

                            <span className="info-detail">Select checkbox below if your mailing address differs from the address above</span>
                            <Checkbox label="Different Mailing Address" onChange={() => {
                                setUseDifferentMailingAddress(useDifferentMailingAddress => !useDifferentMailingAddress)
                            }}/>

                            {useDifferentMailingAddress &&
                            <Address label="Mailing Address"
                                     onChange={handleMailingAddress}/>}
                        </div>
                    </div>
                </div>
            </div>

            {/*Divided*/}
            <div className="border-divider"/>

            {/*Account Details*/}
            <div className="mt-10 sm:mt-0">
                <div className="m-10 md:grid md:grid-cols-4 md:gap-6">
                    <div className="md:col-span-1">
                        <div className="px-4 sm:px-0">
                            <h3 className="info-header">Account Details</h3>
                            <p className="info-text">
                                This information is to set up and access your account.
                            </p>
                        </div>
                    </div>

                    <div className="mt-5 md:mt-0 md:col-span-2">
                        <div className="overflow-hidden shadow sm:rounded-md">
                            <div className="px-4 py-6 bg-white sm:p-5">
                                <div className="grid grid-cols-3 gap-6">
                                    <div className="col-span-3 sm:col-span-2">

                                        <SignInInfo onChangeUsername={(e) => {
                                            setUsername(e.target.value)
                                        }} onChangePassword={(e) => {
                                            setPassword(e.target.value)
                                        }} onChangePasswordCheck={(e) => {
                                            setPasswordCheck(e.target.value)
                                        }}/>

                                    </div>
                                </div>
                            </div>
                        </div>

                        <Link to={'/registration/member/profile'}
                              className="px-4 pt-4 mt-4 text-center bg-gray-50 sm:px-6">
                                <SubmitButton label={""} inputValue={"Next"}
                                              className="text-base btn btn-green"
                                              onClick={onSubmit}/>
                        </Link>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default MemberRegistrationForm;