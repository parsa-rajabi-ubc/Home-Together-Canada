/**
 * @Author:     Jeff Hatton
 * @Created:    2021.1.23
 *
 * @Description: Users without permission to search members see this page instead;
 *
 */

import React from 'react';
import {Link} from "react-router-dom";

const InvalidUser = () => {

    return (
        <div>
            {/*Message*/}
            <div>
                <p>
                    You must be a registered member to view other member profiles.
                </p>
            </div>
            {/*Sign up*/}
            <div>
                <Link to={'/login'} className="nav-btn">
                    Login
                </Link>
            </div>

            {/*Login*/}
            <div>
                <Link to={'/registration'} className="nav-btn">
                    Sign Up
                </Link>
            </div>
        </div>
    )

}

export default InvalidUser;