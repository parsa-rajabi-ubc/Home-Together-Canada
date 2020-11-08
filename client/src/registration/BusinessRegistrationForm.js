import React, { useState } from 'react';
import TextArea from '../common/forms/TextArea';
import Checkbox from '../common/forms/Checkbox';
import Button from '../common/forms/Button';
import SubmitButton from '../common/forms/SubmitButton';
import Address from "../common/forms/Address";
import SignInInfo from "../common/forms/SignInInfo";
import PhoneNumInput from "../common/forms/PhoneNumInput";

//Returns a Form with fields
export function BusinessRegistrationForm() {
    const [isSameAddress, setIfSameAddress] = useState(false);
    return (
        <div>
            <h1>Business Registration Form</h1>
            <hr/>
            <form>
                <h2>Business Details</h2>
                <TextArea label="Business Name: " placeholder=""/>
                <TextArea label="Business Email: " placeholder=""/>
                <PhoneNumInput label="Business Telephone Number: "/>
                <PhoneNumInput label="Business Cell Phone Number: "/>
                <Address label="Business Address: "/>
                <Checkbox label="Different Mailing Address? " onChange= {() => {setIfSameAddress(isSameAddress => !isSameAddress)}}/>
                {isSameAddress && <Address label="Mailing Address: "/>}
                <div>
                    <Checkbox label="Nation wide? " onChange={onchange}/>
                    <Address label="Address Shown on Map: "/>
                    <span>Select nationwide if your service spans across Canada</span>
                </div>
                <Button label="Business Logo: " value="Upload File"/>
                <TextArea label="Business Website: " placeholder=""/>
                <hr/>
                <h2>Contact Person Details</h2>
                <TextArea label="First Name: " placeholder=""/>
                <TextArea label="Last Name: " placeholder=""/>
                <PhoneNumInput label="Contact Phone Number: "/>
                <hr/>
                <h2>Account Details</h2>
                <SignInInfo/>
                <SubmitButton label="Next: "/>
                <hr/>
            </form>
        </div>
    );
}