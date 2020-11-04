import React from "react";

function PhoneNumInput(props){
    return(
        <div>
            <label>
                {props.label}
                <input type="text" placeholder="555" />
            </label>
            <label>
                -
                <input type="text" placeholder="555" />
            </label>
            <label>
                -
                <input type="text" placeholder="5555" />
            </label>
        </div>
    );
}

export default PhoneNumInput