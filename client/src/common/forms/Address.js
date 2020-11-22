/**
 * @Author:     Jeff Hatton
 * @Created:    2020.11.05
 *
 * @Description: Address input Form Component
 *
 */

import provinces from "./Provinces";
import React from "react";
import Dropdown from "./Dropdown";
import PropTypes from "prop-types";


function Address(props) {
    const {label, onChange} = props;
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
            <Dropdown name="province" title={"Province"} items={provinces}
                      onChange={onChange} value={provinces.value}/>
            <br/>
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