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
import houseSearch from '../images/house_search.svg'
import texting from '../images/texting.svg'
import business from '../images/business.svg'

const Home = () => {
    return (
        <div>
            <div className="relative overflow-hidden bg-off_white">
                <div className="max-w-screen-xl mx-auto">
                    <div
                        className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
                        <svg
                            className="absolute inset-y-0 right-0 hidden w-48 h-full text-white transform translate-x-1/2 lg:block"
                            fill="white" viewBox="0 0 100 100" preserveAspectRatio="none">
                            <polygon points="50,0 100,0 50,100 0,100"/>
                        </svg>

                        {/* Start - Top Portion of Home */}
                        <section className="pt-6">
                            <main
                                className="relative max-w-screen-xl pr-4 mt-10 mr-auto sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
                                <div className="sm:text-center lg:text-left">
                                    <h2 className="font-extrabold tracking-tight header-home">
                                        Home Together Canada
                                    </h2>
                                    <p className="text-home">
                                        A volunteer-run, non-profit Association to facilitate the growth and success of
                                        shared living in Canada.
                                    </p>
                                    <p className="text-home">
                                        We do this by providing the two fundamental needs necessary to the success of
                                        both
                                        the individuals, wishing to share homes, and the service providers and
                                        businesses
                                        wishing to serve this burgeoning and diverse group.
                                    </p>
                                    <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                                        <div className="rounded-md shadow">
                                            <a href="#"
                                               className="flex btn btn-green">
                                                Join Us
                                            </a>
                                        </div>
                                        <div className="mt-3 sm:mt-0 sm:ml-3">
                                            <a href="#"
                                               className="flex leading-6 text-green-700 bg-green-200 btn">
                                                Learn More
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </main>
                        </section>
                    </div>
                </div>

                {/* Picture on Right */}
                <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
                    <img className="object-cover w-full h-56 sm:h-72 md:h-96 lg:w-full lg:h-full"
                         src={picture}
                         alt="">
                    </img>
                </div>
            </div>
            {/* End - Top Portion of Home */}

            {/* Start -  Explore Around You Section */}
            <section className="py-8 border-t bg-off_white">
                <div className="container max-w-5xl m-8 mx-auto">

                    <h1 className="w-full my-2 my-6 text-5xl font-bold leading-tight text-center text-gray-800">Explore
                        Around You </h1>

                    {/* Start - Search for new Members */}
                    <div className="flex flex-wrap">
                        <div className="w-5/6 p-6 sm:w-1/2">
                            <h3 className="mb-2 text-3xl font-bold leading-none text-gray-800">Search for a new
                                Home</h3>

                            <div className="w-full mb-6 mt-none">
                                <div className="w-1/2 h-1 py-0 mx-10 my-0 rounded-t bg-iyellow-normal">
                                </div>
                            </div>

                            {/*TODO: fill out text with actual content*/}
                            <p className="mb-8 text-gray-600">
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                                Ipsum has been the industrys standard dummy text ever since the 1500s, when an
                                unknown printer took a galley of type and scrambled it to make a type specimen book.
                                It has survived not only five centuries, but also the leap into electronic
                                typesetting, remaining essentially unchanged. It was popularised in the 1960s with
                                the release of Letraset sheets containing Lorem Ipsum passages, and more recently
                                with desktop publishing software like Aldus PageMaker including versions of Lorem
                                Ipsum.
                            </p>
                        </div>
                        <div className="w-full p-6 sm:w-1/2">
                            <img src={houseSearch}
                                 alt="">
                            </img>
                        </div>
                    </div>
                    {/* End - Search for new Members */}

                    {/* Start - Chat with other Members */}
                    <div className="flex flex-col-reverse flex-wrap sm:flex-row">
                        <div className="w-full p-6 mt-6 sm:w-1/2">
                            <img src={texting}
                                 alt="">
                            </img>
                        </div>
                        <div className="w-full p-6 mt-6 sm:w-1/2">
                            <div className="align-middle">
                                <h3 className="mb-2 text-3xl font-bold leading-none text-gray-800">Chat with other
                                    Members</h3>
                                <div className="w-full mb-6 mt-none">
                                    <div className="w-1/2 h-1 py-0 mx-16 my-0 rounded-t bg-iblue-normal">
                                    </div>
                                </div>

                                {/*TODO: fill out text with actual content*/}
                                <p className="mb-8 text-gray-600">
                                    It is a long established fact that a reader will be distracted by the readable
                                    content of a page when looking at its layout. The point of using Lorem Ipsum is that
                                    it has a more-or-less normal distribution of letters, as opposed to using Content
                                    here, content here, making it look like readable English. Many desktop publishing
                                    packages and web page editors now use Lorem Ipsum as their default model text, and a
                                    search for lorem ipsum will uncover many web sites still in their infancy. Various
                                    versions have evolved over the years, sometimes by accident, sometimes on purpose
                                    (injected humour and the like).
                                </p>
                            </div>
                        </div>
                    </div>
                    {/* End - Chat with other Members */}

                    {/* Start - Support Local Business */}
                    <div className="flex flex-wrap">
                        <div className="w-5/6 p-6 mt-12 sm:w-1/2">
                            <h3 className="mb-2 text-3xl font-bold leading-none text-gray-800">Support Local
                                Business</h3>
                            <div className="w-full mb-6 mt-none">
                                <div className="w-1/2 h-1 py-0 mx-12 my-0 rounded-t bg-ired-normal">
                                </div>
                            </div>

                            {/*TODO: fill out text with actual content*/}
                            <p className="mb-8 text-gray-600">
                                Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a
                                piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard
                                McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of
                                the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through
                                the cites of the word in classical literature, discovered the undoubtable source. Lorem
                                Ipsum comes from sections 1.10.32 and 1.10.33 of de Finibus Bonorum et Malorum (The
                                Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the

                            </p>
                        </div>
                        <div className="w-full p-6 sm:w-1/2">
                            <img src={business}
                                 alt="">
                            </img>
                        </div>
                    </div>
                    {/* End - Support Local Business */}
                </div>
            </section>
            {/* End -  Explore Around You Section */}

            {/* Start - Gradient  */}
            <div className="bg-gradient-to-r from-igreen-normal">
                <svg className="wave-top" viewBox="0 0 1439 147" version="1.1" xmlns="http://www.w3.org/2000/svg">
                    <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                        <g transform="translate(-1.000000, -14.000000)" fillRule="nonzero">
                            <g className="wave" fill="white">
                                <path
                                    d="M1440,84 C1383.555,64.3 1342.555,51.3 1317,45 C1259.5,30.824 1206.707,25.526 1169,22 C1129.711,18.326 1044.426,18.475 980,22 C954.25,23.409 922.25,26.742 884,32 C845.122,37.787 818.455,42.121 804,45 C776.833,50.41 728.136,61.77 713,65 C660.023,76.309 621.544,87.729 584,94 C517.525,105.104 484.525,106.438 429,108 C379.49,106.484 342.823,104.484 319,102 C278.571,97.783 231.737,88.736 205,84 C154.629,75.076 86.296,57.743 0,32 L0,0 L1440,0 L1440,84 Z">
                                </path>
                            </g>
                            <g transform="translate(1.000000, 15.000000)" fill="white">
                                <g transform="translate(719.500000, 68.500000) rotate(-180.000000) translate(-719.500000, -68.500000) ">
                                    <path
                                        d="M0,0 C90.7283404,0.927527913 147.912752,27.187927 291.910178,59.9119003 C387.908462,81.7278826 543.605069,89.334785 759,82.7326078 C469.336065,156.254352 216.336065,153.6679 0,74.9732496"
                                        opacity="0.100000001">
                                    </path>
                                    <path
                                        d="M100,104.708498 C277.413333,72.2345949 426.147877,52.5246657 546.203633,45.5787101 C666.259389,38.6327546 810.524845,41.7979068 979,55.0741668 C931.069965,56.122511 810.303266,74.8455141 616.699903,111.243176 C423.096539,147.640838 250.863238,145.462612 100,104.708498 Z"
                                        opacity="0.100000001">
                                    </path>
                                    <path
                                        d="M1046,51.6521276 C1130.83045,29.328812 1279.08318,17.607883 1439,40.1656806 L1439,120 C1271.17211,77.9435312 1140.17211,55.1609071 1046,51.6521276 Z"
                                        opacity="0.200000003">
                                    </path>
                                </g>
                            </g>
                        </g>
                    </g>
                </svg>
            </div>
            {/* End - Gradient  */}

        </div>
    )
}

export default Home;