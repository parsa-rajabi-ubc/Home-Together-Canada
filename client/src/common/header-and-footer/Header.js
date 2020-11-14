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
                            <Link to={'/'}>
                                <a className="flex">
                                    Home Together Canada
                                </a>
                            </Link>
                        </div>
                        <nav className="md:flex space-x-10">

                            {/*TODO: updated this Link to appropriate page*/}
                            <Link to={'/members'}>
                                <a href="#">
                                    Connect with Members
                                </a>
                            </Link>

                            {/*TODO: updated this Link to appropriate page*/}
                            <Link to={'/services'}>
                                <a href="#">
                                    Services
                                </a>
                            </Link>

                            {/*TODO: updated this Link to appropriate page*/}
                            <Link to={'/classifieds'}>
                                <a href="#">
                                    Classifieds
                                </a>
                            </Link>

                            {/*TODO: updated this Link to appropriate page*/}
                            <Link to={'/about'}>
                                <a href="#">
                                    About Us
                                </a>
                            </Link>

                            {/*TODO: updated this Link to appropriate page*/}
                            <Link to={'/faq'}>
                                <a href="#">
                                    FAQ
                                </a>
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