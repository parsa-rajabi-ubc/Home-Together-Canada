/**
 * @Author:     Alex Qin
 * @Created:    2020.11.21
 *
 * @Description: Main Landing Page
 *
 */

import React from 'react';
import {Link} from "react-router-dom";
import member from "../images/member.jpg";
import business from "../images/business.jpg";

const memberAccountTitle = "Home Share Member Account";
const businessAccountTitle = "Local Business & Home Sharing Services Account";

const memberAccountText = [
    "Free account registration and profile creation",
    "Search and message other members",
    "Find Home Sharing Businesses and Services",
    "Member only: Business & Service rating system you can trust"
];

const businessAccountText = [
    "Free account registration",
    "Create free home sharing service listings",
    "Create paid local classified listings",
    " Benefit from: Member only rating system you can trust"
];

const memberAccountBullets = memberAccountText.map(
    (text) =>
        <li key={text}>
            {text}
        </li>
);

const businessAccountBullets = businessAccountText.map(
    (text) =>
        <li key={text}>
            {text}
        </li>
);


function MainLandingPage() {
    return (
        <div className="page-container">
            <Link to={'/registration/member'} className="account-box member">
                <img className="image"
                     src={member}
                     alt="member picture">
                </img>
                <div className="text-container">
                    <p className="account-title">{memberAccountTitle}</p>
                    <div className="text-sub-container">
                        <ul className="bullet-points">
                            {memberAccountBullets}
                        </ul>
                    </div>
                </div>
            </Link>

            <Link to={'/registration/business'} className="account-box business">
                <img className="image"
                     src={business}
                     alt="member picture">
                </img>
                <div className="text-container">
                    <p className="account-title">{businessAccountTitle}</p>
                    <div className="text-center">
                        <ul className="bullet-points">
                            {businessAccountBullets}
                        </ul>
                    </div>
                </div>
            </Link>
        </div>
    );
}

export default MainLandingPage;