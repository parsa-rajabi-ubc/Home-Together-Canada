/**
 * @Author:     Jeff Hatton
 * @Created:    2020.11.05
 *
 * @Description: Address input Form Component
 *
 */

import React, {useState} from 'react';
import "canada"
import PropTypes from "prop-types";
import Dropdown from "./Dropdown";
import {getProvinces} from "../utils/locationUtils"


function Address(props) {
    const {label, onChange} = props;
    const [selectedProvince, setSelectedProvince] = useState(null);

    const handleProvinceChange = e => {
        setSelectedProvince(e.value);
    }
    return (
        <div>
            <label className="label">
                {label}
                <input className="input" type="text" name="street" placeholder="Address Line 1"
                       onChange={onChange}/>
            </label>
            <label>
                <input className="input" type="text" name="aptNum" placeholder="Address Line 2: Apt, suite, etc. (optional)"
                       onChange={onChange}/>
            </label>
            <label>
                <input
                    className="inline w-1/3 px-3 py-2 mb-4 mt-1 leading-normal bg-white border border-gray-300 rounded-lg appearance-none;"
                    type="text" name="city" placeholder="City" onChange={onChange}/>
            </label>
            <Dropdown isSearchable={true} placeholder={"Province"}
                    options={getProvinces()}
                    onChange={handleProvinceChange}/>
            <label>
                <input
                    className="inline w-1/3 px-3 py-2 mb-4 mt-1 leading-normal bg-white border border-gray-300 rounded-lg appearance-none;"
                    type="text" name="postalCode" placeholder="Postal Code"
                    onChange={onChange}/>
            </label>
        </div>
    );
}

Address.propTypes = {
    label: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
};

export default Address;