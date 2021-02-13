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

const memberAccountBullets = [];
for (let i = 0; i < memberAccountText.length; i++) {
    memberAccountBullets.push(
        <li key={memberAccountText[i]}>
            {memberAccountText[i]}
        </li>
    );
}

const businessAccountBullets = [];
for (let i = 0; i < businessAccountText.length; i++) {
    businessAccountBullets.push(
        <li key={businessAccountText[i]}>
            {businessAccountText[i]}
        </li>
    );
}

function MainLandingPage() {
    return (
        <div>
            <div className="flex w-full mt-5 mb-10">
                    <Link to={'/registration/member'} className="flex flex-col w-full pt-12 mx-10 bg-blue-200 rounded-lg shadow-2xl hover:bg-blue-400">
                    <img className="w-auto h-64"
                         src={member}
                         alt="member picture">
                    </img>
                    <div className="m-10 mb-2 text-center text-gray-800">
                        <p className="mb-2 text-3xl font-bold leading-none text-gray-800">{memberAccountTitle}</p>
                        <div className="mb-10 text-center">
                            <ul className="inline-block my-3 text-lg text-left list-disc list-inside">
                                {memberAccountBullets}
                            </ul>
                        </div>
                    </div>
                    </Link>

                    <Link to={'/registration/business'} className="flex flex-col w-full pt-2 mx-10 bg-yellow-200 rounded-lg shadow-2xl hover:bg-yellow-400 ">

                    <img className="mt-10"
                         src={business}
                         alt="member picture">
                    </img>

                    <div className="m-10 mb-2 text-center text-gray-800">
                        <p className="mb-2 text-3xl font-bold leading-none text-gray-800">{businessAccountTitle}</p>
                        <div className="text-center">
                            <ul className="inline-block my-3 text-lg text-left list-disc list-inside">
                                {businessAccountBullets}
                            </ul>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    );
}

export default MainLandingPage;