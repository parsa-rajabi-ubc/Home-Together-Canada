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
import YEARS from "./registrationUtils";

//Returns a Form with fields
function MemberRegistrationForm() {
    const [isSameAddress, setIsSameAddress] = useState(false);
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
                <TextArea label="First Name: " />
                <TextArea label="Last Name: " />

                <YEARS/>

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