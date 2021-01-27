/**
 * @Author:     Alex Qin
 * @Created:    2021.01.21
 *
 * @Description: Delete Account
 *
 */

import React, {useState} from "react";
import get from 'lodash/get';
import Checkbox from "../../common/forms/Checkbox";
import PropTypes from "prop-types";
import Button from "../../common/forms/Button";
import { useHistory } from "react-router-dom";

function DeleteAccount(props) {

    const {accountInfo} = props;
    const history = useHistory();

    const [deleteAccount, setDeleteAccount] = useState(get(accountInfo,'deleteAccount',false))
    const [confirm, setConfirm] = useState(false)

    function handleDeleteAccount(e){
        if(confirm === true){
            setDeleteAccount(e.value = true);
            alert("Your Account is deleted");
            return history.push('/');
        }else{
            alert("Please confirm the checkbox below!");
        }
    }

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
    accountInfo: PropTypes.object
}

export default DeleteAccount