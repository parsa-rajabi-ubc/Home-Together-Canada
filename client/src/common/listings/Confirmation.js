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
    const {message, buttonText = "OK", redirectTo = "/"} = props;

    return (
        <div className="flex justify-center items-center mx-auto w-1/3 min-h-screen text-center bg-white">
            <div className="bg-white rounded-lg shadow-2xl">
                <div className="flex w-96 rounded-lg border-t-8 border-green-600">
                    <div className="p-10 mx-auto mt-10 w-full">
                        <h1 className="text-gray-800 h1">
                            {message}
                        </h1>
                    </div>
                </div>

                <div className="flex py-10 px-10 space-x-4">
                    <Link to={redirectTo} className="flex rounded-md shadow btn btn-green">
                        {buttonText}
                    </Link>
                </div>
            </div>
        </div>
    )
}

Confirmation.propTypes = {
    message: PropTypes.string.isRequired,
    buttonText: PropTypes.string,
    redirectTo: PropTypes.string,
}

export default Confirmation;