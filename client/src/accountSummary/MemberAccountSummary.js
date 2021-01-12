/**
 * @Author:     Jeff Hatton
 * @Created:    2020.11.30
 *
 * @Description: Member account summary editable component Form
 *
 */
import React, {useState} from 'react';
import PropTypes from "prop-types";
import TextArea from "../common/forms/TextArea";
import BirthYear from "../common/forms/BirthYear";
import PhoneNumInput from "../common/forms/PhoneNumInput";
import Address from "../common/forms/Address";
import Checkbox from "../common/forms/Checkbox";
import SubmitButton from "../common/forms/SubmitButton";
import {isStringEmpty, isStringNumeralsOnly} from "../common/utils/stringUtils";

//Returns a summary Form with fields filled
function MemberAccountSummary(props) {
    const { history } = props;
    const [firstName, setFirstName] = useState(history && history.firstName || "");
    const [lastName, setLastName] = useState(history && history.lastName || "");
    const [yearOfBirth, setYearOfBirth] = useState(history && history.yearOfBirth || "");
    const [email, setEmail] = useState(history && history.email || "");
    const [phoneNumber, setPhoneNumber] = useState(history && history.phoneNumber || {
        first: "",
        middle: "",
        last: ""
    });
    const [useDifferentMailingAddress, setUseDifferentMailingAddress] = useState(history && history.useDifferentMailingAddress || false);
    const [address, setAddress] = useState(history && history.address || {
        street: "",
        aptNum: "",
        city: "",
        province: "",
        postalCode: ""
    });
    const [mailingAddress, setMailingAddress] = useState(history && history.mailingAddress || {
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
    const handleYearChange = e => {
        setYearOfBirth(e.value);
    }
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
    }
    function onSubmit(event) {
        if (!isFormValid()) {
            event.preventDefault();
            return;
        }
        alert("Account information saved");
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
                            <TextArea
                                className={"input"}
                                labelClassName={"label"}
                                label="First Name"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                            <TextArea
                                className={"input"}
                                labelClassName={"label"}
                                label="Last Name"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                            <TextArea
                                className="input"
                                placeholder="personal@email.ca"
                                label="Email"
                                value={email}
                                labelClassName={"label"}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <label className={"label"}>Year of Birth</label>
                            <BirthYear label={"Year of Birth"} givenYear={yearOfBirth} onChange={handleYearChange}/>
                            <PhoneNumInput
                                className="w-1/4 phone"
                                labelClassName={"label"}
                                label="Phone Number"
                                value={phoneNumber}
                                onChange={handlePhoneChange}/>
                            <Address
                                label="Address"
                                cityClassName="city-postal"
                                value={address}
                                onChange={setAddress}
                            />

                            <span className="info-detail">Select checkbox below if your mailing address differs from the address above</span>
                            <Checkbox
                                label="Different Mailing Address"
                                checked={useDifferentMailingAddress}
                                onChange={() => setUseDifferentMailingAddress(!useDifferentMailingAddress)}
                            />

                            {useDifferentMailingAddress &&
                            <Address
                                label="Mailing Address"
                                value={mailingAddress}
                                onChange={setMailingAddress}
                            />}
                        </div>
                    </div>
                </div>
                <div className="px-4 pt-4 mt-4 text-center bg-gray-50 sm:px-6">
                    <SubmitButton
                        inputValue={"Save"}
                        className="text-base btn btn-green"
                        onClick={onSubmit}
                    />
                </div>
            </div>
        </div>
    );
}

MemberAccountSummary.propTypes = {
    history: PropTypes.object.isRequired
}

export default MemberAccountSummary