/**
 * @Author:     Parsa Rajabi
 * @Created:    2021.1.17
 *
 * @Description: Member Search Container;
 *
 */

import React, {useState} from 'react';
import {USER_TYPES} from "../common/constants/users";
import InvalidUser from "../common/error/InvalidUser";
import PropTypes from "prop-types";
import {compose} from "redux";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import SearchResultsContainer from "./SearchResultsContainer";
import SearchFilterContainer from "./SearchFilterContainer";
import * as MemberService from '../services/MemberService';
import {reset} from "../redux/actionCreators";
import {SESSION_ERR} from "../common/constants/errors";
import {getConcatenatedErrorMessage} from "../registration/registrationUtils";
import {setMemberSearchResults} from "../redux/slices/memberPrivileges";

const mapDispatchToProps = {
    reset,
    setMemberSearchResults
}

    const MemberSearchContainer = (props) => {
    const {accountType, authenticated, reset, memberSearchResults, setMemberSearchResults} = props;

    const [memberSearchResultsProfiles, setMemberSearchResultsProfiles] = useState(memberSearchResults || []);
    const [searchFiltersSelected, setSearchFiltersSelected] = useState(!!memberSearchResults);
    const [error, setError] = useState(false);

    const onSubmit = searchFilters => {
        MemberService.searchMemberProfiles(searchFilters)
            .then(res => res.json())
            .then(data => {
                setSearchFiltersSelected(true);
                if (data.profiles || Array.isArray(data.profiles)) {
                    setMemberSearchResultsProfiles(data.profiles);
                    setMemberSearchResults({ memberSearchResults: data.profiles });
                    setError(false);
                } else if (!data.authenticated && typeof data.authenticated === 'boolean') {
                    reset();
                    alert(SESSION_ERR);
                } else if (data.err) {
                    alert('Error: ' + data.err);
                    setError(true);
                } else if (data.errors) {
                    const errorMessage = getConcatenatedErrorMessage(data.errors);
                    // show list of all errors
                    alert(errorMessage);
                    setError(true);
                } else {
                    alert('There was an error retrieving profiles');
                    setError(true);
                }
            })
            .catch(err => {
                alert('Error: ' + err.message);
                setError(true);
            });
    }

    return (
        <div>
            {/* Checking to Ensure User is Authenticated and is a Member to view this page*/}
            {(!authenticated || accountType !== USER_TYPES.MEMBER)
                ? <InvalidUser message={"You must be a registered member to view this page."}/>
                : <div className={"flex flex-nowrap"}>
                    <SearchFilterContainer onSearchMembersSubmit={onSubmit}/>

                    {/*Results*/}
                    <div className={"flex-1"}>
                        {!searchFiltersSelected
                            ? <div>Please select search filters to search</div>
                            : error
                                ? <div>There was error loading search results</div>
                                : <SearchResultsContainer profileData={memberSearchResultsProfiles}/>
                        }
                    </div>
                </div>
            }
        </div>
    )
}

const mapStateToProps = (state) => ({
    accountType: state.userPrivileges.accountType,
    authenticated: state.userPrivileges.authenticated,
    memberSearchResults: state.memberPrivileges.memberSearchResults
});

MemberSearchContainer.propTypes = {
    authenticated: PropTypes.bool.isRequired,
    accountType: PropTypes.string,
    reset: PropTypes.func.isRequired,
    memberSearchResults: PropTypes.array,
    setMemberSearchResults: PropTypes.func.isRequired
}

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(MemberSearchContainer);
