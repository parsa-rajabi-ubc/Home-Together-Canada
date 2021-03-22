/**
 *
 * @Author:     Parsa Rajabi
 * @Created:    2021.3.15
 *
 * @Description: Export Users Component
 *
 */

import React from "react";
import * as AdminService from '../../services/AdminService';

const ADMIN_TEXT = {
    TITLE: "Export Users",
    INFO: "Use the button below to export user data",
}

function ExportUsers() {

    const onSubmit = async () => {
        AdminService.exportUserData()
            .then(res => res.blob())
            .then(blob => {
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = "home_together_info.csv";
                document.body.appendChild(a); // we need to append the element to the dom -> otherwise it will not work in firefox
                a.click();
                a.remove();  //afterwards we remove the element again
            })
            .catch(err => {
                alert('Error: ' + err.message);
            });
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