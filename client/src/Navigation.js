/**
 * @Author:     Rachelle Gelden
 * @Created:    2020.12.22
 *
 * @Description: routes and general navigation for application
 *
 */

import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from "./home/Home";
import Login from "./login/LoginForm";
import BusinessRegistration from "./registration/BusinessRegistrationForm";
import MemberRegistrationForm from "./registration/MemberRegistrationForm";
import MainLandingPage from "./registration/MainLandingPage";
import AccountSummaryContainer from "./accountSummary/AccountSummaryContainer";
import Error404 from "./common/error/Error404";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {USER_TYPES} from "./common/constants/users";
import Header from "./common/header-and-footer/Header";
import Footer from "./common/header-and-footer/Footer";
import MemberSearchContainer from "./memberSearch/MemberSearchContainer";
import CreateListingContainer from "./createListing/CreateListingContainer";
import TermsOfService from "./termsOfService/TermsOfService";
import PrivacyPolicy from "./termsOfService/PrivacyPolicy";
import ScrollToTop from "./ScrollToTop";
import ProfilePageContainer from "./memberSearch/profilePage/ProfilePageContainer";
import ListingContainer from "./searchServicesClassifieds/ListingContainer";
import FAQ from "./FAQ/FAQ";
import SearchServiceListings from "./searchServicesClassifieds/SearchServiceListings";
import SearchClassifiedListings from "./searchServicesClassifieds/SearchClassifiedListings";
import AdminContainer from "./admin/AdminContainer";
import Contact from "./contact/Contact";
import EditListingContainer from "./accountSummary/manageListings/EditListingContainer";

const Navigation = (props) => {
    const {authenticated, accountType, isAdmin} = props;

    return (
        <Router>
            <div>
                <Header/>
                {/* Matches the URL to the path and does not go through the rest of the routes*/}
                <ScrollToTop/>
                <Routes>
                    {/* Renders the correct component based on the URL*/}
                    <Route path={"/"} exact>
                        <Home/>
                    </Route>
                    <Route path={"/login"}>
                        <Login/>
                    </Route>
                    <Route path={"/registration/business"}>
                        <BusinessRegistration/>
                    </Route>
                    <Route path={"/registration/member"}>
                        <MemberRegistrationForm/>
                    </Route>
                    <Route path={"/registration"}>
                        <MainLandingPage/>
                    </Route>
                    {(authenticated && accountType === USER_TYPES.MEMBER) &&
                        <Route path={"/members/:username"}>
                            <ProfilePageContainer/>
                        </Route>
                    }
                    <Route path={"/members"}>
                        <MemberSearchContainer/>
                    </Route>
                    <Route path={"/create-listing"}>
                        <CreateListingContainer/>
                    </Route>
                    {authenticated &&
                        <Route path={"/listing/edit/:id"} exact>
                            <EditListingContainer/>
                        </Route>
                    }
                    {(authenticated && isAdmin) &&
                        <Route path={'/listing/pending/:id'} exact>
                            <ListingContainer/>
                        </Route>
                    }
                    <Route path={"/:servicesClassifieds/:id"} exact>
                        <ListingContainer/>
                    </Route>
                    <Route path={"/services"}>
                        <SearchServiceListings/>
                    </Route>
                    {/*<Route path={"/classifieds"}>*/}
                    {/*    <SearchClassifiedListings/>*/}
                    {/*</Route>*/}
                    {(authenticated && accountType !== USER_TYPES.UNREGISTERED) &&
                        <Route path={"/account"}>
                            <AccountSummaryContainer/>
                        </Route>
                    }
                    {(authenticated && isAdmin) &&
                        <Route path={"/admin"}>
                            <AdminContainer/>
                        </Route>
                    }
                    <Route path={"/tos"}>
                        <TermsOfService/>
                    </Route>
                    <Route path={"/privacy"}>
                        <PrivacyPolicy/>
                    </Route>
                    <Route path={"/contact"}>
                        <Contact/>
                    </Route>
                    <Route path={"/faq"}>
                        <FAQ/>
                    </Route>
                    <Route>
                        <Error404/>
                    </Route>
                </Routes>
                <Footer/>
            </div>
        </Router>
    );
}

Navigation.propTypes = {
    isAdmin: PropTypes.bool.isRequired,
    authenticated: PropTypes.bool.isRequired,
    accountType: PropTypes.string,
}

const mapStateToProps = (state) => ({
    isAdmin: state.userPrivileges.isAdmin,
    accountType: state.userPrivileges.accountType,
    authenticated: state.userPrivileges.authenticated
});

export default connect(mapStateToProps, null)(Navigation);
