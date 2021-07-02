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
import {
    validateInput,
    checkIfErrorsExistInMapping,
    validatePhoneNumber,
    validateEmail, getConcatenatedErrorMessage, getPhoneNumberFromStrings
} from "../../registration/registrationUtils";
import {dropdownDefaultCSS, dropdownErrorCSS} from "../../css/dropdownCSSUtil";
import {splitPhoneNumber} from "../accountSummaryUtils";
import {MEMBER_PROFILE_INFO_TEXT} from "../../common/constants/TooltipText";
import Asterisk from "../../common/forms/Asterisk";
import * as MemberService from '../../services/MemberService';
import {connect} from "react-redux";
import { useHistory } from "react-router-dom";
import {SESSION_ERR} from "../../common/constants/errors";
import {bindActionCreators} from "redux";
import {reset} from "../../redux/actionCreators";

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ reset }, dispatch);
}

const SUCCESS_MESSAGE = 'Account info successfully updated!';

//Returns a summary Form with fields filled
function MemberAccountSummary(props) {
    const { member, reset } = props;

    const history = useHistory();

    //Account variables
    const [firstName, setFirstName] = useState(member.firstName);
    const [lastName, setLastName] = useState(member.lastName);
    const [email, setEmail] = useState(member.email);
    const [phoneNumber, setPhoneNumber] = useState(splitPhoneNumber(member.phoneNumber));
    const [useDifferentMailingAddress, setUseDifferentMailingAddress] = useState(member.hasDifferentMailingAddress);
    const [address, setAddress] = useState({
        street: member.addressLine1,
        aptNum: member.addressLine2,
        city: member.city,
        province: member.province,
        postalCode: member.postalCode
    });
    const [mailingAddress, setMailingAddress] = useState(member.hasDifferentMailingAddress ? {
        street: member.mailingAddressLine1,
        aptNum: member.mailingAddressLine2,
        city: member.mailingCity,
        province: member.mailingProvince,
        postalCode: member.mailingPostalCode
    } : {
        street: undefined,
        aptNum: undefined,
        city: undefined,
        province: undefined,
        postalCode: undefined
    });

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

    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

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
        } else if (checkIfErrorsExistInMapping(personalInfoErrors.errorAddress)){
            return false;
        } else {
            return !checkIfErrorsExistInMapping(personalInfoErrors.errorMailingAddress);
        }
    }

    function onSubmit(event) {
        if (!isFormValid()) {
            event.preventDefault();
            return;
        }

        const memberAccount = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            phoneNumber: getPhoneNumberFromStrings(phoneNumber.first, phoneNumber.middle, phoneNumber.last),
            addressLine1: address.street,
            addressLine2: address.aptNum,
            city: address.city,
            province: address.province,
            postalCode: address.postalCode,
            hasDifferentMailingAddress: useDifferentMailingAddress,
            mailingAddressLine1: useDifferentMailingAddress ? mailingAddress.street : undefined,
            mailingAddressLine2: useDifferentMailingAddress ? mailingAddress.aptNum : undefined,
            mailingCity: useDifferentMailingAddress ? mailingAddress.city : undefined,
            mailingProvince: useDifferentMailingAddress ? mailingAddress.province : undefined,
            mailingPostalCode: useDifferentMailingAddress ? mailingAddress.postalCode : undefined
        };

        MemberService.updateMemberAccountInfo(memberAccount)
            .then(res => res.json())
            .then(data => {
                if (data && data.success) {
                    setShowSuccessMessage(true);
                }
                else if (data && data.errors && Array.isArray(data.errors)) {
                    const errorMessage = getConcatenatedErrorMessage(data.errors);
                    alert(errorMessage);
                    setShowSuccessMessage(false);
                }
                else if (data && (!data.authenticated || !data.success)) {
                    reset();

                    alert(SESSION_ERR);

                    // redirect to home page
                    history.push('/');
                } else {
                    alert('There was an error when updating your profile. Please try again and contact Home Together ' +
                        'if the issue persists');
                    setShowSuccessMessage(false);
                }
            })

    }

    return (
        <div>
            <h3 className="account-summary-info-header">Personal Information</h3>
            <p className="account-summary-info-text">
                This information is about you. All fields with a <Asterisk/> are required!
            </p>
            <div className="selected-component-grid-outer">
                <div className="selected-component-grid-inner">
                    <div className="grid grid-cols-2 gap-6">
                        <div className="col-span-3 sm:col-span-2">
                            <TextArea
                                className={`${firstNameError && "border-red-500"} input`}
                                labelClassName={"label"}
                                label="First Name"
                                value={firstName}
                                required={true}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                            <TextArea
                                className={`${lastNameError && "border-red-500"} input`}
                                labelClassName={"label"}
                                label="Last Name"
                                value={lastName}
                                required={true}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                            <TextArea
                                className={`${emailError && "border-red-500"} input`}
                                placeholder="personal@email.ca"
                                label="Email"
                                value={email}
                                labelClassName={"label"}
                                required={true}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <PhoneNumInput
                                className={`${phoneNumberError && "border-red-500"} phone`}
                                labelClassName={"label"}
                                label="Phone Number"
                                value={phoneNumber}
                                required={true}
                                onChange={handlePhoneChange}/>
                            <Address
                                label="Address"
                                cityClassName="city-postal"
                                value={address}
                                onChange={setAddress}
                                required={true}
                                streetAddressError={streetAddressError}
                                cityAddressError={cityAddressError}
                                provinceAddressError={provinceAddressError}
                                postalCodeError={postalCodeError}
                            />

                            <Checkbox
                                label="Different Mailing Address"
                                toolTipText={MEMBER_PROFILE_INFO_TEXT.DIFF_MAILING_ADDRESS}
                                toolTipID={"accountSummaryDifferentMailingAddress"}
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
                                required={true}
                                onChange={setMailingAddress}
                            />}
                        </div>
                    </div>
                </div>
            </div>
            {showSuccessMessage &&
                <section className={'success-msg mb-4 justify-center'}>{SUCCESS_MESSAGE}</section>
            }
            <SubmitButton
                inputValue={"Save"}
                className="btn btn-green form-btn w-1/2"
                onClick={onSubmit}
            />
        </div>
    );
}

MemberAccountSummary.propTypes = {
    member: PropTypes.shape({
        firstName: PropTypes.string.isRequired,
        lastName: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        phoneNumber: PropTypes.string.isRequired,
        addressLine1: PropTypes.string.isRequired,
        addressLine2: PropTypes.string,
        city: PropTypes.string.isRequired,
        province: PropTypes.string.isRequired,
        postalCode: PropTypes.string.isRequired,
        hasDifferentMailingAddress: PropTypes.bool.isRequired,
        mailingAddressLine1: PropTypes.string,
        mailingAddressLine2: PropTypes.string,
        mailingCity: PropTypes.string,
        mailingProvince: PropTypes.string,
        mailingPostalCode: PropTypes.string
    }).isRequired,
    reset: PropTypes.func.isRequired
}

export default connect(null, mapDispatchToProps)(MemberAccountSummary);
