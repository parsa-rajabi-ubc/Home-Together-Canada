/**
 * @Author:     Parsa Rajabi
 * @Created:    2022.02.10
 *
 * @Description: Constants for FAQ Page
 *
 */

import {FAQ_TEXT, FAQ_TITLE} from "./constant/FAQText"
import React from 'react';

const FAQ_CONTENT = FAQ_TEXT.map(
    ({Q, A}) =>
        <span key={Q}>
            <h2 className={"point-title"}>{Q}</h2>
            <p className={"text"}>{A}</p>
            <br/>
        </span>
);

function FAQ() {
    return (
        <div className={"tos-page-layout"}>

            <h1 className={"page-title"}>{FAQ_TITLE}</h1>
            <br/>

            {FAQ_CONTENT}
        </div>
    );
}

export default FAQ;