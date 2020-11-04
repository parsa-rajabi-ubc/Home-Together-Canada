import React from 'react';

function TextArea(props){
    return(
        <label>
            {props.label}
            <input type="text" placeholder={props.placeholder} />
        </label>
    );
}

export default TextArea