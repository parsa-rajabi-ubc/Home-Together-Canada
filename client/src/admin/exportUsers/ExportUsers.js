/**
 *
 * @Author:     Parsa Rajabi
 * @Created:    2021.3.15
 *
 * @Description: Export Users Component
 *
 */

import React from "react";

const ADMIN_TEXT = {
    TITLE: "Export Users",
    INFO: "Use the button below to export user data",
}

function ExportUsers() {

    const onSubmit = () => {

    }

    return (
        <div>
            <h3 className={"account-summary-info-header"}> {ADMIN_TEXT.TITLE} </h3>
            <p className="account-summary-info-text"> {ADMIN_TEXT.INFO} </p>
            <button
                className="btn btn-green mx-auto w-1/3 mt-24"
                onClick={onSubmit}>
                Export Users
            </button>
        </div>
    );
}


export default ExportUsers;