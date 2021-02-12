/**
 * @Author:     Alex Qin
 * @Created:    2021.01.26
 *
 * @Description: Delete Account Container
 *
 */

import React, {useState} from "react";
import { useHistory } from "react-router-dom";
import DeleteAccount from "./DeleteAccount";
import {USER_TYPES} from "../../common/constants/users";
import {setAccountType, setAuthenticated, setIsAdmin} from "../../redux/slices/userPrivileges";
import {setActive} from "../../redux/slices/memberPrivileges";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import AccountService from "../../services/AccountService"

const mapDispatch = {setIsAdmin, setAccountType, setAuthenticated, setActive};

const DeleteAccountContainer = props =>{

    const {setIsAdmin, setAccountType, setAuthenticated, setActive} = props;
    const history = useHistory();
    const [confirm, setConfirm] = useState(false)

    const deleteAccount = () => {
        AccountService.deleteAccount()
            .then(res => res.json())
            .then(data => {
                if (data.deleted) {
                    alert('Your account has been successfully deleted!')
                } else {
                    alert(data.err || 'There was an error deleting your account.');
                }
                setIsAdmin({isAdmin: false});
                setAccountType({accountType: USER_TYPES.UNREGISTERED});
                setAuthenticated({authenticated: false});
                setActive({active: null});

                // redirect to home page
                history.push('/');
            })
        .catch(err => {
            alert('Error: ' + err.message);
        });
    }

    function handleDeleteAccount(){
        if(confirm){
            return deleteAccount();
        }else{
            alert("Please confirm the checkbox below!");
        }
    }

    return(
        <DeleteAccount
            confirm = {confirm}
            setConfirm = {setConfirm}
            handleDeleteAccount = {handleDeleteAccount}
        />
    );
}

DeleteAccountContainer.propTypes = {
    setAccountType: PropTypes.func.isRequired,
    setIsAdmin: PropTypes.func.isRequired,
    setAuthenticated: PropTypes.func.isRequired,
    setActive: PropTypes.func.isRequired
}
export default connect(null, mapDispatch)(DeleteAccountContainer);
