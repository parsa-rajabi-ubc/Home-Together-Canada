/**
 * @Author:     Jeff Hatton
 * @Created:    2020.11.02
 *
 * @Description: Form functional component file returning a business registration form with input validation.
 *
 */

import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import TextArea from '../common/forms/TextArea';
import Checkbox from "../common/forms/Checkbox";
import SubmitButton from "../common/forms/SubmitButton";
import Address from "../common/forms/Address";
import SignInInfo from "../common/forms/SignInInfo";
import PhoneNumInput from "../common/forms/PhoneNumInput";
import RegistrationService from '../services/RegistrationService';
import UploadService from '../services/UploadService';
import {
    checkIfErrorsExistInMapping,
    getConcatenatedErrorMessage,
    getPhoneNumberFromStrings,
    validateEmail,
    validateInput,
    validatePassword,
    validatePasswordConfirmationEmpty,
    validatePasswordConfirmationMismatch,
    validatePhoneNumber
} from "./registrationUtils";
import Asterisk from "../common/forms/Asterisk";
import {connect} from 'react-redux';
import {setAccountType, setAuthenticated} from '../redux/slices/userPrivileges';
import Tooltip from "../common/forms/Tooltip";
import {USER_TYPES} from "../common/constants/users";
import FileUploadButton from "../common/forms/FileUploadButton";
import has from 'lodash/has';

const mapDispatch = {setAccountType, setAuthenticated};


