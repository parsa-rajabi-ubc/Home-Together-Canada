/**
 * @Author:     Alex Qin
 * @Created:    2020.11.10
 *
 * @Description: MemberRegistration Static Form
 *
 */

import React, { useState } from 'react';
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
            email: email ,
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

    function handlePhoneChange(e){
        const value = e.target.value;
        setPhoneNumber({
            ...phoneNumber,
            [e.target.name]: value
        });
    }

    function handleAddressChange(e){
        const value = e.target.value;
        setAddress({
            ...address,
            [e.target.name]: value
        });
    }

    function handleMailingAddress(e){
        const value = e.target.value;
        setMailingAddress({
            ...mailingAddress,
            [e.target.name]: value
        });
    }


    return (
        <div>
            <h1>Member Registration Form</h1>
            <hr/>
            <form>
                <h2>About You</h2>
                <TextArea label="First Name: " />
                <TextArea label="Last Name: " />
                <BirthYear/>
                <PhoneNumInput label="TelephoneNumber: " onChange={handlePhoneChange}/>
                <TextArea label="Email Address: " />
                <Address label="Address: " onChange={handleAddressChange}/>

                <Checkbox label="Different Mailing Address? " onChange= {() => {setIsSameAddress(!isSameAddress)}}/>
                {isSameAddress && <Address label="Mailing Address: " onChange={handleMailingAddress}/>}

                <hr/>
                <h2>Account Details</h2>
                <SignInInfo onChangeUsername={(e)=>{setUsername(e.target.value)}} onChangePassword={(e)=>{setPassword(e.target.value)}} onChangePasswordCheck={(e)=>{setPasswordCheck(e.target.value)}}/>

                <SubmitButton value = 'Next' onClick={() => null}/>

                <hr/>
            </form>
        </div>
    );
}
export default MemberRegistrationForm;