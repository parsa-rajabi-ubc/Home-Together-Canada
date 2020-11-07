import React from 'react';
import '../tailwind.output.css';
import picture from '../images/move_in.jpg';

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
                        <button href="#">
                            Join Us
                        </button>
                    </div>
                    <div>
                        <button href="#">
                            Learn More
                        </button>
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