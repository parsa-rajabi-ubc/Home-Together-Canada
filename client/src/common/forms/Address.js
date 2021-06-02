/**
 * @Author:     Jeff Hatton
 * @Created:    2020.11.05
 *
 * @Description: Address input Form Component
 *
 */

import React, {useState, useEffect} from 'react';
import PropTypes from "prop-types";
import Dropdown from "./Dropdown";
import {getProvinces} from "../utils/locationUtils"
import Asterisk from "./Asterisk";
import Tooltip from "./Tooltip";
import get from 'lodash/get';
import {dropdownErrorCSS, dropdownDefaultCSS} from "../../css/dropdownCSSUtil"
import {USER_FIELD_LENGTHS} from "../constants/fieldLengths";

function Address(props) {
    const {
        label,
        value,
        onChange,
        required,
        toolTipID,
        toolTipText,
        streetAddressError,
        cityAddressError,
        provinceAddressError,
        postalCodeError,
    } = props;
    const [street, setStreet] = useState(get(value, 'street', undefined));
    const [aptNum, setApt] = useState(get(value, 'aptNum', ""));
    const [city, setCity] = useState(get(value, 'city', undefined));
    const [province, setProvince] = useState(get(value, 'province', undefined));
    const initialSelection = (province && {label: province, value: province}) || undefined;
    const [postalCode, setPostalCode] = useState(get(value, 'postalCode', undefined));

    const handleInputChange = (e) => {
        switch (e.target.name) {
            case 'street': {
                setStreet(e.target.value);
                break;
            }
            case 'aptNum': {
                setApt(e.target.value);
                break;
            }
            case 'city': {
                setCity(e.target.value);
                break;
            }
            case 'postalCode': {
                setPostalCode(e.target.value);
                break;
            }
        }
    }

    useEffect(() => {
        // call on change function
        onChange({
            street,
            aptNum,
            city,
            province,
            postalCode
        })
    }, [street, aptNum, city, province, postalCode]);

    // Updated autoComplete based on: https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete
    return (
        <div className="grid grid-cols-9 gap-x-2">
            <div className="col-start-1 col-end-8">
                <label className="label">
                    {label}
                </label>
                {required && <Asterisk/>}
                {toolTipID && <Tooltip text={toolTipText} toolTipID={toolTipID}/>}
                <input
                    className={`${streetAddressError && "border-red-500"} input`}
                    type="text" value={street || ''}
                    name="street"
                    placeholder="Address Line 1"
                    autoComplete="address-line1"
                    onChange={handleInputChange}
                    maxLength={USER_FIELD_LENGTHS.ADDRESS_LINE_1}
                />
            </div>
            <div className="col-start-1 col-end-8">
                <input
                    className="input"
                    type="text"
                    value={aptNum || ''}
                    name="aptNum"
                    placeholder="Address Line 2: Apt, suite, etc. (optional)"
                    autoComplete="address-line2"
                    onChange={handleInputChange}
                    maxLength={USER_FIELD_LENGTHS.ADDRESS_LINE_2}
                />
            </div>
            <div className="col-start-1 col-end-4">
                <input
                    className={`${cityAddressError && "border-red-500"} input`}
                    type="text"
                    autoComplete="address-level2"
                    value={city || ''}
                    name="city"
                    placeholder="City"
                    onChange={handleInputChange}
                    maxLength={USER_FIELD_LENGTHS.CITY}
                />
            </div>
            <div className="col-start-4 col-end-8">
                <Dropdown
                    isSearchable={true}
                    placeholder={"Province"}
                    initialSelection={initialSelection}
                    options={getProvinces()} autoComplete="address-level1"
                    onChange={address => setProvince(address.value)}
                    dropdownCSS={provinceAddressError ? dropdownErrorCSS : dropdownDefaultCSS}
                />
            </div>
            <div className="col-start-1 col-end-4">
                <input
                    className={`${postalCodeError && "border-red-500"} input`}
                    type="text" autoComplete="postal-code"
                    name="postalCode"
                    placeholder="Postal Code"
                    value={postalCode || ''}
                    onChange={handleInputChange}
                    maxLength={USER_FIELD_LENGTHS.POSTAL_CODE}
                />
            </div>
        </div>
    );
}

Address.propTypes = {
    label: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    toolTipText: PropTypes.string,
    value: PropTypes.shape({
        street: PropTypes.string,
        aptNum: PropTypes.string,
        city: PropTypes.string,
        province: PropTypes.string,
        postalCode: PropTypes.string
    }),
    toolTipID: PropTypes.string,
    required: PropTypes.bool,
    streetAddressError: PropTypes.bool,
    cityAddressError: PropTypes.bool,
    provinceAddressError: PropTypes.bool,
    postalCodeError: PropTypes.bool,
};

export default Address;