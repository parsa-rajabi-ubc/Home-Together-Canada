/**
 * @Author:     Jeff Hatton
 * @Created:    2020.11.05
 *
 * @Description: Phone Number input Form Component
 *
 */

import React from "react";
import PropTypes from 'prop-types';
import Asterisk from "./Asterisk";
import get from 'lodash/get';

function PhoneNumInput(props){
    const { label, labelClassName, className, value, required, onChange } = props;
    // Updated autoComplete based on: https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete
    return(
        <div>
            <label>
                <label className={labelClassName}>
                    {label}
                </label>
                    {(required ? <Asterisk/> : '')}
                <br/>
                <input
                    className={className}
                    type="text"
                    autoComplete="tel-area-code"
                    name="first"
                    id={"areaCode"}
                    placeholder="222"
                    value={get(value, 'first', undefined)}
                    onChange={onChange}
                    maxLength="3"
                />
            </label>
            <label>
                <input
                    className={className}
                    type="text"
                    autoComplete="tel-local-prefix"
                    name="middle"
                    id={"prefix"}
                    placeholder="333"
                    value={get(value, 'middle', undefined)}
                    onChange={onChange}
                    maxLength="3"
                />
            </label>
            <label>
                <input
                    className={className}
                    type="text"
                    autoComplete="tel-local-suffix"
                    name="last"
                    id={"suffix"}
                    placeholder="4444"
                    value={get(value, 'last', undefined)}
                    onChange={onChange}
                    maxLength="4"
                />
            </label>
        </div>
    );
}
PhoneNumInput.propTypes = {
    label: PropTypes.string.isRequired,
    required: PropTypes.bool,
    labelClassName: PropTypes.string,
    value: PropTypes.shape({
        first: PropTypes.string,
        middle: PropTypes.string,
        last: PropTypes.string
    }),
    className: PropTypes.string,
    onChange: PropTypes.func.isRequired
}

export default PhoneNumInput;