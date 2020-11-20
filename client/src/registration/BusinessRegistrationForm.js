/**
 * @Author:     Jeff Hatton
 * @Created:    2020.11.02
 *
 * @Description: Form functional component file returning a business registration form with input validation.
 *
 */

import React, { useState } from 'react';
import TextArea from '../common/forms/TextArea';
import Checkbox from '../common/forms/Checkbox';
import Button from '../common/forms/Button';
import SubmitButton from '../common/forms/SubmitButton';
import Address from "../common/forms/Address";
import SignInInfo from "../common/forms/SignInInfo";
import PhoneNumInput from "../common/forms/PhoneNumInput";
import {isStringEmail, isStringEmpty, isStringSame, isStringNumeralsOnly} from "../common/utils/stringUtils";

//Returns a Form with fields
function BusinessRegistrationForm() {
    const [isSameAddress, setIfSameAddress] = useState(false);
    const [isNationWide, setIfNationWide] = useState(false);

    //Validation state variables
    const [bName, setBName] = useState("");
    const [bEmail, setBEmail] = useState("");
    const [bPhoneNumber, setBPhoneNumber] = useState({
        first: "",
        middle: "",
        last: ""
    });
    const [bCellNumber, setBCellNumber] = useState({
        first: "",
        middle: "",
        last: ""
    });
    const [bAddress, setBAddress] = useState({
        street: "",
        aptNum: "",
        city: "",
        province: "",
        postalCode: ""
    });
    const [bMailingAddress, setBMailingAddress] = useState({
        street: "",
        aptNum: "",
        city: "",
        province: "",
        postalCode: ""
    });
    const [bMapAddress, setBMapAddress] = useState({
        street: "",
        aptNum: "",
        city: "",
        province: "",
        postalCode: ""
    });
    const [contactFName, setContactFName] = useState("");
    const [contactLName, setContactLName] = useState("");
    const [contactPhoneNumber, setContactPhoneNumber] = useState({
        first: "",
        middle: "",
        last: ""
    });
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordCheck, setPasswordCheck] = useState("");

    // TODO: convert this into an array of errors
    const isFormValid = () => {
        if (isStringEmpty(bName)) {
            alert("Business Name Required");
            return false;
        }
        if (isStringEmpty(bEmail)) {
            alert("Business Email Required");
            return false;
        } else {
            if (!isStringEmail(bEmail)){
                alert("Business email is invalid");
                return false;
            }
        }
        if (isStringEmpty(bPhoneNumber.first) || isStringEmpty(bPhoneNumber.middle) || isStringEmpty(bPhoneNumber.last)) {
            alert("Business Phone Number missing parts");
            return false;
        } else {
            if(!isStringNumeralsOnly(bPhoneNumber.first) || !isStringNumeralsOnly(bPhoneNumber.middle) || !isStringNumeralsOnly(bPhoneNumber.last)){
                alert("Business Phone Number has invalid characters");
                return false;
            }
            if(!(bPhoneNumber.first.length===3) || !(bPhoneNumber.middle.length===3) || !(bPhoneNumber.last.length===4)){
                alert("Business Phone Number has invalid number of characters");
                return false;
            }
        }
        if (isStringEmpty(bCellNumber.first) || isStringEmpty(bCellNumber.middle) || isStringEmpty(bCellNumber.last)) {
            alert("Business Cell Phone Number missing parts");
            return false;
        } else {
            if(!isStringNumeralsOnly(bCellNumber.first) || !isStringNumeralsOnly(bCellNumber.middle) || !isStringNumeralsOnly(bCellNumber.last)){
                alert("Business Cell Phone Number has invalid characters");
                return false;
            }
            if(!(bCellNumber.first.length===3) || !(bCellNumber.middle.length===3) || !(bCellNumber.last.length===4)){
                alert("Business Cell Phone Number has invalid number of characters");
                return false;
            }
        }
        if (isStringEmpty(bAddress.street)) {
            alert("Business Street Address missing");
            return false;
        }
        if (isStringEmpty(bAddress.city)) {
            alert("Business Address City missing");
            return false;
        }
        if (isStringEmpty(bAddress.province)) {
            alert("Business Address Province not selected");
            return false
        }
        if (isStringEmpty(bAddress.postalCode)) {
            alert("Business Address Postal Code missing");
            return false;
        }
        if (isSameAddress){
            if (isStringEmpty(bMailingAddress.street)) {
                alert("Business Mailing Address Street missing");
                return false;
            }
            if (isStringEmpty(bMailingAddress.city)) {
                alert("Business Mailing Address City missing");
                return false;
            }
            if (isStringEmpty(bMailingAddress.province)) {
                alert("Business Mailing Address Province not selected");
                return false;
            }
            if (isStringEmpty(bMailingAddress.postalCode)) {
                alert("Business Mailing Address Postal Code missing");
                return false;
            }
        }
        if (!isNationWide) {
            if (isStringEmpty(bMapAddress.street)) {
                alert("Business Map Address Street missing");
                return false;
            }
            if (isStringEmpty(bMapAddress.city)) {
                alert("Business Map Address City missing");
                return false;
            }
            if (isStringEmpty(bMapAddress.province)) {
                alert("Business Map Address Province not selected");
                return false;
            }
            if (isStringEmpty(bMapAddress.postalCode)) {
                alert("Business Map Address Postal Code missing");
                return false;
            }
        }
        if (isStringEmpty(contactFName)) {
            alert("Contact First Name Required");
            return false;
        }
        if (isStringEmpty(contactLName)) {
            alert("Contact Last Name Required");
            return false;
        }
        if (isStringEmpty(contactPhoneNumber.first) || isStringEmpty(contactPhoneNumber.middle) || isStringEmpty(contactPhoneNumber.last)) {
            alert("Contact Phone Number missing parts");
            return false;
        } else {
            if(!isStringNumeralsOnly(contactPhoneNumber.first) || !isStringNumeralsOnly(contactPhoneNumber.middle) || !isStringNumeralsOnly(contactPhoneNumber.last)){
                alert("Contact Phone Number has invalid characters");
                return false;
            }
            if(!(contactPhoneNumber.first.length===3) || !(contactPhoneNumber.middle.length===3) || !(contactPhoneNumber.last.length===4)){
                alert("Contact Phone Number has invalid number of characters");
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
        if (!isStringEmpty(password) && !isStringEmpty(passwordCheck)){
            if (!isStringSame(password,passwordCheck)){
                alert("Passwords do NOT match");
                return false;
            }
        }
        return true;
    }

    //function for input checks on submit
    function onSubmit(event){
        if (!isFormValid()) {
            event.preventDefault();
            return;
        }
    }
    function handleBPhoneChange(e){
        const value = e.target.value;
        setBPhoneNumber({
            ...bPhoneNumber,
            [e.target.name]: value
        });
    }
    function handleCellPhoneChange(e){
        const value = e.target.value;
        setBCellNumber({
            ...bCellNumber,
            [e.target.name]: value
        });
    }
    function handleContactPhoneChange(e){
        const value = e.target.value;
        setContactPhoneNumber({
            ...contactPhoneNumber,
            [e.target.name]: value
        });
    }
    function handleBAddressChange(e){
        const value = e.target.value;
        setBAddress({
            ...bAddress,
            [e.target.name]: value
        });
    }
    function handleBMapAddress(e){
        const value = e.target.value;
        setBMapAddress({
            ...bMapAddress,
            [e.target.name]: value
        });
    }
    function handleBMailingAddress(e){
        const value = e.target.value;
        setBMailingAddress({
            ...bMailingAddress,
            [e.target.name]: value
        });
    }

    return (
        <div>
            <h1>Business Registration Form</h1>
            <hr/>
            <form>
                <h2>Business Details</h2>
                <TextArea label="Business Name: " placeholder="" onChange={(e)=>{setBName(e.target.value)}}/>
                <TextArea label="Business Email: " placeholder="" onChange={(e)=>{setBEmail(e.target.value)}}/>
                <PhoneNumInput label="Business Telephone Number: " onChange={handleBPhoneChange} />
                <PhoneNumInput label="Business Cell Phone Number: " onChange={handleCellPhoneChange} />
                <Address label="Business Address: " onChange={handleBAddressChange} />
                <Checkbox label="Different Mailing Address? " onChange= {() => {setIfSameAddress(isSameAddress => !isSameAddress)}}/>
                {isSameAddress && <Address label="Mailing Address: " onChange={handleBMailingAddress}/>}
                <div>
                    <span>Select nationwide if your service spans across Canada</span>
                    <div>
                    <Checkbox label="Nation wide? " onChange= {() => {setIfNationWide(isNationWide => !isNationWide)}}/>
                    {!isNationWide && <Address label="Address Shown on Map: " onChange={handleBMapAddress} />}
                    </div>
                </div>
                <Button label="Business Logo: " value="Upload File"/>
                <TextArea label="Business Website: " placeholder=""/>
                <hr/>
                <h2>Contact Person Details</h2>
                <TextArea label="First Name: " placeholder="" onChange={(e)=>{setContactFName(e.target.value)}}/>
                <TextArea label="Last Name: " placeholder="" onChange={(e)=>{setContactLName(e.target.value)}}/>
                <PhoneNumInput label="Contact Phone Number: " onChange={handleContactPhoneChange} />
                <hr/>
                <h2>Account Details</h2>
                <SignInInfo onChangeUsername={(e)=>{setUsername(e.target.value)}} onChangePassword={(e)=>{setPassword(e.target.value)}} onChangePasswordCheck={(e)=>{setPasswordCheck(e.target.value)}}/>
                <SubmitButton label="Next: " inputValue="Submit" onClick={onSubmit}/>
                <hr/>
            </form>
        </div>
    );
}
export default BusinessRegistrationForm;