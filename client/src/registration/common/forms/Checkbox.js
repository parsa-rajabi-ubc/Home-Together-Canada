import React from 'react';

function Checkbox(props){
    return(
        <label>
            {props.label}
            <input type="checkbox" value="1" />
        </label>
    );
}

export default Checkbox