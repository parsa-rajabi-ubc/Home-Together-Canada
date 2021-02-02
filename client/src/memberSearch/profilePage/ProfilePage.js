/**
 * @Author:     Parsa Rajabi
 * @Created:    2021.1.30
 *
 * @Description: Re-useable profile page
 *
 */

import React from 'react';
import PropTypes from "prop-types";
import {AiOutlineCheckCircle as Check} from "react-icons/ai";
import {AiOutlineCloseCircle as Ex} from "react-icons/ai";


function ProfilePage(props) {
    const {
        username,
        age,

        gender,
        genderDescription,

        shareLimit,

        workStatus,
        familyStatus,

        roommates,
        partnerOrGroupMembers,
        roommateUsernames,

        minRent,
        maxRent,

        prefLocationText,
        preferredLocations,

        about,

        petFriendly,
        petDescription,

        smokeFriendly,
        smokingDescription,

        hasHealthMobilityIssues,
        healthMobilityIssuesDescription,

        hasAllergies,
        allergiesDescription,

        isReligionImportant,
        religionDescription,

        isDietImportant,
        dietDescription,

        hasHomeToShare,
        hasHomeToShareDescription,

        interestInBuyingHome,
        interestDescription,

    } = props;


    return (
        <div>
            <div className="selected-component-grid-outer">
                <div className="selected-component-grid-inner">
                    <div className="grid grid-cols-2 gap-y-4 my-6">
                        <div className={"col-start-1 col-end-1"}>
                            <span className={"mb-4 text-2xl font-bold"}> {username}, </span>
                            <span className={"text-2xl font-medium"}>{age}</span>
                            <section className={"my-6"}>
                                <span className={"font-semibold"}>{gender}</span>
                                {gender === "Other" && <span>: {genderDescription}</span>}
                            </section>

                            <span className={"block my-6 font-normal"}>Open to sharing
                                with {shareLimit} people</span>

                            <section className={"my-6"}>
                                <span className={"span mr-3"}>Work & Family Status</span>
                                <span className={"block"}> {workStatus} </span>
                                <span className={"block"}> {familyStatus} </span>
                                {roommates &&
                                <section>
                                    <label>{partnerOrGroupMembers}:</label>
                                    {roommateUsernames}
                                </section>
                                }
                            </section>

                            <section className={"my-6"}>
                                <span className={"span mr-3"}>Budget</span>
                                <span className={"block"}> ${minRent} - ${maxRent} (CAD) </span>
                            </section>

                            <section className={"my-6"}>
                                <span className={"span mr-3"}> {prefLocationText} </span>
                                <div className={"whitespace-pre mt-1"}>{preferredLocations}</div>
                            </section>
                            <button className={"btn btn-green mb-6 w-1/2 text-base py-2"}>Send Message
                            </button>
                        </div>
                        <div className={"col-start-2"}>

                            <div className={"border-2 border-dashed border-gray-200 mb-4 p-3"}>
                                {about}
                            </div>
                            <table className={"table-auto mx-auto"}>
                                <tbody>
                                <tr className={`${!petFriendly && "bg-gray-200"} gray-border`}>
                                    <td>
                                        {petFriendly ?
                                            <Check className={"checkmark-icon"}/> : <Ex className={"ex-icon"}/>
                                        }
                                    </td>
                                    <td className={"table-item"}>Pet friendly</td>
                                    <td className={"table-item-description"}>{petDescription}</td>
                                </tr>

                                <tr className={`${!smokeFriendly && "bg-gray-200"} gray-border`}>
                                    <td>
                                        {smokeFriendly ?
                                            <Check className={"checkmark-icon"}/> : <Ex className={"ex-icon"}/>
                                        }
                                    </td>
                                    <td className={"table-item"}>Smoke friendly</td>
                                    <td className={"table-item-description"}>{smokingDescription}</td>
                                </tr>

                                <tr className={`${!hasHealthMobilityIssues && "bg-gray-200"} gray-border`}>
                                    <td>
                                        {hasHealthMobilityIssues ?
                                            <Check className={"checkmark-icon"}/> : <Ex className={"ex-icon"}/>
                                        }
                                    </td>
                                    <td className={"table-item"}>Health / mobility issues</td>
                                    <td className={"table-item-description"}>{healthMobilityIssuesDescription}</td>
                                </tr>

                                <tr className={`${!hasAllergies && "bg-gray-200"} gray-border`}>
                                    <td>
                                        {hasAllergies ?
                                            <Check className={"checkmark-icon"}/> : <Ex className={"ex-icon"}/>
                                        }
                                    </td>
                                    <td className={"table-item"}>Allergies</td>
                                    <td className={"table-item-description"}>{allergiesDescription}</td>
                                </tr>

                                <tr className={`${!isReligionImportant && "bg-gray-200"} gray-border`}>
                                    <td>
                                        {isReligionImportant ?
                                            <Check className={"checkmark-icon"}/> : <Ex className={"ex-icon"}/>
                                        }
                                    </td>
                                    <td className={"table-item"}>Religion is important</td>
                                    <td className={"table-item-description"}>{religionDescription}</td>
                                </tr>

                                <tr className={`${!isDietImportant && "bg-gray-200"} gray-border`}>
                                    <td>
                                        {isDietImportant ?
                                            <Check className={"checkmark-icon"}/> : <Ex className={"ex-icon"}/>
                                        }
                                    </td>
                                    <td className={"table-item"}>Diet is important</td>
                                    <td className={"table-item-description"}>{dietDescription}</td>
                                </tr>

                                <tr className={`${!interestInBuyingHome && "bg-gray-200"} gray-border`}>
                                    <td>
                                        {interestInBuyingHome ?
                                            <Check className={"checkmark-icon"}/> : <Ex className={"ex-icon"}/>
                                        }
                                    </td>
                                    <td className={"table-item"}>Interested in buying a home</td>
                                    <td className={"table-item-description"}>{interestDescription}</td>
                                </tr>

                                <tr className={`${!hasHomeToShare && "bg-gray-200"} gray-border`}>
                                    <td>
                                        {hasHomeToShare ?
                                            <Check className={"checkmark-icon"}/> : <Ex className={"ex-icon"}/>
                                        }
                                    </td>
                                    <td className={"table-item"}>Has a home to share</td>
                                    <td className={"table-item-description"}>{hasHomeToShareDescription}</td>
                                </tr>
                                </tbody>
                            </table>

                            <button className={"btn btn-red mx-auto my-6 w-1/2 text-base py-2"}>Report User
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}


ProfilePage.propTypes =
    {
        username: PropTypes.string.isRequired,
        age: PropTypes.number.isRequired,

        gender: PropTypes.string.isRequired,
        genderDescription: PropTypes.string.isRequired,

        shareLimit: PropTypes.number.isRequired,

        workStatus: PropTypes.string.isRequired,
        familyStatus: PropTypes.string.isRequired,

        roommates: PropTypes.array,
        partnerOrGroupMembers: PropTypes.string.isRequired,
        roommateUsernames: PropTypes.array,

        minRent: PropTypes.string.isRequired,
        maxRent: PropTypes.string.isRequired,

        prefLocationText: PropTypes.string.isRequired,
        preferredLocations: PropTypes.array.isRequired,

        about: PropTypes.string.isRequired,

        petFriendly: PropTypes.bool.isRequired,
        petDescription: PropTypes.string.isRequired,

        smokeFriendly: PropTypes.bool.isRequired,
        smokingDescription: PropTypes.string.isRequired,

        hasHealthMobilityIssues: PropTypes.bool.isRequired,
        healthMobilityIssuesDescription: PropTypes.string.isRequired,

        hasAllergies: PropTypes.bool.isRequired,
        allergiesDescription: PropTypes.string.isRequired,

        isReligionImportant: PropTypes.bool.isRequired,
        religionDescription: PropTypes.string.isRequired,

        isDietImportant: PropTypes.bool.isRequired,
        dietDescription: PropTypes.string.isRequired,

        hasHomeToShare: PropTypes.bool.isRequired,
        hasHomeToShareDescription: PropTypes.string.isRequired,

        interestInBuyingHome: PropTypes.bool.isRequired,
        interestDescription: PropTypes.string.isRequired,
    }

export default ProfilePage;