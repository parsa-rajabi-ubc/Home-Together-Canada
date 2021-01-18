/**
 * @Author:     Rachelle Gelden
 * @Created:    2020.12.22
 *
 * @Description: account summary subpage component
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

const SubPages = (props) => {
    const { options, selected, onClick } = props;

    const subpagesList = options.map(option =>
        <div
            key={option.label}
            className={option.label === selected ? "sub-page-items selected" : "sub-page-items"}
            onClick={() => onClick(option.label)}
        >
            {option.label}
        </div>);

    return (
        <div>
            {subpagesList}
        </div>
    );
}

SubPages.propTypes = {
    options: PropTypes.array.isRequired,
    onClick: PropTypes.func.isRequired,
    selected: PropTypes.string
}

export default SubPages;
