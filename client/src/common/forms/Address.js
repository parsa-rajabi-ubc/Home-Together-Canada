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


function Address(props) {
    const {label, onChange} = props;
    const [street, setStreet] = useState("");
    const [apt, setApt] = useState("");
    const [city, setCity] = useState("");
    const [province, setProvince] = useState('');
    const [postalCode, setPostalCode] = useState('');

    const handleInputChange = (e) => {
        switch(e.target.name) {
            case 'street': {
                setStreet(e.target.value);
                break;
            }
            case 'apt': {
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
            apt,
            city,
            province,
            postalCode
        })
    },[street, apt, city, province, postalCode]);

    return (
        <div>
            <label className="label">
                {label}
                <input className="input" type="text" name="street" placeholder="Address Line 1"
                       onChange={handleInputChange}/>
            </label>
            <label>
                <input className="input" type="text" name="aptNum" placeholder="Address Line 2: Apt, suite, etc. (optional)"
                       onChange={handleInputChange}/>
            </label>
            <label>
                <input
                    className="inline w-1/3 px-3 py-2 mb-4 mt-1 leading-normal bg-white border border-gray-300 rounded-lg appearance-none;"
                    type="text" name="city" placeholder="City" onChange={handleInputChange}/>
            </label>
            <Dropdown isSearchable={true} placeholder={"Province"}
                    options={getProvinces()}
                    onChange={address => setProvince(address.value)}/>
            <label>
                <input
                    className="inline w-1/3 px-3 py-2 mb-4 mt-1 leading-normal bg-white border border-gray-300 rounded-lg appearance-none;"
                    type="text" name="postalCode" placeholder="Postal Code"
                    onChange={handleInputChange}/>
            </label>
        </div>
    );
}

Address.propTypes = {
    label: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
};

export default Address;