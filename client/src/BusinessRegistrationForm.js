import React from 'react';
import TextArea from './registration/common/forms/TextArea';
import Checkbox from './registration/common/forms/Checkbox';
import Button from './registration/common/forms/Button';
import SubmitButton from './registration/common/forms/SubmitButton';
import Address from "./registration/common/forms/Address";
import SignInInfo from "./registration/common/forms/SignInInfo";
import PhoneNumInput from "./registration/common/forms/PhoneNumInput";

export function BusinessRegistrationForm(){
        return (
            <div>
                <h1>Business Registration Form</h1>
                <hr/>
                <form>
                    <h2>Business Details</h2>
                        <TextArea label="Business Name: " placeholder="" />
                        <TextArea label="Business Email: " placeholder="" />
                        <PhoneNumInput label="Business Telephone Number: "/>
                        <PhoneNumInput label="Business Cell Phone Number: "/>
                        <Address label="Business Address: "/>
                    <div>
                        <Checkbox label="Different Mailing Address?: " />
                    </div>
                        <Address label="Address Shown on Map: "/>
                    <div>
                        <Checkbox label="Nation wide? " />
                        <span>Select nationwide if your service spans across Canada</span>
                    </div>
                    <div>
                        <Button label="Business Logo: " value="Upload File" />
                    </div>
                        <TextArea label="Business Website: " placeholder="" />
                    <hr/>
                    <h2>Contact Person Details</h2>
                        <TextArea label="First Name: " placeholder="" />
                        <TextArea label="Last Name: " placeholder="" />
                        <PhoneNumInput label="Contact Phone Number: "/>
                    <hr/>
                    <h2>Account Details</h2>
                        <SignInInfo/>
                    <div>
                        <SubmitButton label="Next: " />
                    </div>
                    <hr/>
                </form>
            </div>
        );
}

