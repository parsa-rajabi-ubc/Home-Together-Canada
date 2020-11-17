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
                <div className="max-w-screen-xl mx-auto pl-3">
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
                                className="relative max-w-screen-xl pr-4 mt-10 mr-10 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
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
                                    <div className="mt-5 ml-auto sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                                        <div>
                                            <Link to={'/registration'}
                                                  className=" rounded-md shadow flex btn btn-green">
                                                Join Us
                                            </Link>
                                        </div>
                                        <div className="mt-3 sm:mt-0 sm:ml-3">
                                            <Link to={'/about'}
                                                  className="flex text-green-700 bg-green-200 btn hover:bg-green-300 hover:text-green-800">
                                                Learn More
                                            </Link>
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
                         alt="4 people moving into a house together, each holding a box.">
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
                                 alt="a house with a magnifying glass on top">
                            </img>
                        </div>
                    </div>
                    {/* End - Search for new Members */}

                    {/* Start - Chat with other Members */}
                    <div className="flex flex-col-reverse flex-wrap sm:flex-row">
                        <div className="w-full p-6 mt-6 sm:w-1/2">
                            <img src={texting}
                                 alt="a character standing beside 3 message bubbles">
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
                                 alt="a character standing to the right of a store">
                            </img>
                        </div>
                    </div>
                    {/* End - Support Local Business */}
                </div>
            </section>
            {/* End -  Explore Around You Section */}
        </div>
    )
}

export default Home;