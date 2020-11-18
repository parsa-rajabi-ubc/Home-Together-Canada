import provinces from "./Provinces";
import React from "react";
import Dropdown from "./Dropdown";
import PropTypes from "prop-types";

/**
 * @Author:     Jeff Hatton
 * @Created:    2020.11.05
 *
 * @Description: Address input Form Component
 *
 */
function Address(props){
    return(
        <div>
            <label>
                Address Line 1:
                <input type="text" placeholder="Street Address" />
            </label>
            <label>
                Address Line 2:
                <input type="text" placeholder="Apt, suite, floor # etc." />
            </label>
            <label>
                City:
                <input type="text" placeholder="City"  />
            </label>
            <Dropdown title={"Province"} items={provinces}/>
            <label>
                Postal Code:
                <input type="text" placeholder="Postal Code" />
            </label>
        </div>
    );
}
Address.propTypes = {
    label: PropTypes.string.isRequired
}

export default Address;
