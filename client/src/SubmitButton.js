import React from 'react';

export function SubmitButton(props){
    return(
        <label>
            {props.label}
            <input type="submit" value="Submit" />
        </label>
    );
}