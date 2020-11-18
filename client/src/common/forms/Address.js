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


function Address(props){
    const { label, onChange } = props;
    return(
        <div>
            <label>
                { label }
                <input type="text" name="street" placeholder="Street Address" onChange= {onChange}/>
            </label>
            <label>
                Optional:
                <input type="text" name="aptNum" placeholder="Apt, suite, floor # etc." onChange= {onChange}/>
            </label>
            <label>

                <input type="text" name="city" placeholder="City" onChange={onChange}/>
            </label>
            <Dropdown name="province" title={"Province"} items={provinces} onChange={onChange}/>
            <label>

                <input type="text" name="postalCode" placeholder="Postal Code" onChange= {onChange}/>
            </label>
        </div>
    );
}
Address.propTypes = {
    label: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
}

export default Address;