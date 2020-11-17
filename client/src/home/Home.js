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
        <div>
            <main>
                <h2>Home Together
                    <p>Canada</p>
                </h2>
                <p>
                    A volunteer-run, non-profit Association to facilitate the growth and success of
                    shared living in Canada.
                    We do this by providing the two fundamental needs necessary to the success of both
                    the individuals, wishing to share homes, and the service providers and businesses
                    wishing to serve this burgeoning and diverse group.
                </p>
                <div>
                    <div>
                        {/*TODO: Update this Link to registration landing page*/}
                        <Link to={'/registration/business'}>
                            <button>
                                Join Us
                            </button>
                        </Link>
                    </div>
                    <div>
                        {/*TODO: Update this Link to registration landing page*/}
                        <Link to={'/about'}>
                            <button>
                                Learn More
                            </button>
                        </Link>
                    </div>
                </div>
            </main>
            <div>
                <img src={picture} alt="group of adults moving into a house">
                </img>
            </div>
        </div>
)
}

export default Home;