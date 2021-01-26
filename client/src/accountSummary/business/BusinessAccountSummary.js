/**
 * @Author:     Alex Qin
 * @Created:    2020.01.17
 *
 * @Description: business account summary
 *
 */

import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import TextArea from '../../common/forms/TextArea';
import Checkbox from "../../common/forms/Checkbox";
import SubmitButton from "../../common/forms/SubmitButton";
import Address from "../../common/forms/Address";
import PhoneNumInput from "../../common/forms/PhoneNumInput";
import {
    checkIfErrorsExistInMapping,
    getConcatenatedErrorMessage,
    getPhoneNumberFromStrings,
    validateEmail,
    validateInput,
    validatePhoneNumber
} from "../../registration/registrationUtils";
import {splitPhoneNumber} from "../accountSummaryUtils";
import {BUSINESS_INFO_TEXT} from "../../common/constants/TooltipText.js";
import Asterisk from "../../common/forms/Asterisk";
import Tooltip from "../../common/forms/Tooltip";
import UploadImage from "../../common/forms/UploadImage";
import ChangeImage from "../../common/forms/ChangeImage";
import BusinessService from '../../services/BusinessService';
import UploadService from '../../services/UploadService';
import {setAccountType, setAuthenticated} from "../../redux/slices/userPrivileges";
import {USER_TYPES} from "../../common/constants/users";
import has from "lodash/has";
import { useHistory } from "react-router-dom";

const mapDispatch = {setAccountType, setAuthenticated};

