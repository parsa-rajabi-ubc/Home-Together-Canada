/**
 *
 * @Author:     Parsa Rajabi
 * @Created:    2021.3.12
 *
 * @Description: Manage Admins
 *
 */

import React from "react";
import PropTypes from "prop-types";
import SubmitButton from "../../common/forms/SubmitButton";
import GenericInput from "../../common/forms/GenericInput";

const ADMIN_TEXT = {
    TITLE: "Manage Admins",
    INFO: "Use the field below to search for members and provide them with admin privileges",
    CURRENT_ADMINS: "Current Website Admins",
}

function ManageAdmins(props) {
    const {
        setSearchUsername,
        searchUsernameError,
        currentAdmins,
        onSubmit
    } = props;


    const admins = currentAdmins.map(
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

            {/*Search and Make Admins*/}
            <div className="p-4 flex mx-auto w-1/2 items-center">
                <GenericInput
                    className={`${searchUsernameError && "border-red-500"} input m-auto mr-20 py-2`}
                    placeholder="Search Member Username"
                    onChange={e => setSearchUsername(e.target.value)}
                    onKeyDown={onKeyPress}
                    inputType={"text"}
                />
                <SubmitButton
                    inputValue={"Make Admin"}
                    className="btn btn-green ml-10 w-2/3 py-2"
                    onClick={onSubmit}
                />
            </div>

            {/*Current Admins*/}
            <label className={"label text-lg mx-10"}> {ADMIN_TEXT.CURRENT_ADMINS} </label>
            <div className={"mx-20 my-3"}>{admins}</div>
        </div>
    );
}

ManageAdmins.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    setSearchUsername: PropTypes.func.isRequired,
    searchUsernameError: PropTypes.bool,
    currentAdmins: PropTypes.array
};

export default ManageAdmins;