const BusinessRegistrationForm = (props) => {
    const {history, setAccountType, setAuthenticated} = props;

    const [useDifferentMailingAddress, setUseDifferentMailingAddress] = useState(false);
    const [isNationWide, setIfNationWide] = useState(false);
    const [isIncorporated, setIsIncorporated] = useState(false);

    const [bName, setBName] = useState(undefined);
    const [bEmail, setBEmail] = useState(undefined);
    const [incorporatedOwnersNames, setIncorporatedOwnersNames] = useState("");
    const [bPhoneNumber, setBPhoneNumber] = useState({
        first: undefined,
        middle: undefined,
        last: undefined,
    });
    const [bCellNumber, setBCellNumber] = useState({
        first: undefined,
        middle: undefined,
        last: undefined,
    });
    const [bAddress, setBAddress] = useState({
        street: undefined,
        aptNum: undefined,
        city: undefined,
        province: undefined,
        postalCode: undefined,
    });
    const [bMailingAddress, setBMailingAddress] = useState({
        street: undefined,
        aptNum: undefined,
        city: undefined,
        province: undefined,
        postalCode: undefined,
    });
    const [bMapAddress, setBMapAddress] = useState({
        street: undefined,
        aptNum: undefined,
        city: undefined,
        province: undefined,
        postalCode: undefined,
    });
    const [website, setWebsite] = useState(undefined);
    const [contactFName, setContactFName] = useState(undefined);
    const [contactLName, setContactLName] = useState(undefined);
    const [contactPhoneNumber, setContactPhoneNumber] = useState({
        first: undefined,
        middle: undefined,
        last: undefined,
    });
    const [username, setUsername] = useState(undefined);
    const [password, setPassword] = useState(undefined);
    const [passwordCheck, setPasswordCheck] = useState(undefined);
    const [logo, setLogo] = useState('');

    //Validation state variables
    // Business Details
    const [businessNameError, setBusinessNameError] = useState(undefined);
    const [bEmailError, setBEmailError] = useState(undefined);
    const [bPhoneNumberError, setBPhoneNumberError] = useState(undefined);
    const [bCellNumberError, setBCellNumberError] = useState(undefined);

    // Business Address
    const [streetAddressError, setStreetAddressError] = useState(undefined);
    const [cityAddressError, setCityAddressError] = useState(undefined);
    const [provinceAddressError, setProvinceAddressError] = useState(undefined);
    const [postalCodeError, setPostalCodeError] = useState(undefined);

    // Mailing Address
    const [streetMailingAddressError, setStreetMailingAddressError] = useState(undefined);
    const [cityMailingAddressError, setCityMailingAddressError] = useState(undefined);
    const [provinceMailingAddressError, setProvinceMailingAddressError] = useState(undefined);
    const [postalCodeMailingError, setPostalCodeMailingError] = useState(undefined);

    // Map Address
    const [streetMapAddressError, setStreetMapAddressError] = useState(undefined);
    const [cityMapAddressError, setCityMapAddressError] = useState(undefined);
    const [provinceMapAddressError, setProvinceMapAddressError] = useState(undefined);
    const [postalCodeMapError, setPostalCodeMapError] = useState(undefined);

    // Contact Person Start
    const [contactFirstNameError, setContactFirstNameError] = useState(undefined);
    const [contactLastNameError, setContactLastNameError] = useState(undefined);
    const [contactPhoneNumberError, setContactPhoneNumberError] = useState(undefined);
    // Contact Person End

    // Account Details Start
    const [usernameError, setUsernameError] = useState(undefined);
    const [passwordError, setPasswordError] = useState(undefined);
    const [passwordConfirmError, setPasswordConfirmError] = useState(undefined);
    // Account Details End


    // business details
    useEffect(() => {
        bName !== undefined && validateInput(bName, setBusinessNameError);
    }, [bName]);
    useEffect(() => {
        bEmail !== undefined && validateEmail(bEmail, setBEmailError);
    }, [bEmail]);
    useEffect(() => {
        if (bPhoneNumber.first !== undefined || bPhoneNumber.middle !== undefined || bPhoneNumber.last !== undefined) {
            validatePhoneNumber(bPhoneNumber, setBPhoneNumberError);
        }
    }, [bPhoneNumber]);
    useEffect(() => {
        if (bCellNumber.first !== undefined || bCellNumber.middle !== undefined || bCellNumber.last !== undefined) {
            validatePhoneNumber(bCellNumber, setBCellNumberError);
        }
    }, [bCellNumber]);

    // Address
    useEffect(() => {
        bAddress.street !== undefined && validateInput(bAddress.street, setStreetAddressError);
    }, [bAddress.street]);
    useEffect(() => {
        bAddress.city !== undefined && validateInput(bAddress.city, setCityAddressError);
    }, [bAddress.city]);
    useEffect(() => {
        bAddress.postalCode !== undefined && validateInput(bAddress.postalCode, setPostalCodeError);
    }, [bAddress.postalCode]);

    // Mailing Address
    useEffect(() => {
        if (useDifferentMailingAddress) {
            bMailingAddress.street !== undefined && validateInput(bMailingAddress.street, setStreetMailingAddressError);
        }
    }, [bMailingAddress.street, useDifferentMailingAddress]);
    useEffect(() => {
        if (useDifferentMailingAddress) {
            bMailingAddress.city !== undefined && validateInput(bMailingAddress.city, setCityMailingAddressError);
        }
    }, [bMailingAddress.city, useDifferentMailingAddress]);
    useEffect(() => {
        if (useDifferentMailingAddress) {
            bMailingAddress.postalCode !== undefined && validateInput(bMailingAddress.postalCode, setPostalCodeMailingError);
        }
    }, [bMailingAddress.postalCode, useDifferentMailingAddress]);

    // Map Address
    useEffect(() => {
        if (!isNationWide) {
            bMapAddress.street !== undefined && validateInput(bMapAddress.street, setStreetMapAddressError);
        }
    }, [bMapAddress.street, isNationWide]);
    useEffect(() => {
        if (!isNationWide) {
            bMapAddress.city !== undefined && validateInput(bMapAddress.city, setCityMapAddressError);
        }
    }, [bMapAddress.city, isNationWide]);
    useEffect(() => {
        if (!isNationWide) {
            bMapAddress.postalCode !== undefined && validateInput(bMapAddress.postalCode, setPostalCodeMapError);
        }
    }, [bMapAddress.postalCode, isNationWide]);


    // contact person useEffect
    useEffect(() => {
        contactFName !== undefined && validateInput(contactFName, setContactFirstNameError);
    }, [contactFName]);
    useEffect(() => {
        contactLName !== undefined && validateInput(contactLName, setContactLastNameError);
    }, [contactLName]);
    useEffect(() => {
        if (contactPhoneNumber.first !== undefined || contactPhoneNumber.middle !== undefined || contactPhoneNumber.last !== undefined) {
            validatePhoneNumber(contactPhoneNumber, setContactPhoneNumberError);
        }
    }, [contactPhoneNumber]);

    // Account Details
    useEffect(() => {
        username !== undefined && validateInput(username, setUsernameError);
    }, [username]);
    useEffect(() => {
        password !== undefined && validatePassword(password, setPasswordError);
    }, [password]);
    useEffect(() => {
        passwordCheck !== undefined && validatePasswordConfirmationEmpty(passwordCheck, setPasswordConfirmError);
    }, [passwordCheck]);
    useEffect(() => {
        if (password !== undefined && passwordCheck !== undefined) {
            validatePasswordConfirmationMismatch(password, passwordCheck, setPasswordConfirmError);
        }
    }, [password, passwordCheck]);

    const isFormValid = () => {

        const businessDetailsErrors = {
            errorBusinessName: false,
            errorBusinessEmail: false,
            errorPhoneNumber: {
                regular: false,
                cell: false,
            },
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
            },
            errorMapAddress: {
                street: false,
                city: false,
                province: false,
                postalCode: false,
            }
        }

        const contactPersonErrors = {
            errorFirstName: false,
            errorLastName: false,
            errorPhoneNumber: false,
        }

        const accountDetailsErrors = {
            errorUsername: false,
            errorPassword: {
                password: false,
                passwordConfirmationEmpty: false,
                passwordConfirmationMismatch: false,
            }
        }

        // Business Details
        businessDetailsErrors.errorBusinessName = validateInput(bName, setBusinessNameError);
        businessDetailsErrors.errorBusinessEmail = validateEmail(bEmail, setBEmailError);
        businessDetailsErrors.errorPhoneNumber.regular = validatePhoneNumber(bPhoneNumber, setBPhoneNumberError);
        businessDetailsErrors.errorPhoneNumber.cell = validatePhoneNumber(bCellNumber, setBCellNumberError);

        businessDetailsErrors.errorAddress.street = validateInput(bAddress.street, setStreetAddressError);
        businessDetailsErrors.errorAddress.city = validateInput(bAddress.city, setCityAddressError);
        businessDetailsErrors.errorAddress.province = validateInput(bAddress.province, setProvinceAddressError);
        businessDetailsErrors.errorAddress.postalCode = validateInput(bAddress.postalCode, setPostalCodeError);

        if (useDifferentMailingAddress) {
            businessDetailsErrors.errorMailingAddress.street = validateInput(bMailingAddress.street, setStreetMailingAddressError);
            businessDetailsErrors.errorMailingAddress.city = validateInput(bMailingAddress.city, setCityMailingAddressError);
            businessDetailsErrors.errorMailingAddress.province = validateInput(bMailingAddress.province, setProvinceMailingAddressError);
            businessDetailsErrors.errorMailingAddress.postalCode = validateInput(bMailingAddress.postalCode, setPostalCodeMailingError);
        }
        if (!isNationWide) {
            businessDetailsErrors.errorMapAddress.street = validateInput(bMapAddress.street, setStreetMapAddressError);
            businessDetailsErrors.errorMapAddress.city = validateInput(bMapAddress.city, setCityMapAddressError);
            businessDetailsErrors.errorMapAddress.province = validateInput(bMapAddress.province, setProvinceMapAddressError);
            businessDetailsErrors.errorMapAddress.postalCode = validateInput(bMapAddress.postalCode, setPostalCodeMapError);
        }

        // Contact Person Validation
        contactPersonErrors.errorFirstName = validateInput(contactFName, setContactFirstNameError);
        contactPersonErrors.errorLastName = validateInput(contactLName, setContactLastNameError);
        contactPersonErrors.errorPhoneNumber = validatePhoneNumber(contactPhoneNumber, setContactPhoneNumberError);

        // Account Details Validation
        accountDetailsErrors.errorUsername = validateInput(username, setUsernameError);
        accountDetailsErrors.errorPassword.password = validatePassword(password, setPasswordError);
        accountDetailsErrors.errorPassword.passwordConfirmationEmpty = validatePasswordConfirmationEmpty(passwordCheck, setPasswordConfirmError);
        accountDetailsErrors.errorPassword.passwordConfirmationMismatch = validatePasswordConfirmationMismatch(password, passwordCheck, setPasswordConfirmError);

        // check business details for errors
        if (checkIfErrorsExistInMapping(businessDetailsErrors)) {
            return false;
            // check contact person for errors
        } else if (checkIfErrorsExistInMapping(contactPersonErrors)) {
            return false;
            // check account details for errors
        } else if (checkIfErrorsExistInMapping(accountDetailsErrors)) {
            return false;
            // return true if no errors
        } else {
            return true;
        }
    }

    const INFO_TEXT = {
        INC_COMPANY: "Select this checkbox if your business in Incorporated",
        DIFF_MAILING_ADDRESS: "Select this checkbox if your mailing address differs from the address above",
        NATION_WIDE: "Select this checkbox if your business offers services across all of Canada",
        BUSINESS_LOGO: "This logo will be displayed on all of your listings and can be changed at any time. " +
            "Max size of 2MB",
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
                if (data && data.authenticated) {
                    // dispatch action to set accountType
                    if (data.business) {
                        setAccountType({accountType: USER_TYPES.BUSINESS});
                    }

                    // dispatch action to set authenticated
                    setAuthenticated({authenticated: data.authenticated});

                    if (logo) {
                        UploadService.uploadLogo(logo)
                            .then(res => res.json())
                            .then(data => {
                                if ((has(data, 'authenticated') && !data.authenticated) || data.err) {
                                    alert('An error occurred while uploading logo. Please try re-uploading in your ' +
                                        'Account Info page. Remember files have a maximum size of 2 MB');
                                }
                            })
                            .catch(() => {
                                alert('An error occurred while uploading logo. Please try re-uploading in your ' +
                                    'Account Info page. Remember files have a maximum size of 2 MB');
                            });
                    }

                    // user is authenticated, redirect to home screen
                    return history.push('/');
                } else if (data && data.errors && data.errors.length) {
                    const errorMessage = getConcatenatedErrorMessage(data.errors);
                    // show list of all errors
                    alert(errorMessage);
                } else if (data && !data.authenticated) {
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

    function handleImageUpload(e) {
        setLogo(e.target.files[0]);
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
                    <div
                        className="mt-5 md:mt-0 md:col-span-2 shadow sm:rounded-md sm:overflow-hidden px-4 py-5 space-y-1 bg-white sm:p-6">
                        <div className="grid grid-cols-2 gap-6">
                            <div className="col-span-3 sm:col-span-2">
                                <TextArea
                                    className={`${businessNameError && "border-red-500"} mb-0 input`}
                                    label="Business Name"
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
                                <TextArea className={`${bEmailError && "border-red-500"} input`}
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
                                    className={`${bPhoneNumberError && "border-red-500"} phone`}
                                    required={true}
                                    labelClassName={"label "}
                                    label="Business Phone Number"
                                    onChange={handleBPhoneChange}/>
                                <PhoneNumInput
                                    className={`${bCellNumberError && "border-red-500"} phone`}
                                    required={true}
                                    label="Business Cell Number"
                                    labelClassName={"label"}
                                    onChange={handleCellPhoneChange}/>
                                <Address label="Business Address"
                                         cityClassName="city-postal"
                                         required={true}
                                         streetAddressError={streetAddressError}
                                         cityAddressError={cityAddressError}
                                         provinceAddressError={provinceAddressError}
                                         postalCodeError={postalCodeError}
                                         onChange={handleBAddressChange}/>
                                <Checkbox label={"Different Mailing Address"}
                                          toolTipText={INFO_TEXT.DIFF_MAILING_ADDRESS}
                                          toolTipID="differentMailingAddress"
                                          onChange={() => setUseDifferentMailingAddress(!useDifferentMailingAddress)}/>
                                {useDifferentMailingAddress &&
                                <Address label="Business Mailing Address"
                                         required={true}
                                         streetAddressError={streetMailingAddressError}
                                         cityAddressError={cityMailingAddressError}
                                         provinceAddressError={provinceMailingAddressError}
                                         postalCodeError={postalCodeMailingError}
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
                                             streetAddressError={streetMapAddressError}
                                             cityAddressError={cityMapAddressError}
                                             provinceAddressError={provinceMapAddressError}
                                             postalCodeError={postalCodeMapError}
                                             onChange={handleBMapAddress}/>}
                                </div>
                            </div>
                        </div>

                        <label className="label"> Business Logo </label>
                        <Tooltip
                            text={INFO_TEXT.BUSINESS_LOGO}
                            toolTipID="businessLogo"
                        />
                        <div
                            className={"flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed " +
                            "rounded-md"}
                        >
                            <div className="space-y-1 text-center">
                                <svg
                                    className="w-12 h-12 mx-auto text-gray-400"
                                    stroke="currentColor"
                                    fill="none"
                                    viewBox="0 0 48 48"
                                    aria-hidden="true"
                                >
                                    <path
                                        d={"M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 " +
                                        "01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 " +
                                        "015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"}
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                                    <FileUploadButton
                                        className={"photo-upload-width photo-upload hover:text-indigo-500"}
                                        name={'logo'}
                                        uploadHandler={handleImageUpload}
                                        accept={'image/png, image/jpg, image/jpeg, image/JPG'}
                                    />
                                <p className="text-xs text-gray-500">
                                    PNG or JPG up to 2MB
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
                            <TextArea className={`${contactFirstNameError && "border-red-500"} input`}
                                      labelClassName={"label"}
                                      label="First Name"
                                      autoComplete={"given-name"}
                                      required={true}
                                      onChange={(e) => {
                                          setContactFName(e.target.value)
                                      }}/>
                        </div>

                        <div className="column-span-6-layout">
                            <TextArea className={`${contactLastNameError && "border-red-500"} input`}
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
                                className={`${contactPhoneNumberError && "border-red-500"} phone`}
                                required={true}
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
                            <h3 className="info-header">Sign In Details</h3>
                            <p className="info-text">
                                This information is to set up and access your account. Usernames are permanent.
                                They cannot be changed at a later time.
                            </p>
                        </div>
                    </div>
                    <div className="mt-5 md:mt-0 md:col-span-2">
                        <div className="overflow-hidden shadow sm:rounded-md">
                            <div className="px-4 py-6 bg-white sm:p-5">
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="col-span-3 sm:col-span-2">
                                        <SignInInfo
                                            onChangeUsername={(e) => setUsername(e.target.value)}
                                            onChangePassword={(e) => setPassword(e.target.value)}
                                            onChangePasswordCheck={(e) => setPasswordCheck(e.target.value)}
                                            usernameError={usernameError}
                                            passwordError={passwordError}
                                            passwordConfirmError={passwordConfirmError}
                                            passwordConfirmErrorMsg={(passwordConfirmError === "empty") ? "empty" :
                                                (passwordConfirmError === "mismatch" ? "mismatch" : "")}
                                        />
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