const BusinessAccountSummary = (props) => {
    const {
        addressLine1,
        addressLine2,
        businessName,
        businessCellPhoneNumber,
        businessPhoneNumber,
        city,
        email,
        firstName,
        hasDifferentMailingAddress,
        incorporatedOwnersNames,
        isIncorporated,
        isNationWide,
        lastName,
        logo,
        mailingAddressLine1,
        mailingAddressLine2,
        mailingCity,
        mailingPostalCode,
        mailingProvince,
        mapAddressLine1,
        mapAddressLine2,
        mapCity,
        mapPostalCode,
        mapProvince,
        phoneNumber,
        postalCode,
        province,
        website,
        setAccountType,
        setAuthenticated,
    } = props;

    const history = useHistory();

    const [useDifferentMailingAddress, setUseDifferentMailingAddress] = useState(hasDifferentMailingAddress);
    const [isNationWideBusiness, setIsNationWideBusiness] = useState(isNationWide);
    const [isIncorporatedBusiness, setIsIncorporatedBusiness] = useState(isIncorporated);

    //Validation state variables
    const [bName, setBName] = useState(businessName);
    const [bEmail, setBEmail] = useState(email);
    const [incorporatedOwners, setIncorporatedOwners] = useState(incorporatedOwnersNames);


    const [bPhoneNumber, setBPhoneNumber] = useState(splitPhoneNumber(businessPhoneNumber));
    const [bCellNumber, setBCellNumber] = useState(splitPhoneNumber(businessCellPhoneNumber));

    const [bAddress, setBAddress] = useState({
        street: addressLine1,
        aptNum: addressLine2,
        city: city,
        province: province,
        postalCode: postalCode,
    });
    const [bMailingAddress, setBMailingAddress] = useState(hasDifferentMailingAddress ? {
        street: mailingAddressLine1,
        aptNum: mailingAddressLine2,
        city: mailingCity,
        province: mailingProvince,
        postalCode: mailingPostalCode,
    } : {
        street: undefined,
        aptNum: undefined,
        city: undefined,
        province: undefined,
        postalCode: undefined
    });
    const [bMapAddress, setBMapAddress] = useState(!isNationWide ? {
        street: mapAddressLine1,
        aptNum: mapAddressLine2,
        city: mapCity,
        province: mapProvince,
        postalCode: mapPostalCode
    } : {
        street: undefined,
        aptNum: undefined,
        city: undefined,
        province: undefined,
        postalCode: undefined
    });
    const [businessWebsite, setBusinessWebsite] = useState(website);
    const [contactFName, setContactFName] = useState(firstName);
    const [contactLName, setContactLName] = useState(lastName);

    const [contactPhoneNumber, setContactPhoneNumber] = useState(splitPhoneNumber(phoneNumber));

    const [businessLogo, setBusinessLogo] = useState(logo);


    // business Details
    const [businessNameError, setBusinessNameError] = useState(undefined);
    const [bEmailError, setBEmailError] = useState(undefined);
    const [bPhoneNumberError, setBPhoneNumberError] = useState(undefined);
    const [bCellNumberError, setBCellNumberError] = useState(undefined);

    // business Address
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

    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

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
        if (!isNationWideBusiness) {
            bMapAddress.street !== undefined && validateInput(bMapAddress.street, setStreetMapAddressError);
        }
    }, [bMapAddress.street, isNationWideBusiness]);
    useEffect(() => {
        if (!isNationWide) {
            bMapAddress.city !== undefined && validateInput(bMapAddress.city, setCityMapAddressError);
        }
    }, [bMapAddress.city, isNationWideBusiness]);
    useEffect(() => {
        if (!isNationWide) {
            bMapAddress.postalCode !== undefined && validateInput(bMapAddress.postalCode, setPostalCodeMapError);
        }
    }, [bMapAddress.postalCode, isNationWideBusiness]);


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

        // business Details
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
        if (!isNationWideBusiness) {
            businessDetailsErrors.errorMapAddress.street = validateInput(bMapAddress.street, setStreetMapAddressError);
            businessDetailsErrors.errorMapAddress.city = validateInput(bMapAddress.city, setCityMapAddressError);
            businessDetailsErrors.errorMapAddress.province = validateInput(bMapAddress.province, setProvinceMapAddressError);
            businessDetailsErrors.errorMapAddress.postalCode = validateInput(bMapAddress.postalCode, setPostalCodeMapError);
        }

        // Contact Person Validation
        contactPersonErrors.errorFirstName = validateInput(contactFName, setContactFirstNameError);
        contactPersonErrors.errorLastName = validateInput(contactLName, setContactLastNameError);
        contactPersonErrors.errorPhoneNumber = validatePhoneNumber(contactPhoneNumber, setContactPhoneNumberError);

        // check business details for errors
        if (checkIfErrorsExistInMapping(businessDetailsErrors)) {
            return false;
            // check contact person for errors
        } else if (checkIfErrorsExistInMapping(businessDetailsErrors.errorPhoneNumber)) {
            return false;
        } else if (checkIfErrorsExistInMapping(businessDetailsErrors.errorAddress)) {
            return false;
        } else if (checkIfErrorsExistInMapping(businessDetailsErrors.errorMailingAddress)) {
            return false;
        } else if (checkIfErrorsExistInMapping(businessDetailsErrors.errorMapAddress)) {
            return false;
        } else return !checkIfErrorsExistInMapping(contactPersonErrors);
    }

    //function for input checks on submit
    function onSave(event) {
        if (!isFormValid()) {
            event.preventDefault();
            return
        }

        const updatedAccountInfo = {
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
            mailingAddressLine1: useDifferentMailingAddress ? bMailingAddress.street : undefined,
            mailingAddressLine2: useDifferentMailingAddress ? bMailingAddress.aptNum : undefined,
            mailingCity: useDifferentMailingAddress ? bMailingAddress.city : undefined,
            mailingProvince: useDifferentMailingAddress ? bMailingAddress.province : undefined,
            mailingPostalCode: useDifferentMailingAddress ? bMailingAddress.postalCode : undefined,
            businessName: bName,
            isIncorporated: isIncorporatedBusiness,
            incorporatedOwnersNames: incorporatedOwners,
            businessPhoneNumber: getPhoneNumberFromStrings(bPhoneNumber.first, bPhoneNumber.middle, bPhoneNumber.last),
            businessCellPhoneNumber: getPhoneNumberFromStrings(bCellNumber.first, bCellNumber.middle, bCellNumber.last),
            isNationWide: isNationWideBusiness,
            mapAddressLine1: bMapAddress.street,
            mapAddressLine2: bMapAddress.aptNum,
            mapCity: bMapAddress.city,
            mapProvince: bMapAddress.province,
            mapPostalCode: bMapAddress.postalCode,
            website: businessWebsite
        }

        BusinessService.updateBusinessAccountInfo(updatedAccountInfo)
            .then(res => res.json())
            .then(data => {
                if (data && data.errors && Array.isArray(data.errors)) {
                    const errorMessage = getConcatenatedErrorMessage(data.errors);
                    alert(errorMessage);
                    setShowSuccessMessage(false);
                } else if (data && !data.authenticated && !data.success) {
                    setAccountType({accountType: USER_TYPES.UNREGISTERED});
                    setAuthenticated({authenticated: false});

                    alert('There was an error with your session. Please try to login again.');

                    // redirect to home page
                    history.push('/');
                } else if (data || data.success) {
                    if (businessLogo !== logo) {
                        UploadService.uploadLogo(businessLogo)
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
                    setShowSuccessMessage(true);
                } else {
                    alert('There was an error updating your account information. Please try again and report the ' +
                        'issue to Home Together if it persists.');
                    setShowSuccessMessage(false);
                }
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
        setBusinessLogo(e.target.files[0]);
    }

    function handleUseDifferentMailingAddressChange() {
    // clears mailing address object (so that values aren't saved when the business does not use a
    // different address)
    if (useDifferentMailingAddress) {
            setBMailingAddress({
                street: undefined,
                aptNum: undefined,
                city: undefined,
                province: undefined,
                postalCode: undefined,
            });
        }
        setUseDifferentMailingAddress(!useDifferentMailingAddress);
    }

    function handleIsNationWideBusinessChange() {
        // clears the map address object (so that values aren't saved when the business is nationwide)
        if (!isNationWideBusiness) {
            setBMapAddress({
                street: undefined,
                aptNum: undefined,
                city: undefined,
                province: undefined,
                postalCode: undefined,
            });
        }
        setIsNationWideBusiness(!isNationWideBusiness);
    }

    function handleIsIncorporatedBusinessChange() {
        // clears the map address object (so that values aren't saved when the business is nationwide)
        if (isIncorporatedBusiness) {
            setIncorporatedOwners('');
        }
        setIsIncorporatedBusiness(!isIncorporatedBusiness);
    }

    return (
        <div>
            <h3 className="account-summary-info-header">Business Details</h3>
            <p className="account-summary-info-text">
                This information is about your business. All fields with a <Asterisk/> are required!
            </p>
            {/*business Details*/}
            <div className="selected-component-grid-outer">
                <div className="selected-component-grid-inner">
                    <div className="grid grid-cols-2 gap-6">
                        <div className="col-span-3 sm:col-span-2">
                            <TextArea
                                className={`${businessNameError && "border-red-500"} mb-0 input`}
                                label="Business Name"
                                value={bName}
                                autoComplete={"organization"}
                                labelClassName={"label"}
                                required={true}
                                onChange={(e) => {
                                    setBName(e.target.value)
                                }}/>
                            <div className={"my-2"}>
                                <Checkbox
                                    label={"Incorporated business"}
                                    checked={isIncorporatedBusiness}
                                    toolTipText={BUSINESS_INFO_TEXT.INC_COMPANY}
                                    toolTipID="incorporated"
                                    onChange={handleIsIncorporatedBusinessChange}/>
                                {isIncorporatedBusiness &&
                                <TextArea
                                    className="input"
                                    placeholder={"Names of Inc. Owners (separated by comma)"}
                                    labelClassName={"label"}
                                    value={incorporatedOwners || ''}
                                    onChange={(e) => setIncorporatedOwners(e.target.value)}/>
                                }
                            </div>
                            <TextArea
                                className={`${bEmailError && "border-red-500"} input`}
                                placeholder="business@email.ca"
                                autoComplete={"email"}
                                label="Business Email"
                                value={bEmail}
                                labelClassName={"label"}
                                required={true}
                                onChange={(e) => {
                                    setBEmail(e.target.value)
                                }}/>
                            <TextArea
                                className="input"
                                placeholder="http://www.your-website.com"
                                value={businessWebsite}
                                optional={true}
                                autoComplete={"url"}
                                label="Business Website"
                                labelClassName={"label"}
                                onChange={e => setBusinessWebsite(e.target.value)}/>
                            <PhoneNumInput
                                className={`${bPhoneNumberError && "border-red-500"} phone`}
                                required={true}
                                value={bPhoneNumber}
                                labelClassName={"label "}
                                label="Business Phone Number"
                                onChange={handleBPhoneChange}/>
                            <PhoneNumInput
                                className={`${bCellNumberError && "border-red-500"} phone`}
                                required={true}
                                value={bCellNumber}
                                label="Business Cell Number"
                                labelClassName={"label"}
                                onChange={handleCellPhoneChange}/>
                            <Address
                                label="Business Address"
                                cityClassName="city-postal"
                                required={true}
                                value={bAddress}
                                streetAddressError={streetAddressError}
                                cityAddressError={cityAddressError}
                                provinceAddressError={provinceAddressError}
                                postalCodeError={postalCodeError}
                                onChange={handleBAddressChange}/>
                            <Checkbox
                                label={"Different Mailing Address"}
                                checked={useDifferentMailingAddress}
                                toolTipText={BUSINESS_INFO_TEXT.DIFF_MAILING_ADDRESS}
                                toolTipID="differentMailingAddress"
                                onChange={handleUseDifferentMailingAddressChange}/>
                            {useDifferentMailingAddress &&
                                <Address
                                    label="Business Mailing Address"
                                    value={bMailingAddress}
                                    required={true}
                                    streetAddressError={streetMailingAddressError}
                                    cityAddressError={cityMailingAddressError}
                                    provinceAddressError={provinceMailingAddressError}
                                    postalCodeError={postalCodeMailingError}
                                    onChange={handleBMailingAddress}/>
                            }
                            <div>
                                <Checkbox
                                    label={"Canada-wide business"}
                                    checked={isNationWideBusiness}
                                    toolTipText={BUSINESS_INFO_TEXT.NATION_WIDE}
                                    toolTipID="nationWide"
                                    onChange={handleIsNationWideBusinessChange}/>
                                {!isNationWideBusiness &&
                                    <Address
                                        label="Searchable Address"
                                        value={bMapAddress}
                                        toolTipText={BUSINESS_INFO_TEXT.MAP_ADDRESS}
                                        toolTipID={"mapAddress"}
                                        required={true}
                                        streetAddressError={streetMapAddressError}
                                        cityAddressError={cityMapAddressError}
                                        provinceAddressError={provinceMapAddressError}
                                        postalCodeError={postalCodeMapError}
                                        onChange={handleBMapAddress}/>
                                }
                            </div>
                        </div>
                    </div>

                    <label className="label"> Business Logo </label>
                    <Tooltip text={BUSINESS_INFO_TEXT.BUSINESS_LOGO} toolTipID="businessLogo"/>
                    {logo
                        ? <ChangeImage
                            imageAddress={businessLogo}
                            handleImageUpload={handleImageUpload}
                        />
                        : <UploadImage handleImageUpload={handleImageUpload}/>
                    }
                </div>
            </div>
            <h3 className="account-summary-info-header">Contact Person</h3>
            <p className="account-summary-info-text">
                This information is about the contact person for the business.
            </p>
            {/*Contact Person*/}
            <div className="selected-component-grid-outer">
                <div className="selected-component-grid-inner">
                    <div className="grid grid-cols-6 gap-x-6">
                        <div className="column-span-6-layout">
                            <TextArea
                                className={`${contactFirstNameError && "border-red-500"} input`}
                                labelClassName={"label"}
                                label="First Name"
                                value={contactFName}
                                autoComplete={"given-name"}
                                required={true}
                                onChange={(e) => {
                                    setContactFName(e.target.value)
                                }}/>
                        </div>

                        <div className="column-span-6-layout">
                            <TextArea
                                className={`${contactLastNameError && "border-red-500"} input`}
                                labelClassName={"label"}
                                label="Last Name"
                                value={contactLName}
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
                                value={contactPhoneNumber}
                                labelClassName={"label"}
                                label="Personal Phone Number" onChange={handleContactPhoneChange}/>
                        </div>
                    </div>
                </div>
            </div>
            {showSuccessMessage &&
            <section className={'success-msg mb-4 justify-center'}>Account info successfully updated!</section>
            }
            <SubmitButton
                inputValue={"Save"}
                className="btn btn-green form-btn w-1/2"
                onClick={onSave}
            />
        </div>
    );
}

BusinessAccountSummary.propTypes = {
    setAccountType: PropTypes.func.isRequired,
    setAuthenticated: PropTypes.func.isRequired,
    addressLine1: PropTypes.string.isRequired,
    addressLine2: PropTypes.string,
    businessCellPhoneNumber: PropTypes.string.isRequired,
    businessName: PropTypes.string.isRequired,
    businessPhoneNumber: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    hasDifferentMailingAddress: PropTypes.bool.isRequired,
    incorporatedOwnersNames: PropTypes.string,
    isIncorporated: PropTypes.bool.isRequired,
    isNationWide: PropTypes.bool.isRequired,
    lastName: PropTypes.string.isRequired,
    logo: PropTypes.string,
    mailingAddressLine1: PropTypes.string,
    mailingAddressLine2: PropTypes.string,
    mailingCity: PropTypes.string,
    mailingPostalCode: PropTypes.string,
    mailingProvince: PropTypes.string,
    mapAddressLine1: PropTypes.string,
    mapAddressLine2: PropTypes.string,
    mapCity: PropTypes.string,
    mapPostalCode: PropTypes.string,
    mapProvince: PropTypes.string,
    phoneNumber: PropTypes.string,
    postalCode: PropTypes.string.isRequired,
    province: PropTypes.string.isRequired,
    website: PropTypes.string
}

export default connect(null, mapDispatch)(BusinessAccountSummary);
