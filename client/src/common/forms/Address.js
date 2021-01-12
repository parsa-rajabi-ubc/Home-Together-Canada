/**
 * @Author:     Jeff Hatton
 * @Created:    2020.11.05
 *
 * @Description: Address input Form Component
 *
 */

import React, {useState, useEffect} from 'react';
import "canada"
import PropTypes from "prop-types";
import Dropdown from "./Dropdown";
import {getProvinces} from "../utils/locationUtils"
import Asterisk from "./Asterisk";
import Tooltip from "./Tooltip";
import {dropdownErrorCSS, dropdownDefaultCSS} from "../../css/dropdownCSSUtil"

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
    const [street, setStreet] = useState(value && value.street || "");
    const [aptNum, setApt] = useState(value && value.aptNum || "");
    const [city, setCity] = useState(value && value.city || "");
    const [province, setProvince] = useState(value && value.province || '');
    const [intialSelection, setIntialSelection] = useState({label: province, value: province});
    const [postalCode, setPostalCode] = useState(value && value.postalCode || '');

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
                {(required ? <Asterisk/> : '')}
                {toolTipID && <Tooltip text={toolTipText} toolTipID={toolTipID}/>}
                <input className={`${streetAddressError && "border-red-500"} input`} type="text" value={street} name="street" placeholder="Address Line 1"
                       autoComplete="address-line1"
                       onChange={handleInputChange}/>
            </div>
            <div className="col-start-1 col-end-8">
                <input className="input" type="text" value={aptNum} name="aptNum"
                       placeholder="Address Line 2: Apt, suite, etc. (optional)"
                       autoComplete="address-line2" onChange={handleInputChange}/>
            </div>
            <div className="col-start-1 col-end-4">
                <input
                    className={`${cityAddressError && "border-red-500"} input`}
                    type="text" autoComplete="address-level2" value={city} name="city" placeholder="City"
                    onChange={handleInputChange}/>
            </div>
            <div className="col-start-4 col-end-8">
                <Dropdown isSearchable={true} placeholder={"Province"} intialSelection={intialSelection}
                          options={getProvinces()} autoComplete="address-level1"
                          onChange={address => setProvince(address.value)}
                          dropdownCSS={provinceAddressError ? dropdownErrorCSS : dropdownDefaultCSS}
                />
            </div>
            <div className="col-start-1 col-end-4">
                <input
                    className={`${postalCodeError && "border-red-500"} input`}
                    type="text" autoComplete="postal-code" name="postalCode" placeholder="Postal Code"
                    value={postalCode}
                    onChange={handleInputChange}/>
            </div>
        </div>
    );
}

Address.propTypes = {
    label: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    toolTipText: PropTypes.string,
    value: PropTypes.object,
    toolTipID: PropTypes.string,
    required: PropTypes.bool,
    streetAddressError: PropTypes.bool,
    cityAddressError: PropTypes.bool,
    provinceAddressError: PropTypes.bool,
    postalCodeError: PropTypes.bool,
};

export default Address;