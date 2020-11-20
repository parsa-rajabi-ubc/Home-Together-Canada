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
import YEARS from "./registrationUtils";

//Returns a Form with fields
function MemberRegistrationForm() {
    const [isSameAddress, setIsSameAddress] = useState(false);
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
                <TextArea label="First Name: " placeholder=""/>
                <TextArea label="Last Name: " placeholder=""/>

                {/*change this later*/}
                <Dropdown title={"Year of Birth"} items={YEARS}/>

                <PhoneNumInput label="TelephoneNumber: " onChange={handlePhoneChange}/>
                <TextArea label="Email Address: " placeholder=""/>
                <Address onChange={handleAddressChange}/>

                <Checkbox label="Different Mailing Address? " onChange= {() => {setIsSameAddress(!isSameAddress)}}/>
                {isSameAddress && <Address label="Mailing Address: " onChange={handleMailingAddress}/>}

                <hr/>
                <h2>Account Details</h2>
                <SignInInfo/>
                <SubmitButton value = 'Submit' label="Next: "/>
                <hr/>
            </form>
        </div>
    );
}
export default MemberRegistrationForm;