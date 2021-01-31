/**
 * @Author:     Alex Qin
 * @Created:    2021.01.21
 *
 * @Description: Delete Account
 *
 */
import React, {useState} from "react";
import Checkbox from "../../common/forms/Checkbox";
import PropTypes from "prop-types";
import Button from "../../common/forms/Button";

function DeleteAccount(props) {

    const{confirm, setConfirm, handleDeleteAccount} = props

    return(
        <div>
            <Button label={"Delete Account?"} value={"Delete Account"} onClick={handleDeleteAccount}/>

            <Checkbox
                label={"Are you sure you'd like to delete your account?"}
                checked={confirm}
                onChange={()=>setConfirm(!confirm)}
            />
        </div>
    );
}
DeleteAccount.propTypes = {
    confirm: PropTypes.bool,
    setConfirm: PropTypes.bool,
    handleDeleteAccount: PropTypes.func
}

export default DeleteAccount