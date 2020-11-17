import React, { useState } from 'react';
import TextArea from '../common/forms/TextArea';
import Checkbox from '../common/forms/Checkbox';
import Button from '../common/forms/Button';
import SubmitButton from '../common/forms/SubmitButton';
import Address from "../common/forms/Address";
import SignInInfo from "../common/forms/SignInInfo";
import PhoneNumInput from "../common/forms/PhoneNumInput";

//Returns a Form with fields
function MemberProfileForm() {
    const [isSameAddress, setIfSameAddress] = useState(false);
    const [isNationWide, setIfNationWide] = useState(false);
    return (
        <div>
            <h1>Member Sign Up:</h1>
            <hr/>
            <form>

            </form>
        </div>
    );
}
export default MemberProfileForm;