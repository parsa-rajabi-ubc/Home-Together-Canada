/**
 * @Author:     Alex Qin
 * @Created:    2020.01.17
 *
 * @Description: Business account summary
 *
 */

import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import TextArea from '../../common/forms/TextArea';
import Checkbox from "../../common/forms/Checkbox";
import Button from '../../common/forms/Button';
import SubmitButton from "../../common/forms/SubmitButton";
import Address from "../../common/forms/Address";
import PhoneNumInput from "../../common/forms/PhoneNumInput";
import {
    checkIfErrorsExistInMapping,
    validateEmail,
    validateInput,
    validatePhoneNumber
} from "../../registration/registrationUtils";
import {splitPhoneNumber} from "../accountSummaryUtils";
import {BUSINESS_INFO_TEXT} from "../../common/constants/TooltipText.js";
import Asterisk from "../../common/forms/Asterisk";
import Tooltip from "../../common/forms/Tooltip";
import get from 'lodash/get';
import FileUploadButton from "../../common/forms/FileUploadButton";

const BusinessAccountSummary = (props) => {
    const {businessAccountInfo} = props;

    const [useDifferentMailingAddress, setUseDifferentMailingAddress] = useState(get(businessAccountInfo, 'useDifferentMailingAddress', false));
    const [isNationWide, setIfNationWide] = useState(get(businessAccountInfo, 'isNationWide', false));
    const [isIncorporated, setIsIncorporated] = useState(get(businessAccountInfo, 'isIncorporated', false));

    //Validation state variables
    const [bName, setBName] = useState(get(businessAccountInfo, 'bName', undefined));
    const [bEmail, setBEmail] = useState(get(businessAccountInfo, 'bEmail', undefined));
    const [incorporatedOwnersNames, setIncorporatedOwnersNames] = useState(get(businessAccountInfo, 'incorporatedOwnersNames', ""));

    const unsplitBPhoneNumber = get(businessAccountInfo,"bPhoneNumber",undefined)

    const [bPhoneNumber, setBPhoneNumber] = useState(splitPhoneNumber(unsplitBPhoneNumber) ||{
        first: undefined,
        middle: undefined,
        last: undefined
    });

    const unsplitBCellNumber = get(businessAccountInfo,"bCellNumber",undefined)
    const [bCellNumber, setBCellNumber] = useState(splitPhoneNumber(unsplitBCellNumber) ||{
        first: undefined,
        middle: undefined,
        last: undefined
    });

    const [bAddress, setBAddress] = useState(get(businessAccountInfo,'bAddress',{
        street: undefined,
        aptNum: undefined,
        city: undefined,
        province: undefined,
        postalCode:undefined,
    }));
    const [bMailingAddress, setBMailingAddress] = useState(get(businessAccountInfo,'bMailingAddress',{
        street: undefined,
        aptNum: undefined,
        city: undefined,
        province: undefined,
        postalCode:undefined,
    }));
    const [bMapAddress, setBMapAddress] = useState(get(businessAccountInfo,'bMapAddress',{
        street: undefined,
        aptNum: undefined,
        city: undefined,
        province: undefined,
        postalCode:undefined,
    }));
    const [website, setWebsite] = useState(get(businessAccountInfo, 'website', undefined));
    const [contactFName, setContactFName] = useState(get(businessAccountInfo, 'contactFName', undefined));
    const [contactLName, setContactLName] = useState(get(businessAccountInfo, 'contactLName', undefined));

    const unsplitContactPhoneNumber = get(businessAccountInfo,"contactPhoneNumber",undefined);
    const [contactPhoneNumber, setContactPhoneNumber] = useState(splitPhoneNumber(unsplitContactPhoneNumber) ||{
        first: undefined,
        middle: undefined,
        last: undefined
    });

    const [logo, setLogo] = useState(get(businessAccountInfo,'logo',''));


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

        // Business Details
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

        // check business details for errors
        if (checkIfErrorsExistInMapping(businessDetailsErrors)) {
            return false;
            // check contact person for errors
        } else if (checkIfErrorsExistInMapping(contactPersonErrors)) {
            return false;
        } else {
            return true;
        }
    }

