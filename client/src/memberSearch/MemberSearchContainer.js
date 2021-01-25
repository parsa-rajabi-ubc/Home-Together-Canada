/**
 * @Author:     Parsa Rajabi
 * @Created:    2021.1.17
 *
 * @Description: Member Search Container;
 *
 */

import React from 'react';
import {USER_TYPES} from "../common/constants/users";
import InvalidUser from "./InvalidUser";
import PropTypes from "prop-types";
import {compose} from "redux";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {setAccountType, setAuthenticated} from "../redux/slices/userPrivileges";
const mapDispatch = {setAccountType, setAuthenticated};

const MemberSearchContainer = (props) => {

    const {
        accountType,
        authenticated
    } = props;


    return (
        <div>
            {(!authenticated || accountType !== USER_TYPES.MEMBER) &&
                <InvalidUser/>
            }
            {(authenticated && accountType === USER_TYPES.MEMBER) &&
                <div>
                    {/*Results*/}
                    <div>
                        Showing Results Here
                    </div>

                    {/*Map*/}
                    <div>
                        Showing Map Here
                    </div>
                </div>
            }
        </div>
    )
}

const mapStateToProps = (state) => ({
    accountType: state.userPrivileges.accountType,
    authenticated: state.userPrivileges.authenticated
});

MemberSearchContainer.propTypes = {
    authenticated: PropTypes.bool.isRequired,
    accountType: PropTypes.string
}

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatch)
)(MemberSearchContainer);
