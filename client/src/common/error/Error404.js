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


const Error404 = () => {
    return (
        <div>
            <h1>Oops. The page you are looking for does not exist. Go back to</h1>
            <button>
                <Link to={'/'}>
                    Home Page
                </Link>
            </button>

        </div>
    )
}

export default Error404;