//function for input checks on submit
    function onSubmit(event) {
        if (!isFormValid()) {
            event.preventDefault();
            return
        }
        alert("Account information saved");
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
                                    value={bName}
                                    autoComplete={"organization"}
                                    labelClassName={"label"}
                                    required={true}
                                    onChange={(e) => {
                                        setBName(e.target.value)
                                    }}/>
                                <div className={"my-2"}>
                                    <Checkbox label={"Incorporated Business"}
                                              checked={isIncorporated}
                                              toolTipText={BUSINESS_INFO_TEXT.INC_COMPANY}
                                              toolTipID="incorporated"
                                              onChange={() => setIsIncorporated(!isIncorporated)}/>
                                    {isIncorporated && <TextArea className="input"
                                                                 placeholder={"Names of Inc. Owners (separated by comma)"}
                                                                 labelClassName={"label"}
                                                                 value={incorporatedOwnersNames}
                                                                 onChange={(e) => setIncorporatedOwnersNames(e.target.value)}/>}
                                </div>
                                <TextArea className={`${bEmailError && "border-red-500"} input`}
                                          placeholder="business@email.ca"
                                          autoComplete={"email"}
                                          label="Business Email"
                                          value={bEmail}
                                          labelClassName={"label"}
                                          required={true}
                                          onChange={(e) => {
                                              setBEmail(e.target.value)
                                          }}/>
                                <TextArea className="input"
                                          placeholder="http://www.your-website.com"
                                          value={website}
                                          optional={true}
                                          autoComplete={"url"}
                                          label="Business Website"
                                          labelClassName={"label"}
                                          onChange={e => setWebsite(e.target.value)}/>
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
                                <Address label="Business Address"
                                         cityClassName="city-postal"
                                         required={true}
                                         value={bAddress}
                                         streetAddressError={streetAddressError}
                                         cityAddressError={cityAddressError}
                                         provinceAddressError={provinceAddressError}
                                         postalCodeError={postalCodeError}
                                         onChange={handleBAddressChange}/>
                                <Checkbox label={"Different Mailing Address"}
                                          checked={useDifferentMailingAddress}
                                          toolTipText={BUSINESS_INFO_TEXT.DIFF_MAILING_ADDRESS}
                                          toolTipID="differentMailingAddress"
                                          onChange={() => setUseDifferentMailingAddress(!useDifferentMailingAddress)}/>
                                {useDifferentMailingAddress &&
                                <Address label="Business Mailing Address"
                                         value={bMailingAddress}
                                         required={true}
                                         streetAddressError={streetMailingAddressError}
                                         cityAddressError={cityMailingAddressError}
                                         provinceAddressError={provinceMailingAddressError}
                                         postalCodeError={postalCodeMailingError}
                                         onChange={handleBMailingAddress}/>}
                                <div>
                                    <Checkbox label={"Canada-wide Business"}
                                              checked={isNationWide}
                                              toolTipText={BUSINESS_INFO_TEXT.NATION_WIDE}
                                              toolTipID="nationWide"
                                              onChange={() => {
                                                  setIfNationWide(isNationWide => !isNationWide)
                                              }}/>
                                    {!isNationWide &&
                                    <Address label="Searchable Address"
                                             value={bMapAddress}
                                             toolTipText={BUSINESS_INFO_TEXT.MAP_ADDRESS}
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
                        <Tooltip text={BUSINESS_INFO_TEXT.BUSINESS_LOGO} toolTipID="businessLogo"/>
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
                                      value={contactFName}
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

            {/*Divided*/}
            <div className="border-divider"/>

            {/*SubmitButton*/}
            <div className="px-4 pt-4 mt-4 text-center bg-gray-50 sm:px-6">
                <SubmitButton
                    inputValue={"Save"}
                    className="text-base btn btn-green"
                    onClick={onSubmit}
                />
            </div>

        </div>
    );
}

BusinessAccountSummary.propTypes = {
    businessAccountInfo: PropTypes.object.isRequired
}

export default BusinessAccountSummary;
