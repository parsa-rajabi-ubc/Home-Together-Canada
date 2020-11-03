import React from 'react';

export function TextArea(props){
    return(
        <label>
            {props.label}
            <input type="text" placeholder={props.placeholder} />
        </label>
    );
}