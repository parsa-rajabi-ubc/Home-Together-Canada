/**
 * @Author:     Parsa Rajabi
 * @Created:    2021.06.15
 *
 * @Description: Contact Page
 *
 */

import React from 'react';
import {HOME_TOGETHER_EMAIL} from "../common/constants/homeTogetherContstants";

function Contact(){
    return (
        <div className={"tos-page-layout"}>

            <h1 className={"page-title"}>Contact Us</h1>

            <h2 className={"point-title my-4"}>This page is currently under development.</h2>
            <p className={"text"}>In the meantime, please direct all your questions, comments and concerns to Home Together Canada at: <a className={"link"} href={`mailto:${HOME_TOGETHER_EMAIL}`}>{HOME_TOGETHER_EMAIL}</a></p>

        </div>
    );
}

export default Contact;