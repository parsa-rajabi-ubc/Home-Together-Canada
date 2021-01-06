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


function Address(props) {
    const {
        label,
        onChange,
        required,
        toolTipID,
        toolTipText,
        streetClassName,
        cityClassName,
        provinceClassName,
        postalCodeClassName,
    } = props;
    const [street, setStreet] = useState("");
    const [aptNum, setApt] = useState("");
    const [city, setCity] = useState("");
    const [province, setProvince] = useState('');
    const [postalCode, setPostalCode] = useState('');

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
                <input className={streetClassName} type="text" name="street" placeholder="Address Line 1"
                       autoComplete="address-line1"
                       onChange={handleInputChange}/>
            </div>
            <div className="col-start-1 col-end-8">
                <input className="input" type="text" name="aptNum"
                       placeholder="Address Line 2: Apt, suite, etc. (optional)"
                       autoComplete="address-line2" onChange={handleInputChange}/>
            </div>
            <div className="col-start-1 col-end-4">
                <input
                    className={cityClassName}
                    type="text" autoComplete="address-level2" name="city" placeholder="City"
                    onChange={handleInputChange}/>
            </div>
            <div className="col-start-4 col-end-8">
                <Dropdown isSearchable={true} placeholder={"Province"}
                          options={getProvinces()} autoComplete="address-level1"
                          onChange={address => setProvince(address.value)}
                          styling={provinceClassName}
                />
            </div>
            <div className="col-start-1 col-end-4">
                <input
                    className={postalCodeClassName}
                    type="text" autoComplete="postal-code" name="postalCode" placeholder="Postal Code"
                    onChange={handleInputChange}/>
            </div>
        </div>
    );
}

Address.propTypes = {
    label: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    toolTipText: PropTypes.string,
    toolTipID: PropTypes.string,
    required: PropTypes.bool,
    streetClassName: PropTypes.string,
    cityClassName: PropTypes.string,
    provinceClassName: PropTypes.object,
    postalCodeClassName: PropTypes.string,
};

export default Address;