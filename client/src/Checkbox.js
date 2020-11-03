import React from 'react';

export function Checkbox(props){
    return(
        <label>
            {props.label}
            <input type="checkbox" value="1" />
        </label>
    );
}