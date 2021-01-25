/**
 * @Author:     Parsa Rajabi
 * @Created:    2021.1.17
 *
 * @Description: Member Search Container;
 *
 */

import React from 'react';
import ProfileCard from "./ProfileCard";
import MockProfileCardData from "../mockData/MockProfileCardData";
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


    // displays 10 mock data
    function profileCards() {
        let profiles = [];
        for (let i = 0; i < 10; i++) {
            profiles.push(<ProfileCard key={i}
                                       username={MockProfileCardData[i].username}
                                       age={MockProfileCardData[i].age}
                                       familyStatus={MockProfileCardData[i].status}
                                       minBudget={MockProfileCardData[i].minRent}
                                       maxBudget={MockProfileCardData[i].maxRent}
                                       pet={MockProfileCardData[i].pet}
                                       smoke={MockProfileCardData[i].smoke}
                                       religion={MockProfileCardData[i].religion}
                                       diet={MockProfileCardData[i].diet}
            />);
        }
        return profiles;
    }

    return (
        <div>
            {/* Checking to Ensure User is Authenticated and is a Member to view this page*/}
            {(!authenticated || accountType !== USER_TYPES.MEMBER) ?
                <InvalidUser/>
                :
                <div className={"flex flex-nowrap my-10"}>
                    {/*Results*/}
                    <div className={"w-1/3 "}>
                        {profileCards()}
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
    connect(mapStateToProps, mapDispatch)
)(MemberSearchContainer);
