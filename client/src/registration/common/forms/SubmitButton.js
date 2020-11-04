import React from 'react';

function SubmitButton(props){
    return(
        <label>
            {props.label}
            <input type="submit" value="Submit" />
        </label>
    );
}

export default SubmitButton