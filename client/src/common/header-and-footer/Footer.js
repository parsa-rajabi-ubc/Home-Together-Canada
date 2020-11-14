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
                    <a> About Us </a>
                </Link>

                {/*TODO: updated this Link to appropriate page*/}
                <Link to={'/faq'}>
                    <a> FAQ </a>
                </Link>

                {/*TODO: updated this Link to appropriate page*/}
                <Link to={'/contact'}>
                    <a> Contact Us </a>
                </Link>

                {/*TODO: updated this Link to appropriate page*/}
                <Link to={'/report'}>
                    <a> Comment & Concerns Form </a>
                </Link>

            </footer>
            <div>
                <p>
                    <Link to={'/'}>
                        <a>
                            Home Together Canada
                        </a>
                    </Link>
                    - All Rights Received</p>
            </div>
        </div>
    )
}

export default Footer;