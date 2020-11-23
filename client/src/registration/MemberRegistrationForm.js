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
import PropTypes from "prop-types";
import {splitPhoneNumber} from "../common/utils/stringUtils";

//Returns a Form with fields
function MemberRegistrationForm(props) {
    const {values} = props;
    const [isSameAddress, setIsSameAddress] = useState(false);
    const [firstname,setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [yearOfBirth,setYearOfBirth] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
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
                <TextArea label="First Name: " value={firstname} onChange={(e)=>{setFirstname(e.target.value)}}/>
                <TextArea label="Last Name: " value={lastname} onChange={(e)=>{setLastname(e.target.value)}}/>
                <BirthYear/>
                <PhoneNumInput label="TelephoneNumber: " value={phoneNumber} onChange={handlePhoneChange}/>
                <TextArea label="Email Address: " value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
                <Address label="Address: " onChange={handleAddressChange}/>

                <Checkbox label="Different Mailing Address? " onChange= {() => {setIsSameAddress(!isSameAddress)}}/>
                {isSameAddress && <Address label="Mailing Address: " onChange={handleMailingAddress}/>}

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