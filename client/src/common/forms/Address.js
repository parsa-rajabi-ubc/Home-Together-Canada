import provinces from "./Provinces";
import React from "react";
import Dropdown from "./Dropdown";
import PropTypes from "prop-types";

//returns generic address set of fields for a form with a label
function Address(props){
    return(
        <div>
            <label>
                {props.label}
                <input type="text" placeholder="Street Address" />
            </label>
            <label>
                Optional:
                <input type="text" placeholder="Apt, suite, floor # etc." />
            </label>
            <label>

                <input type="text" placeholder="City" />
            </label>
            <Dropdown title={"Province"} items={provinces}/>
            <label>

                <input type="text" placeholder="Postal Code" />
            </label>
        </div>
    );
}
Address.propTypes = {
    label: PropTypes.string.isRequired
}

export default Address