/**
 * @Author:     Parsa Rajabi
 * @Created:    2021.1.17
 *
 * @Description: Member Search Container;
 *
 */

import React from 'react';
import ProfileCard from "./ProfileCard";
import MockProfileCardData from "../mockData/MockProfileCardData";

const MemberSearchContainer = () => {

    // displays the mock data
    function profileCards() {
        let profiles = [];
        for (let i = 0; i < 10; i++) {
            profiles.push(<ProfileCard key={i}
                                       username={MockProfileCardData[i].username}
                                       age={MockProfileCardData[i].age}
                                       familyStatus={MockProfileCardData[i].status}
                                       minBudget={MockProfileCardData[i].minRent}
                                       maxBudget={MockProfileCardData[i].maxRent}
                                       pet={MockProfileCardData[i].pet}
                                       smoke={MockProfileCardData[i].smoke}
                                       religion={MockProfileCardData[i].religion}
                                       diet={MockProfileCardData[i].diet}
            />);
        }
        return profiles;
    }

    return (
        <div className={"flex flex-nowrap my-10 "}>
            {/*Results*/}
            <div className={"w-1/3 "}>
                {profileCards()}
            </div>

            {/*Map*/}
            <div className={"flex-1"}>
                <p>
                    Google Maps Placeholder
                </p>
            </div>
        </div>
    )
}

export default MemberSearchContainer;
