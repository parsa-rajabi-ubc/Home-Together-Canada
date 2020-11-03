import React from 'react';

export function Button(props){
    return(
        <label>
            {props.label}
            <input type="button" value={props.value} />
        </label>
    );
}