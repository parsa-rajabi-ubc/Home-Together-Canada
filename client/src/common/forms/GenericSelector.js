import React from 'react';
import Select from 'react-select';
import PropTypes from "prop-types";

// takes Nx2 Array as props and returns a select dropdown menu
function GenericSelector(props) {
    const options = props.options;
    const [option, setOption] = React.useState(options[0]);

    return (
        <div/>
        // <Select
        //     options={options}
        //     value={option}
        //     onChange={(value) => {
        //         setOption(value);
        //     }}
        // />
    );
}
GenericSelector.propTypes = {
    options: PropTypes.array.isRequired
}

export default GenericSelector