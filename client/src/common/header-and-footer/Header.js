/**
 * @Author:     Parsa Rajabi
 * @Created:    2020.11.09
 *
 * @Description: header for the website which contains links to Search Member Profiles, Services, Classifieds and Account Page
 *
 */

import React from 'react';
import '../../tailwind.output.css';
import {Link, useHistory} from "react-router-dom";
import LoginService from '../../services/LoginService';
import {connect} from "react-redux";
import {bindActionCreators} from 'redux';
import {reset} from '../../redux/actionCreators';
import PropTypes from "prop-types";
import {BUSINESS_SUBPAGES, MEMBER_SUBPAGES, USER_TYPES} from "../constants/users";
import Dropdown from "../forms/Dropdown";
import {pushToRoute} from "../utils/navigationUtils";
import {withRouter} from "react-router-dom";
import {compose} from "redux";
import {dropdownAccountCSS, dropdownAccountTheme} from "../../css/dropdownCSSUtil"
import {SERVICES_TEXT, CLASSIFIEDS_TEXT, CREATE_LISTINGS_TEXT} from "../constants/listingsConstants";

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({reset}, dispatch);
}

const Header = (props) => {
    const {
        history,
        reset,
        isAdmin,
        accountType,
        authenticated
    } = props;

    let URL_PATH = useHistory().location.pathname;

    const logout = () => {
        LoginService.logoutUser()
            .then(res => res.json())
            .then(() => {
                reset();

                // redirect to home page
                history.push('/');
            })
    }

    // TODO: save active status to redux store and conditionally show "Activate Account" and "Deactivate Account" based on the status

    const dropdownOptions = accountType === USER_TYPES.MEMBER
        ? [...MEMBER_SUBPAGES, {label: 'Logout', value: 'Logout'}]
        : [...BUSINESS_SUBPAGES, {label: 'Logout', value: 'Logout'}];

    return (
        <div>
            <nav className="top-0 flex w-full bg-green-400 tex-black">
                <div
                    className="container flex items-center justify-between w-full py-2 mx-auto mt-0 whitespace-nowrap">
                    <div className="flex flex-nowrap items-center ml-4">
                        <Link to={'/'}
                              className="text-lg font-bold lg:text-xl">
                            Home Together Canada
                        </Link>
                    </div>

                    {/* Middle of Nav */}
                    <div
                        className="flex-nowrap hidden w-full p-4 mt-2 tex-black lg:flex lg:items-center lg:w-auto lg:block lg:mt-0 lg:bg-transparent lg:p-0">
                        <div className="items-center justify-end flex-1 mr-16 list-reset lg:flex">
                            {accountType !== USER_TYPES.BUSINESS &&
                            <Link to={'/members'} className={`${(URL_PATH === "/members") && "bg-green-200"} nav-icon`}>
                                Search Member Profiles
                            </Link>
                            }
                            <Link to={'/services'} className={`${(URL_PATH === "/services") && "bg-green-200"} nav-icon`}>
                                {SERVICES_TEXT}
                            </Link>
                            {/*<Link to={'/classifieds'} className={`${(URL_PATH === "/classifieds") && "bg-green-200"} nav-icon`}>*/}
                            {/*    {CLASSIFIEDS_TEXT}*/}
                            {/*</Link>*/}
                            <Link to={'/faq'} className={`${(URL_PATH === "/faq") && "bg-green-200"} nav-icon`}>
                                FAQ
                            </Link>
                            {(authenticated && accountType !== USER_TYPES.UNREGISTERED) &&
                            < Link to={'/create-listing'} className={`${(URL_PATH === "/create-listing") && "bg-green-200"} nav-icon`}>
                                {CREATE_LISTINGS_TEXT}
                            </Link>
                            }
                            {(authenticated && isAdmin) &&
                            <Link to={'/admin'} className={`${(URL_PATH === "/admin") && "bg-green-200"} nav-icon`}>
                                Admin
                            </Link>
                            }
                        </div>

                        {/* Login and Sign Up Buttons */}
                        {(accountType === USER_TYPES.UNREGISTERED || !authenticated) &&
                        <Link to={'/login'} className="nav-btn">
                            Login
                        </Link>
                        }
                        {(accountType === USER_TYPES.UNREGISTERED || !authenticated) &&
                        <Link to={'/registration'} className="nav-btn">
                            Sign Up
                        </Link>
                        }
                    </div>
                </div>
                {/*Bottom Border*/}
                <hr className="py-0 my-0 border-b border-gray-200 opacity-25"/>
                {(authenticated || accountType !== USER_TYPES.UNREGISTERED) &&
                <section className={"mr-10"}>
                    <Dropdown
                        options={dropdownOptions}
                        onChange={(selected) =>
                            selected.label === 'Logout'
                                ? logout()
                                : pushToRoute(
                                history,
                                '/account',
                                {accountType: accountType, selected: selected.label})}
                        placeholder={'Account'}
                        name={'Account'}
                        dropdownCSS={dropdownAccountCSS}
                        dropdownTheme={dropdownAccountTheme}
                        isSearchable={false}
                    />
                </section>
                }
            </nav>
        </div>
    );
}

const mapStateToProps = (state) => ({
    isAdmin: state.userPrivileges.isAdmin,
    accountType: state.userPrivileges.accountType,
    authenticated: state.userPrivileges.authenticated
});

Header.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func
    }).isRequired,
    reset: PropTypes.func.isRequired,
    isAdmin: PropTypes.bool.isRequired,
    authenticated: PropTypes.bool.isRequired,
    accountType: PropTypes.string
}

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(Header);
