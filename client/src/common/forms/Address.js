import provinces from "./formUtils";
import React from "react";
import GenericSelector from "./GenericSelector";
import PropTypes from "prop-types";

//returns generic address set of fields for a form with a label
function Address(props){
    const provs = provinces
    return(
        <div>
            <label>
                {props.label}
                <input type="text" placeholder="Street Address" />
            </label>
            <label>
                Optional:
                <input type="text" placeholder="Apt, suite, floor # etc" />
            </label>
            <label>

                <input type="text" placeholder="City" />
            </label>
            {/*TODO: Reaplce this dropdown*/}
            {/*<GenericSelector options={provs}/>*/}
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