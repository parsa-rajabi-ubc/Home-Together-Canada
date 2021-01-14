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
                                className="relative max-w-screen-xl px-4 mt-10 mx-10 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
                                <div className="sm:text-center lg:text-left">
                                    <h2 className="font-extrabold tracking-tight header-home">
                                        Home Together Canada
                                    </h2>
                                    <p className="text-home">
                                        Our mandate is to facilitate the growth and success of shared living in Canada.
                                    </p>
                                    <p className="text-home">
                                        We do this by providing the two fundamental needs necessary to the success of
                                        both the individuals, wishing to share a home with others, and the service
                                        providers and businesses wishing to provide services to this burgeoning and
                                        diverse group.
                                    </p>

                                    <div className="mt-5 ml-auto sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                                        <div>
                                            <Link to={'/about'}
                                                  className=" rounded-md shadow flex btn btn-green">
                                                Learn More
                                            </Link>
                                        </div>
                                        <div className="mt-3 sm:mt-0 sm:ml-3">
                                            <Link to={'/faq'}
                                                  className="flex text-green-700 bg-green-200 btn hover:bg-green-300 hover:text-green-800">
                                                FAQ
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

                    <h1 className="w-full mt-6 text-5xl font-bold leading-tight text-center text-gray-800"> How It
                        Works </h1>
                    <div className="flex flex-wrap">
                        <div className="w-5/6 py-6 px-4 sm:w-1/2">
                            <div className="w-full  mt-none">
                                <div className="w-1/2 h-1 py-0 mx-10 my-0 rounded-t bg-iyellow-normal">
                                </div>
                            </div>

                            <p className="text-home">
                                We accomplish the first need to ensure the - maximum number of individuals are available
                                to each
                                other - by providing this <b>free</b> non-competitive, non-profit site with the basic
                                preliminary tools
                                individuals require to find others of similar mind.
                            </p>
                        </div>
                        <div className="w-full p-6 sm:w-1/2">
                            <p className="text-home">
                                We accomplish the second need to ensure - individuals can find and access sharing and
                                matching
                                services, businesses, housing and organizations - by providing free and equal
                                descriptive
                                listings with website links to all Canadian sharing providers. This provides individuals
                                immediate information and access to the services they are in search of, and in turn,
                                provides
                                the businesses and services maximum and immediate exposure to this large and diverse
                                group.
                            </p>
                        </div>
                    </div>

                    <h1 className="w-full my-2 my-6 text-5xl font-bold leading-tight text-center text-gray-800">On Home
                        Together </h1>

                    {/* Start - Search for new Members */}
                    <div className="flex flex-wrap">
                        <div className="w-5/6 py-6 px-4 sm:w-1/2">
                            <h3 className="mb-2 text-3xl font-bold leading-none text-gray-800">Find Others to
                                Share a Home With</h3>

                            <div className="w-full mb-6 mt-none">
                                <div className="w-1/2 h-1 py-0 mx-10 my-0 rounded-t bg-iyellow-normal">
                                </div>
                            </div>

                            {/*TODO: fill out text with actual content*/}
                            <p className="mb-8 text-gray-600">
                                We freely give individuals across Canada the ability to create a basic profile. This
                                allows all individuals with a profile to search the profiles of others that are
                                interested in sharing a home. Without this free central listing site your ability to
                                find compatible others is greatly limited because individuals that may be your perfect
                                house mate are spread out and divided, findable only if you can find and search through
                                all of the different sharing business and service providers.
                            </p>
                        </div>
                        <div className="w-full p-6 sm:w-1/2">
                            <img src={houseSearch}
                                 alt="a house with a magnifying glass on top">
                            </img>
                        </div>
                    </div>
                    {/* End - Search for new Members */}

                    <div className="flex flex-col-reverse flex-wrap sm:flex-row">
                        <div className="w-full p-6 mt-6 sm:w-1/2">
                            <img src={texting}
                                 alt="a character standing beside 3 message bubbles">
                            </img>
                        </div>
                        <div className="w-full p-6 mt-6 sm:w-1/2">
                            <div className="align-middle">
                                <h3 className="mb-2 text-3xl font-bold leading-none text-gray-800">Safely
                                    Contact Other Members Via On-site Messaging</h3>
                                <div className="w-full mb-6 mt-none">
                                    <div className="w-1/2 h-1 py-0 mx-16 my-0 rounded-t bg-iblue-normal">
                                    </div>
                                </div>

                                <p className="mb-8 text-gray-600">
                                    When you find other members on the site, you can safely contact them through the
                                    site. This
                                    allows everyone time to take those first tentative steps and ask questions without
                                    sharing any contact information. This also allows you to discuss any specific
                                    business or service that you think may be helpful in creating a shared home or that
                                    you are registered with.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-wrap">
                        <div className="w-5/6 p-6 mt-12 sm:w-1/2">
                            <h3 className="mb-2 text-3xl font-bold leading-none text-gray-800">Find Canadian Home Share Businesses and Services </h3>
                            <div className="w-full mb-6 mt-none">
                                <div className="w-1/2 h-1 py-0 mx-12 my-0 rounded-t bg-ired-normal">
                                </div>
                            </div>

                            <p className="mb-8 text-gray-600">
                                No single Sharing Service or Business can possibly fill the sharing needs of all
                                Canadians which are as diverse as the country we live in. Success depends upon finding
                                the help you need so we freely list all Canadian Home Share Business and Service
                                providers so that you can find what you need This also makes it feasible to create
                                services that provide for the needs of smaller groups with specific or unique wants or
                                needs.
                            </p>
                        </div>
                        <div className="w-full p-6 sm:w-1/2">
                            <img src={business}
                                 alt="a character standing to the right of a store">
                            </img>
                        </div>
                    </div>


                </div>
            </section>
            {/* End -  Explore Around You Section */}
        </div>
    )
}

export default Home;