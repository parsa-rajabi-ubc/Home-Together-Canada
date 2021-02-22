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
import Loading from "../common/loading/Loading";
import Confirmation from "../common/listings/Confirmation";

const mapDispatchToProps = {
    reset,
    setMemberSearchResults
}

const MESSAGES = {
    CREATE_SEARCH: "Please use filters to search",
    ERROR: "Oops, there was an error loading search results. Please try again",
    INVALID_USER: "You must be a registered member to view this page."
}

const MemberSearchContainer = (props) => {
    const {accountType, authenticated, reset, memberSearchResults, setMemberSearchResults} = props;

    const [memberSearchResultsProfiles, setMemberSearchResultsProfiles] = useState(memberSearchResults || []);
    const [searchFiltersSelected, setSearchFiltersSelected] = useState(!!memberSearchResults);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const onSubmit = searchFilters => {
        if (!loading) {
            setLoading(true);
            MemberService.searchMemberProfiles(searchFilters)
                .then(res => res.json())
                .then(data => {
                    setSearchFiltersSelected(true);
                    if (data.profiles || Array.isArray(data.profiles)) {
                        setMemberSearchResultsProfiles(data.profiles);
                        setMemberSearchResults({memberSearchResults: data.profiles});
                        setError(false);
                        setLoading(false);
                    } else if (!data.authenticated && typeof data.authenticated === 'boolean') {
                        reset();
                        alert(SESSION_ERR);
                    } else if (data.err) {
                        alert('Error: ' + data.err);
                        setError(true);
                        setLoading(false);
                    } else if (data.errors) {
                        const errorMessage = getConcatenatedErrorMessage(data.errors);
                        // show list of all errors
                        alert(errorMessage);
                        setError(true);
                        setLoading(false);
                    } else {
                        alert('There was an error retrieving profiles');
                        setError(true);
                        setLoading(false);
                    }
                })
                .catch(err => {
                    alert('Error: ' + err.message);
                    setError(true);
                    setLoading(false);
                });
        }
    }

    function showAppropriateResultsPanel() {
        if (loading) {
            return <Loading isLoading={loading}/>
        } else if (!searchFiltersSelected) {
            return <Confirmation message={MESSAGES.CREATE_SEARCH} displayButton={false}/>
        } else if (error) {
            return <Confirmation message={MESSAGES.ERROR} displayButton={false} errorColor={true}/>
        } else {
            return <SearchResultsContainer profileData={memberSearchResultsProfiles}/>
        }
    }

    return (
        <div>
            {/* Checking to Ensure User is Authenticated and is a Member to view this page*/}
            {(!authenticated || accountType !== USER_TYPES.MEMBER)
                ? <InvalidUser message={MESSAGES.INVALID_USER}/>
                : <div className={"flex"}>
                    <section className={"flex-none w-1/3"}>
                        <SearchFilterContainer onSearchMembersSubmit={onSubmit}/>
                    </section>
                    {/*Results*/}
                    <div className={"flex-1"}>
                        {showAppropriateResultsPanel()}
                    </div>
                </div>
            }
        </div>
    );
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
