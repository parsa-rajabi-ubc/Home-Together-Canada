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
import SearchResultsContainer from "./SearchResultsContainer";
import MockProfileCardData from "../mockData/MockProfileCardData";
import SearchFilterContainer from "./SearchFilterContainer";

const MemberSearchContainer = (props) => {
    const {accountType, authenticated} = props;

    return (
        <div>
            {/* Checking to Ensure User is Authenticated and is a Member to view this page*/}
            {(!authenticated || accountType !== USER_TYPES.MEMBER) ? <InvalidUser/> :
                <div className={"flex flex-nowrap"}>
                    <SearchFilterContainer/>

                    {/*Results*/}
                    <div className={"flex-1"}>
                        <SearchResultsContainer profileData={MockProfileCardData}/>
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
    connect(mapStateToProps, null)
)(MemberSearchContainer);