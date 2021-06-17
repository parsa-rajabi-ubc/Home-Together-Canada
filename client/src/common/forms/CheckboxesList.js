import Checkbox from "./Checkbox";
import React from "react";
import PropTypes from "prop-types";
import includes from 'lodash/includes';

const CheckboxesList = props => {
    const { values, selectedValues = [], onChange } = props;

    const checkboxesList = [];

    for (let i = 0; i < values.length; i++) {
        checkboxesList.push(
            <Checkbox
                key={values[i]}
                label={values[i]}
                id={values[i]}
                fontNormal={true}
                onChange={onChange}
                checked={includes(selectedValues, values[i])}
            />
        );
    }

    return (
        <div>
            {checkboxesList}
        </div>
    );
}

CheckboxesList.propTypes = {
    values: PropTypes.arrayOf(PropTypes.string).isRequired,
    selectedValues: PropTypes.arrayOf(PropTypes.string),
    onChange: PropTypes.func.isRequired
}

export default CheckboxesList;
