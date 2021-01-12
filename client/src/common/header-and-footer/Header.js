/**
 * @Author:     Parsa Rajabi
 * @Created:    2020.11.09
 *
 * @Description: header for the website which contains links to Search Member Profiles, Services, Classifieds, About Us and Account Page
 *
 */

import React from 'react';
import '../../tailwind.output.css';
import {Link} from "react-router-dom";
import LoginService from '../../services/LoginService';
import {connect} from "react-redux";
import {setAccountType, setAuthenticated, setIsAdmin} from "../../redux/slices/userPrivileges";
import PropTypes from "prop-types";
import {BUSINESS_SUBPAGES, MEMBER_SUBPAGES, USER_TYPES} from "../constants/users";
import Dropdown from "../forms/Dropdown";
import {pushToRoute} from "../utils/navigationUtils";
import {withRouter} from "react-router-dom";
import {compose} from "redux";

const mapDispatch = { setIsAdmin, setAccountType, setAuthenticated };

const Header = (props) => {

    const {
        history,
        setIsAdmin,
        setAccountType,
        setAuthenticated,
        isAdmin,
        accountType,
        authenticated
    } = props;

    const logout = () => {
        LoginService.logoutUser()
            .then(res => res.json())
            .then(() => {
                setIsAdmin({ isAdmin: false });
                setAccountType({ accountType: USER_TYPES.UNREGISTERED });
                setAuthenticated({ authenticated: false });

                // redirect to home page
                history.push('/');
            })
    }

    const dropdownOptions = accountType === USER_TYPES.MEMBER
        ? [...MEMBER_SUBPAGES, {label: 'Logout', value: 'Logout'}]
        : [...BUSINESS_SUBPAGES, {label: 'Logout', value: 'Logout'}];

    return (
        <div>
            {/*TODO: change bg color to igreen*/}
            <nav className="top-0 flex w-full bg-green-400 tex-black">
                <div className="container flex items-center justify-between w-full py-2 mx-auto mt-0 whitespace-no-wrap">
                    <div className="flex flex-no-wrap items-center ml-4">
                        <Link to={'/'}
                              className="text-lg font-bold lg:text-xl">
                            Home Together Canada
                        </Link>
                    </div>

                    {/*TODO: move classNames to header.css */}
                    {/* Middle of Nav */}
                    <div
                        className="flex-no-wrap hidden w-full p-4 mt-2 tex-black lg:flex lg:items-center lg:w-auto lg:block lg:mt-0 lg:bg-transparent lg:p-0">
                        <div className="items-center justify-end flex-1 mr-16 list-reset lg:flex">
                            {accountType !== USER_TYPES.BUSINESS &&
                            <Link to={'/members'}
                                  className="inline-block px-4 py-2 mr-3 transition duration-200 ease-in-out border-transparent rounded-md hover:bg-white hover:text-black hover:opacity-50">
                                Search Member Profiles
                            </Link>
                            }
                            <Link to={'/services'}
                                  className="inline-block px-4 py-2 mr-3 transition duration-200 ease-in-out border-transparent rounded-md hover:bg-white hover:text-black hover:opacity-50">
                                Services
                            </Link>
                            <Link to={'/classifieds'}
                                  className="inline-block px-4 py-2 mr-3 transition duration-200 ease-in-out border-transparent rounded-md hover:bg-white hover:text-black hover:opacity-50">
                                Classifieds
                            </Link>
                            <Link to={'/about'}
                                  className="inline-block px-4 py-2 mr-3 transition duration-200 ease-in-out border-transparent rounded-md hover:bg-white hover:text-black hover:opacity-50">
                                About Us
                            </Link>
                            <Link to={'/faq'}
                                  className="inline-block px-4 py-2 mr-3 no-underline transition duration-200 ease-in-out border-transparent rounded-md hover:bg-white hover:text-black hover:opacity-50">
                                FAQ
                            </Link>
                            {(authenticated && accountType !== USER_TYPES.UNREGISTERED) &&
                                < Link to={'/create/listing'}
                                    className="inline-block px-4 py-2 mr-3 no-underline transition duration-200 ease-in-out border-transparent rounded-md hover:bg-white hover:text-black hover:opacity-50">
                                    Create Listing
                                </Link>
                            }
                            {(authenticated && isAdmin) &&
                                <Link to={'/admin'}
                                      className="inline-block px-4 py-2 mr-3 no-underline transition duration-200 ease-in-out border-transparent rounded-md hover:bg-white hover:text-black hover:opacity-50">
                                    Admin
                                </Link>
                            }
                        </div>

                        {/* Login and Sign Up Buttons */}
                        {(accountType === USER_TYPES.UNREGISTERED || !authenticated) &&
                            <Link to={'/login'}
                                  className="items-center justify-center w-full px-6 py-2 mr-4 transition duration-200 ease-in-out bg-white border-transparent rounded-md opacity-75 hover:bg-orange-400">Login
                            </Link>
                        }
                        {(accountType === USER_TYPES.UNREGISTERED || !authenticated) &&
                            <Link to={'/registration'}
                                  className="items-center justify-center w-full px-4 py-2 mr-4 transition duration-200 ease-in-out bg-white border-transparent rounded-md opacity-75 hover:bg-orange-400">Sign
                                Up
                            </Link>
                        }
                        {(authenticated || accountType !== USER_TYPES.UNREGISTERED) &&
                        <Dropdown
                            options={dropdownOptions}
                            onChange={(selected) =>
                                selected.label === 'Logout'
                                    ? logout()
                                    : pushToRoute(
                                        history,
                                    '/account',
                                    {accountType: accountType, selected: selected.label })}
                            placeholder={'Account'}
                            name={'Account'}
                        />
                        }
                    </div>
                </div>
                {/*Bottom Border*/}
                <hr className="py-0 my-0 border-b border-gray-200 opacity-25"/>
            </nav>
        </div>
    )
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
    setAccountType: PropTypes.func.isRequired,
    setIsAdmin: PropTypes.func.isRequired,
    setAuthenticated: PropTypes.func.isRequired,
    isAdmin: PropTypes.bool.isRequired,
    authenticated: PropTypes.bool.isRequired,
    accountType: PropTypes.string
}

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatch)
)(Header);
