/**
 * @Author:     Parsa Rajabi
 * @Created:    2021.1.17
 *
 * @Description: Member Search Container;
 *
 */

import React, { useState } from 'react';
import {USER_TYPES} from "../common/constants/users";
import InvalidUser from "./InvalidUser";
import PropTypes from "prop-types";
import {compose} from "redux";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import BurgerMenu from "../common/listings/BurgerMenu";
import {RemoveScroll} from 'react-remove-scroll';
import SearchResultsContainer from "./SearchResultsContainer";
import MockProfileCardData from "../mockData/MockProfileCardData";

const MemberSearchContainer = (props) => {
    const [menuOpenState, setMenuOpenState] = useState(false)

    const toggleMenu = () => {
        setMenuOpenState(!menuOpenState);
    }

    const handleMenuOnClose = () => {
        setMenuOpenState(false);
    }

    const {accountType, authenticated} = props;

    return (
        <div>
            {/* Checking to Ensure User is Authenticated and is a Member to view this page*/}
            {(!authenticated || accountType !== USER_TYPES.MEMBER) ?
                <InvalidUser/>
                :
                <div className={"flex flex-nowrap"}>
                    {menuOpenState && <RemoveScroll/>}
                    {/*TODO: This has to be moved into a SearchContainer During Next Ticket*/}
                    <BurgerMenu isOpen={menuOpenState} onClose={handleMenuOnClose}
                                content={
                                    <div>
                                        <label className={"page-title text-lg text-gray-300 mt-5"}>Modify Your Search
                                            Criteria</label>
                                        <button className={"btn btn-green float-right w-1/5 py-2 px-4 text-base "}
                                                onClick={toggleMenu}>
                                            Done
                                        </button>
                                    </div>
                                }/>
                    {/*Results*/}
                    <div className={"w-1/3 "}>
                        <button className={"btn btn-green w-1/5 py-2 ml-6 mb-6 text-base my-10"}
                                onClick={toggleMenu}>Filter
                        </button>
                        <SearchResultsContainer profileData={MockProfileCardData}/>
                    </div>


                    {/*Map*/}
                    <div className={"flex-1"}>
                        <p>
                            Google Maps Placeholder
                        </p>
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
