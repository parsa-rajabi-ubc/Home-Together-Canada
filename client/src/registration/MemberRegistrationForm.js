import React, { useState } from 'react';
import TextArea from '../common/forms/TextArea';
import Checkbox from '../common/forms/Checkbox';
import SubmitButton from '../common/forms/SubmitButton';
import Address from "../common/forms/Address";
import SignInInfo from "../common/forms/SignInInfo";
import PhoneNumInput from "../common/forms/PhoneNumInput";
import Dropdown from "../common/forms/Dropdown";
import Years from "../common/forms/Years";

//Returns a Form with fields
function BusinessRegistrationForm() {
    const [isSameAddress, setIfSameAddress] = useState(false);

    return (
        <div>
            <h1>Member Registration Form</h1>
            <hr/>
            <form>
                <h2>About You</h2>
                <TextArea label="First Name: " placeholder=""/>
                <TextArea label="Last Name: " placeholder=""/>

                {/*change this later*/}
                <Dropdown title={"Year of Birth"} items={Years}/>

                <PhoneNumInput label="TelephoneNumber: "/>
                <TextArea label="Email Address: " placeholder=""/>
                <Address label="Home Address: "/>

                <Checkbox label="Different Mailing Address? " onChange= {() => {setIfSameAddress(isSameAddress => !isSameAddress)}}/>
                {isSameAddress && <Address label="Mailing Address: "/>}

                <hr/>
                <h2>Account Details</h2>
                <SignInInfo/>
                <SubmitButton label="Next: "/>
                <hr/>
            </form>
        </div>
    );
}
export default BusinessRegistrationForm;