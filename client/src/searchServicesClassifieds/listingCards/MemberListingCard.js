/**
 *
 * @Author:     Jeff Hatton
 * @Created:    2021.2.18
 *
 * @Description: Member Listing Card
 *
 */

import React from 'react';
import PropTypes from "prop-types";
import Moment from 'react-moment';
import {FaDog as Dog} from "react-icons/fa";
import {GiCigarette as Cigarette} from "react-icons/gi";
import Tooltip from "../../common/forms/Tooltip";

function MemberListingCard(props) {
    const {title, monthlyCost, petFriendly, smokeFriendly, shortDescription, datePosted} = props;

    return (
        <section className={"card-container mt-0"}>

            <div className={"inline align-middle "}>
                <label className={"font-semibold justify-between"}> {title} </label>
                {/*{shortDescription}*/}
                <section className={"inline float-right pr-6 justify-end"}>
                    <Moment format="MMM D, YYYY">{datePosted}</Moment>
                </section>
            </div>

            <div className={"ml-6 flex"}>
                <label className={"px-1"}> {monthlyCost} </label>

                <section className={"flex w-full pr-6 justify-end"}>
                    {petFriendly && <Tooltip text={"Pet Friendly"} toolTipID={"PetFriendly"}
                                     customIcon={<Dog className={"text-blue-400 ml-1"}/>}/>}

                    {smokeFriendly && <Tooltip text={"Smoke Friendly"} toolTipID={"SmokeFriendly"}
                                       customIcon={<Cigarette className={"text-red-500 ml-1"}/>}/>}
                </section>
            </div>

            <div className={"mx-6 inline items-center justify-between leading-tight font-light"}>
                <section> {shortDescription} </section>

            </div>
        </section>
    );
}

MemberListingCard.propTypes = {
    title: PropTypes.string.isRequired,
    monthlyCost: PropTypes.number.isRequired,
    petFriendly: PropTypes.bool.isRequired,
    smokeFriendly: PropTypes.bool.isRequired,
    shortDescription: PropTypes.string.isRequired,
    datePosted: PropTypes.string.isRequired,
}


export default MemberListingCard;