/**
 * @Author:     Jeff Hatton
 * @Created:    2020.11.30
 *
 * @Description: Member account summary editable component Form
 *
 */
import React, {useEffect, useState} from 'react';
import PropTypes from "prop-types";
import TextArea from "../../common/forms/TextArea";
import PhoneNumInput from "../../common/forms/PhoneNumInput";
import Address from "../../common/forms/Address";
import Checkbox from "../../common/forms/Checkbox";
import SubmitButton from "../../common/forms/SubmitButton";
import get from 'lodash/get';
import {
    validateInput,
    checkIfErrorsExistInMapping,
    validatePhoneNumber,
    validateEmail
} from "../../registration/registrationUtils";
import {dropdownDefaultCSS, dropdownErrorCSS} from "../../css/dropdownCSSUtil";
import {splitPhoneNumber} from "../accountSummaryUtils";

//Returns a summary Form with fields filled
function MemberAccountSummary(props) {
    const { history } = props;

    //Account variables
    const [firstName, setFirstName] = useState(get(history, 'firstName', undefined));
    const [lastName, setLastName] = useState(get(history, 'lastName', undefined));
    const [email, setEmail] = useState(get(history, 'email', undefined));
    const [unsplitPhoneNumber, setUnsplitPhoneNumber] = useState(get(history, 'phoneNumber', undefined));
    const [phoneNumber, setPhoneNumber] = useState(splitPhoneNumber(unsplitPhoneNumber) ||
    {
        first: undefined,
        middle: undefined,
        last: undefined
    });
    const [useDifferentMailingAddress, setUseDifferentMailingAddress] = useState(get(history, 'useDifferentMailingAddress', undefined));
    const [address, setAddress] = useState(get(history, 'address', {
        street: undefined,
        aptNum: undefined,
        city: undefined,
        province: undefined,
        postalCode: undefined
    }));
    const [mailingAddress, setMailingAddress] = useState(get(history, 'mailingAddress', {
        street: undefined,
        aptNum: undefined,
        city: undefined,
        province: undefined,
        postalCode: undefined
    }));

    // Error state variables
    // Personal Information Start
    const [firstNameError, setFirstNameError] = useState(undefined);
    const [lastNameError, setLastNameError] = useState(undefined);
    const [emailError, setEmailError] = useState(undefined);
    const [phoneNumberError, setPhoneNumberError] = useState(undefined);

    //Address
    const [streetAddressError, setStreetAddressError] = useState(undefined);
    const [cityAddressError, setCityAddressError] = useState(undefined);
    const [provinceAddressError, setProvinceAddressError] = useState(undefined);
    const [postalCodeError, setPostalCodeError] = useState(undefined);

    // Mailing Address
    const [streetMailingAddressError, setStreetMailingAddressError] = useState(undefined);
    const [cityMailingAddressError, setCityMailingAddressError] = useState(undefined);
    const [provinceMailingAddressError, setProvinceMailingAddressError] = useState(undefined);
    const [postalCodeMailingError, setPostalCodeMailingError] = useState(undefined);
    // Personal Information End

    // useEffects
    useEffect(() => {
        firstName !== undefined && validateInput(firstName, setFirstNameError);
    }, [firstName]);
    useEffect(() => {
        lastName !== undefined && validateInput(lastName, setLastNameError);
    }, [lastName]);
    useEffect(() => {
        email !== undefined && validateEmail(email, setEmailError);
    }, [email]);
    useEffect(() => {
        if (phoneNumber.first !== undefined || phoneNumber.middle !== undefined || phoneNumber.last !== undefined) {
            validatePhoneNumber(phoneNumber, setPhoneNumberError);
        }
    }, [phoneNumber]);

    // Address
    useEffect(() => {
        address.street !== undefined && validateInput(address.street, setStreetAddressError);
    }, [address.street]);
    useEffect(() => {
        address.city !== undefined && validateInput(address.city, setCityAddressError);
    }, [address.city]);
    useEffect(() => {
        address.postalCode !== undefined && validateInput(address.postalCode, setPostalCodeError);
    }, [address.postalCode]);

    // Mailing Address
    useEffect(() => {
        if (useDifferentMailingAddress) {
            mailingAddress.street !== undefined && validateInput(mailingAddress.street, setStreetMailingAddressError);
        }
    }, [mailingAddress.street, useDifferentMailingAddress]);
    useEffect(() => {
        if (useDifferentMailingAddress) {
            mailingAddress.city !== undefined && validateInput(mailingAddress.city, setCityMailingAddressError);
        }
    }, [mailingAddress.city, useDifferentMailingAddress]);
    useEffect(() => {
        if (useDifferentMailingAddress) {
            mailingAddress.postalCode !== undefined && validateInput(mailingAddress.postalCode, setPostalCodeMailingError);
        }
    }, [mailingAddress.postalCode, useDifferentMailingAddress]);


    function handlePhoneChange(e) {
        const value = e.target.value;
        setPhoneNumber({
            ...phoneNumber,
            [e.target.name]: value
        });
    }
    const isFormValid = () => {

        const personalInfoErrors = {
            errorFirstName: false,
            errorLastName: false,
            errorEmail: false,
            errorPhoneNumber: false,
            errorAddress: {
                street: false,
                city: false,
                province: false,
                postalCode: false,
            },
            errorMailingAddress: {
                street: false,
                city: false,
                province: false,
                postalCode: false,
            }
        }

        // Personal Information Validation
        personalInfoErrors.errorFirstName = validateInput(firstName, setFirstNameError);
        personalInfoErrors.errorLastName = validateInput(lastName, setLastNameError);
        personalInfoErrors.errorEmail = validateEmail(email, setEmailError);
        personalInfoErrors.errorPhoneNumber = validatePhoneNumber(phoneNumber, setPhoneNumberError);
        personalInfoErrors.errorAddress.street = validateInput(address.street, setStreetAddressError);
        personalInfoErrors.errorAddress.city = validateInput(address.city, setCityAddressError);
        personalInfoErrors.errorAddress.province = validateInput(address.province, setProvinceAddressError);
        personalInfoErrors.errorAddress.postalCode = validateInput(address.postalCode, setPostalCodeError);
        if (useDifferentMailingAddress) {
            personalInfoErrors.errorMailingAddress.street = validateInput(mailingAddress.street, setStreetMailingAddressError);
            personalInfoErrors.errorMailingAddress.city = validateInput(mailingAddress.city, setCityMailingAddressError);
            personalInfoErrors.errorMailingAddress.province = validateInput(mailingAddress.province, setProvinceMailingAddressError);
            personalInfoErrors.errorMailingAddress.postalCode = validateInput(mailingAddress.postalCode, setPostalCodeMailingError);
        }

        // check personal information for errors
        if (checkIfErrorsExistInMapping(personalInfoErrors)) {
            return false;
        } else {
            return true;
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
                                className={`${firstNameError && "border-red-500"} input`}
                                labelClassName={"label"}
                                label="First Name"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                            <TextArea
                                className={`${lastNameError && "border-red-500"} input`}
                                labelClassName={"label"}
                                label="Last Name"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                            <TextArea
                                className={`${emailError && "border-red-500"} input`}
                                placeholder="personal@email.ca"
                                label="Email"
                                value={email}
                                labelClassName={"label"}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <PhoneNumInput
                                className={`${phoneNumberError && "border-red-500"} phone`}
                                labelClassName={"label"}
                                label="Phone Number"
                                value={phoneNumber}
                                onChange={handlePhoneChange}/>
                            <Address
                                label="Address"
                                cityClassName="city-postal"
                                value={address}
                                onChange={setAddress}
                                streetAddressError={streetAddressError}
                                cityAddressError={cityAddressError}
                                provinceAddressError={provinceAddressError}
                                postalCodeError={postalCodeError}
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
                                streetClassName={`${streetMailingAddressError && "border-red-500"} input`}
                                cityClassName={`${cityMailingAddressError && "border-red-500"} input`}
                                provinceClassName={provinceMailingAddressError ? dropdownErrorCSS : dropdownDefaultCSS}
                                postalCodeClassName={`${postalCodeMailingError && "border-red-500"} input`}
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