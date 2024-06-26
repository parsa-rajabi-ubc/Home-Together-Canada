/**
 * @Author:     Alex Qin
 * @Created:    2021.01.26
 *
 * @Description: Deactivate Account Container
 *
 */

import React, {useState, useEffect} from "react";
import DeactivateAccount from "./DeactivateAccount";
import * as MemberService from '../../services/MemberService';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {setActive} from "../../redux/slices/memberPrivileges";
import {getConcatenatedErrorMessage} from "../../registration/registrationUtils";
import {SESSION_ERR} from "../../common/constants/errors";
import {reset} from "../../redux/actionCreators";

const mapDispatchToProps = {
    reset,
    setActive
}

const MESSAGES = {
    ACTIVATED: 'Your account has been activated!',
    DEACTIVATED: 'Your account has been deactivated.',
    SESSION_ERR: SESSION_ERR,
    GENERIC_ERROR: 'There was an error activating your account. Please contact Home Together if the issue persists'
}

const DeactivateAccountContainer = props => {
    const { reset, setActive } = props;

    const [reason, setReasons] = useState("");
    const [activeStatus, setActiveStatus] = useState(true);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        MemberService.getActiveStatus()
            .then(res => res.json())
            .then(data => {
                setActiveStatus(data.active);
                setReasons(data.active ? '' : data.deactivationReason);
                setLoading(false);
            });
    }, []);

    const handleReasonsChange = (e) => {
        setReasons(e.value);
    }

    function activateAccount() {
        MemberService.activateAccount()
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    setActiveStatus(true);
                    setReasons('');
                    setActive({active: true});
                    alert(MESSAGES.ACTIVATED);
                } else if (data.authenticated === false) {
                    reset();
                    alert(MESSAGES.SESSION_ERR);
                } else if (data.err) {
                    alert('Error: ' + data.err);
                } else {
                    alert(MESSAGES.GENERIC_ERROR);
                }
            })
            .catch(err => {
                alert('error activating account: ' + err.message);
            });
    }

    function deactivateAccount() {
        MemberService.deactivateAccount(reason)
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    setActiveStatus(false);
                    setReasons('');
                    setActive({active: false});
                    alert(MESSAGES.DEACTIVATED);
                } else if (data.authenticated === false) {
                    reset();
                    alert(MESSAGES.SESSION_ERR);
                } else if (data.errors) {
                    alert('Error: ' + getConcatenatedErrorMessage(data.errors));
                } else if (data.err) {
                    alert('Error: ' + data.err);
                } else {
                    alert(MESSAGES.GENERIC_ERROR);
                }
            })
            .catch(err => {
                alert('error deactivating account: ' + err.message);
            });
    }

    return (
        <div>
            {!loading &&
                <DeactivateAccount
                    active={activeStatus}
                    reason={reason}
                    deactivateAccount={deactivateAccount}
                    activateAccount={activateAccount}
                    handleReasonsChange={handleReasonsChange}
                />
            }
        </div>
    );
}

DeactivateAccountContainer.propTypes = {
    reset: PropTypes.func.isRequired,
    setActive: PropTypes.func.isRequired
}

export default connect(null, mapDispatchToProps)(DeactivateAccountContainer);
