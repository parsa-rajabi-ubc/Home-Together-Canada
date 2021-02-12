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
import {USER_TYPES} from "../../common/constants/users";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {setAccountType, setAuthenticated, setIsAdmin} from "../../redux/slices/userPrivileges";
import {setActive} from "../../redux/slices/memberPrivileges";
import {getConcatenatedErrorMessage} from "../../registration/registrationUtils";

const mapDispatch = {setIsAdmin, setAccountType, setAuthenticated, setActive};

const DeactivateAccountContainer = props => {
    const {setIsAdmin, setAccountType, setAuthenticated, setActive} = props;

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
                    alert('Your account has been activated!');
                } else if (data.authenticated === false) {
                    setIsAdmin({isAdmin: false});
                    setAccountType({accountType: USER_TYPES.UNREGISTERED});
                    setAuthenticated({authenticated: false});
                    setActive({active: null});
                    alert('There was error with your session.');
                } else if (data.err) {
                    alert('Error: ' + data.err);
                } else {
                    alert('There was an error activating your account. ' +
                        'Please contact Home Together if the issue persists');
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
                    alert('Your account has been deactivated.');
                } else if (data.authenticated === false) {
                    setIsAdmin({isAdmin: false});
                    setAccountType({accountType: USER_TYPES.UNREGISTERED});
                    setAuthenticated({authenticated: false});
                    setActive({active: null});
                    alert('There was error with your session.');
                } else if (data.errors) {
                    alert('Error: ' + getConcatenatedErrorMessage(data.errors));
                } else if (data.err) {
                    alert('Error: ' + data.err);
                } else {
                    alert('There was an error activating your account. ' +
                        'Please contact Home Together if the issue persists');
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
    setAccountType: PropTypes.func.isRequired,
    setIsAdmin: PropTypes.func.isRequired,
    setAuthenticated: PropTypes.func.isRequired,
    setActive: PropTypes.func.isRequired
}

export default connect(null, mapDispatch)(DeactivateAccountContainer);
