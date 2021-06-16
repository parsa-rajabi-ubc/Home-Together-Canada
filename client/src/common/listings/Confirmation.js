/**
 * @Author:     Parsa Rajabi
 * @Created:    2021.2.19
 *
 * @Description: Confirmation Page
 *
 */

import React from 'react';
import {Link} from "react-router-dom";
import PropTypes from "prop-types";

const Confirmation = (props) => {
    const {message, buttonText = "OK", redirectTo = "/", displayButton = true, errorColor, minHeight = true} = props;

    return (
        <div className={`${displayButton ? "w-1/3" : "w-2/3"}  ${minHeight && "min-h-screen"} flex justify-center items-center mx-auto  text-center bg-white`}>
            <div className="bg-white rounded-lg shadow-2xl">
                <div className={`${errorColor ? "border-red-600" : "border-green-600"} flex w-96 rounded-lg border-t-8`}>
                    <div className={`${displayButton ? "mt-10" : "mt-5"} p-10 mx-auto w-full`}>
                        <h1 className="text-gray-800 h1">
                            {message}
                        </h1>
                    </div>
                </div>
                {displayButton &&
                <div className="flex py-10 px-10 space-x-4">
                    <Link to={redirectTo} className="flex rounded-md shadow btn btn-green">
                        {buttonText}
                    </Link>
                </div>}
            </div>
        </div>
    )
}

Confirmation.propTypes = {
    message: PropTypes.string.isRequired,
    buttonText: PropTypes.string,
    redirectTo: PropTypes.string,
    displayButton: PropTypes.bool,
    errorColor: PropTypes.bool,
    minHeight: PropTypes.bool
}

export default Confirmation;