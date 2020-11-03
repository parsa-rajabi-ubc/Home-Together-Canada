import React from 'react';
import {TextArea} from './TextArea';
import {Checkbox} from './Checkbox';
import {Button} from './Button';
import {SubmitButton} from './SubmitButton';


export function BusinessRegistrationForm(){

        return (
            <div className="wrapper">
                <h1>Business Registration Form</h1>
                <hr/>
                <form>
                    <h2>Business Details</h2>
                    <div>
                        <TextArea label="Business Name: " placeholder="" />
                    </div>
                    <div>
                        <TextArea label="Business Email: " placeholder="" />
                    </div>
                    <div>
                        <TextArea label="Business Telephone Number: " placeholder="555" />
                        <TextArea label=" " placeholder="555" />
                        <TextArea label=" " placeholder="5555" />
                    </div>
                    <div>
                        <TextArea label="Business Cell Phone Number: " placeholder="555" />
                        <TextArea label=" " placeholder="555" />
                        <TextArea label=" " placeholder="5555" />
                    </div>
                    <div>
                        <TextArea label="Business Address: " placeholder="Street Address" />
                        <TextArea label=" " placeholder="(Opt) Apt, suite, floor # etc" />
                        <TextArea label=" " placeholder="City" />
                        <ProvinceDropdown label="Select Province or Territory: "/>
                        <TextArea label=" " placeholder="Postal Code" />
                    </div>
                    <div>
                        <Checkbox label="Different Mailing Address?: " />
                    </div>
                    <div>
                        <TextArea label="Address Shown on Map: " placeholder="Street Address" />
                        <TextArea label=" " placeholder="(Opt) Apt, suite, floor # etc" />
                        <TextArea label=" " placeholder="City" />
                        <ProvinceDropdown label="Select Province or Territory: "/>
                        <TextArea label=" " placeholder="Postal Code" />
                    </div>
                    <div>
                        <Checkbox label="Nation wide? " />
                        <span>Select nationwide if your service spans across Canada</span>
                    </div>
                    <div>
                        <Button label="Business Logo: " value="Upload File" />
                    </div>
                    <div>
                        <TextArea label="Business Website: " placeholder="" />
                    </div>

                    <hr/>
                    <h2>Contact Person Details</h2>
                    <div>
                        <TextArea label="First Name: " placeholder="" />
                    </div>
                    <div>
                        <TextArea label="Last Name: " placeholder="" />
                    </div>
                    <div>
                        <TextArea label="Contact Phone Number: " placeholder="555" />
                        <TextArea label=" " placeholder="555" />
                        <TextArea label=" " placeholder="5555" />
                    </div>
                    <hr/>
                    <h2>Account Details</h2>
                    <div>
                        <TextArea label="Username: " placeholder="" />
                    </div>
                    <div>
                        <TextArea label="Password: " placeholder="8-20 Characters" />
                    </div>
                    <div>
                        <TextArea label="Confirm Password: " placeholder="Must match above" />
                    </div>
                    <div>
                        <SubmitButton label="Next: " />
                    </div>
                    <hr/>
                </form>
            </div>
        );
    function TextArea(props){
        return(
                <label>
                    {props.label}
                    <input type="text" placeholder={props.placeholder} />
                </label>
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
}

