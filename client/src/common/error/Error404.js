/**
 * @Author:     Parsa Rajabi
 * @Created:    2020.11.13
 *
 * @Description: 404 Error
 *
 */

import React from 'react';
import '../../tailwind.output.css';
import {Link} from "react-router-dom";
import errorPicture from '../../images/404-background.png'

const Error404 = () => {
    return (
        <div className={"bkg"}>
            <Link to={'/'}>
            <img className="object-left" src={errorPicture} alt={"error 404"}/>
            </Link>

        </div>
    )
}

export default Error404;