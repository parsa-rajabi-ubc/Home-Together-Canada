/**
 * @Author:     Parsa Rajabi
 * @Created:    2020.11.09
 *
 * @Description: landing page for the website which contains a picture and some info about Home Together Canada
 *
 */

import React from 'react';
import '../tailwind.output.css';
import picture from '../images/move_in.jpg';
import {Link} from "react-router-dom";

const Home = () => {
    return (
        <div className="relative overflow-hidden bg-white">
            <div className="max-w-screen-xl mx-auto">
                <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
                    <svg
                        className="absolute inset-y-0 right-0 hidden w-48 h-full text-white transform translate-x-1/2 lg:block"
                        fill="currentColor" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <polygon points="50,0 100,0 50,100 0,100"/>
                    </svg>

                    <div className="pt-6">
                        <main
                            className="relative max-w-screen-xl px-4 mx-auto mt-10 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
                            <div className="sm:text-center lg:text-left">
                                <h2 className="text-4xl font-extrabold leading-10 tracking-tight text-gray-900 sm:text-5xl sm:leading-none md:text-6xl">
                                    Home Together
                                    <p>Canada</p>

                                </h2>
                                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                                    A volunteer-run, non-profit Association to facilitate the growth and success of
                                    shared living in Canada.
                                </p>
                                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                                    We do this by providing the two fundamental needs necessary to the success of both
                                    the individuals, wishing to share homes, and the service providers and businesses
                                    wishing to serve this burgeoning and diverse group.
                                </p>
                                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                                    <div className="rounded-md shadow">
                                        <a href="#"
                                           className="flex items-center justify-center w-full px-8 py-3 text-base font-medium leading-6 text-white transition duration-150 ease-in-out bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo md:py-4 md:text-lg md:px-10">
                                            Join Us
                                        </a>
                                    </div>
                                    <div className="mt-3 sm:mt-0 sm:ml-3">
                                        <a href="#"
                                           className="flex items-center justify-center w-full px-8 py-3 text-base font-medium leading-6 text-indigo-700 transition duration-150 ease-in-out bg-indigo-100 border border-transparent rounded-md hover:text-indigo-600 hover:bg-indigo-50 focus:outline-none focus:shadow-outline-indigo focus:border-indigo-300 md:py-4 md:text-lg md:px-10">
                                            Learn More
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </main>
                    </div>
                </div>
            </div>
            <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
                <img className="object-cover w-full h-56 sm:h-72 md:h-96 lg:w-full lg:h-full"
                     src={picture}
                     alt="">
                </img>
            </div>
        </div>
    )
}

export default Home;