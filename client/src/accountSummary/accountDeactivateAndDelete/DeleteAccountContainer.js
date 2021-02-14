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
import {connect} from "react-redux";
import PropTypes from "prop-types";
import AccountService from "../../services/AccountService"
import {bindActionCreators} from "redux";
import {reset} from "../../redux/actionCreators";

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ reset }, dispatch);
}

const MESSAGES = {
    SUCCESS: 'Your account has been successfully deleted!',
    GENERIC_ERROR: 'There was an error deleting your account.',
    CHECKBOX: 'Please confirm the checkbox below!'
}

const DeleteAccountContainer = props =>{
    const {reset} = props;
    const history = useHistory();
    const [confirm, setConfirm] = useState(false)

    const deleteAccount = () => {
        AccountService.deleteAccount()
            .then(res => res.json())
            .then(data => {
                if (data.deleted) {
                    alert('Your account has been successfully deleted!')
                } else {
                    alert(data.err || MESSAGES.GENERIC_ERROR);
                }
                reset();

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
            alert(MESSAGES.CHECKBOX);
        }
    }

    return(
        <DeleteAccount
            confirm={confirm}
            setConfirm={setConfirm}
            handleDeleteAccount={handleDeleteAccount}
        />
    );
}

DeleteAccountContainer.propTypes = {
    reset: PropTypes.func.isRequired
}
export default connect(null, mapDispatchToProps)(DeleteAccountContainer);
