/**
 * @Author:     Parsa Rajabi
 * @Created:    2020.11.09
 *
 * @Description: footer for the website which contains a link to About Us, FAQ, Contact Us and Comment and Concerns Form"
 *
 */

import React from 'react';
import '../../tailwind.output.css';
import {Link} from "react-router-dom";


const Footer = () => {
    return (
        <div>
            <footer>

                {/*TODO: updated this Link to appropriate page*/}
                <Link to={'/about'}>
                    About Us
                </Link>

                {/*TODO: updated this Link to appropriate page*/}
                <Link to={'/faq'}>
                    FAQ
                </Link>

                {/*TODO: updated this Link to appropriate page*/}
                <Link to={'/contact'}>
                    Contact Us
                </Link>

                {/*TODO: updated this Link to appropriate page*/}
                <Link to={'/report'}>
                    Comment & Concerns Form
                </Link>

            </footer>
            <div>
                <p>
                    <Link to={'/'}>
                        Home Together Canada
                    </Link>
                    - All Rights Received
                </p>
            </div>
        </div>
    )
}

export default Footer;