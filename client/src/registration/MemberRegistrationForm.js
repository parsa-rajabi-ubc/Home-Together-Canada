/**
 * @Author:     Alex Qin
 * @Created:    2020.11.10
 *
 * @Description: MemberRegistration Static Form
 *
 */

import React, {useState} from 'react';
import TextArea from '../common/forms/TextArea';
import Checkbox from '../common/forms/Checkbox';
import SubmitButton from '../common/forms/SubmitButton';
import Address from "../common/forms/Address";
import SignInInfo from "../common/forms/SignInInfo";
import PhoneNumInput from "../common/forms/PhoneNumInput";
import Dropdown from "../common/forms/Dropdown";
import {YEARS} from "./registrationUtils";
import {Link} from "react-router-dom";


//function for input checks on submit
function onSubmit(event) {

}

//Returns a Form with fields
function MemberRegistrationForm() {
    const [isSameAddress, setIsSameAddress] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [useDifferentMailingAddress, setUseDifferentMailingAddress] = useState(false);
    const [yearOfBirth, setYearOfBirth] = useState("");
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

    function handlePhoneChange(e) {
        const value = e.target.value;
        setPhoneNumber({
            ...phoneNumber,
            [e.target.name]: value
        });
    }

    function handleAddressChange(e) {
        const value = e.target.value;
        setAddress({
            ...address,
            [e.target.name]: value
        });
    }

    function handleMailingAddress(e) {
        const value = e.target.value;
        setMailingAddress({
            ...mailingAddress,
            [e.target.name]: value
        });
    }

    function handleYearOfBirth(e) {
        const value = e.target.value;
        setYearOfBirth(value);
    }

    return (
        <div>
            {/*Personal Information*/}
            <div className="mt-10 sm:mt-0">
                <div className="m-10 md:grid md:grid-cols-4 md:gap-6">
                    <div className="md:col-span-1">
                        <div className="px-4 sm:px-0">
                            <h3 className="info-header">Personal Information</h3>
                            <p className="info-text">
                                This information is about you.
                            </p>
                        </div>
                    </div>
                    <div className="mt-5 md:mt-0 md:col-span-2">

                        <div className="overflow-hidden shadow sm:rounded-md">
                            <div className="px-4 py-5 bg-white sm:p-6">
                                <div className="grid grid-cols-6 gap-x-6">
                                    <div className="column-span-6-layout">
                                        <TextArea className={"input"} labelClassName={"label"} label="First Name"
                                                  onChange={(e) => {
                                                      setFirstName(e.target.value)
                                                  }}/>
                                    </div>

                                    <div className="column-span-6-layout">
                                        <TextArea className={"input"} labelClassName={"label"} label="Last Name"
                                                  onChange={(e) => {
                                                      setLastName(e.target.value)
                                                  }}/>
                                    </div>

                                    <div className="column-span-6-layout">
                                        <TextArea className="input" placeholder="personal@email.ca"
                                                  label="Email" labelClassName={"label"} onChange={(e) => {
                                            setEmail(e.target.value)
                                        }}/>
                                    </div>

                                    <div className="column-span-6-layout">
                                        <PhoneNumInput
                                            className="w-1/4 input-phone"
                                            labelClassName={"label"}
                                            label="Phone Number" onChange={handlePhoneChange}/>
                                    </div>
                                    <div className="column-span-6-layout">
                                        <TextArea className="input" placeholder="Must be at least 16 year olds or above"
                                                  label="Year of Birth" labelClassName={"label"}
                                                  onChange={handleYearOfBirth}/>
                                    </div>
                                </div>


                                <Address label="Address"
                                         cityClassName="city-postal" onChange={handleAddressChange}/>
                                <span className="info-detail">Select different mailing address if it differs from the address above:</span>
                                <Checkbox label="Different Mailing Address" onChange={() => {
                                    setUseDifferentMailingAddress(useDifferentMailingAddress => !useDifferentMailingAddress)
                                }}/>
                                {useDifferentMailingAddress &&
                                <Address label="Mailing Address"
                                         onChange={handleMailingAddress}/>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/*Divided*/}
            <div className="border-divider"/>

            {/*Account Details*/}
            <div className="mt-10 sm:mt-0">
                <div className="m-10 md:grid md:grid-cols-4 md:gap-6">
                    <div className="md:col-span-1">
                        <div className="px-4 sm:px-0">
                            <h3 className="text-lg font-medium leading-6 text-gray-900">Account Details</h3>
                            <p className="mt-1 text-sm text-gray-600">
                                This information is to set up and access your account.
                            </p>
                        </div>
                    </div>
                    <div className="mt-5 md:mt-0 md:col-span-2">
                        <div className="overflow-hidden shadow sm:rounded-md">
                            <div className="px-4 py-6 bg-white sm:p-5">
                                <div className="grid grid-cols-3 gap-6">
                                    <div className="col-span-3 sm:col-span-2">

                                        <SignInInfo onChangeUsername={(e) => {
                                            setUsername(e.target.value)
                                        }} onChangePassword={(e) => {
                                            setPassword(e.target.value)
                                        }} onChangePasswordCheck={(e) => {
                                            setPasswordCheck(e.target.value)
                                        }}/>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="px-4 pt-4 mt-4 text-center bg-gray-50 sm:px-6">
                            <Link to={'/registration/member/profile'}>
                                <SubmitButton label={""} inputValue={"Next: Set Up Profile"}
                                              className="text-base btn btn-green"
                                              onClick={onSubmit}/>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );


}

export default MemberRegistrationForm;