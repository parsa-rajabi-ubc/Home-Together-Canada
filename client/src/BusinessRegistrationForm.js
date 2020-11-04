import React from 'react';
import {TextArea} from './TextArea';
import {Checkbox} from './Checkbox';
import {Button} from './Button';
import {SubmitButton} from './SubmitButton';


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
    function TextArea(props){
        return(
            <div>
                <label>
                    {props.label}
                    <input type="text" placeholder={props.placeholder} />
                </label>
            </div>
        );
    }
    function Checkbox(props){
        return(
            <label>
                {props.label}
                <input type="checkbox" value="1" />
            </label>
        );
    }
    function Button(props){
        return(
            <label>
                {props.label}
                <input type="button" value={props.value} />
            </label>
        );
    }
    function SubmitButton(props){
        return(
            <label>
                {props.label}
                <input type="submit" value="Submit" />
            </label>
        );
    }
    function ProvinceDropdown(props){
        return(
            <label>
                {props.label}
                <select>
                    <option value="alberta">Alberta</option>
                    <option value="british columbia">British Columbia</option>
                    <option value="manitoba">Manitoba</option>
                    <option value="new brunswick">New Brunswick</option>
                    <option value="newfoundland and labrador">Newfoundland and Labrador</option>
                    <option value="northwest territories">Northwest Territories</option>
                    <option value="nova scotia">Nova Scotia</option>
                    <option value="nunavut">Nunavut</option>
                    <option value="ontario">Ontario</option>
                    <option value="prince edward island">Prince Edward Island</option>
                    <option value="quebec">Quebec</option>
                    <option value="saskatchewan">Saskatchewan</option>
                    <option value="yukon">Yukon</option>
                </select>
            </label>
        );
    }
    function Address(props){
        return(
            <div>
                <label>
                    {props.label}
                    <input type="text" placeholder="Street Address" />
                </label>
                <label>
                    Optional:
                    <input type="text" placeholder="Apt, suite, floor # etc" />
                </label>
                <label>

                    <input type="text" placeholder="City" />
                </label>
                <ProvinceDropdown label="Select Province or Territory: "/>
                <label>

                    <input type="text" placeholder="Postal Code" />
                </label>
            </div>
        );
    }
    function PhoneNumInput(props){
        return(
            <div>
                <label>
                    {props.label}
                    <input type="text" placeholder="555" />
                </label>
                <label>
                    -
                    <input type="text" placeholder="555" />
                </label>
                <label>
                    -
                    <input type="text" placeholder="5555" />
                </label>
            </div>
        );
    }
    function SignInInfo(){
        return(
            <div>
                <label>
                    Username:
                    <input type="text" placeholder="" />
                </label>
                <label>
                    Password:
                    <input type="text" placeholder="" />
                </label>
                <label>
                    Confirm Password:
                    <input type="text" placeholder="" />
                </label>
            </div>
        );
    }
}

