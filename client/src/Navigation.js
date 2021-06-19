/**
 * @Author:     Rachelle Gelden
 * @Created:    2020.12.22
 *
 * @Description: routes and general navigation for application
 *
 */

import React from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
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
                <Switch>
                    {/* Renders the correct component based on the URL*/}
                    <Route path={"/"} exact component={Home}/>
                    <Route path={"/login"} component={Login}/>
                    <Route path={"/registration/business"} component={BusinessRegistration}/>
                    <Route path={"/registration/member"} component={MemberRegistrationForm}/>
                    <Route path={"/registration"} component={MainLandingPage}/>
                    {(authenticated && accountType === USER_TYPES.MEMBER) &&
                    <Route path={"/members/:username"} component={ProfilePageContainer}/>
                    }
                    <Route path={"/members"} component={MemberSearchContainer}/>
                    <Route path={"/create-listing"} component={CreateListingContainer}/>
                    {authenticated &&
                        <Route path={"/listing/edit/:id"} exact component={EditListingContainer}/>
                    }
                    <Route path={"/:servicesClassifieds/:id"} exact component={ListingContainer}/>
                    <Route path={"/services"} component={SearchServiceListings}/>
                    <Route path={"/classifieds"} component={SearchClassifiedListings}/>
                    {(authenticated && accountType !== USER_TYPES.UNREGISTERED) &&
                        <Route path={"/account"} component={AccountSummaryContainer}/>
                    }
                    {(authenticated && isAdmin) &&
                        <Route path={"/admin"} component={AdminContainer}/>
                    }
                    <Route path={"/tos"} component={TermsOfService}/>
                    <Route path={"/privacy"} component={PrivacyPolicy}/>
                    <Route path={"/contact"} component={Contact}/>
                    <Route path={"/faq"} component={FAQ}/>
                    <Route component={Error404}/>
                </Switch>
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

export default connect(mapStateToProps, null) (Navigation);
