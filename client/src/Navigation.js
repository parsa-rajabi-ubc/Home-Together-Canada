/**
 * @Author:     Rachelle Gelden
 * @Created:    2020.12.22
 *
 * @Description: routes and general navigation for application
 *
 */

import React from 'react'
import {Routes, Route} from 'react-router-dom';
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
import Log from "tailwindcss/lib/util/log";

const Navigation = (props) => {
    const {authenticated, accountType, isAdmin} = props;

    return (
            <div>
                <Header/>
                {/* Matches the URL to the path and does not go through the rest of the routes*/}
                <ScrollToTop/>
                <Routes>
                    {/* Renders the correct component based on the URL*/}
                    <Route path={"/"} exact element={<Home/>}/>
                    <Route path={"/login"} element={<Login/>}/>
                    <Route path={"/registration/business"} element={<BusinessRegistration/>}/>
                    <Route path={"/registration/member"} element={<MemberRegistrationForm/>}/>
                    <Route path={"/registration"} element={<MainLandingPage/>}/>
                    {(authenticated && accountType === USER_TYPES.MEMBER) &&
                        <Route path={"/members/:username"} element={<ProfilePageContainer/>}/>
                    }
                    <Route path={"/members"} element={<MemberSearchContainer/>}/>
                    <Route path={"/create-listing"} element={<CreateListingContainer/>}/>
                    {authenticated &&
                        <Route path={"/listing/edit/:id"} exact element={<EditListingContainer/>}/>
                    }
                    {(authenticated && isAdmin) &&
                        <Route path={'/listing/pending/:id'} exact element={<ListingContainer/>}/>
                    }
                    <Route path={"/:servicesClassifieds/:id"} exact element={<ListingContainer/>}/>
                    <Route path={"/services"} element={<SearchServiceListings/>}/>
                    {/*<Route path={"/classifieds"} element={<SearchClassifiedListings/>}/>*/}
                    {(authenticated && accountType !== USER_TYPES.UNREGISTERED) &&
                        <Route path={"/account"} element={<AccountSummaryContainer/>}/>
                    }
                    {(authenticated && isAdmin) &&
                        <Route path={"/admin"} element={<AdminContainer/>}/>
                    }
                    <Route path={"/tos"} element={<TermsOfService/>}/>
                    <Route path={"/privacy"} element={<PrivacyPolicy/>}/>
                    <Route path={"/contact"} element={<Contact/>}/>
                    <Route path={"/faq"} element={<FAQ/>}/>
                    <Route path={"*"} element={<Error404/>}/>
                </Routes>
                <Footer/>
            </div>
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
