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
import BirthYear from "../common/forms/BirthYear";
import {isStringEmpty, isStringNumeralsOnly, isStringSame} from "../common/utils/stringUtils";
import {getConcatenatedErrorMessage, getPhoneNumberFromStrings} from "./registrationUtils";
import RegistrationService from "../services/RegistrationService";
import RadioButton from "../common/forms/RadioButton";
import Status from "../common/forms/Status";
import ShareLimit from "../common/forms/ShareLimits";
import InterestedArea from "../common/forms/InterestedArea";
import YNButton from "../common/forms/YNButtons";
import LargeTextArea from "../common/forms/LargeTextArea";

//Returns a Form with fields
function MemberRegistrationForm() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [yearOfBirth, setYearOfBirth] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState({
        first: "",
        middle: "",
        last: ""
    });
    const [isSameAddress, setIsSameAddress] = useState(false);
    const [useDifferentMailingAddress, setUseDifferentMailingAddress] = useState(false);
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
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordCheck, setPasswordCheck] = useState("");
    const [gender, setGender] = useState("");
    const [petFriendly, setPetFriendly] = useState("");
    const [smoking, setSmoking] = useState("");
    const [mobilityIssues, setMobilityIssues] = useState("");
    const [hasAllergies, setHasAllergies] = useState("");
    const [religious, setReligious] = useState("");
    const [hasDiet, setHasDiet] = useState("");
    const [hasHome, setHasHome] = useState("");
    const [minRent, setMinRent] = useState("500.00");
    const [maxRent, setMaxRent] = useState("1500.00");
    const [aboutSelf, setAboutSelf] = useState("");
    const [selectedLimit, setsSelectedLimit] = useState(null);
    const [selectedStatus, setsSelectedStatus] = useState(null);
    const [partners, setPartners] = useState(null);
    const [groupMembers, setGroupMembers] = useState(null);

    const handleStatusChange = e => {
        setsSelectedStatus(e.value);
    }

    function checkStatus(selectedStatus) {
        if (selectedStatus === "Couple") {
            return <TextArea className={"input"} labelClassName={"label"} placeholder={"Partner's username"} label={null} onChange={(e) => {
                setPartners(e.target.value)
            }}/>
        } else if (selectedStatus === "Couple With Children") {
            return <TextArea className={"input"} labelClassName={"label"} placeholder={"Partner's username"} label={null} onChange={(e) => {
                setPartners(e.target.value)
            }}/>
        } else if (selectedStatus === "Existing Group") {
            return <TextArea className={"input"} labelClassName={"label"} placeholder={"Member's username(s) - divided by comma"} label={null} onChange={(e) => {
                setGroupMembers(e.target.value)
            }}/>
        }

    }
    const handleLimitChange = e => {
        setsSelectedLimit(e.value);
    }

    // TODO: convert this into an array of errors
    const isFormValid = () => {
        if (isStringEmpty(firstName)) {
            alert("First Name Required");
            return false;
        }
        if (isStringEmpty(lastName)) {
            alert("Last Name Required");
            return false;
        }
        if (isStringEmpty(yearOfBirth)) {
            alert("Year of Birth not set");
            return false;
        }
        if (isStringEmpty(phoneNumber.first) || isStringEmpty(phoneNumber.middle) || isStringEmpty(phoneNumber.last)) {
            alert("Phone Number missing parts");
            return false;
        } else {
            if (!isStringNumeralsOnly(phoneNumber.first) || !isStringNumeralsOnly(phoneNumber.middle) || !isStringNumeralsOnly(phoneNumber.last)) {
                alert("Phone Number has invalid characters");
                return false;
            }
            if (!(phoneNumber.first.length === 3) || !(phoneNumber.middle.length === 3) || !(phoneNumber.last.length === 4)) {
                alert("Phone Number has invalid number of characters");
                return false;
            }
        }
        if (isStringEmpty(address.street)) {
            alert("Street Address missing");
            return false;
        }
        if (isStringEmpty(address.city)) {
            alert("City missing");
            return false;
        }
        if (isStringEmpty(address.province)) {
            alert("Province not selected");
            return false
        }
        if (isStringEmpty(address.postalCode)) {
            alert("Postal Code missing");
            return false;
        }
        if (useDifferentMailingAddress) {
            if (isStringEmpty(mailingAddress.street)) {
                alert("Mailing Address Street missing");
                return false;
            }
            if (isStringEmpty(mailingAddress.city)) {
                alert("Mailing Address City missing");
                return false;
            }
            if (isStringEmpty(mailingAddress.province)) {
                alert("Business Mailing Address Province not selected");
                return false;
            }
            if (isStringEmpty(mailingAddress.postalCode)) {
                alert("Mailing Address Postal Code missing");
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
        if (!isStringEmpty(password) && !isStringEmpty(passwordCheck)) {
            if (!isStringSame(password, passwordCheck)) {
                alert("Passwords do NOT match");
                return false;
            }
        }
        return true;
    }

    //function for input checks on submit
    function onSubmit(event) {
        if (!isFormValid()) {
            event.preventDefault();
            return;
        }
        const registrationData = {
            username: username,
            password: password,
            email: email,
            yearOfBirth: yearOfBirth,
            firstName: firstName,
            lastName: lastName,
            phoneNumber: getPhoneNumberFromStrings(phoneNumber.first, phoneNumber.middle, phoneNumber.last),
            addressLine1: address.street,
            addressLine2: address.aptNum,
            city: address.city,
            province: address.province[0],
            postalCode: address.postalCode,
            hasDifferentMailingAddress: useDifferentMailingAddress,
            ...(useDifferentMailingAddress) && {mailingAddressLine1: mailingAddress.street},
            ...(useDifferentMailingAddress) && {mailingAddressLine2: mailingAddress.aptNum},
            ...(useDifferentMailingAddress) && {mailingCity: mailingAddress.city},
            ...(useDifferentMailingAddress) && {mailingProvince: mailingAddress.province[0]},
            ...(useDifferentMailingAddress) && {mailingPostalCode: mailingAddress.postalCode},
        }

        //TODO: update this with MemberService.registerMemberUser(registrationData) after it has been implemented

        // RegistrationService.registerBusinessUser(registrationData)
        //     .then(res => res.json())
        //     .then(data => {
        //         if (!!data && data.authenticated) {
        //             // user is authenticated, redirect to home screen
        //             return history.push('/');
        //         } else if (!!data && !data.authenticated) {
        //             // something went wrong with the AUTHENTICATION (not the user creation)
        //             alert('Registration failed');
        //         } else if (!!data && data.errors && data.errors.length) {
        //             const errorMessage = getConcatenatedErrorMessage(data.errors);
        //             // show list of all errors
        //             alert(errorMessage);
        //         }
        //     })
        //     .catch((error) => {
        //         alert('Something went wrong creating your user. Please try again. Error: ' + error);
        //     });
    }

    function handlePhoneChange(e) {
        const value = e.target.value;
        setPhoneNumber({
            ...phoneNumber,
            [e.target.name]: value
        });
    }

    function handleAddressChange(address) {
        setAddress(address);
    }

    function handleMailingAddress(maillingAddress) {
        setMailingAddress(maillingAddress);
    }

    const handleYearChange = e => {
        setYearOfBirth(e.value);
    }

    return (
        <div>
            <div className="m-10 md:grid md:grid-cols-4 md:gap-0">
                <div className="md:col-span-1">
                    <div className="px-4 sm:px-0">
                        <h3 className="info-header">Personal Information</h3>
                        <p className="info-text">
                            This information is about you!
                        </p>
                    </div>
                </div>
                <div className="mt-5 md:mt-0 md:col-span-2 shadow sm:rounded-md sm:overflow-hidden px-4 py-5 space-y-1 bg-white sm:p-6">
                    <div className="grid grid-cols-2 gap-6">
                        <div className="col-span-3 sm:col-span-2">
                            <TextArea className={"input"} labelClassName={"label"} label="First Name"
                                      onChange={(e) => {
                                          setFirstName(e.target.value);
                                      }}/>
                            <TextArea className={"input"} labelClassName={"label"} label="Last Name"
                                      onChange={(e) => {
                                          setLastName(e.target.value)
                                      }}/>
                            <TextArea className="input" placeholder="personal@email.ca"
                                      label="Email" labelClassName={"label"} onChange={(e) => {
                                setEmail(e.target.value)
                            }}/>
                            <label className={"label"}>Year of Birth</label>
                            <BirthYear label={"Year of Birth"} onChange={handleYearChange}/>
                            <PhoneNumInput
                                className="w-1/4 phone"
                                labelClassName={"label"}
                                label="Phone Number" onChange={handlePhoneChange}/>
                            <Address label="Address"
                                     cityClassName="city-postal" onChange={handleAddressChange}/>

                            <span className="info-detail">Select checkbox below if your mailing address differs from the address above</span>
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

            {/*Divided*/}
            <div className="border-divider"/>

            {/*Profile*/}
            <div className="mt-10 sm:mt-0">
                <div className="m-10 md:grid md:grid-cols-4 md:gap-6">
                    <div className="md:col-span-1">
                        <div className="px-4 sm:px-0">
                            <h3 className="info-header">Profile Details</h3>
                            <p className="info-text">
                                This information is about your home-sharing preferences
                            </p>
                        </div>
                    </div>

                    <div className="mt-5 md:mt-0 md:col-span-2">
                        <div className="overflow-hidden shadow sm:rounded-md">
                            <div className="px-4 py-6 bg-white sm:p-5">
                                <div className="grid grid-cols-2 gap-6 ">
                                    <div className="col-span-3 sm:col-span-2">
                                        <label className={"label"}> Gender </label>
                                        <div className={"my-2"}>
                                            <RadioButton label="Male" name="gender" value="male"
                                                         checked={gender === "male"} onChange={(e) => {
                                                setGender(e.target.value)
                                            }}/>
                                            <RadioButton label="Female" name="gender" value="female"
                                                         checked={gender === "female"} onChange={(e) => {
                                                setGender(e.target.value)
                                            }}/>
                                            <RadioButton label="Other " name="gender" value="other"
                                                         checked={gender === "other"} onChange={(e) => {
                                                setGender(e.target.value)
                                            }}/>
                                            {(gender === "other") &&
                                            <TextArea className="input mt-0" labelClassName={"label mt-5"} label={""}
                                                      placeholder="Optional: what gender do you identify as?"
                                                      disabled={!(gender === "other")}/>}
                                        </div>
                                        <label className={"label"}> Status </label>

                                        <Status onChange={handleStatusChange}/>
                                        {checkStatus(selectedStatus)}

                                        <label className={"label text-base "}> open to sharing with </label>
                                        <ShareLimit onChange={handleLimitChange}/>
                                        <div className={"label"}>Monthly Rent</div>
                                        <div className="grid grid-cols-6 gap-x-6">
                                            <div className="column-span-6-layout">
                                                <input className={"input label font-normal "} type="number" min="0"
                                                       step="25" placeholder="MIN $ CAD" onChange={(e) => {
                                                    setMinRent(e.target.value)
                                                }}/>
                                            </div>
                                            <div className="column-span-6-layout">
                                                <input className={"input label font-normal "} type="number"
                                                       min={minRent} step="25" placeholder=" MAX $ CAD"
                                                       onChange={(e) => {
                                                           setMaxRent(e.target.value)
                                                       }}/>
                                            </div>
                                        </div>
                                        <label className={"label"}>Interested Area</label>
                                        <InterestedArea/>
                                        <div className="grid grid-cols-6 gap-x-6">
                                            <div className="column-span-6-layout">
                                                <YNButton label="Pet Friendly?" name="petFriendly" onChange={(e) => {
                                                    setPetFriendly(e.target.value)
                                                }}/>
                                                {(petFriendly === "yes") &&
                                                <TextArea className={"input"} placeholder="Elaborate" label={""}/>}
                                            </div>
                                            <div className="column-span-6-layout">
                                                <YNButton label="Smoking Friendly?" name="smoking" onChange={(e) => {
                                                    setSmoking(e.target.value)
                                                }}/>
                                                {(smoking === "yes") &&
                                                <TextArea className={"input"} placeholder="Elaborate" label={""}/>}
                                            </div>
                                            <div className="column-span-6-layout">
                                                <YNButton label="Health / Mobility Issues?" name="mobile"
                                                          onChange={(e) => {
                                                              setMobilityIssues(e.target.value)
                                                          }}/>
                                                {(mobilityIssues === "yes") &&
                                                <TextArea className={"input"} placeholder="Elaborate" label={""}/>}
                                            </div>
                                            <div className="column-span-6-layout">
                                                <YNButton label="Allergies?" name="allergies"
                                                          checked={hasAllergies === "no"} onChange={(e) => {
                                                    setHasAllergies(e.target.value)
                                                }}/>
                                                {(hasAllergies === "yes") &&
                                                <TextArea className={"input"} placeholder="Elaborate" label={""}/>}
                                            </div>
                                            <div className="column-span-6-layout">
                                                <YNButton label="Is religion important?" name="religion"
                                                          checked={religious === "no"} onChange={(e) => {
                                                    setReligious(e.target.value)
                                                }}/>
                                                {(religious === "yes") &&
                                                <TextArea className={"input"} placeholder="Elaborate" label={""}/>}
                                            </div>
                                            <div className="column-span-6-layout">
                                                <YNButton label="Is diet of others important?" name="diet"
                                                          checked={hasDiet === "no"} onChange={(e) => {
                                                    setHasDiet(e.target.value)
                                                }}/>
                                                {(hasDiet === "yes") &&
                                                <TextArea className={"input"} placeholder="Elaborate" label={""}/>}
                                            </div>

                                            <div className="column-span-6-layout">
                                                <YNButton label="Have a home to share?" name="hasHome" checked={hasHome==="no"} onChange={(e)=>{setHasHome(e.target.value)}}/>
                                                {(hasHome==="yes") && <TextArea className={"input"} placeholder="Elaborate:" label={""}/>}
                                            </div>
                                        </div>
                                        <div className={"mt-4"}>
                                            <LargeTextArea label="Tell others about yourself: " name="aboutSelf"
                                                           placeholder="What is important to you, and why do you want to share a home?"
                                                           onChange={(e) => {
                                                               setAboutSelf(e.target.value)
                                                           }}/>
                                        </div>
                                    </div>
                                </div>
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
                            <h3 className="info-header">Account Details</h3>
                            <p className="info-text">
                                This information is to set up and access your account.
                            </p>
                        </div>
                    </div>

                    <div className="mt-5 md:mt-0 md:col-span-2">
                        <div className="overflow-hidden shadow sm:rounded-md">
                            <div className="px-4 py-6 bg-white sm:p-5">
                                <div className="grid grid-cols-2 gap-6">
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

                        <div
                              className="px-4 pt-4 mt-4 text-center bg-gray-50 sm:px-6">
                                <SubmitButton inputValue={"Create Account"}
                                              className="text-base btn btn-green"
                                              onClick={onSubmit}/>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default MemberRegistrationForm;