/**
 * @Author:     Parsa Rajabi
 * @Created:    2021.1.30
 *
 * @Description: Re-useable profile page
 *
 */

import React, {useState} from 'react';
import PropTypes from "prop-types";
import {AiOutlineCheckCircle as Check} from "react-icons/ai";
import {AiOutlineCloseCircle as Ex} from "react-icons/ai"
import SendMessage from "../../accountSummary/member/messaging/SendMessage";
import {toast} from "react-toastify";
import {IN_DEVELOPMENT} from "../../common/constants/ToastText";


function ProfilePage(props) {
    const {
        uid,

        username,
        age,

        gender,
        genderDescription,

        shareLimit,

        workStatus,
        familyStatus,

        roommates,
        partnerOrGroupMembersLabel,
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

    const [sendingMessage, setSendingMessage] = useState(false);

    const handleMessageClick = () => {
        setSendingMessage(true);
    }

    return (
        <div className="selected-component-grid-outer">
            <div className="selected-component-grid-inner">
                <div className="grid grid-cols-2 gap-y-4 my-6">
                    <div className={"col-start-1 col-end-1"}>
                        <span className={"mb-4 text-2xl font-bold"}> {username}, </span>
                        <span className={"text-2xl font-medium"}>{age}</span>
                        <section className={"my-6"}>
                            <span className={"font-semibold"}>{gender}</span>
                            {/*Conditionally show the gender description*/}
                            {gender === "Other" && <span>: {genderDescription}</span>}
                        </section>

                        <span className={"block my-6 font-normal"}>Open to sharing
                                with {shareLimit !== -1 ? shareLimit : 'any number of'} people</span>

                        <section className={"my-6"}>
                            <span className={"block"}> {workStatus} </span>
                        </section>

                        <section className={"my-6"}>
                            <span className={"block"}> {familyStatus} </span>
                            {!!roommates.length &&
                            <section>
                                <label>{partnerOrGroupMembersLabel}: </label>
                                {roommateUsernames}
                            </section>
                            }
                        </section>

                        <section className={"my-6"}>
                            <span className={"label mr-3"}>Budget</span>
                            <span className={"block"}> ${minRent} - ${maxRent} (CAD) </span>
                        </section>

                        <section className={"my-6"}>
                            <span className={"label mr-3"}> {prefLocationText} </span>
                            <div className={"whitespace-pre mt-1"}>{preferredLocations}</div>
                        </section>
                        <button className={"btn btn-green mb-6 w-1/2 text-base py-2"} onClick={handleMessageClick}>Send Message
                        </button>
                    </div>
                    <div className={"col-start-2"}>
                        {/*Conditionally show the about section*/}
                        {about && <div className={"mb-4 p-3 h-auto m-auto rounded-lg shadow-lg"}>
                            {about}
                        </div>}
                        <table className={"table-auto mx-auto shadow-lg"}>
                            <tbody>
                            <tr className={`${petFriendly && "bg-gray-200"} gray-border`}>
                                <td>
                                    {petFriendly ?
                                        <Check className={"checkmark-icon"}/> : <Ex className={"ex-icon"}/>
                                    }
                                </td>
                                <td className={"table-item"}>Pet friendly</td>
                                <td className={"table-item-description"}>{petDescription}</td>
                            </tr>

                            <tr className={`${smokeFriendly && "bg-gray-200"} gray-border`}>
                                <td>
                                    {smokeFriendly ?
                                        <Check className={"checkmark-icon"}/> : <Ex className={"ex-icon"}/>
                                    }
                                </td>
                                <td className={"table-item"}>Smoke friendly</td>
                                <td className={"table-item-description"}>{smokingDescription}</td>
                            </tr>

                            <tr className={`${hasHealthMobilityIssues && "bg-gray-200"} gray-border`}>
                                <td>
                                    {hasHealthMobilityIssues ?
                                        <Check className={"checkmark-icon"}/> : <Ex className={"ex-icon"}/>
                                    }
                                </td>
                                <td className={"table-item"}>Health / mobility issues</td>
                                <td className={"table-item-description"}>{healthMobilityIssuesDescription}</td>
                            </tr>

                            <tr className={`${hasAllergies && "bg-gray-200"} gray-border`}>
                                <td>
                                    {hasAllergies ?
                                        <Check className={"checkmark-icon"}/> : <Ex className={"ex-icon"}/>
                                    }
                                </td>
                                <td className={"table-item"}>Allergies</td>
                                <td className={"table-item-description"}>{allergiesDescription}</td>
                            </tr>

                            <tr className={`${isReligionImportant && "bg-gray-200"} gray-border`}>
                                <td>
                                    {isReligionImportant ?
                                        <Check className={"checkmark-icon"}/> : <Ex className={"ex-icon"}/>
                                    }
                                </td>
                                <td className={"table-item"}>Religion is important</td>
                                <td className={"table-item-description"}>{religionDescription}</td>
                            </tr>

                            <tr className={`${isDietImportant && "bg-gray-200"} gray-border`}>
                                <td>
                                    {isDietImportant ?
                                        <Check className={"checkmark-icon"}/> : <Ex className={"ex-icon"}/>
                                    }
                                </td>
                                <td className={"table-item"}>Diet is important</td>
                                <td className={"table-item-description"}>{dietDescription}</td>
                            </tr>

                            <tr className={`${interestInBuyingHome && "bg-gray-200"} gray-border`}>
                                <td>
                                    {interestInBuyingHome ?
                                        <Check className={"checkmark-icon"}/> : <Ex className={"ex-icon"}/>
                                    }
                                </td>
                                <td className={"table-item"}>Interested in buying a home</td>
                                <td className={"table-item-description"}>{interestDescription}</td>
                            </tr>

                            <tr className={`${hasHomeToShare && "bg-gray-200"} gray-border`}>
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

                        <button className={"btn btn-red mx-auto my-6 w-1/2 text-base py-2"} onClick={() => toast.error(IN_DEVELOPMENT.MSG)}>
                            Report User
                        </button>
                    </div>

                </div>
                {sendingMessage && <SendMessage receiverUsername={username} receiverId={uid} newMessageAddedCallback={() => null}/>}
            </div>
        </div>
    );
}


ProfilePage.propTypes =
    {
        uid: PropTypes.number.isRequired,
        username: PropTypes.string.isRequired,
        age: PropTypes.number.isRequired,

        gender: PropTypes.string.isRequired,
        genderDescription: PropTypes.string,

        shareLimit: PropTypes.number.isRequired,

        workStatus: PropTypes.string.isRequired,
        familyStatus: PropTypes.string.isRequired,

        roommates: PropTypes.array,
        partnerOrGroupMembersLabel: PropTypes.string.isRequired,
        roommateUsernames: PropTypes.array,

        minRent: PropTypes.string.isRequired,
        maxRent: PropTypes.string.isRequired,

        prefLocationText: PropTypes.string.isRequired,
        preferredLocations: PropTypes.array.isRequired,

        about: PropTypes.string.isRequired,

        petFriendly: PropTypes.bool.isRequired,
        petDescription: PropTypes.string,

        smokeFriendly: PropTypes.bool.isRequired,
        smokingDescription: PropTypes.string,

        hasHealthMobilityIssues: PropTypes.bool.isRequired,
        healthMobilityIssuesDescription: PropTypes.string,

        hasAllergies: PropTypes.bool.isRequired,
        allergiesDescription: PropTypes.string,

        isReligionImportant: PropTypes.bool.isRequired,
        religionDescription: PropTypes.string,

        isDietImportant: PropTypes.bool.isRequired,
        dietDescription: PropTypes.string,

        hasHomeToShare: PropTypes.bool.isRequired,
        hasHomeToShareDescription: PropTypes.string,

        interestInBuyingHome: PropTypes.bool.isRequired,
        interestDescription: PropTypes.string,
    }

export default ProfilePage;