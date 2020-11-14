/**
 * @Author:     Parsa Rajabi
 * @Created:    2020.11.09
 *
 * @Description: header for the website which contains links to Connect with Members, Services, Classifieds, About Us and Account Page
 *
 */

import React from 'react';
import '../../tailwind.output.css';
import {Link} from "react-router-dom";

const Header = () => {
    return (
        <div>
            <div className="realtive">
                <div className="">
                    <div className="flex justify-between items-center">
                        <div>
                            <Link to={'/'} className="flex">
                                Home Together Canada
                            </Link>
                        </div>
                        <nav className="md:flex space-x-10">

                            {/*TODO: updated this Link to appropriate page*/}
                            <Link to={'/members'}>
                                Connect with Members
                            </Link>

                            {/*TODO: updated this Link to appropriate page*/}
                            <Link to={'/services'}>
                                Services
                            </Link>

                            {/*TODO: updated this Link to appropriate page*/}
                            <Link to={'/classifieds'}>
                                Classifieds
                            </Link>

                            {/*TODO: updated this Link to appropriate page*/}
                            <Link to={'/about'}>
                                About Us
                            </Link>

                            {/*TODO: updated this Link to appropriate page*/}
                            <Link to={'/faq'}>
                                FAQ
                            </Link>
                        </nav>

                        <div>
                            <Link to={'/login'}>
                                <button className="border">
                                    Login
                                </button>
                            </Link>

                            {/*TODO: Update this Link to registration landing page*/}
                            <Link to={'/registration/business'}>
                                <button className="border">
                                    Sign Up
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header;