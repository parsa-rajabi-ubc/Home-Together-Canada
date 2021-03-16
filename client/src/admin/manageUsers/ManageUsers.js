/**
 *
 * @Author:     Parsa Rajabi
 * @Created:    2021.3.15
 *
 * @Description: Manage Users
 *
 */

import React from "react";
import PropTypes from "prop-types";
import SubmitButton from "../../common/forms/SubmitButton";
import GenericInput from "../../common/forms/GenericInput";

const ADMIN_TEXT = {
    TITLE: "Manage Users",
    INFO: "Use the field below to search for users and ban them. Please note all the user's listings will also be removed from the website.",
    CURRENT_BANNED: "Current Banned Users",
}

function ManageUsers(props) {
    const {
        setSearchUsername,
        searchUsernameError,
        currentBannedUsers,
        onSubmit
    } = props;

    const bannedUsers = currentBannedUsers.map(
        (person) =>
            <li key={person}>
                {person}
            </li>
    );

    // function to handle enter button
    const onKeyPress = (event) => {
        // checking if they pressed enter (ASCII Code)
        if (event.which === 13) {
            onSubmit(event);
        }
    }

    return (
        <div>
            <h3 className={"account-summary-info-header"}> {ADMIN_TEXT.TITLE} </h3>
            <p className="account-summary-info-text"> {ADMIN_TEXT.INFO} </p>

            {/*Search and Ban User*/}
            <div className="p-4 flex mx-auto w-1/2 items-center">
                <GenericInput
                    className={`${searchUsernameError && "border-red-500"} input m-auto mr-20 py-2`}
                    placeholder="Search Username"
                    onChange={e => setSearchUsername(e.target.value)}
                    onKeyDown={onKeyPress}
                    inputType={"text"}
                />
                <SubmitButton
                    inputValue={"Ban User"}
                    className="btn btn-red ml-10 w-2/3 py-2"
                    onClick={onSubmit}
                />
            </div>

            {/*Current Banned Users*/}
            <label className={"label text-lg mx-10"}> {ADMIN_TEXT.CURRENT_BANNED} </label>
            <div className={"mx-20 my-3"}>{bannedUsers}</div>
        </div>
    );
}

ManageUsers.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    setSearchUsername: PropTypes.func.isRequired,
    searchUsernameError: PropTypes.bool,
    currentBannedUsers: PropTypes.array
};

export default ManageUsers;