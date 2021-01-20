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
            <footer className="bg-white">
                <div className="container border-t-2 mx-auto  px-8">
                    <div className="w-full flex flex-col md:flex-row py-6">

                        <div className="flex-1 mb-6">
                            {/*TODO: Update text color*/}
                            <Link to={'/'} className="text-orange-500 font-bold text-2xl">
                                Home Together Canada
                            </Link>
                            {/* TODO: Add HTC logo here after Twila sends it */}
                        </div>

                        {/*TODO: create a generic class with the following CSS and apply to all below*/}

                        <div className="flex-1">
                            <p className="uppercase text-gray-500 md:mb-6">Links</p>
                            <ul className="list-reset mb-6">
                                <li className="mt-2 inline-block mr-2 md:block md:mr-0">
                                    <Link to={'/faq'}
                                          className="text-gray-800 hover:text-orange-500">FAQ</Link>
                                </li>
                                <li className="mt-2 inline-block mr-2 md:block md:mr-0">
                                    <Link to={'/report'}
                                          className="text-gray-800 hover:text-orange-500">Comment
                                        & Concern Form</Link>
                                </li>
                            </ul>
                        </div>

                        <div className="flex-1">
                            <p className="uppercase text-gray-500 md:mb-6">Legal</p>
                            <ul className="list-reset mb-6">
                                <li className="mt-2 inline-block mr-2 md:block md:mr-0">
                                    <Link to={'/tos'}
                                          className="text-gray-800 hover:text-orange-500">Terms</Link>
                                </li>
                                <li className="mt-2 inline-block mr-2 md:block md:mr-0">
                                    <Link to={'/privacy'}
                                          className="text-gray-800 hover:text-orange-500">Privacy</Link>
                                </li>
                            </ul>
                        </div>

                        <div className="flex-1">
                            <p className="uppercase text-gray-500 md:mb-6">Social</p>
                            <ul className="list-reset mb-6">
                                <li className="mt-2 inline-block mr-2 md:block md:mr-0">
                                    <a href="https://www.facebook.com/WeAreHomeTogetherCanada/"
                                       className="text-gray-800 hover:text-orange-500">Facebook</a>
                                </li>
                                <li className="mt-2 inline-block mr-2 md:block md:mr-0">
                                    <a href="https://www.happipad.com/housing-companion-program/"
                                       className="text-gray-800 hover:text-orange-500">Happipad</a>
                                </li>
                            </ul>
                        </div>

                        <div className="flex-1">
                            <p className="uppercase text-gray-500 md:mb-6">Company</p>
                            <ul className="list-reset mb-6">
                                <li className="mt-2 inline-block mr-2 md:block md:mr-0">
                                    <Link to={'/about'}
                                          className="text-gray-800 hover:text-orange-500">About Us</Link>
                                </li>
                                <li className="mt-2 inline-block mr-2 md:block md:mr-0">
                                    <a href="mailto:hometogether.ca@gmail.com"
                                       className="text-gray-800 hover:text-orange-500">Contact</a>
                                </li>
                            </ul>
                        </div>


                    </div>
                </div>
            </footer>
        </div>
    )
}

export default Footer;