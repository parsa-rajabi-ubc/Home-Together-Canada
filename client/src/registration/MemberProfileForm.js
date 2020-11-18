/**
 * @Author:     Jeff Hatton
 * @Created:    2020.11.16
 *
 * @Description: Member profile static form Component. Returns a form.
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
import RadioButton from "../common/forms/RadioButton";

//Returns a Form with fields
function MemberProfileForm() {
    const [gender, setGender] = useState(false);
    const [isNationWide, setIfNationWide] = useState(false);
    return (
        <div>
            <h1>Member Sign Up:</h1>
            <hr/>
            <form>
                <div>
                    <p>Gender</p>
                    <RadioButton label="Male" name="male" value="male" checked={true} onChange={onchange}/>
                    <RadioButton label="Male" name="male" value="male" checked={true} onChange={onchange}/>
                    <RadioButton label="Male" name="male" value="male" checked={true} onChange={onchange}/>
                    <TextArea label="Preferred Pronoun: " placeholder="Pronoun"/>
                </div>
            </form>
        </div>
    );
}
export default MemberProfileForm;