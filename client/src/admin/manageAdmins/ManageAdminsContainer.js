/**
 *
 * @Author:     Parsa Rajabi
 * @Created:    2021.3.12
 *
 * @Description: Manage Admins
 *
 */

import React, {useEffect, useState} from "react";
import ManageAdmins from "./ManageAdmins";
import * as AdminService from "../../services/AdminService";
import * as MemberService from '../../services/MemberService';
import {
    checkIfErrorsExistInMapping,
    getConcatenatedErrorMessage,
    validateInput
} from "../../registration/registrationUtils";
import {Flip, toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import {ADMIN_TOAST} from "../../common/constants/ToastText";


toast.configure()

function ManageAdminsContainer() {
    const [searchUsername, setSearchUsername] = useState();
    const [searchUsernameError, setSearchUsernameError] = useState();
    const [currentAdmins, setCurrentAdmins] = useState([]);


    // useEffects
    useEffect(() => {
        searchUsername !== undefined && validateInput(searchUsername, setSearchUsernameError);
    }, [searchUsername]);

    useEffect(() => {
        getAllAdmins();
    }, [])


    const getAllAdmins = () => {
        AdminService.getAllAdmins()
            .then(res => res.json())
            .then(data => {
                setCurrentAdmins(data.admins);
            })
    }
    const isSearchValid = () => {
        const searchErrors = {
            username: false,
        }
        searchErrors.username = validateInput(searchUsername, setSearchUsernameError);

        // check search criteria for errors
        return !checkIfErrorsExistInMapping(searchErrors);
    }
    const onSearch = () => {
        const promoteMemberBodyRequest = {
            username: searchUsername
        }
        if (isSearchValid()) {

            MemberService.findMemberProfileByUsername(searchUsername)
                .then(res => res.json())
                .then(data => {
                    if (data.profile) {
                        AdminService.promoteMemberToAdmin(promoteMemberBodyRequest)
                            .then(res => res.json())
                            .then(data => {
                                if (data.adminPrivileges) {
                                    toast.success(ADMIN_TOAST.MANAGE_ADMIN_SUCCESS, {
                                        toastId: "successToast",
                                        position: "bottom-center",
                                        autoClose: 10000,
                                        hideProgressBar: false,
                                        closeOnClick: true,
                                        pauseOnHover: true,
                                        draggable: true,
                                        progress: false,
                                        transition: Flip
                                    });
                                    getAllAdmins();

                                } else if (data.err) {
                                    alert('Error: ' + data.err);

                                } else if (data.errors) {
                                    const errorMessage = getConcatenatedErrorMessage(data.errors);
                                    // show list of all errors
                                    alert(errorMessage);
                                }
                            })
                            .catch(err => {
                                alert('Error: ' + err.message);
                            });
                    } else {
                        toast.error(ADMIN_TOAST.MANAGE_ADMIN_USERNAME_DNE, {
                            toastId: "usernameDNE",
                            position: "bottom-center",
                            autoClose: 10000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: false,
                            transition: Flip
                        });
                    }
                });
        } else {
            toast.error(ADMIN_TOAST.MANAGE_ADMIN_EMPTY_USERNAME, {
                toastId: "emptyUsername",
                position: "bottom-center",
                autoClose: 10000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: false,
                transition: Flip
            });
        }
    }
    return (
        <div>
            <ManageAdmins
                onSubmit={onSearch}
                searchUsername={searchUsername}
                setSearchUsername={setSearchUsername}
                searchUsernameError={searchUsernameError}
                currentAdmins={currentAdmins}

            />
        </div>
    );
}


export default ManageAdminsContainer;