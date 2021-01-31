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
import LoginService from "../../services/LoginService";
import {USER_TYPES} from "../../common/constants/users";
import {setAccountType, setAuthenticated, setIsAdmin} from "../../redux/slices/userPrivileges";
import {connect} from "react-redux";
import PropTypes from "prop-types";

const mapDispatch = {setIsAdmin, setAccountType, setAuthenticated};

const DeleteAccountContainer = (props)=>{

    const {setIsAdmin, setAccountType, setAuthenticated} = props;
    const history = useHistory();
    const [confirm, setConfirm] = useState(false)

    const logout = () => {
        LoginService.logoutUser()
            .then(res => res.json())
            .then(() => {
                setIsAdmin({isAdmin: false});
                setAccountType({accountType: USER_TYPES.UNREGISTERED});
                setAuthenticated({authenticated: false});

                // redirect to home page
                history.push('/');
            })
    }

    function handleDeleteAccount(){
        if(confirm){
            alert("Your Account is deleted");
            return logout();
        }else{
            alert("Please confirm the checkbox below!");
        }
    }

    // this will be used to hook on DB in the future
    const deleteAccount = ()  => {

    }

    return(
        <DeleteAccount
            confirm = {confirm}
            setConfirm = {setConfirm}
            handleDeleteAccount = {handleDeleteAccount}
        />
    )

}

DeleteAccountContainer.propTypes = {
    setAccountType: PropTypes.func.isRequired,
    setIsAdmin: PropTypes.func.isRequired,
    setAuthenticated: PropTypes.func.isRequired,
}
export default connect(null, mapDispatch)(DeleteAccountContainer);