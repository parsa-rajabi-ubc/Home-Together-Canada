/**
 * @Author:     Jeff Hatton
 * @Created:    2020.11.02
 *
 * @Description: Form functional component file returning a business registration form with input validation.
 *
 */

import React, {useState} from 'react';
import PropTypes from 'prop-types';
import TextArea from '../common/forms/TextArea';
import Checkbox from "../common/forms/Checkbox";
import Button from '../common/forms/Button';
import SubmitButton from "../common/forms/SubmitButton";
import Address from "../common/forms/Address";
import SignInInfo from "../common/forms/SignInInfo";
import PhoneNumInput from "../common/forms/PhoneNumInput";
import {isStringEmail, isStringEmpty, isStringSame, isStringNumeralsOnly} from "../common/utils/stringUtils";
import RegistrationService from '../services/RegistrationService';
import {getConcatenatedErrorMessage, getPhoneNumberFromStrings} from "./registrationUtils";
import Asterisk from "../common/forms/Asterisk";
import {connect} from 'react-redux';
import {setAccountType, setAuthenticated} from '../redux/slices/userPrivileges';
import Tooltip from "../common/forms/Tooltip";
import {USER_TYPES} from "../common/constants/users";

const mapDispatch = {setAccountType, setAuthenticated};


// TODO: separate this into container and presentational components (see https://css-tricks.com/learning-react-container-components/)
const BusinessRegistrationForm = (props) => {
    const {history, setAccountType, setAuthenticated} = props;

    const [useDifferentMailingAddress, setUseDifferentMailingAddress] = useState(false);
    const [isNationWide, setIfNationWide] = useState(false);
    const [isIncorporated, setIsIncorporated] = useState(false);

    //Validation state variables
    const [bName, setBName] = useState("");
    const [bEmail, setBEmail] = useState("");
    const [incorporatedOwnersNames, setIncorporatedOwnersNames] = useState("");
    const [bPhoneNumber, setBPhoneNumber] = useState({
        first: "",
        middle: "",
        last: ""
    });
    const [bCellNumber, setBCellNumber] = useState({
        first: "",
        middle: "",
        last: ""
    });
    const [bAddress, setBAddress] = useState({
        street: "",
        aptNum: "",
        city: "",
        province: "",
        postalCode: ""
    });
    const [bMailingAddress, setBMailingAddress] = useState({
        street: "",
        aptNum: "",
        city: "",
        province: "",
        postalCode: ""
    });
    const [bMapAddress, setBMapAddress] = useState({
        street: "",
        aptNum: "",
        city: "",
        province: "",
        postalCode: ""
    });
    const [website, setWebsite] = useState("");
    const [contactFName, setContactFName] = useState("");
    const [contactLName, setContactLName] = useState("");
    const [contactPhoneNumber, setContactPhoneNumber] = useState({
        first: "",
        middle: "",
        last: ""
    });
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordCheck, setPasswordCheck] = useState("");

    // TODO: convert this into an array of errors
    const isFormValid = () => {
        if (isStringEmpty(bName)) {
            alert("Business Name Required");
            return false;
        }
        if (isStringEmpty(bEmail)) {
            alert("Business Email Required");
            return false;
        } else {
            if (!isStringEmail(bEmail)) {
                alert("Business email is invalid");
                return false;
            }
        }
        if (isStringEmpty(bPhoneNumber.first) || isStringEmpty(bPhoneNumber.middle) || isStringEmpty(bPhoneNumber.last)) {
            alert("Business Phone Number missing parts");
            return false;
        } else {
            if (!isStringNumeralsOnly(bPhoneNumber.first) || !isStringNumeralsOnly(bPhoneNumber.middle) || !isStringNumeralsOnly(bPhoneNumber.last)) {
                alert("Business Phone Number has invalid characters");
                return false;
            }
            if (!(bPhoneNumber.first.length === 3) || !(bPhoneNumber.middle.length === 3) || !(bPhoneNumber.last.length === 4)) {
                alert("Business Phone Number has invalid number of characters");
                return false;
            }
        }
        if (isStringEmpty(bCellNumber.first) || isStringEmpty(bCellNumber.middle) || isStringEmpty(bCellNumber.last)) {
            alert("Business Cell Phone Number missing parts");
            return false;
        } else {
            if (!isStringNumeralsOnly(bCellNumber.first) || !isStringNumeralsOnly(bCellNumber.middle) || !isStringNumeralsOnly(bCellNumber.last)) {
                alert("Business Cell Phone Number has invalid characters");
                return false;
            }
            if (!(bCellNumber.first.length === 3) || !(bCellNumber.middle.length === 3) || !(bCellNumber.last.length === 4)) {
                alert("Business Cell Phone Number has invalid number of characters");
                return false;
            }
        }
        if (isStringEmpty(bAddress.street)) {
            alert("Business Street Address missing");
            return false;
        }
        if (isStringEmpty(bAddress.city)) {
            alert("Business Address City missing");
            return false;
        }
        if (isStringEmpty(bAddress.province)) {
            alert("Business Address Province not selected");
            return false
        }
        if (isStringEmpty(bAddress.postalCode)) {
            alert("Business Address Postal Code missing");
            return false;
        }
        if (useDifferentMailingAddress) {
            if (isStringEmpty(bMailingAddress.street)) {
                alert("Business Mailing Address Street missing");
                return false;
            }
            if (isStringEmpty(bMailingAddress.city)) {
                alert("Business Mailing Address City missing");
                return false;
            }
            if (isStringEmpty(bMailingAddress.province)) {
                alert("Business Mailing Address Province not selected");
                return false;
            }
            if (isStringEmpty(bMailingAddress.postalCode)) {
                alert("Business Mailing Address Postal Code missing");
                return false;
            }
        }
        if (!isNationWide) {
            if (isStringEmpty(bMapAddress.street)) {
                alert("Business Map Address Street missing");
                return false;
            }
            if (isStringEmpty(bMapAddress.city)) {
                alert("Business Map Address City missing");
                return false;
            }
            if (isStringEmpty(bMapAddress.province)) {
                alert("Business Map Address Province not selected");
                return false;
            }
            if (isStringEmpty(bMapAddress.postalCode)) {
                alert("Business Map Address Postal Code missing");
                return false;
            }
        }
        if (isStringEmpty(contactFName)) {
            alert("Contact First Name Required");
            return false;
        }
        if (isStringEmpty(contactLName)) {
            alert("Contact Last Name Required");
            return false;
        }
        if (isStringEmpty(contactPhoneNumber.first) || isStringEmpty(contactPhoneNumber.middle) || isStringEmpty(contactPhoneNumber.last)) {
            alert("Contact Phone Number missing parts");
            return false;
        } else {
            if (!isStringNumeralsOnly(contactPhoneNumber.first) || !isStringNumeralsOnly(contactPhoneNumber.middle) || !isStringNumeralsOnly(contactPhoneNumber.last)) {
                alert("Contact Phone Number has invalid characters");
                return false;
            }
            if (!(contactPhoneNumber.first.length === 3) || !(contactPhoneNumber.middle.length === 3) || !(contactPhoneNumber.last.length === 4)) {
                alert("Contact Phone Number has invalid number of characters");
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

    const INFO_TEXT = {
        INC_COMPANY: "Select this checkbox if your business in Incorporated",
        DIFF_MAILING_ADDRESS: "Select this checkbox if your mailing address differs from the address above",
        NATION_WIDE: "Select this checkbox if your business offers services across all of Canada",
        //TODO: Add max file size to this tooltip
        BUSINESS_LOGO: "This logo will be displayed on all of your listings and can be changed at any time",
        MAP_ADDRESS: "Address that users use to search for the business"
    };

    //function for input checks on submit
    function onSubmit(event) {
        if (!isFormValid()) {
            event.preventDefault();
            return;
        }

        const registrationData = {
            username: username,
            password: password,
            email: bEmail,
            firstName: contactFName,
            lastName: contactLName,
            phoneNumber: getPhoneNumberFromStrings(contactPhoneNumber.first, contactPhoneNumber.middle, contactPhoneNumber.last),
            addressLine1: bAddress.street,
            addressLine2: bAddress.aptNum,
            city: bAddress.city,
            province: bAddress.province,
            postalCode: bAddress.postalCode,
            hasDifferentMailingAddress: useDifferentMailingAddress,
            ...(useDifferentMailingAddress) && {mailingAddressLine1: bMailingAddress.street},
            ...(useDifferentMailingAddress) && {mailingAddressLine2: bMailingAddress.aptNum},
            ...(useDifferentMailingAddress) && {mailingCity: bMailingAddress.city},
            ...(useDifferentMailingAddress) && {mailingProvince: bMailingAddress.province},
            ...(useDifferentMailingAddress) && {mailingPostalCode: bMailingAddress.postalCode},
            businessName: bName,
            logo: undefined,
            isIncorporated: isIncorporated,
            ...(isIncorporated) && {incorporatedOwnersNames: incorporatedOwnersNames},
            businessPhoneNumber: getPhoneNumberFromStrings(bPhoneNumber.first, bPhoneNumber.middle, bPhoneNumber.last),
            businessCellPhoneNumber: getPhoneNumberFromStrings(bCellNumber.first, bCellNumber.middle, bCellNumber.last),
            isNationWide: isNationWide,
            ...(!isNationWide) && {mapAddressLine1: bMapAddress.street},
            ...(!isNationWide) && {mapAddressLine2: bMapAddress.aptNum},
            ...(!isNationWide) && {mapCity: bMapAddress.city},
            ...(!isNationWide) && {mapProvince: bMapAddress.province},
            ...(!isNationWide) && {mapPostalCode: bMapAddress.postalCode},
            website: website
        }

        RegistrationService.registerBusinessUser(registrationData)
            .then(res => res.json())
            .then(data => {
                if (!!data && data.authenticated) {
                    // dispatch action to set accountType
                    if (data.business) {
                        setAccountType({accountType: USER_TYPES.BUSINESS});
                    }

                    // dispatch action to set authenticated
                    setAuthenticated({authenticated: data.authenticated});

                    // user is authenticated, redirect to home screen
                    return history.push('/');
                } else if (!!data && data.errors && data.errors.length) {
                    const errorMessage = getConcatenatedErrorMessage(data.errors);
                    // show list of all errors
                    alert(errorMessage);
                } else if (!!data && !data.authenticated) {
                    // something went wrong with the AUTHENTICATION (not the user creation)
                    alert('Registration failed');
                }
            })
            .catch((error) => {
                alert('Something went wrong creating your user. Please try again. Error: ' + error);
            });

    }

    function handleBPhoneChange(e) {
        const value = e.target.value;
        setBPhoneNumber({
            ...bPhoneNumber,
            [e.target.name]: value
        });
    }

    function handleCellPhoneChange(e) {
        const value = e.target.value;
        setBCellNumber({
            ...bCellNumber,
            [e.target.name]: value
        });
    }

    function handleContactPhoneChange(e) {
        const value = e.target.value;
        setContactPhoneNumber({
            ...contactPhoneNumber,
            [e.target.name]: value
        });
    }

    function handleBAddressChange(address) {
        setBAddress(address);
    }

    function handleBMapAddress(address) {
        setBMapAddress(address);
    }

    function handleBMailingAddress(address) {
        setBMailingAddress(address)
    }

    return (
        <div>
            <div>
                {/*Business Details*/}
                <div className="m-10 md:grid md:grid-cols-4 md:gap-0">
                    <div className="md:col-span-1">
                        <div className="px-3 sm:px-0">
                            <h3 className="info-header">Business Details</h3>
                            <p className="info-text">
                                This information is about your business.
                            </p>
                            <p className="info-text mr-10">
                                <Asterisk/> = Required Field
                            </p>
                        </div>
                    </div>
                    <div className="mt-5 md:mt-0 md:col-span-2 shadow sm:rounded-md sm:overflow-hidden px-4 py-5 space-y-1 bg-white sm:p-6">
                        <div className="grid grid-cols-2 gap-6">
                            <div className="col-span-3 sm:col-span-2">
                                <TextArea
                                    className="mb-0 input"
                                    placeholder="" label="Business Name"
                                    autoComplete={"organization"}
                                    labelClassName={"label"}
                                    required={true}
                                    onChange={(e) => {
                                        setBName(e.target.value)
                                    }}/>
                                <div className={"my-2"}>
                                    <Checkbox label={"Incorporated Business"}
                                              toolTipText={INFO_TEXT.INC_COMPANY}
                                              toolTipID="incorporated"
                                              onChange={() => setIsIncorporated(!isIncorporated)}/>
                                    {isIncorporated && <TextArea className="input"
                                                                 placeholder={"Names of Inc. Owners (separated by comma)"}
                                                                 labelClassName={"label"}
                                                                 onChange={(e) => setIncorporatedOwnersNames(e.target.value)}/>}
                                </div>
                                <TextArea className="input"
                                          placeholder="business@email.ca"
                                          autoComplete={"email"}
                                          label="Business Email"
                                          labelClassName={"label"}
                                          required={true}
                                          onChange={(e) => {
                                              setBEmail(e.target.value)
                                          }}/>
                                <TextArea className="input"
                                          placeholder="http://www.your-website.com"
                                          optional={true}
                                          autoComplete={"url"}
                                          label="Business Website"
                                          labelClassName={"label"}
                                          onChange={e => setWebsite(e.target.value)}/>
                                <PhoneNumInput
                                    className="phone"
                                    required={true}
                                    labelClassName={"label "}
                                    label="Business Phone Number"
                                    onChange={handleBPhoneChange}/>
                                <PhoneNumInput
                                    className="phone"
                                    required={true}
                                    label="Business Cell Number"
                                    labelClassName={"label"}
                                    onChange={handleCellPhoneChange}/>
                                <Address label="Business Address"
                                         cityClassName="city-postal"
                                         required={true}
                                         onChange={handleBAddressChange}/>

                                <Checkbox label={"Different Mailing Address"}
                                          toolTipText={INFO_TEXT.DIFF_MAILING_ADDRESS}
                                          toolTipID="differentMailingAddress"
                                          onChange={() => setUseDifferentMailingAddress(!useDifferentMailingAddress)}/>
                                {useDifferentMailingAddress &&
                                <Address label="Business Mailing Address"
                                         required={true}
                                         onChange={handleBMailingAddress}/>}
                                <div>
                                    <Checkbox label={"Canada-wide Business"}
                                              toolTipText={INFO_TEXT.NATION_WIDE}
                                              toolTipID="nationWide"
                                              onChange={() => {
                                                  setIfNationWide(isNationWide => !isNationWide)
                                              }}/>
                                    {!isNationWide &&
                                    <Address label="Searchable Address"
                                             toolTipText={INFO_TEXT.MAP_ADDRESS}
                                             toolTipID={"mapAddress"}
                                             required={true}
                                             onChange={handleBMapAddress}/>}
                                </div>
                            </div>
                        </div>

                        <label className="label"> Business Logo </label>
                        <Tooltip text={INFO_TEXT.BUSINESS_LOGO} toolTipID="businessLogo"/>
                        <div
                            className="flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                            <div className="space-y-1 text-center">
                                <svg className="w-12 h-12 mx-auto text-gray-400" stroke="currentColor"
                                     fill="none" viewBox="0 0 48 48" aria-hidden="true">
                                    <path
                                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                        strokeWidth="2" strokeLinecap="round"
                                        strokeLinejoin="round"/>
                                </svg>
                                <p className="info-text">
                                    <Button
                                        className="font-medium text-indigo-600 bg-white rounded-md hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                        label="" value="Upload a file"/>
                                </p>
                                {/*TODO: update file type and size after we have implemented this feature*/}
                                <p className="text-xs text-gray-500">
                                    PNG or JPG up to 10MB
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/*Dividers*/}
            <div className="border-divider"/>

            {/*Contact Person*/}
            <div className="mt-10 sm:mt-0 m-10 md:grid md:grid-cols-4 md:gap-6">
                <div className="md:col-span-1">
                    <div className="px-4 sm:px-0">
                        <h3 className="info-header">Contact Person</h3>
                        <p className="info-text">
                            This information is about the contact person for the business.
                        </p>
                    </div>
                </div>
                <div
                    className="mt-5 md:mt-0 md:col-span-2 shadow sm:rounded-md sm:overflow-hidden px-4 py-5 space-y-1 bg-white sm:p-6">
                    <div className="grid grid-cols-6 gap-x-6">
                        <div className="column-span-6-layout">
                            <TextArea className={"input"}
                                      labelClassName={"label"}
                                      label="First Name"
                                      autoComplete={"given-name"}
                                      required={true}
                                      onChange={(e) => {
                                          setContactFName(e.target.value)
                                      }}/>
                        </div>

                        <div className="column-span-6-layout">
                            <TextArea className={"input"}
                                      labelClassName={"label"}
                                      label="Last Name"
                                      required={true}
                                      autoComplete={"family-name"}
                                      onChange={(e) => {
                                          setContactLName(e.target.value)
                                      }}/>
                        </div>

                        <div className="column-span-6-layout">
                            <PhoneNumInput
                                required={true}
                                className="w-1/4 phone"
                                labelClassName={"label"}
                                label="Personal Phone Number" onChange={handleContactPhoneChange}/>
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
                        <div className="px-4 pt-4 mt-4 text-center bg-gray-50 sm:px-6">
                            <SubmitButton label={""} inputValue={"Create Account"}
                                          className="text-base btn btn-green"
                                          onClick={onSubmit}/>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    );
}

BusinessRegistrationForm.propTypes = {
    setAccountType: PropTypes.func.isRequired,
    setAuthenticated: PropTypes.func.isRequired,
    history: PropTypes.shape({
        push: PropTypes.func
    })
}

export default connect(null, mapDispatch)(BusinessRegistrationForm);
