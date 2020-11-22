/**
 * @Author:     Alex Qin
 * @Created:    2020.11.21
 *
 * @Description: Main Landing Page
 *
 */

import React from 'react';
import {Link} from "react-router-dom";

function MainLandingPage(){
    return(
        <div>
            <h1>Main Landing Page</h1>
            <label>Member Account:</label> <br/>
            * Free account with access to all features <br/>
            * Ability to search for other members <br/>
            * Create free service listening <br/>
            * View other members&apos; profiles <br/>
            * Message other members through the in-site messaging system <br/>
            * Report any suspicious activity on the site <br/>
            <Link to={"/registration/member"}
                  className="text-lg font-bold lg:text-xl">
                Member Sign Up
            </Link>

            <hr/>
            <label>Business Account:</label> <br/>
            * Free account with access to limited  <br/>
            * Create free service listening <br/>
            * Create paid classified listening <br/>
            * Report any suspicious activity on the site <br/>
            <Link to={"/registration/business"}
                  className="text-lg font-bold lg:text-xl">
                Business Sign Up
            </Link>
        </div>
    )
}
export default MainLandingPage;