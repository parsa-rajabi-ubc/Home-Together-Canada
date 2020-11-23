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
import Dropdown from "../common/forms/Dropdown";
import {YEARS} from "./registrationUtils";
import PropTypes from "prop-types";
import {splitPhoneNumber} from "../common/utils/stringUtils";

//Returns a Form with fields
function MemberRegistrationForm(props) {
    const {values} = props;
    const [hasCheckedForExistingValues, setHasCheckedForExistingValues] = useState(false);
    const [isSameAddress, setIsSameAddress] = useState(false);
    const [firstname,setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [yearOfBirth,setYearOfBirth] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [phoneSet, setPhoneSet] = useState(false)
    const [passwordCheck, setPasswordCheck] = useState("");
    const [phoneNumber, setPhoneNumber] = useState({
        first: "",
        middle: "",
        last: ""
    });
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
    if (!hasCheckedForExistingValues) {
        if (typeof values != "undefined" && firstname !== values.firstname) {
            setFirstname(values.firstname);
        }
        if (typeof values != "undefined" && lastname !== values.lastname) {
            setLastname(values.lastname);
        }
        if (typeof values != "undefined" && email !== values.email) {
            setEmail(values.email);
        }
        if (typeof values != "undefined" && isSameAddress !== values.isSameAddress) {
            setIsSameAddress(values.isSameAddress);
        }
        if (typeof values != "undefined" && yearOfBirth !== values.yearOfBirth) {
            setYearOfBirth(values.yearOfBirth);
        }
        if (typeof values != "undefined" && username !== values.username) {
            setUsername(values.username);
        }
        if (typeof values != "undefined" && !phoneSet) {
            setPhoneNumber({
                first: splitPhoneNumber(values.phoneNumber)[0],
                middle: splitPhoneNumber(values.phoneNumber)[1],
                last: splitPhoneNumber(values.phoneNumber)[2]
            });
            setPhoneSet(true);
        }
        if (typeof values != "undefined" && address !== values.address) {
            setAddress(values.address);
        }
        if (typeof values != "undefined" && mailingAddress !== values.mailingAddress) {
            setMailingAddress(values.mailingAddress);
        }
        setHasCheckedForExistingValues(true);
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

    function handleYearOfBirth(e){
        const value = e.target.value;
        setYearOfBirth(value);
    }

    return (
        <div>
            <h1>Member Registration Form</h1>
            <hr/>
            <form>
                <h2>About You</h2>
                <TextArea label="First Name: " value={firstname} onChange={(e)=>{setFirstname(e.target.value)}}/>
                <TextArea label="Last Name: " value={lastname} onChange={(e)=>{setLastname(e.target.value)}}/>

                {/*<Dropdown title={"Year of Birth:"} items={YEARS} onChange={handleYearOfBirth}/>*/}

                <PhoneNumInput label="TelephoneNumber: " value={phoneNumber} onChange={handlePhoneChange}/>
                <TextArea label="Email Address: " value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
                {/*<Address label="Address: " onChange={handleAddressChange}/>*/}
                {/*until dropdown is fixed*/}
                {/*<Checkbox label="Different Mailing Address? " onChange= {() => {setIsSameAddress(!isSameAddress)}}/>*/}
                {/*{isSameAddress && <Address label="Mailing Address: " onChange={handleMailingAddress}/>}*/}

                <hr/>
                <h2>Account Details</h2>
                {/*Assuming password isn't supposed to be shown here, and that we don't want username editable?*/}
                {typeof values != "undefined" && <TextArea label="Username: " value={username} disabled onChange={(e)=>{setUsername(e.target.value)}}/>}
                {typeof values == "undefined" && <SignInInfo onChangeUsername={(e)=>{setUsername(e.target.value)}} onChangePassword={(e)=>{setPassword(e.target.value)}} onChangePasswordCheck={(e)=>{setPasswordCheck(e.target.value)}}/>}

                <SubmitButton value = 'Next' onClick={() => null}/>

                <hr/>
            </form>
        </div>
    );
}
MemberRegistrationForm.propTypes = {
    values: PropTypes.object
}
export default MemberRegistrationForm;