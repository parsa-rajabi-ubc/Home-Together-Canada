/**
 * @Author:     Alex Qin
 * @Created:    2020.11.21
 *
 * @Description: Main Landing Page
 *
 */

import React from 'react';
import {Link} from "react-router-dom";
import member from "../images/member.svg";
import business from "../images/business.svg";

function MainLandingPage() {
    return (
        <div>
            <div className="flex w-full mt-5 mb-10">
                <div className="flex flex-col w-full pt-12 mx-10 bg-blue-200 rounded-lg shadow-2xl">

                    <img className="w-auto h-64"
                         src={member}
                         alt="member picture">
                    </img>
                    <div className="m-10 mb-2 text-center text-gray-800">
                        <p className="mb-2 text-3xl font-bold leading-none text-gray-800">Member Account</p>
                        <div className="mb-10 text-center">
                            <ul className="inline-block my-3 text-lg text-left list-disc list-inside">
                                <li>Free account registration</li>
                                <li>Create free Home Sharing listening</li>
                                <li>Search and message other members</li>
                                <li>Report any suspicious activity on the site</li>
                                <Link to={'/registration/member'}
                                      className="flex inline-block mt-8 rounded-md shadow btn btn-blue">
                                    Create Member Account
                                </Link>
                            </ul>

                        </div>
                    </div>

                </div>
                <div className="flex flex-col w-full pt-2 mx-10 bg-red-200 rounded-lg shadow-2xl">
                    <img className="w-auto h-64 mt-10"
                         src={business}
                         alt="member picture">
                    </img>
                    <div className="m-10 mb-2 text-center text-gray-800">
                        <p className="mb-2 text-3xl font-bold leading-none text-gray-800">Business Account</p>
                        <div className="text-center">
                            <ul className="inline-block my-3 text-lg text-left list-disc list-inside">
                                <li>Free account registration</li>
                                <li>Create free service listening</li>
                                <li>Create paid classified listening</li>
                                <li>Report any suspicious activity on the site</li>
                                <Link to={'/registration/business'}
                                      className="flex inline-block mt-8 rounded-md shadow btn btn-red">
                                    Create Business Account
                                </Link>
                            </ul>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default MainLandingPage;