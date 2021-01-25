/**
 * @Author:     Parsa Rajabi
 * @Created:    2021.1.22
 *
 * @Description: Re-useable profile card
 *
 */

import React from 'react';
import PropTypes from "prop-types";
import {FaDog as Dog} from "react-icons/fa";
import {GiCigarette as Cigarette} from "react-icons/gi";
import {ImSpoonKnife as Food} from "react-icons/im";
import {GiPrayer as Pray} from "react-icons/gi";
import Tooltip from "../common/forms/Tooltip";


function ProfileCard(props) {
    const {username, familyStatus, age, minBudget, maxBudget, pet, smoke, diet, religion} = props;
    return (
        <section className={"card-container mt-0"}>
            <div className={"ml-6 flex"}>
                <label className={"font-semibold"}> {username} </label>,
                <label className={"px-1"}> {age} </label>

                <section className={"flex w-full pr-6 justify-end"}>
                    {pet && <Tooltip text={"Pet Friendly"} toolTipID={"PetFriendly"}
                                    customIcon={<Dog className={"text-blue-400 ml-1"}/>}/>}

                    {smoke && <Tooltip text={"Smoke Friendly"} toolTipID={"SmokeFriendly"}
                                      customIcon={<Cigarette className={"text-red-500 ml-1"}/>}/>}


                    {diet && <Tooltip text={"Diet is important"} toolTipID={"dietImportant"}
                                     customIcon={<Food className={"text-gray-600 ml-1"}/>}/>}

                    {religion && <Tooltip text={"Religion is import"} toolTipID={"religionImportant"}
                                         customIcon={<Pray className={"text-green-600 ml-1"}/>}/>}
                </section>
            </div>

            <div className={"mx-6 flex items-center justify-between leading-tight font-light"}>
                <section> {familyStatus} </section>
                <section> ${minBudget} - {maxBudget} </section>
            </div>

        </section>
    );
}

ProfileCard.propTypes = {
    username: PropTypes.string.isRequired,
    age: PropTypes.number.isRequired,
    familyStatus: PropTypes.string.isRequired,
    minBudget: PropTypes.number.isRequired,
    maxBudget: PropTypes.number.isRequired,
    pet: PropTypes.bool.isRequired,
    smoke: PropTypes.bool.isRequired,
    religion: PropTypes.bool.isRequired,
    diet: PropTypes.bool.isRequired,
}

export default ProfileCard;