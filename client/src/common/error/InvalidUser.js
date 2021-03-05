/**
 * @Author:     Jeff Hatton
 * @Created:    2021.1.23
 *
 * @Description: Users without permission to search members see this page instead;
 *
 */

import React from 'react';
import {Link} from "react-router-dom";
import PropTypes from "prop-types";

const InvalidUser = (props) => {
    const {message} = props;

    return (

        <div className="flex justify-center items-center min-h-screen bg-white">
            <div className="bg-white rounded-lg shadow-2xl">
                <div className="flex w-96 rounded-lg border-t-8 border-green-600">
                    <div className="p-10 mx-auto mt-10 w-full">
                        <h1 className="text-gray-800 h1">
                            {message}
                        </h1>
                    </div>
                </div>

                <div className="flex py-10 px-10 space-x-4">
                    <Link to={'/registration'} className="flex rounded-md shadow btn btn-green">
                        Create an account
                    </Link>
                    <Link to={'/login'}
                          className="flex text-green-700 bg-green-200 btn hover:bg-green-300 hover:text-green-800">
                        Login
                    </Link>
                </div>
            </div>
        </div>
    )
}

InvalidUser.propTypes = {
    message: PropTypes.string.isRequired,
}

export default InvalidUser;