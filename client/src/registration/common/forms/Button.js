import React from 'react';

function Button(props){
    return(
        <label>
            {props.label}
            <input type="button" value={props.value} />
        </label>
    );
}

export default Button