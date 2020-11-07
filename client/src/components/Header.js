// Component Description:
// This component is the header for the website which contains links to Connect with Members, Services, Classifieds, About Us and Account Page

import React from 'react';
import '../tailwind.output.css';

const Header = () => {
    return (
        <div>
            <div className="realtive">
                <div className="">
                    <div className="flex justify-between items-center">
                        <div>
                            <a href="#" className="flex">
                                Home Together Canada
                            </a>
                        </div>
                        <nav className="md:flex space-x-10">
                            <a href="#">
                                Connect with Members
                            </a>
                            <a href="#">
                                Services
                            </a>
                            <a href="#">
                                Classifieds
                            </a>
                            <a href="#">
                                About Us
                            </a>
                            <a href="#">
                                FAQ
                            </a>
                        </nav>

                        <div>
                            {/*TODO: Add href to login page*/}
                            <button href="#"
                                    className="border">
                                Login
                            </button>
                            {/*TODO: Add href to registration page*/}
                            <button href="#"
                                    className="border">
                                Sign Up
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header;