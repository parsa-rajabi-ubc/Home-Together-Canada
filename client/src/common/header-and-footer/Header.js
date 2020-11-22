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
import LoginService from '../../services/LoginService';
import Button from "../forms/Button";

const Header = () => {

    // TODO: Dynamically generate buttons in header based on authentication and user privileges

    // TODO: this is a helper function is only for testing this PR and must be taken out before
    //  it gets merged
    const checkIfLoggedIn = () => {
        LoginService.isLoggedIn()
            .then(res => res.json())
            .then(data => {
                // TODO: take out before merging PR
                console.log('data: ', data);
            })
            .catch(error => {
                console.log('error while checking users authentication status: ', error);
            });
    }

    // TODO: this button should be shown conditionally (which is a part of a separate PR),
    //  but it is required to test this PR. I will take it out before this PR gets merged
    const logout = () => {
        LoginService.logoutUser()
            .then(res => res.json())
            .then(data => {
                // TODO: take out before merging
                console.log('data: ', data);
            })
            .catch((error) => {
                // TODO: find a better way to handle this
                console.log('error while logging out user: ', error);
            });
    }

    return (
        <div>
            {/*TODO: change bg color to igreen*/}
            <nav className="top-0 flex w-full bg-green-400 tex-black">
                <div className="container flex items-center justify-between w-full py-2 mx-auto mt-0 whitespace-no-wrap">
                    <div className="flex flex-no-wrap items-center ml-4">
                        <Link to={'/'}
                              className="text-lg font-bold lg:text-xl">
                            Home Together Canada
                        </Link>
                    </div>

                    {/*TODO: move classNames to header.css */}
                    {/* Middle of Nav */}
                    <div
                        className="flex-no-wrap hidden w-full p-4 mt-2 tex-black lg:flex lg:items-center lg:w-auto lg:block lg:mt-0 lg:bg-transparent lg:p-0">
                        <div className="items-center justify-end flex-1 mr-16 list-reset lg:flex">
                            <Link to={'/members'}
                                  className="inline-block px-4 py-2 mr-3 transition duration-200 ease-in-out border-transparent rounded-md hover:bg-white hover:text-black hover:opacity-50">
                                Connect with Members
                            </Link>
                            <Link to={'/services'}
                                  className="inline-block px-4 py-2 mr-3 transition duration-200 ease-in-out border-transparent rounded-md hover:bg-white hover:text-black hover:opacity-50">
                                Services
                            </Link>
                            <Link to={'/classifieds'}
                                  className="inline-block px-4 py-2 mr-3 transition duration-200 ease-in-out border-transparent rounded-md hover:bg-white hover:text-black hover:opacity-50">
                                Classifieds
                            </Link>
                            <Link to={'/about'}
                                  className="inline-block px-4 py-2 mr-3 transition duration-200 ease-in-out border-transparent rounded-md hover:bg-white hover:text-black hover:opacity-50">
                                About Us
                            </Link>
                            <Link to={'/faq'}
                                  className="inline-block px-4 py-2 mr-3 no-underline transition duration-200 ease-in-out border-transparent rounded-md hover:bg-white hover:text-black hover:opacity-50">
                                FAQ
                            </Link>
                        </div>

                        {/* Login and Sign Up Buttons */}
                        <Link to={'/login'}
                              className="items-center justify-center w-full px-6 py-2 mr-4 transition duration-200 ease-in-out bg-white border-transparent rounded-md opacity-75 hover:bg-orange-400">Login
                        </Link>
                        <Link to={'/registration'}
                              className="items-center justify-center w-full px-4 py-2 mr-4 transition duration-200 ease-in-out bg-white border-transparent rounded-md opacity-75 hover:bg-orange-400">Sign
                            Up
                        </Link>
                        {/*Take these out after testing PR*/}
                        <Button
                            value={'Check Auth Status'}
                            className="items-center justify-center w-full px-4 py-2 mr-4 transition duration-200 ease-in-out bg-white border-transparent rounded-md opacity-75 hover:bg-orange-400"
                            onClick={checkIfLoggedIn}
                        />
                        <Button
                            value={'Logout'}
                            className="items-center justify-center w-full px-4 py-2 mr-4 transition duration-200 ease-in-out bg-white border-transparent rounded-md opacity-75 hover:bg-orange-400"
                            onClick={logout}
                        />
                    </div>
                </div>
                {/*Bottom Border*/}
                <hr className="py-0 my-0 border-b border-gray-200 opacity-25"/>
            </nav>
        </div>
    )
}

export default Header;